import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";
import './index.css'

const client = new ApolloClient({ 
  uri: 'http://localhost:4000/api/graphql',
  cache: new InMemoryCache()
});

ReactDOM
  .createRoot(document.getElementById('root')!)
  .render(
    <React.StrictMode>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </React.StrictMode>
  )
