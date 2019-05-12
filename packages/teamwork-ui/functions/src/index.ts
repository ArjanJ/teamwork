import * as functions from 'firebase-functions';
import express from 'express';
import bodyParser from 'body-parser';

import { verifyIdToken } from './middleware/verifyIdToken';
import { teamsRouter } from './routes/teams';
import { userRouter } from './routes/users';

const app = express();
const main = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(verifyIdToken);
app.use(userRouter);
app.use(teamsRouter);

/**
 * This is needed because Firebase hosting rewrite adds an extra /api
 * in the url.
 */
main.use('/api', app);

export const api = functions.https.onRequest(main);
