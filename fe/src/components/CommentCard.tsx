import { useEffect, useState } from 'react';
import { api } from '../App';
import { Card, Button } from "@heroui/react";
import CommentEditModal from './CommentEditModal';
import CommentDeleteModal from './CommentDeleteModal';
import edited from '../assets/edit.svg';

interface CommentCardProps {
    id: number;
    content: string;
    created_at: Date;
    is_edited: boolean;
    creator_id: number;
}

function dateToString(date: Date) {
    return new Date(date).toLocaleDateString("LT")
}

// Ideal CommentCard has classname="w-3xl"

function CommentCard({ id, content, created_at, is_edited, creator_id }: CommentCardProps) {
    const [username, setUsername] = useState("");
    const [isCommentEditModalShown, setIsCommentEditModalShown] = useState(false);
    const [isCommentDeleteModalShown, setIsCommentDeleteModalShown] = useState(false);

    useEffect(() => {
        fetch(`${api}/users/${creator_id}`)
            .then((res) => res.json())
            .then((json) => {
                if (json) {
                    console.log("json: ", json);
                    setUsername(json?.data?.username)
                }
            })
    }, []);

    return (
        <div>
            <Card className="w-5xl" variant="default">
                <Card.Header>
                    <div className="grid grid-cols-12">
                        <div className="flex col-span-10 grid grid-rows-1 gap-0">
                            <div className="flex flex-row items-left justify-left w-1/2 gap-x-2">
                                <Card.Title className="text-xl text-primary font-bold">• {username}</Card.Title>
                            </div>
                            <Card.Description className="text-xl text-primary">
                                <div className="flex gap-2 items-left justify-left">
                                    <p>Created at: {dateToString(created_at)}</p>
                                    {is_edited && (
                                        <div className='grid grid-cols-2'>
                                            <p>•</p>
                                            <img src={edited} width={20}/>
                                        </div>
                                    )}
                                </div>
                            </Card.Description>
                        </div>

                        <div className="flex col-span-2">
                            <Card.Title className='flex items-right justify-right mb-3'>
                                <div className="flex gap-2">
                                    <Button
                                        size="lg"
                                        onClick={() => setIsCommentEditModalShown(true)}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="danger-soft"
                                        size="lg"
                                        onClick={() => setIsCommentDeleteModalShown(true)}
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </Card.Title>
                        </div>
                    </div>
                </Card.Header>
                <Card.Content>
                    <p className="text-xl">{content}</p>
                </Card.Content>
            </Card>

            {isCommentEditModalShown && (
                <CommentEditModal 
                    isOpen={isCommentEditModalShown} 
                    setIsOpen={setIsCommentEditModalShown}
                    id={id}
                    content={content}
                >
                </CommentEditModal>
            )}
            {isCommentDeleteModalShown && (
                <CommentDeleteModal 
                    isOpen={isCommentDeleteModalShown} 
                    setIsOpen={setIsCommentDeleteModalShown}
                    id={id}
                >
                </CommentDeleteModal>
            )}

        </div>
    )
}

export default CommentCard
