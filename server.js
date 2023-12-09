const express = require('express');
const expressGraphQLAdaptor = require('express-graphql').graphqlHTTP;

const app = express();

app.use('/graphql', expressGraphQLAdaptor({
    graphiql: true
}));

app.listen(4000, ()=> {
    console.log("Listening at port 4000");
})