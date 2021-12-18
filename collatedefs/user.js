const {GraphQLEnumType, GraphQLInputObjectType, GraphQLNonNull} = require("graphql");
const {directionEnumType} = require('./common');
const userSortFieldEnum = new GraphQLEnumType({
    name: "UserSortFieldEnum",
    values: {
        CREATED_AT: {value: 'created_at'},
    }
});

let userSortInputType = new GraphQLInputObjectType({
    name: "UserSort",
    fields: () => ({
        field: {
            type: new GraphQLNonNull(userSortFieldEnum),
        },
        direction: {
            type: new GraphQLNonNull(directionEnumType)
        }
    })
});

module.exports = {
    userSortInputType
};