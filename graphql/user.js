const {GraphQLInt, GraphQLString} = require("graphql");
const {UserTypeDef} = require('../typedefs');
const UserModel = new (require('../models/user'));
const User = require('../controllers/user');

const userQueries = {
    user: {
        type: UserTypeDef,
        args: {
            id: {type: GraphQLInt}
        },
        resolve: async (_, args) => {
            return await UserModel.getUserById(args.id)
                .then((res) => {
                    return new User(res);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    },
};


const userMutations = {
    setUser: {
        type: UserTypeDef,
        args: {
            username: {type: GraphQLString},
            email: {type: GraphQLString}
        },
        resolve: async (_, args) => {
            return await UserModel.setUser(args)
                .then((res) => {
                    return new User(res);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }
}

module.exports = {
    userQueries,
    userMutations
};