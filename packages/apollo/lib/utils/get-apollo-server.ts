import { INestApplicationContext } from '@nestjs/common';
import { GraphQLModule } from '@a-part/graphql';
import { ApolloServerBase } from 'apollo-server-core';
import { ApolloDriver } from '..';

/**
 * Returns the underlying ApolloServer instance for a given application.
 * @param app Nest application reference
 * @returns Apollo Server instance used by the host application
 */
export function getApolloServer(
  app: INestApplicationContext,
): ApolloServerBase {
  try {
    const graphqlModule = app.get<GraphQLModule<ApolloDriver>>(GraphQLModule);
    return graphqlModule.graphQlAdapter?.instance;
  } catch (error) {}
  throw new Error(
    `Nest could not find the "GraphQLModule" in your application's container. Please, double-check if it's registered in the given application.`,
  );
}
