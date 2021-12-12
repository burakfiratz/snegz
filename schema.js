const {GraphQLSchema, GraphQLObjectType, GraphQLString} = require("graphql");

const {productQueries, productMutations} = require('./graphql/product');
const {userQueries, userMutations} = require('./graphql/user');


const queryType = new GraphQLObjectType({
    name: 'Query',
    fields: {
        hello: {
            type: GraphQLString,
            resolve: () => {
                return "Hello World!";
            }
        },

        ...userQueries,
        ...productQueries,
    }
});

const mutationType = new GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
        ...userMutations,
        ...productMutations,
    })
});


module.exports = new GraphQLSchema({query: queryType, mutation: mutationType});