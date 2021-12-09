const {GraphQLString} = require("graphql");
const connection = require("./../../db/dao");
const User = require("./../../entity/user");
const userType = require('./typedef');

const userMutations = {
    setUser: {
        type: userType,
        args: {
            username: {type: GraphQLString},
            email: {type: GraphQLString}
        },
        resolve: async (_, args) => {
            return await connection.run('INSERT INTO users (username, email) VALUES (?,?)', [args.username, args.email]).then(async result => {
                console.log(result.lastID);
                return await connection.get('SELECT * FROM users WHERE id=?', [result.lastID]).then(result => {
                    console.log(result);
                    console.log(new User(result));
                    return new User(result);
                });
            });
        }
    }
}

module.exports = userMutations;