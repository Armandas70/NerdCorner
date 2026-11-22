import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../App';
import { Button } from '@heroui/react';
import Header from '../components/Header';
import GameHeader from '../components/GameHeader';
import PostCard from '../components/PostCard';
import SideBar from '../components/SideBar';
import PostAddModal from '../components/PostAddModal';

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

    // const [pCreator, setPCreator] = useState("Vegeta64");
    // const [pTitle, setPTitle] = useState("This game is awesome");
    // const [pDescription, setPDescription] = useState("I love this game, how about yall?");
    // const [pCreatedAt, setPCreatedAt] = useState("2026-09-20");
    // const [pIsEdited, setPIsEdited] = useState(true);

    // const post = {
    //     id: 0, creator: pCreator, title: pTitle, description: pDescription, createdAt: pCreatedAt, isEdited: pIsEdited
    // }
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
        <div>
            <div className='mb-5'>
                <Header></Header>
                {game && (
                    <GameHeader id={game.id} title={game.title} description={game.description} created_at={game.created_at}></GameHeader>
                )}
            </div>

            <div className="flex flex-row gap-40">
                <aside className="block min-w-xs min-h-5xl float-left sticky">
                    <SideBar></SideBar>
                </aside>

                <div className="grid">
                    <div className="mb-3">
                        <Button size='lg' onClick={() => setIsPostAddModalShown(true)}>
                            + Create post
                        </Button>
                    </div>

                    <div className="grid justify-center grid-cols-1">
                        {posts.filter(p => gameId ? p.game_id === parseInt(gameId) : p).map((post) => (
                            <div className='flex mb-3 justify-center' onClick={() => navigate(`/games/${gameId}/posts/${post.id}`)}>
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

        </div>
    )
}

export default GamePage
