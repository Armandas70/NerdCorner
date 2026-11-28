import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../App';
import { Button } from '@heroui/react';
import Header from '../components/Header';
import GameHeader from '../components/GameHeader';
import CommentCard from '../components/CommentCard';
import PostDetailsCard from '../components/PostDetailsCard';
import SideBar from '../components/SideBar';
import CommentAddModal from '../components/CommentAddModal';
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

    const [isCommentAddModalShown, setIsCommentAddModalShown] = useState(false)

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
        <div className="pb-14">
            <div className='mb-5'>
                <Header></Header>
                {game && (
                    <GameHeader id={game.id} title={game.title} description={game.description} created_at={game.created_at}></GameHeader>
                )}
            </div>

            <div className="flex flex-col gap-6 px-4 md:px-0 md:grid md:grid-cols-[20rem_minmax(0,1fr)] md:gap-8 xl:gap-12 2xl:grid-cols-[20rem_minmax(0,1fr)_20rem]">
                <aside className="hidden md:block md:min-w-xs min-h-5xl float-left sticky">
                    <SideBar ></SideBar>
                </aside>

                <div className="flex-1 min-w-0">
                    <div className='flex justify-center mb-5'>
                        {post && (
                            <PostDetailsCard id={post.id} title={post.title} description={post.description} 
                                created_at={post.created_at} is_edited={post.is_edited} creator_id={post.creator_id}>
                            </PostDetailsCard>
                        )}
                    </div>

                    <div className="flex items-center justify-between gap-2 mb-2 w-full max-w-5xl mx-auto">
                        <div className='flex text-lg text-primary font-bold'>
                            Comments: {commentsCount}
                        </div>
                        <div>
                            <Button size='lg' onClick={() => setIsCommentAddModalShown(true)}>
                                + Add comment
                            </Button>
                        </div>
                    </div>

                    <div className="grid justify-center grid-cols-1">
                        {comments.map((comment) => (
                            <div key={comment.id} className='flex mb-3 justify-center'>
                                <CommentCard key={comment.id} id={comment.id} content={comment.content} created_at={comment.created_at}
                                    is_edited={comment.is_edited} creator_id={comment.creator_id}>
                                </CommentCard>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {isCommentAddModalShown && post && (
                <CommentAddModal
                    isOpen={isCommentAddModalShown}
                    setIsOpen={setIsCommentAddModalShown}
                    postId={post.id}
                >
                </CommentAddModal>
            )}

            <Footer></Footer>
        </div>
    )
}

export default PostPage
