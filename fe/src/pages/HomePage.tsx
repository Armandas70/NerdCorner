import { useEffect, useState } from 'react';
import { api } from '../App';
import { useNavigate } from 'react-router-dom';
import GameCard from '../components/GameCard';
import Pages from '../components/Pages';
import SideBar from '../components/SideBar';
import HomeHeader from '../components/HomeHeader';
import Footer from '../components/Footer';

interface Game {
  id: number;
  title: string;
  description: string;
  created_at: Date;
}

function HomePage() {
  const elementsInPage = 5;
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();
  const [games, setGames] = useState<Game[]>([]);
  const [filterText, setFilterText] = useState("");
  const [filterDate, setFilterDate] = useState("0001-01-01");

  useEffect(() => {
    function getTotalPages(page: number) {
      fetch(`${api}/games?page=${page}&title=${filterText}&created_at=${filterDate}`)
        .then((res) => res?.json())
        .then((json) => {
          if (json?.data?.length === elementsInPage) {

            fetch(json?.links?.next)
              .then((res) => res?.json())
              .then((json) => {
                if (json?.data?.length > 0) {
                  getTotalPages(page + 1);
                } else {
                  setTotalPages(page);
                }
              })

          } else {
            setTotalPages(page);
          }
        })
    }
    getTotalPages(1);

    fetch(`${api}/games?page=${page}&title=${filterText}&created_at=${filterDate}`)
      .then((res) => res?.json())
      .then((json) => {
        setGames(json?.data)
      })
  }, [filterText, filterDate, page]);

  return (
    <div>
      <div className='mb-5'>
        <HomeHeader 
          filterText={filterText} 
          setFilterText={setFilterText} 
          filterDate={filterDate}
          setFilterDate={setFilterDate}
      >
      </HomeHeader>
      </div>

      <div className="flex flex-row gap-40">
        <aside className="block min-w-xs min-h-5xl float-left sticky">
          <SideBar></SideBar>
        </aside>

        <div className="grid grid-cols-1 justify-center">
          {games.map((game) => (
            <div key={game.id} className='flex mb-3 justify-center hover:animate-pulse' onClick={() => navigate(`/games/${game.id}`)}>
              <GameCard key={game.id} title={game.title} description={game.description} created_at={game.created_at}></GameCard>
            </div>
          ))}
        </div>
      </div>

      <Pages page={page} setPage={setPage} totalPages={totalPages}></Pages>
      <Footer></Footer>
    </div>
  )
}

export default HomePage
