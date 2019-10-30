import gql from 'graphql-tag';

export const CompanySchema = gql`
  type Query {
    getCompany(companyId: ID!): Company
  }

  type Company {
    id: ID!
    name: String!
    owner: CompanyOwner!
  }

  type CompanyOwner {
    firstName: String!
    email: String!
    lastName: String!
  }
`;
