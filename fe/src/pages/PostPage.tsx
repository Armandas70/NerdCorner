import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../App';
import Header from '../components/Header';
import GameHeader from '../components/GameHeader';
import CommentCard from '../components/CommentCard';
import PostDetailsCard from '../components/PostDetailsCard';
import SideBar from '../components/SideBar';

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

interface Comment {
    id: number;
    content: string;
    created_at: Date;
    is_edited: boolean;
    creator_id: number;
    post_id: number;
}

function PostPage() {
    const { gameId, postId } = useParams();
    const [game, setGame] = useState<Game>();
    const [post, setPost] = useState<Post>();
    const [comments, setComments] = useState<Comment[]>([]);
    const [commentsCount, setCommentsCount] = useState(0);

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

        fetch(`${api}/games/${gameId}/posts/${postId}/comments`)
            .then((res) => res.json())
            .then((json) => {
                //console.log("json: ", json);
                if (json) {
                    setPost(json.post);
                    setComments(json.comments);
                    setCommentsCount(json.commentsCount);
                }
            })
    }, []);

    return (
        <div>
            <div className='mb-5'>
                <Header></Header>
                {game && (
                    <GameHeader title={game.title} description={game.description} created_at={game.created_at}></GameHeader>
                )}
            </div>

            <div className="flex flex-row gap-40">
                <aside className="block min-w-xs min-h-5xl float-left sticky">
                    <SideBar ></SideBar>
                </aside>

                <div>
                    <div className='flex justify-center mb-5'>
                        {post && (
                            <PostDetailsCard title={post.title} description={post.description} created_at={post.created_at}
                                is_edited={post.is_edited} creator_id={post.creator_id}>
                            </PostDetailsCard>
                        )}
                    </div>

                    <div className='flex mb-2 text-lg text-primary font-bold'>
                        Comments: {commentsCount}
                    </div>

                    <div className="grid justify-center grid-cols-1">
                        {comments.map((comment) => (
                            <div className='flex mb-3 justify-center'>
                                <CommentCard key={comment.id} content={comment.content} created_at={comment.created_at}
                                    is_edited={comment.is_edited} creator_id={comment.creator_id}>
                                </CommentCard>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default PostPage
