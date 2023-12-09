const graphql = require('graphql');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt
} = graphql;

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: {
        id: {
            type:GraphQLString
        },
        firstName: {
            type: GraphQLString
        },
        age: {
            type: GraphQLInt
        } 
    }
});

// added new query for fetching user data
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: {id: {type: GraphQLString}},
            // parent value => not ever being use ever
            // args => which we pass (arguments) (id)
            resolve(parentValue, args){ // this method actually grab out the data

            }
        }
    }
})