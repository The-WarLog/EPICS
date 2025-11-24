import createError from 'http-errors';
import express from 'express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import fs from 'fs';
import weatherRoute from './routes/weather.routes.js';
import UserRouter from './routes/user.routes.js';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerSpec from './swaggerConfig.js';
import { serve,setup } from 'swagger-ui-express';
import ImageRouter from './routes/image.routes.js';
import chatRouter from './controllers/chat.controller.js';
// Recreate __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

if(!fs.existsSync('uploads')){
 fs.mkdirSync('uploads');
}

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//middleware for routes
app.use('/api-docs', serve, setup(swaggerSpec));
app.use('/api/v1/weather',weatherRoute);
app.use('/api/v1/users',UserRouter);
app.use('/api/v1/uploads',ImageRouter)
//ABHI CHATBOT
app.use('/api/v1/chat',chatRouter)
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  const status = err.status || 500;
  const isDev = req.app.get('env') === 'development';
  if (res.headersSent) return next(err); // fall back to default handler if already started
  return res.status(status).json({
    message: err.message || 'Internal Server Error',
    ...(isDev && { stack: err.stack })
  });
});

export default app;
