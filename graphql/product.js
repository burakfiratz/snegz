const {GraphQLInt, GraphQLString, GraphQLFloat, GraphQLList, GraphQLNonNull} = require("graphql");
const {ProductTypeDef} = require('../typedefs');
const ProductModel = new (require('../models/product'));
const Product = require('../controllers/product');

const productQueries = {
    product: {
        description: "Get product entities by product id",
        type: ProductTypeDef,
        args: {
            productId: {type: new GraphQLNonNull(GraphQLInt)}
        },
        resolve: async (_, args) => {
            return await ProductModel.getProductById(args.productId)
                .then((res) => {
                    return new Product(res);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    },
    products: {
        description: "Get all products entities",
        type: new GraphQLList(ProductTypeDef),
        //TODO: add sorting, filtering, paging

        /*        args: {
                    id: {type: GraphQLInt}
                },*/
        resolve: async (_, args) => {
            return await ProductModel.getProducts(args)
                .then((products) => {
                    return products.map(product => {
                        return new Product(product);
                    })
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    },
}

const productMutations = {
    setProduct: {
        description: "Create a new product to user",
        type: ProductTypeDef,
        args: {
            userId: {type: new GraphQLNonNull(GraphQLInt)},
            name: {type: new GraphQLNonNull(GraphQLString)},
            description: {type: new GraphQLNonNull(GraphQLString)},
            price: {type: new GraphQLNonNull(GraphQLFloat)},
            stock: {type: new GraphQLNonNull(GraphQLInt)}
        },
        resolve: async (_, args) => {
            return await ProductModel.setProduct(args)
                .then((res) => {
                    return new Product(res);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    },
}

module.exports = {
    productQueries,
    productMutations
};