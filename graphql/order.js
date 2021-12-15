const {GraphQLInt, GraphQLFloat, GraphQLList} = require("graphql");
const {OrderTypeDef} = require('../typedefs');
const OrderModel = new (require('../models/order'));
const Order = require('../controllers/order');

const orderQueries = {
    order: {
        type: OrderTypeDef,
        args: {
            id: {type: GraphQLInt}
        },
        resolve: async (_, args) => {
            return await OrderModel.getOrderById(args.id)
                .then((res) => {
                    return new Order(res);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    },
    orders: {
        type: new GraphQLList(OrderTypeDef),
        resolve: async (_) => {
            return await OrderModel.getOrders()
                .then((res) => {
                    return res;
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }
};


const orderMutations = {
    setOrder: {
        type: OrderTypeDef,
        args: {
            user_id: {type: GraphQLInt},
            amount: {type: GraphQLFloat}
        },
        resolve: async (_, args) => {
            return await OrderModel.setOrder(args)
                .then((res) => {
                    return new Order(res);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }
}

module.exports = {
    orderQueries,
    orderMutations
};