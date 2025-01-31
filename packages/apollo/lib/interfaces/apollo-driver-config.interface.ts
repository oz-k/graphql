import {
  GqlModuleAsyncOptions,
  GqlModuleOptions,
  GqlOptionsFactory,
  SubscriptionConfig,
} from '@a-part/graphql';
import {
  ApolloServerPluginLandingPageGraphQLPlaygroundOptions,
  Config,
  GraphQLExecutor,
} from 'apollo-server-core';
import { GraphQLSchema } from 'graphql';

export interface ServerRegistration {
  /**
   * Path to mount GraphQL API
   */
  path?: string;

  /**
   * CORS configuration
   */
  cors?: any | boolean;

  /**
   * Body-parser configuration
   */
  bodyParserConfig?: any | boolean;

  /**
   * On health check hook
   */
  onHealthCheck?: (req: any) => Promise<any>;

  /**
   * Whether to enable health check
   */
  disableHealthCheck?: boolean;
}

export interface ApolloDriverConfig
  extends Omit<Config, 'typeDefs'>,
    ServerRegistration,
    Omit<GqlModuleOptions, 'context'> {
  /**
   * Executor factory function
   */
  executorFactory?: (
    schema: GraphQLSchema,
  ) => GraphQLExecutor | Promise<GraphQLExecutor>;

  /**
   * If enabled, "subscriptions-transport-ws" will be automatically registered.
   */
  installSubscriptionHandlers?: boolean;

  /**
   * Subscriptions configuration.
   */
  subscriptions?: SubscriptionConfig;

  /**
   * GraphQL playground options.
   */
  playground?: boolean | ApolloServerPluginLandingPageGraphQLPlaygroundOptions;

  /**
   * If enabled, will register a global interceptor that automatically maps
   * "HttpException" class instances to corresponding Apollo errors.
   * @default true
   */
  autoTransformHttpErrors?: boolean;
}

export type ApolloDriverConfigFactory = GqlOptionsFactory<ApolloDriverConfig>;
export type ApolloDriverAsyncConfig = GqlModuleAsyncOptions<ApolloDriverConfig>;
