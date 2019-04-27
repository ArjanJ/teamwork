import * as functions from 'firebase-functions';
import express from 'express';
import bodyParser from 'body-parser';

import { verifyIdToken } from './middleware/verifyIdToken';
import { userRouter } from './routes/users';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(verifyIdToken);
app.use(userRouter);

export const api = functions.https.onRequest(app);
