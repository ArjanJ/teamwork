import gql from 'graphql-tag';

export const teamSchema = gql`
  type Team {
    company: Company!
    displayName: String!
    id: ID!
    members: [TeamMember!]!
    name: String!
  }

  type TeamMember {
    email: String!
    firstName: String!
    lastName: String!
  }

  type Query {
    team(teamId: ID!): Team!
    teams: [Team!]!
  }

  schema {
    query: Query
  }
`;
