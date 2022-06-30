import { useState } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";

const GET_BOOKMARKS = gql`
  query GetBookmarks {
    bookmarks {
      id
      title
      url
    }
  }
`

const DELETE_BOOKMARK_MUTATION = gql`
  mutation DELETE_BOOKMARK($id: ID!) {
    deleteBookmark(id: $id)
  }
`

export interface Bookmark {
    id: string
    title: string
    url: string
}

export const Bookmarks = () => {
    const { loading, error, data } = useQuery<{
        bookmarks: Bookmark[]
    }>(GET_BOOKMARKS)

    if (loading) return <p>Loading...</p>;

    if (error) return <p>Error :(</p>;

    return (
        <ul>
            {data?.bookmarks?.map(bookmark => (
                <li key={bookmark.id}>
                  {bookmark.title} - {bookmark.url}
                  <DeleteBookmark
                    id={bookmark.id}
                  />
                </li>
            ))}
        </ul>
    );
}

const DeleteBookmark = (
    { id }: { id: string }
) => {

  const [deleteBookmark, { loading, error, data }] = useMutation(DELETE_BOOKMARK_MUTATION, {
        refetchQueries: () => [
            { query: GET_BOOKMARKS },
            'bookmarks'
        ]
    })

    const [deleted, setDeleted] = useState<String[]>([])

  return (
    <button 
      onClick={async (e) => {
        e.preventDefault()
        setDeleted([...deleted, id])
        deleteBookmark({ variables: { 
          id 
        } })
      }}
    >
      delete
    </button>
  )
}

export { GET_BOOKMARKS }