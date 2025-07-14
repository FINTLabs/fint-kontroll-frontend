import express from 'express';
import morgan from 'morgan';
import log4js from 'log4js';
import prometheusMiddleware from 'express-prometheus-middleware';

const logger = log4js.getLogger();
logger.level = 'debug';

logger.info(`Running in ${process.env.NODE_ENV === 'production' ? 'production' : 'dev'} mode`);
if (process.env.CYPRESS_TESTS === 'true') {
    logger.info('Running in cypress tests mode');
}

const PORT = process.env.PORT || 3000;
const BASE_PATH = process.env.BASE_PATH || '/';
const LOG_LEVEL = process.env.LOG_LEVEL || 'info';

let viteDevServer;

if (process.env.NODE_ENV !== 'production') {
    const vite = await import('vite');
    viteDevServer = await vite.createServer({
        server: { middlewareMode: true },
    });
}

const app = express();
app.disable('x-powered-by');
app.use(morgan('combined'));

app.use(
    prometheusMiddleware({
        collectDefaultMetrics: true,
        metricsPath: `${BASE_PATH.replace(/\/$/, '')}/metrics`,
    })
);

if (viteDevServer) {
    app.use(BASE_PATH.replace(/\/$/, ''), viteDevServer.middlewares);
} else {
    app.use(BASE_PATH.replace(/\/$/, ''), express.static('build/client'));
}

import { createRequestHandler } from '@remix-run/express';

if (viteDevServer) {
    app.all(`${BASE_PATH.replace(/\/$/, '')}(/*)?`, async (req, res, next) => {
        const build = await viteDevServer.ssrLoadModule('virtual:remix/server-build');
        return createRequestHandler({ build })(req, res, next);
    });
} else {
    const build = await import('../build/server/index.js');
    app.all(`${BASE_PATH.replace(/\/$/, '')}(/*)?`, createRequestHandler({ build }));
}

app.listen(PORT, () => {
    logger.info('LOG_LEVEL', LOG_LEVEL);
    logger.info(`✅ App listening on http://localhost:${PORT}${BASE_PATH.replace(/\/$/, '')}`);
});
