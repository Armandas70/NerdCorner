import { useState } from 'react';
import Header from '../components/Header';
import GameHeader from '../components/GameHeader';
import PostCard from '../components/PostCard';


function GamePage() {

    const [title, setTitle] = useState("Persona 5");
    const [description, setDescription] = useState("This is a place to talk about the most stylistic game OAT");
    const [createdAt, setCreatedAt] = useState("2026-09-20");

    const [pCreator, setPCreator] = useState("Vegeta64");
    const [pTitle, setPTitle] = useState("This game is awesome");
    const [pDescription, setPDescription] = useState("I love this game, how about yall?");
    const [pCreatedAt, setPCreatedAt] = useState("2026-09-20");
    const [pIsEdited, setPIsEdited] = useState(true);

    const post = {
        id: 0, creator: pCreator, title: pTitle, description: pDescription, createdAt: pCreatedAt, isEdited: pIsEdited
    }
    const [posts, setPosts] = useState([post, post, post]);

    return (
        <div>
            <div className='mb-5'>
                <Header></Header>
                <GameHeader title={title} description={description} createdAt={createdAt}></GameHeader>
            </div>
            <div className="grid justify-center grid-cols-1">
                {posts.map((post) => (
                    <div className='flex mb-3 justify-center'>
                        <PostCard key={post.id} creator={post.creator} title={post.title}
                            description={post.description} createdAt={post.createdAt} isEdited={post.isEdited}>
                        </PostCard>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default GamePage
