const {GraphQLEnumType} = require("graphql");
const directionEnumType = new GraphQLEnumType({
    name: 'DirectionEnum',
    values: {
        ASC: {value: "ASC"},
        DESC: {value: "DESC"},
    }
})

module.exports = {directionEnumType};