let express = require('express');
let {graphqlHTTP} = require('express-graphql');

let schema = require('./schema');

let app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true,
}));
app.listen(3000);
console.log('Running a GraphQL API server at http://localhost:3000/graphql');

