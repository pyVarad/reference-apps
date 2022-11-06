import express from 'express'
import { graphqlHTTP } from 'express-graphql'
import schema from './schema/schema'
import dotenv from 'dotenv';

const app = express()
const expressGraphQL = graphqlHTTP

if (process.env.NODE_ENV !== 'production') {
    dotenv.config()
}

const port = process.env.PORT

app.use(
    '/graphql',
    expressGraphQL({
        schema,
        graphiql: true,
    })
)

app.listen(port, () => {
    console.log(`Started the server on port ${port}.`)
})
