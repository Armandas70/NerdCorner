import { useState } from 'react';
import GameCard from './components/GameCard';
import Header from './components/Header';

function App() {

  const [title, setTitle] = useState("Persona 5");
  const [description, setDescription] = useState("This is a place to talk about the most stylistic game OAT");
  const [createdAt, setCreatedAt] = useState("2026-09-20");

  const game = {
    id: 0, title, description, createdAt
  }
  const [games, setGames] = useState([game, game, game]);

  return (
    <div>
      <div className='mb-5'>
        <Header></Header>
      </div>
      <div className="grid justify-center grid-cols-1">
        {games.map((game) => (
          <div className='flex mb-3 justify-center'>
            <GameCard key={game.id} title={game.title} description={game.description} createdAt={game.createdAt}></GameCard>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
