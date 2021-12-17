const {GraphQLInt, GraphQLString, GraphQLFloat, GraphQLList} = require("graphql");
const {ProductTypeDef} = require('../typedefs');
const ProductModel = new (require('../models/product'));
const Product = require('../controllers/product');

const productQueries = {
    product: {
        description: "Get product entities by product id",
        type: ProductTypeDef,
        args: {
            id: {type: GraphQLInt}
        },
        resolve: async (_, args) => {
            return await ProductModel.getProductById(args.id)
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
                .then((res) => {
                    return res.map(product => {
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
            user_id: {type: GraphQLInt},
            name: {type: GraphQLString},
            description: {type: GraphQLString},
            price: {type: GraphQLFloat},
            stock: {type: GraphQLInt}
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