import { Hono } from 'hono';
import experimentRouter from './experiment.js';

const app = new Hono();

// 路由挂载
app.route('/api/experiment', experimentRouter);

// 健康检查
app.get('/ping', (c) => c.text('pong'));

export default app;