const {
    GraphQLEnumType,
    GraphQLInputObjectType,
    GraphQLNonNull,
    GraphQLString,
    GraphQLFloat,
    GraphQLInt, GraphQLList
} = require("graphql");
const {directionEnumType} = require('./common');

const operators = new GraphQLInputObjectType({
    name: "OrderFilterOperators",
    fields: () => ({
        OR: {type: operators},
        AND: {type: operators},
    })
});

const orderFilterFieldEnum = new GraphQLEnumType({
    name: "OrderFilterFieldEnum",
    values: {
        /*        AMOUNT: {value: 'amount'},
                CREATED_AT: {value: 'created_at'},
                TRACKING_NUMBER: {type: GraphQLInt},
                AMOUNT: {type: GraphQLFloat},
                CREATED_AT: {type: GraphQLString},*/
        EQ: {value: 'eq'},
        GT: {value: 'gt'},
        LT: {value: 'lt'},
    }
});

let orderFilterInputTypes = new GraphQLInputObjectType({
    name: "OrderFilters",
    fields: () => ({
        EQ: {type: GraphQLString},
        GT: {type: GraphQLString},
        LT: {type: GraphQLString},
        OR: {type: new GraphQLList(orderFilterInputTypes)},
        AND: {type: new GraphQLList(orderFilterInputTypes)},
        amount: {type: new GraphQLList(orderFilterInputTypes)},
        created_at: {type: new GraphQLList(orderFilterInputTypes)},
    })
});

let orderFilterInputType = new GraphQLInputObjectType({
    name: "OrderFilter",
    fields: () => ({
        OR: {type: new GraphQLList(orderFilterInputTypes)},
        AND: {type: new GraphQLList(orderFilterInputTypes)},
        /*direction: {type: new GraphQLNonNull(directionEnumType)}*/
    })
});

const orderSortFieldEnum = new GraphQLEnumType({
    name: "OrderSortFieldEnum",
    values: {
        AMOUNT: {value: 'amount'},
        CREATED_AT: {value: 'created_at'},
    }
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