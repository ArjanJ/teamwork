import gql from 'graphql-tag';

export const companySchema = gql`
  type Company {
    displayName: String!
    id: ID!
    name: String!
    owner: CompanyOwner!
  }

  type CompanyOwner {
    email: String!
    firstName: String!
    lastName: String!
  }

  type Query {
    company(companyId: ID!): Company!
  }

  schema {
    query: Query
  }
`;
