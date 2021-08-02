import React from 'react'
import ReactDOM from 'react-dom'
import App from './Blocks/App/App'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { getAccessToken } from './Tokens/accessToken'

const httpLink = createHttpLink({
  uri: 'http://localhost:9000/graphql',
  credentials: 'include',
})

const authLink = setContext((_, { headers }) => {
  const token = getAccessToken()
  console.log(token)
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `bearer ${token}` : '',
    },
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
