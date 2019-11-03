import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
};

export type Company = {
   __typename?: 'Company',
  displayName: Scalars['String'],
  id: Scalars['ID'],
  name: Scalars['String'],
  owner: CompanyOwner,
};

export type CompanyOwner = {
   __typename?: 'CompanyOwner',
  email: Scalars['String'],
  firstName: Scalars['String'],
  lastName: Scalars['String'],
};

export type Query = {
   __typename?: 'Query',
  company: Company,
  team: Team,
  teams: Array<Team>,
  user: User,
};


export type QueryCompanyArgs = {
  companyId: Scalars['ID']
};


export type QueryTeamArgs = {
  teamId: Scalars['ID']
};


export type QueryUserArgs = {
  id: Scalars['ID']
};

export type Team = {
   __typename?: 'Team',
  company: Company,
  displayName: Scalars['String'],
  id: Scalars['ID'],
  members: Array<TeamMember>,
  name: Scalars['String'],
};

export type TeamMember = {
   __typename?: 'TeamMember',
  email: Scalars['String'],
  firstName: Scalars['String'],
  lastName: Scalars['String'],
};

export type User = {
   __typename?: 'User',
  companies: Array<Company>,
  email: Scalars['String'],
  firstName: Scalars['String'],
  id: Scalars['ID'],
  lastName: Scalars['String'],
  role?: Maybe<Scalars['String']>,
  teams: Array<UserTeam>,
};

export type UserTeam = {
   __typename?: 'UserTeam',
  displayName: Scalars['String'],
  id: Scalars['ID'],
  name: Scalars['String'],
};



export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;


export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: ResolverTypeWrapper<{}>,
  ID: ResolverTypeWrapper<Scalars['ID']>,
  Company: ResolverTypeWrapper<Company>,
  String: ResolverTypeWrapper<Scalars['String']>,
  CompanyOwner: ResolverTypeWrapper<CompanyOwner>,
  Team: ResolverTypeWrapper<Team>,
  TeamMember: ResolverTypeWrapper<TeamMember>,
  User: ResolverTypeWrapper<User>,
  UserTeam: ResolverTypeWrapper<UserTeam>,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {},
  ID: Scalars['ID'],
  Company: Company,
  String: Scalars['String'],
  CompanyOwner: CompanyOwner,
  Team: Team,
  TeamMember: TeamMember,
  User: User,
  UserTeam: UserTeam,
  Boolean: Scalars['Boolean'],
};

export type CompanyResolvers<ContextType = any, ParentType extends ResolversParentTypes['Company'] = ResolversParentTypes['Company']> = {
  displayName?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  owner?: Resolver<ResolversTypes['CompanyOwner'], ParentType, ContextType>,
};

export type CompanyOwnerResolvers<ContextType = any, ParentType extends ResolversParentTypes['CompanyOwner'] = ResolversParentTypes['CompanyOwner']> = {
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  company?: Resolver<ResolversTypes['Company'], ParentType, ContextType, RequireFields<QueryCompanyArgs, 'companyId'>>,
  team?: Resolver<ResolversTypes['Team'], ParentType, ContextType, RequireFields<QueryTeamArgs, 'teamId'>>,
  teams?: Resolver<Array<ResolversTypes['Team']>, ParentType, ContextType>,
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<QueryUserArgs, 'id'>>,
};

export type TeamResolvers<ContextType = any, ParentType extends ResolversParentTypes['Team'] = ResolversParentTypes['Team']> = {
  company?: Resolver<ResolversTypes['Company'], ParentType, ContextType>,
  displayName?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  members?: Resolver<Array<ResolversTypes['TeamMember']>, ParentType, ContextType>,
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
};

export type TeamMemberResolvers<ContextType = any, ParentType extends ResolversParentTypes['TeamMember'] = ResolversParentTypes['TeamMember']> = {
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  companies?: Resolver<Array<ResolversTypes['Company']>, ParentType, ContextType>,
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  role?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  teams?: Resolver<Array<ResolversTypes['UserTeam']>, ParentType, ContextType>,
};

export type UserTeamResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserTeam'] = ResolversParentTypes['UserTeam']> = {
  displayName?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
};

export type Resolvers<ContextType = any> = {
  Company?: CompanyResolvers<ContextType>,
  CompanyOwner?: CompanyOwnerResolvers<ContextType>,
  Query?: QueryResolvers<ContextType>,
  Team?: TeamResolvers<ContextType>,
  TeamMember?: TeamMemberResolvers<ContextType>,
  User?: UserResolvers<ContextType>,
  UserTeam?: UserTeamResolvers<ContextType>,
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
*/
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
