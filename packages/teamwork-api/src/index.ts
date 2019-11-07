import { ApolloServer } from 'apollo-server-express';
import bodyParser from 'body-parser';
import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';

import { handleError } from './middleware/handleError';
import { resolvers } from './resolvers';
import { routes } from './routes/';
import { typeDefs } from './typeDefs';

const PORT = process.env.PORT || 8000;
const app = express();

app.use(cors());
app.use(morgan('combined'));
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(routes);
app.use(handleError);

const graphqlServer = new ApolloServer({
  resolvers: resolvers as any,
  typeDefs,
});

graphqlServer.applyMiddleware({ app, path: '/graphql' });

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
