import gql from 'graphql-tag';

export const userSchema = gql`
  extend type Query {
    user(id: ID!): User!
  }

  type User {
    companies: [Company!]!
    email: String!
    firstName: String!
    id: ID!
    lastName: String!
    role: String
    teams: [UserTeam!]!
  }

  type UserTeam {
    displayName: String!
    id: ID!
    name: String!
  }
`;
