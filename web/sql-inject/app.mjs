import path from 'path';
import fs from 'fs';

import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';

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

app.use('/', (_, res) => {
  res.status(200).json({
    message: 'Hello World',
  });
});

/* Spin up the server -------------------------------- */

app.listen(process.env.PORT || 3000);
