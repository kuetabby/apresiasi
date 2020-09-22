import "./react-devtools-hook"
import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import * as serviceWorker from "./serviceWorker"
import { ThemeProvider } from "@chakra-ui/core"
import Cookie from "js-cookie"

import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client"
import { setContext } from "@apollo/client/link/context"

// Instantiate required constructor fields
const cache = new InMemoryCache()
const link = createHttpLink({
    uri: "http://localhost:3001/graphql"
})

const authMiddleware = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = Cookie.get("token") || ""
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            authorization: token ? `${token}` : ""
        }
    }
})

const client = new ApolloClient({
    // Provide required constructor fields
    cache: cache,
    link: authMiddleware.concat(link),

    // Provide some optional constructor fields
    name: "react-web-client",
    version: "1.3",
    queryDeduplication: false,
    defaultOptions: {
        watchQuery: {
            fetchPolicy: "cache-and-network"
        }
    }
})

ReactDOM.render(
    <ThemeProvider>
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    </ThemeProvider>,
    document.getElementById("root")
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register()
