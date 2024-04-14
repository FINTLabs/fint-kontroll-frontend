import express from "express";
import {BASE_PATH, PORT} from "../environment.js";
import morgan from "morgan";
import prometheusMiddleware from "express-prometheus-middleware";
import log4js from 'log4js';
import {createRequestHandler} from "@remix-run/node";

const viteDevServer =
    process.env.NODE_ENV === "production"
        ? null
        : await import("vite").then((vite) =>
            vite.createServer({
                server: {middlewareMode: true},
            })
        );

const logger = log4js.getLogger();
logger.level = "info";

const app = express();
// http://expressjs.com/en/advanced/best-practice-security.html#at-a-minimum-disable-x-powered-by-header
app.disable("x-powered-by");
app.use(morgan("combined"));
app.use(
    prometheusMiddleware({
        collectDefaultMetrics: true,
        metricsPath: `${BASE_PATH.replace(/\/$/,'')}/metrics`
    })
);

app.use(BASE_PATH.replace(/\/$/,''),
    viteDevServer
        ? viteDevServer.middlewares
        : express.static("build/client")
);

const build = viteDevServer
    ? () =>
        viteDevServer.ssrLoadModule(
            "virtual:remix/server-build"
        )
    : await import("../build/server/index.js");

app.all(`${BASE_PATH.replace(/\/$/,'')}(/*)?`, createRequestHandler({build}));

app.listen(PORT, () => {
    logger.info(`App listening on http://localhost:${PORT}${BASE_PATH.replace(/\/$/,'')}`);
});
