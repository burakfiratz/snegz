const {
    GraphQLEnumType,
    GraphQLInputObjectType,
    GraphQLNonNull,
    GraphQLString,
    GraphQLFloat,
    GraphQLInt
} = require("graphql");
const {directionEnumType} = require('./common');
const orderSortFieldEnum = new GraphQLEnumType({
    name: "OrderSortFieldEnum",
    values: {
        AMOUNT: {value: 'amount'},
        CREATED_AT: {value: 'created_at'},
    }
});

let orderFilterInputType = new GraphQLInputObjectType({
    name: "OrderFilter",
    fields: () => ({
        TRACKING_NUMBER: {type: GraphQLInt},
        AMOUNT: {type: GraphQLFloat},
        CREATED_AT: {type: GraphQLString},
    })
});

let orderSortInputType = new GraphQLInputObjectType({
    name: "OrderSort",
    fields: () => ({
        field: {
            type: new GraphQLNonNull(orderSortFieldEnum),
        },
        direction: {
            type: new GraphQLNonNull(directionEnumType)
        }
    })
});

module.exports = {
    orderFilterInputType,
    orderSortInputType
};