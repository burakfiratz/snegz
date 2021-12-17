const {GraphQLSchema, GraphQLObjectType, GraphQLString} = require("graphql");

const {productQueries, productMutations} = require('./graphql/product');
const {userQueries, userMutations} = require('./graphql/user');
const {orderQueries, orderMutations} = require('./graphql/order');


const queryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Available fields: order, orders, product, products, user, users',
    fields: {
        hello: {
            type: GraphQLString,
            resolve: () => {
                return "Hello World!";
            }
        },
        ...orderQueries,
        ...productQueries,
        ...userQueries,


    }
});

const mutationType = new GraphQLObjectType({
    name: 'Mutation',
    description: 'Available fields: setOrder, setProduct, setUser',
    fields: () => ({
        ...orderMutations,
        ...productMutations,
        ...userMutations,

    })
});


module.exports = new GraphQLSchema({query: queryType, mutation: mutationType});