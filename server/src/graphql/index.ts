import { ApolloServer } from '@apollo/server';
import { features } from './features';

async function creategraphqlServer() {
    const gqlServer = new ApolloServer({
        typeDefs: `
          
            ${features.typeDefs}
            type Query{
      
                ${features.queries}
            }
      
        `,
        resolvers: {
            Query: {

                ...features.resolvers.queries
            },


        },
        introspection: process.env.NODE_ENV !== 'production'
    });

    await gqlServer.start();
    return gqlServer;
}

export default creategraphqlServer;