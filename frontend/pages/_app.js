import '../styles/globals.css'

import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client'

const link = createHttpLink({
  uri: 'http://localhost:3000/admin/api',
  credentials: 'include'
});

export const client = new ApolloClient({
  ssrMode: true,
  link,
  cache: new InMemoryCache()
})

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />  
    </ApolloProvider> 
  )
}

export default MyApp
