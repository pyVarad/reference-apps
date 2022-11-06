import {
    GraphQLInt,
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
} from 'graphql'
import axios from 'axios'

const HOST = process.env.API_HOST

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        age: { type: GraphQLInt },
    }),
})

const query = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: () => ({
        user: {
            type: UserType,
            args: { id: { type: GraphQLString } },
            resolve(parentArgs, args) {
                return axios
                    .get(`${HOST}/users/${args.id}`)
                    .then((response) => response.data)
            },
        },
    }),
})

export default new GraphQLSchema({
    query,
})
