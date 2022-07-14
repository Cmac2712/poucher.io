import { ApolloServer, gql } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import express from 'express';
import http from 'http';
import { v4 as uuidv4 } from 'uuid';

const typeDefs = gql`
  type Bookmark {
    id: ID!
    title: String
    url: String
  }

  input BookmarkInput {
    title: String
    url: String
  }

  type Query {
    bookmarks: [Bookmark]
  }

  type Mutation {
    addBookmark(bookmark: BookmarkInput): Bookmark 
    deleteBookmark(id: ID!): ID 
  }
`
  
var bookmarks = [
  {
    id: '1',
    title: 'Random Image',
    url: 'https://picsum.photos/200/300'
  },
  {
    id: '2',
    title: 'Random Article',
    url: 'https://www.random.org/',
  },
  {
    id: '3',
    title: 'Random Image 2',
    url: 'https://picsum.photos/200/300'
  }
];

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    bookmarks: async () => {
      return bookmarks
    }
  }
  ,
  Mutation: {
    addBookmark: (root, { bookmark }) => {
      bookmarks.push(
        {
          id: uuidv4(),
          ...bookmark
        }
      );
      return bookmark;
    },
    deleteBookmark: (root, { id } ) => {
      bookmarks = bookmarks.filter(bookmark => bookmark.id !== id);
      return id
    }
  } 
};


async function startApolloServer(typeDefs, resolvers) {
  const app = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    cache: 'bounded',
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();

  server.applyMiddleware({ app });

  await new Promise(resolve => httpServer.listen({ port: 4000 }, resolve));

  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}