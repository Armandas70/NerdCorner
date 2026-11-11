import { useState } from 'react';
import Header from '../components/Header';
import GameHeader from '../components/GameHeader';
import CommentCard from '../components/CommentCard';
import PostDetailsCard from '../components/PostDetailsCard';

function PostPage() {
    const [title, setTitle] = useState("Persona 5");
    const [description, setDescription] = useState("This is a place to talk about the most stylistic game OAT");
    const [createdAt, setCreatedAt] = useState("2026-09-20");

    const [pCreator, setPCreator] = useState("Vegeta64");
    const [pTitle, setPTitle] = useState("This game is awesome");
    const [pDescription, setPDescription] = useState("I love this game, how about yall?");
    const [pCreatedAt, setPCreatedAt] = useState("2026-09-20");
    const [pIsEdited, setPIsEdited] = useState(true);

    const [cCreator, setCCreator] = useState("TheRealGoku");
    const [cContent, setCContent] = useState("I like it too :)");
    const [cCreatedAt, setCCreatedAt] = useState("2026-09-20");
    const [cIsEdited, setCIsEdited] = useState(true);


    const comment = {
        id: 0, creator: cCreator, content: cContent, createdAt: cCreatedAt, isEdited: cIsEdited
    }
    const [comments, setComments] = useState([comment, comment, comment, comment]);

    return (
        <div>
            <div className='mb-5'>
                <Header></Header>
                <GameHeader title={title} description={description} createdAt={createdAt}></GameHeader>
            </div>

            <div className='flex justify-center mb-5'>
                <PostDetailsCard creator={pCreator} title={pTitle} description={pDescription}
                    createdAt={pCreatedAt} isEdited={pIsEdited}>
                </PostDetailsCard>
            </div>

            <div className="grid justify-center grid-cols-1">
                {comments.map((comment) => (
                    <div className='flex mb-3 justify-center'>
                        <CommentCard key={comment.id} creator={comment.creator} content={comment.content}
                            createdAt={comment.createdAt} isEdited={comment.isEdited}>
                        </CommentCard>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PostPage
