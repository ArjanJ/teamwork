import gql from 'graphql-tag';

export const rootSchema = gql`
  type Query {
    root: String
  }

  type Mutation {
    root: String
  }
`;
