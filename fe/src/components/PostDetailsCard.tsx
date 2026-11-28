import { useEffect, useState } from 'react';
import { api } from '../App';
import { Card, Button } from "@heroui/react";
import PostEditModal from '../components/PostEditModal';
import PostDeleteModal from '../components/PostDeleteModal';
import edited from '../assets/edit.svg';

interface PostDetailsProps {
    id: number;
    title: string;
    description: string;
    created_at: Date;
    is_edited: boolean;
    creator_id: number;
}

function dateToString(date: Date) {
    return new Date(date).toLocaleDateString("LT")
}

function PostDetailsCard({
    id,
    title,
    description,
    created_at,
    is_edited,
    creator_id,
}: PostDetailsProps) {
    const [username, setUsername] = useState("");
    const [isPostEditModalShown, setIsPostEditModalShown] = useState(false);
    const [isPostDeleteModalShown, setIsPostDeleteModalShown] = useState(false);

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
        <div className="w-full flex justify-center">
            <Card className="max-w-5xl w-full border-1 border-solid border-secondary">
                <Card.Header>
                    <div className="flex flex-col gap-3 sm:grid sm:grid-cols-12 w-full">
                        <div className="flex sm:col-span-10 grid grid-rows-3 gap-0 min-w-0">
                            <div className="flex flex-row items-left justify-left gap-x-2">
                                <Card.Title className="text-xl text-primary font-bold">• {username}</Card.Title>
                            </div>
                            <Card.Description className="text-xl text-primary">
                                <div className="flex flex-wrap gap-2 items-left justify-left">
                                    <p>Created at: {dateToString(created_at)}</p>
                                    {is_edited && (
                                        <div className='grid grid-cols-2'>
                                            <p>•</p>
                                            <img src={edited} width={20}/>
                                        </div>
                                    )}
                                </div>
                            </Card.Description>
                            <div>
                                <h1 className="text-2xl md:text-3xl font-bold break-words">{title}</h1>
                            </div>
                        </div>

                        <div className="flex sm:col-span-2 sm:justify-end">
                            <Card.Title className='flex items-right justify-right sm:mb-3'>
                                <div className="flex gap-2">
                                    <Button
                                        size="lg"
                                        onClick={() => setIsPostEditModalShown(true)}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="danger-soft"
                                        size="lg"
                                        onClick={() => setIsPostDeleteModalShown(true)}
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </Card.Title>
                        </div>
                    </div>
                </Card.Header>
                <Card.Content>
                    <div className="max-w-5xl text-xl break-words">
                        <p>{description}</p>
                    </div>
                </Card.Content>
            </Card>

            {isPostEditModalShown && (
                <PostEditModal
                    isOpen={isPostEditModalShown}
                    setIsOpen={setIsPostEditModalShown}
                    id={id}
                    title={title}
                    description={description}
                >
                </PostEditModal>
            )}
            {isPostDeleteModalShown && (
                <PostDeleteModal
                    isOpen={isPostDeleteModalShown}
                    setIsOpen={setIsPostDeleteModalShown}
                    id={id}
                >
                </PostDeleteModal>
            )}
        </div>
    );
}
export default PostDetailsCard;