import { useQuery, gql } from "@apollo/client";

const BOOKMARKS = gql`
  query GetBookmarks {
    bookmarks {
      title
      url
    }
  }
`
export interface Bookmark {
    title: string
    url: string
}

export const Bookmarks = () => {
    const { loading, error, data } = useQuery<{
        bookmarks: Bookmark[]
    }>(BOOKMARKS)

    if (loading) return <p>Loading...</p>;

    if (error) return <p>Error :(</p>;

    return (
        <ul>
            {data?.bookmarks?.map(bookmark => (
                <li key={bookmark.url}>{bookmark.title} - {bookmark.url}</li>
            ))}
        </ul>
    );
}

export { BOOKMARKS }