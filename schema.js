const {GraphQLSchema, GraphQLObjectType, GraphQLInt, GraphQLString} = require("graphql");


let userType = new GraphQLObjectType({
    name: 'User',
    fields: {
        id: {type: GraphQLInt},
        username: {type: GraphQLString},
        email: {type: GraphQLString},
        name: {type: GraphQLString},
        surname: {type: GraphQLString}
    }
});


var queryType = new GraphQLObjectType({
    name: 'Query',
    fields: {
        hello: {
            type: GraphQLString,
            resolve: () => {
                return "Hello World!";
            }
        }
    }
});

var mutationType = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        getUser: {
            type: userType,
            args: {
                id: {type: GraphQLInt}
            },
            resolve: async (_) => {
                //TODO: sqlite db query
            }
        },
    }
})


module.exports = new GraphQLSchema({query: queryType, mutation: mutationType});