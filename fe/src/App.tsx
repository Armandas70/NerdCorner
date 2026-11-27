import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage'
import GamePage from './pages/GamePage'
import PostPage from './pages/PostPage'

export const api = import.meta.env.VITE_API_URL;

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="games/:gameId" element={<GamePage />} />
      <Route path="games/:gameId/posts/:postId" element={<PostPage />} />
    </Routes>
  )
}
export default App
