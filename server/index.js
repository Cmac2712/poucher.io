const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
  type Bookmark {
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
  }
`
  
const bookmarks = [
  {
    title: 'Random Image',
    url: 'https://picsum.photos/200/300'
  },
  {
    title: 'Random Article',
    url: 'https://www.random.org/',
  },
  {
    title: 'Random Image 2',
    url: 'https://picsum.photos/200/300'
  }
];

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    bookmarks: () => bookmarks,
  }
  ,
  Mutation: {
    addBookmark: (root, args) => {
      bookmarks.push(args.bookmark);
      return args.bookmark;
    }
  } 
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
