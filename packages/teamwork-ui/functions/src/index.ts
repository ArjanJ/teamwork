import bodyParser from 'body-parser';
import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';

import { handleError } from './middleware/handleError';
import { routes } from './routes/';

const PORT = process.env.PORT || 8000;
const app = express();

/**
 * Without this, nodemon crashes on restart because
 * it doesn't close the port properly.
 */
process.on('SIGUSR2', () => {
  process.exit(0);
});

app.use(morgan('combined'));
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(routes);
app.use(handleError);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
