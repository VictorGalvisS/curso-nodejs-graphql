// Dependencia que crea un servidor
const { ApolloServer } = require('@apollo/server');
// Playground incluido en @apollo/server
const { ApolloServerPluginLandingPageLocalDefault } = require('@apollo/server/plugin/landingPage/default');
// Middleware de Express también en @apollo/server
const { expressMiddleware } = require('@apollo/server/express4');
const { loadFiles } = require('@graphql-tools/load-files');
const { resolvers } = require('./resolvers');
const { buildContext } = require('graphql-passport');
const {
  typeDefs: scalarsTypeDefs,
  resolvers: scalarResolvers } = require('graphql-scalars');


const userGraphQl = async (app) => {
  const allTypeDefs = [...await loadFiles('./src/**/*.graphql'), scalarsTypeDefs];
  const allResolvers = [resolvers, scalarResolvers];
  const server = new ApolloServer({
    typeDefs: allTypeDefs,
    resolvers: allResolvers,
    //context: ({ req, res }) => buildContext({ req, res }),
    playground: true,
    plugins: [
      ApolloServerPluginLandingPageLocalDefault
    ]
  });
  await server.start();

  app.use(
    '/graphql',
    expressMiddleware(server, {
      context: async ({ req, res }) => buildContext({ req, res }),
    })
  );
}

module.exports = userGraphQl;
