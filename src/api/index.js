import { ApolloServer, gql } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import http from "http";
import express from "express";
import cors from "cors";
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
          id: uuid(),
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

const app = express();
app.use(cors());
app.use(express.json());
const httpServer = http.createServer(app);

const startApolloServer = async(app, httpServer) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();
  server.applyMiddleware({ app });
}

startApolloServer(app, httpServer);

export default httpServer;