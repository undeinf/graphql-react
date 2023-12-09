const graphql = require('graphql');
const axios = require('axios').default;

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} = graphql;

const CompanyType = new GraphQLObjectType({
    name: 'Company',
    // added closour to access the USerType otherwise
    // it will throw error
    fields: () => ({
        id: {
            type: GraphQLString
        },
        name: {
            type: GraphQLString
        },
        description: {
            type: GraphQLString
        },
        users: {
            type: new GraphQLList(UserType),
            resolve(parentValue, args){
                return axios.get(`http://localhost:3000/companies/${parentValue.id}/users`)
                    .then(res => res.data)
            }
        }
    })
})

const UserType = new GraphQLObjectType({
    name: 'User',
    // same with user
    fields: () => ({
        id: {
            type:GraphQLString
        },
        firstName: {
            type: GraphQLString
        },
        age: {
            type: GraphQLInt
        },
        company: {
            type: CompanyType,
            resolve(parentValue, args){
                // parent value will have the user object which we call in graphql
                return axios.get(`http://localhost:3000/companies/${parentValue.companyId}`)
                    .then(res => res.data)

            }
        }
    })
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
                return axios.get(`http://localhost:3000/users/${args.id}`)
                    .then(res => res.data);
            }
        },
        company: {
            type: CompanyType,
            args:{id: {type: GraphQLString}},
            resolve(parentValue, args){
                return axios.get(`http://localhost:3000/companies/${args.id}`)
                    .then(res => res.data);
            }
        }
    }
});

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUser: {
            type: UserType,
            args: {
                firstName: {type: new GraphQLNonNull(GraphQLString)},
                age: {type: new GraphQLNonNull(GraphQLInt)},
                companyId: {type: GraphQLString}
            },
            resolve(parentValue, args){
                const {age, firstName} = args
                return axios.post('http://localhost:3000/users', {
                    firstName,
                    age
                })
                .then(res => res.data)
            }
        },
        deleteUser: {
            type: UserType,
            args: {
                userId: {type: new GraphQLNonNull(GraphQLString)}
            },
            resolve(parentValue, {userId}){
                return axios.delete(`http://localhost:3000/users/${userId}`)
                    .then(res => res.data)
            }
        },
        editUser: {
            type: UserType,
            args: {
                userId: {type: new GraphQLNonNull(GraphQLString)},
                firstName: {type:  GraphQLString},
                age: {type:  GraphQLInt},
                companyId: {type: GraphQLString}
            },
            // patch - use when some properties needs to update
            // put - when you want to ooverride the existing object
            resolve(parentValue, {userId, firstName}){
                return axios.patch(`http://localhost:3000/users/${userId}`, args)
                .then(res => res.data)
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation
})