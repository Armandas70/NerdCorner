import { useEffect, useState } from 'react';
import { api } from '../App';
import { Card } from "@heroui/react";
import edited from '../assets/edit.svg';

interface PostCardProps {
    title: string;
    description: string;
    created_at: Date;
    is_edited: boolean;
    creator_id: number;
}

function dateToString(date: Date) {
    return new Date(date).toLocaleDateString("LT")
}

function PostCard({ title, description, created_at, is_edited, creator_id }: PostCardProps) {
    const [username, setUsername] = useState("");

    useEffect(() => {
        fetch(`${api}/users/${creator_id}`)
            .then((res) => res.json())
            .then((json) => {
                //console.log("json: ", json);
                if (json) {
                    console.log("json: ", json);
                    setUsername(json?.data?.username)
                }
            })
    }, []);

    return (
        <div className="w-full flex justify-center">
            <Card className="w-full max-w-5xl hover:cursor-pointer hover:bg-secondary border-1 border-solid border-secondary"
                variant="default">
                <Card.Header>
                    <Card.Description className="text-xl text-primary mb-1 font-bold">• {username}</Card.Description>
                    <Card.Title className="text-3xl mb-2">{title}</Card.Title>
                    <Card.Description className="text-xl text-primary">{dateToString(created_at)}</Card.Description>
                    {is_edited && (
                        <div className='mt-1'>
                            <img src={edited} width={20} />
                        </div>
                    )}
                </Card.Header>
                <Card.Content>
                    <p className="text-xl">{description}</p>
                </Card.Content>
            </Card>
        </div>
    )
}

export default PostCard
