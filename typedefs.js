const {GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLFloat, GraphQLList} = require("graphql");
const ProductModel = new (require("./models/product"));
const UserModel = new (require("./models/user"));
const OrderModel = new (require("./models/order"));

const Order = require("./controllers/order");
const Product = require("./controllers/product");

const ProductTypeDef = new GraphQLObjectType({
    name: 'Product',
    description: 'Product typedef',
    fields: () => ({
        id: {type: GraphQLInt},
        userId: {type: GraphQLString},
        name: {type: GraphQLString},
        description: {type: GraphQLString},
        price: {type: GraphQLFloat},
        stock: {type: GraphQLInt},
        createdAt: {type: GraphQLString},
        modifiedAt: {type: GraphQLString},
        deletedAt: {type: GraphQLString},
        user: {
            type: UserTypeDef,
            resolve: async (parent) => {
                return await UserModel.getUserById(parent.userId)
            }
        }
    })
});


const UserTypeDef = new GraphQLObjectType({
    name: 'User',
    description: 'User typedef',
    fields: () => ({
        id: {type: GraphQLInt},
        username: {type: GraphQLString},
        email: {type: GraphQLString},
        createdAt: {type: GraphQLString},
        products: {
            type: new GraphQLList(ProductTypeDef),
            resolve: async (parent) => {
                return await ProductModel.getUserProducts(parent.id)
                    .then(result => {
                        return result.map(product => {
                            return new Product(product);
                        })
                    }).catch((err) => {
                        console.log(err);
                    });
            }
        },
        orders: {
            type: new GraphQLList(OrderTypeDef),
            resolve: async (parent) => {
                return await OrderModel.getUserOrders(parent.id)
                    .then(result => {
                        return result.map(order => {
                            console.log(order);
                            return new Order(order);
                        })
                    }).catch((err) => {
                        console.log(err);
                    });
            }
        }
    })
});

const OrderTypeDef = new GraphQLObjectType({
    name: 'Order',
    description: 'Order typedef',
    fields: () => ({
        id: {type: GraphQLInt},
        userId: {type: GraphQLInt},
        amount: {type: GraphQLFloat},
        createdAt: {type: GraphQLString},
        trackingNumber: {type: GraphQLInt},
        user: {
            type: UserTypeDef,
            resolve: async (parent) => {
                return await UserModel.getUserById(parent.userId)
            }
        }

    })
});

module.exports = {
    ProductTypeDef,
    UserTypeDef,
    OrderTypeDef
};
