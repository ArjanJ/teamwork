import {
  CompanyResolvers,
  QueryResolvers,
  TeamResolvers,
  UserResolvers,
} from 'teamwork-graphql/lib/server';

interface Resolvers {
  Query: QueryResolvers;
  Company: CompanyResolvers;
  Team: TeamResolvers;
  User: UserResolvers;
}

export const resolvers: Resolvers = {
  Query: {},

  // tslint:disable-next-line: object-literal-sort-keys
  Company: {},
  Team: {},
  User: {},
};
