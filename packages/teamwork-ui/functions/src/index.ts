import bodyParser from 'body-parser';
import express from 'express';
import * as functions from 'firebase-functions';
import morgan from 'morgan';

import { handleError } from './middleware/handleError';
import { routes } from './routes/';

const app = express();
const main = express();

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(routes);
app.use(handleError);

/**
 * This is needed because Firebase Hosting Rewrite adds an extra /api
 * in the url.
 */
main.use('/api', app);

export const api = functions.https.onRequest(main);
