const {GraphQLSchema, GraphQLObjectType, GraphQLString} = require("graphql");

const {productQueries, productMutations} = require('./graphql/product');
const {userQueries, userMutations} = require('./graphql/user');
const {orderQueries, orderMutations} = require('./graphql/order');


const queryType = new GraphQLObjectType({
    name: 'Query',
    fields: {
        hello: {
            type: GraphQLString,
            resolve: () => {
                return "Hello World!";
            }
        },
        ...productQueries,
        ...userQueries,
        ...orderQueries,

    }
});

const mutationType = new GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
        ...productMutations,
        ...userMutations,
        ...orderMutations,

    })
});


module.exports = new GraphQLSchema({query: queryType, mutation: mutationType});