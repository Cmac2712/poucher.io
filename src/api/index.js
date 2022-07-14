import { ApolloServer, gql } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
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

const server = new ApolloServer({
  typeDefs,
  resolvers,

  // By default, the GraphQL Playground interface and GraphQL introspection
  // is disabled in "production" (i.e. when `process.env.NODE_ENV` is `production`).
  //
  // If you'd like to have GraphQL Playground and introspection enabled in production,
  // the `playground` and `introspection` options must be set explicitly to `true`.
  playground: true,
  introspection: true
});

export default server.createHandler();