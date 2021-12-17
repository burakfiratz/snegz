const {GraphQLInt, GraphQLString, GraphQLList, GraphQLNonNull} = require("graphql");
const {UserTypeDef} = require('../typedefs');
const UserModel = new (require('../models/user'));
const User = require('../controllers/user');

const userQueries = {
    user: {
        description: "Get user entities by user id",
        type: UserTypeDef,
        args: {
            userId: {type: new GraphQLNonNull(GraphQLInt)}
        },
        resolve: async (_, args) => {
            return await UserModel.getUserById(args.userId)
                .then((res) => {
                    return new User(res);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    },
    users: {
        description: "Get all users entities",
        type: new GraphQLList(UserTypeDef),
        //TODO: add sorting, filtering, paging
        /*args: {
            id: {type: GraphQLInt}
        },*/
        resolve: async (_, args) => {
            return await UserModel.getUsers(args)
                .then((res) => {
                    return res.map(user => {
                        return new User(user);
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    },
};


const userMutations = {
    setUser: {
        description: "Create a new user(username, e-mail)",
        type: UserTypeDef,
        args: {
            username: {type: new GraphQLNonNull(GraphQLString)},
            email: {type: new GraphQLNonNull(GraphQLString)}
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