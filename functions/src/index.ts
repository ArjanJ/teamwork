import * as functions from 'firebase-functions';
import express from 'express';
import bodyParser from 'body-parser';

import { routes } from './routes/';

const app = express();
const main = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(routes);

/**
 * This is needed because Firebase Hosting Rewrite adds an extra /api
 * in the url.
 */
main.use('/api', app);

export const api = functions.https.onRequest(main);
