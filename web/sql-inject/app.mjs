import path from 'path';
import fs from 'fs';

import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';

import authRouter from './routes/auth.mjs';

/* Setup express extensions & helper middlewares ----- */

const app = express();

app.use(helmet());
app.use(compression());

app.use(morgan('combined', {
  stream: fs.createWriteStream(path.resolve('access.log'), { flags: 'a' }),
}));

app.set('view engine', 'ejs');
app.set('views', 'dist/views');

app.use(bodyParser.urlencoded({ extended: false }));

/* Setup our middlewares ----------------------------- */

app.use(authRouter);

/* Spin up the server -------------------------------- */

app.listen(process.env.PORT || 3000);
