import path from 'path';
import fs from 'fs';

import dotenv from 'dotenv';
import express from 'express';
import mysqlSession from 'express-mysql-session';
import session from 'express-session';
import flash from 'connect-flash';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';

import db from './utils/db.mjs';
import usersRouter from './routes/users.mjs';
import homepageRouter from './routes/homepage.mjs';
import * as errorController from './controllers/error.mjs';
import User from './models/User.mjs';

dotenv.config();

/* Setup express extensions & helper middlewares ---------------------------- */

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.static(path.join(path.resolve(), 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(flash());
app.use(helmet());
app.use(compression());
app.use(morgan('combined', {
  stream: fs.createWriteStream(path.resolve('access.log'), { flags: 'a' }),
}));

const MySQLStore = mysqlSession(session);
const sessionStore = new MySQLStore({ expiration: 60 * 2000 }, db);
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: sessionStore,
}));

/* Setup our middlewares ---------------------------------------------------- */

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isAuthenticated || false;
  next();
});

app.use(async (req, _, next) => {
  if (req.session && !req.session.user) {
    return next();
  }

  try {
    const user = await User.findByEmail(req.session.user.email);
    if (!user) throw new Error('User not found');
    req.user = user;
    next();
  } catch (error) {
    const operationError = new Error(error);
    operationError.httpStatusCode = 500;
    next(operationError);
  }
});

app.use('/', homepageRouter);
app.use('/users', usersRouter);
app.use(errorController.get404);
app.use(errorController.get500);

/* Spin up the server ------------------------------------------------------- */

app.listen(process.env.PORT || 3000);
