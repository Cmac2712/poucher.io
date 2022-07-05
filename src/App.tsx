import logo from './logo.svg'
import './app.css'
import { Bookmarks } from './components/Bookmarks'
import { AddBookmark } from './components/AddBookmark'

import { gql, useQuery } from '@apollo/client'

const HELLO_WORLD = gql`
  query HelloWorld {
    hello
  }
`

function App() {

  const { loading, error, data } = useQuery(HELLO_WORLD)

  if (loading) return <p>Loading...</p>

  if (error) return <p>error</p>

  return (
    <div>
      <h1 className={`text-2xl text-center font-bold text-zinc-700`}>Hello, my name is Craig and this is my app</h1>  
      { data }
      {/* <Bookmarks />
      <AddBookmark /> */}
    </div>
  )
}

export default App
