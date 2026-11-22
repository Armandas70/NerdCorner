import { useEffect, useState } from 'react';
import { api } from '../App';
import { Card, Button } from "@heroui/react";
import PostEditModal from '../components/PostEditModal';
import PostDeleteModal from '../components/PostDeleteModal';

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
        <div>
            <Card className="max-w-5xl w-full border-1 border-solid border-secondary">
                <Card.Header>
                    <div className="grid grid-cols-12">
                        <div className="flex col-span-10 grid grid-rows-3 gap-0">
                            <div className="flex flex-row items-left justify-left w-1/2 gap-x-2">
                                <Card.Title className="text-xl text-primary font-bold">• {username}</Card.Title>
                            </div>
                            <Card.Description className="text-xl text-primary">
                                <div className="flex gap-2 items-left justify-left">
                                    <p>Created at: {dateToString(created_at)}</p>
                                    {is_edited && <p>• Edited</p>}
                                </div>
                            </Card.Description>
                            <div>
                                <h1 className="text-3xl font-bold">{title}</h1>
                            </div>
                        </div>

                        <div className="flex col-span-2">
                            <Card.Title className='flex items-right justify-right mb-3'>
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
                    <div className="min-w-xl max-w-5xl text-xl">
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