import express from 'express';
import { BASE_PATH, LOG_LEVEL, PORT } from '../environment.js';
import morgan from 'morgan';
import log4js from 'log4js';
import prometheusMiddleware from 'express-prometheus-middleware';
import { createRequestHandler } from '@react-router/express';
import helmet from 'helmet';

const logger = log4js.getLogger();
logger.level = 'debug';

logger.info(`Running in ${process.env.NODE_ENV === 'production' ? 'production' : 'dev'} mode`);

if (process.env.CYPRESS_TESTS === 'true') {
    logger.info('Running in cypress tests mode');
}

const viteDevServer =
    process.env.NODE_ENV === 'production'
        ? null
        : await import('vite').then((vite) =>
              vite.createServer({
                  server: { middlewareMode: true },
              })
          );

const app = express();

app.use((req, res, next) => {
    const nonce = crypto.randomUUID();
    res.locals.cspNonce = nonce;

    helmet({
        contentSecurityPolicy: {
            useDefaults: true,
            directives: {
                defaultSrc: ["'self'"],
                scriptSrc: ["'self'", "'strict-dynamic'", `'nonce-${nonce}'`],
                styleSrc: ["'self'", 'https://fonts.googleapis.com', 'https://cdn.nav.no'],
                imgSrc: ["'self'", 'data:'],
                fontSrc: ["'self'", 'data:', 'https://fonts.gstatic.com', 'https://cdn.nav.no'],
                connectSrc: ["'self'", 'ws:', 'wss:'],
                objectSrc: ["'none'"],
                baseUri: ["'self'"],
                frameAncestors: ["'none'"],
            },
        },
        crossOriginEmbedderPolicy: false,
    })(req, res, next);
});
// http://expressjs.com/en/advanced/best-practice-security.html#at-a-minimum-disable-x-powered-by-header
app.disable('x-powered-by');
app.use(morgan('combined'));
app.use(
    prometheusMiddleware({
        collectDefaultMetrics: true,
        metricsPath: `${BASE_PATH.replace(/\/$/, '')}/metrics`,
    })
);

app.use(
    BASE_PATH.replace(/\/$/, ''),
    viteDevServer ? viteDevServer.middlewares : express.static('build/client')
);

const build = viteDevServer
    ? () => viteDevServer.ssrLoadModule('virtual:react-router/server-build')
    : await import('../build/server/index.js');

/*app.all(`${BASE_PATH.replace(/\/$/, '')}(/!*)?`, createRequestHandler({ build }));*/

app.all(
    `${BASE_PATH.replace(/\/$/, '')}(/*)?`,
    createRequestHandler({
        build,
        getLoadContext(req, res) {
            return {
                cspNonce: res.locals.cspNonce,
            };
        },
    })
);

app.listen(PORT, () => {
    logger.info('LOG_LEVEL', LOG_LEVEL);
    logger.info(`App listening on http://localhost:${PORT}${BASE_PATH.replace(/\/$/, '')}`);
});
