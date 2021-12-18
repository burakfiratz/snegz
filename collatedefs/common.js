const {GraphQLEnumType, GraphQLInputObjectType, GraphQLInt} = require("graphql");
const directionEnumType = new GraphQLEnumType({
    name: 'DirectionEnum',
    values: {
        ASC: {value: "ASC"},
        DESC: {value: "DESC"},
    }
});

let paginationInputType = new GraphQLInputObjectType({
    name: "Pagination",
    fields: () => ({
        limit: {
            type: GraphQLInt,
            defaultValue: 10
        },
        offset: {
            type: GraphQLInt,
            defaultValue: 0
        }
    })
});


module.exports = {directionEnumType, paginationInputType};