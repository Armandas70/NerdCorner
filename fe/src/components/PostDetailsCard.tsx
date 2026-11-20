import { useEffect, useState } from 'react';
import { api } from '../App';
import { Card } from "@heroui/react";

interface PostDetailsProps {
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
    title,
    description,
    created_at,
    is_edited,
    creator_id,
}: PostDetailsProps) {
    const [username, setUsername] = useState("");

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
        <Card className="max-w-5xl w-full border-1 border-solid border-secondary">
            <Card.Header>
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
            </Card.Header>
            <Card.Content>
                <div className="min-w-xl max-w-5xl text-xl">
                    <p>{description}</p>
                </div>
            </Card.Content>
        </Card>
    );
}
export default PostDetailsCard;