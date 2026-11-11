import { useState } from 'react';
import GameCard from '../components/GameCard';
import Header from '../components/Header';
import SideBar from '../components/SideBar';

function HomePage() {

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

      <div className="flex flex-row gap-40">
        <aside className="block min-w-xs min-h-5xl float-left sticky">
          <SideBar></SideBar>
        </aside>

        <div className="grid grid-cols-1 justify-center">
          {games.map((game) => (
            <div className='flex mb-3 justify-center'>
              <GameCard key={game.id} title={game.title} description={game.description} createdAt={game.createdAt}></GameCard>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

export default HomePage
