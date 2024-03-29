import 'dotenv/config';
import 'types';

import bodyParser from 'body-parser';
import { CORS_OPTION } from 'configs/cors';
import configPassport from 'configs/passport';
import cors from 'cors';
import type { Express } from 'express';
import express from 'express';
import mongoSanitize from 'express-mongo-sanitize';
import helmet from 'helmet';
import { errorHandler } from 'middlewares/error';
import { restartPeriodScheduledTasks } from 'modules/period/period.schedule';
import passport from 'passport';
import v1Router from 'routes/v1';

const app: Express = express();

// app.use(session({ secret: 'cats' }));

// use passport
app.use(passport.initialize());

// app.use(passport.session());

// Sign in with Google

configPassport.google();

// enabling the Helmet middleware
app.use(helmet());

app.use(cors(CORS_OPTION));

// parse json request body
app.use(bodyParser.json());

// parse urlencoded request body
app.use(bodyParser.urlencoded({ extended: true }));

// sanitize request data
app.use(mongoSanitize());

// v1 api routes
app.use('/v1', v1Router);

restartPeriodScheduledTasks();

// Error handling middleware for CORS
app.use(errorHandler);

// 404
// app.get('*', function (_, res) {
//   res.status(404).send('Not found');
// });

export default app;
