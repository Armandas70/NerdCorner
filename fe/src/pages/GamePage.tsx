import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../App';
import { Button } from '@heroui/react';
import Header from '../components/Header';
import GameHeader from '../components/GameHeader';
import PostCard from '../components/PostCard';
import SideBar from '../components/SideBar';
import PostAddModal from '../components/PostAddModal';
import Footer from '../components/Footer';

interface Game {
    id: number;
    title: string;
    description: string;
    created_at: Date;
}

interface Post {
    id: number;
    title: string;
    description: string;
    created_at: Date;
    is_edited: boolean;
    creator_id: number;
    game_id: number;
}

function GamePage() {
    const { gameId } = useParams();
    const navigate = useNavigate();
    const [game, setGame] = useState<Game>();
    const [posts, setPosts] = useState<Post[]>([]);
    const [isPostAddModalShown, setIsPostAddModalShown] = useState(false);

    useEffect(() => {
        fetch(`${api}/games/${gameId}`)
            .then((res) => {
                if (res.status != 200) {
                    return // show not found
                }
                return res.json();
            })
            .then((json) => {
                //console.log("data: ", data);
                if (json) setGame(json.data);
            })

        fetch(`${api}/games/${gameId}/posts`)
            .then((res) => res.json())
            .then((json) => {
                //console.log("data: ", data);
                if (json) {
                    console.log("JSON posts: ", json)
                    setPosts(json.data);
                }
            })
    }, []);

    return (
        <div className="pb-14">
            <div className='mb-5'>
                <Header></Header>
                {game && (
                    <GameHeader id={game.id} title={game.title} description={game.description} created_at={game.created_at}></GameHeader>
                )}
            </div>

            <div className="flex flex-col gap-6 px-4 md:px-0 md:grid md:grid-cols-[20rem_minmax(0,1fr)] md:gap-8 xl:gap-12 2xl:grid-cols-[20rem_minmax(0,1fr)_20rem]">
                <aside className="hidden md:block md:min-w-xs min-h-5xl float-left sticky">
                    <SideBar></SideBar>
                </aside>

                <div className="grid flex-1 min-w-0 content-start">
                    <div className="mb-3 w-full max-w-5xl mx-auto">
                        <Button size='lg' onClick={() => setIsPostAddModalShown(true)}>
                            + Create post
                        </Button>
                    </div>

                    <div className="grid justify-center grid-cols-1">
                        {posts.filter(p => gameId ? p.game_id === parseInt(gameId) : p).map((post) => (
                            <div key={post.id} className='flex mb-3 justify-center hover:animate-pulse' onClick={() => navigate(`/games/${gameId}/posts/${post.id}`)}>
                                <PostCard key={post.id} title={post.title} description={post.description}
                                    created_at={post.created_at} is_edited={post.is_edited} creator_id={post.creator_id}>
                                </PostCard>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {isPostAddModalShown && game && (
                <PostAddModal
                    isOpen={isPostAddModalShown}
                    setIsOpen={setIsPostAddModalShown}
                    gameId={game.id}
                >
                </PostAddModal>
            )}

            <Footer></Footer>
        </div>
    )
}

export default GamePage
