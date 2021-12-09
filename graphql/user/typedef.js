const {GraphQLObjectType, GraphQLInt, GraphQLString} = require("graphql");
module.exports = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: {type: GraphQLInt},
        username: {type: GraphQLString},
        email: {type: GraphQLString}
    })
});