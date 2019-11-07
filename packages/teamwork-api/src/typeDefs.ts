import { companySchema } from 'teamwork-graphql/lib/schema/company';
import { rootSchema } from 'teamwork-graphql/lib/schema/root';
import { teamSchema } from 'teamwork-graphql/lib/schema/team';
import { userSchema } from 'teamwork-graphql/lib/schema/user';

export const typeDefs = [rootSchema, companySchema, teamSchema, userSchema];
