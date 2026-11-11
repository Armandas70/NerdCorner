import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import GamePage from './pages/GamePage'
import PostPage from './pages/PostPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="game/:gameId" element={<GamePage />} />
      <Route path="game/:gameId/post/:postId" element={<PostPage />} />
      {/* <Route path="game/:gameId" element={<GamePage />}>
        <Route path="post/:postId" element={<PostPage />} />
      </Route> */}
    </Routes>
  )
}
export default App
