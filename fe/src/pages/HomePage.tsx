import { useEffect, useState } from 'react';
import { api } from '../App';
import { useNavigate } from 'react-router-dom';
import GameCard from '../components/GameCard';
import Header from '../components/Header';
import SideBar from '../components/SideBar';
import HomeHeader from '../components/HomeHeader';

interface Game {
  id: number;
  title: string;
  description: string;
  created_at: Date;
}

function HomePage() {
  const navigate = useNavigate();
  const [games, setGames] = useState<Game[]>([]);
  const [filterText, setFilterText] = useState("");

  useEffect(() => {
    if (filterText) {
      fetch(`${api}/games?title=${filterText}`)
        .then((res) => res?.json())
        .then((json) => {
          setGames(json?.data)
        })
    } else {
      fetch(`${api}/games`)
        .then((res) => res?.json())
        .then((json) => {
          setGames(json?.data)
        })
    }
  }, [filterText]);

  return (
    <div>
      <div className='mb-5'>
        <HomeHeader filterText={filterText} setFilterText={setFilterText}></HomeHeader>
      </div>

      <div className="flex flex-row gap-40">
        <aside className="block min-w-xs min-h-5xl float-left sticky">
          <SideBar></SideBar>
        </aside>

        <div className="grid grid-cols-1 justify-center">
          {games.map((game) => (
            <div className='flex mb-3 justify-center' onClick={() => navigate(`/games/${game.id}`)}>
              <GameCard key={game.id} title={game.title} description={game.description} created_at={game.created_at}></GameCard>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

export default HomePage
