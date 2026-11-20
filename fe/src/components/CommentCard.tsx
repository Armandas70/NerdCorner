import { useEffect, useState } from 'react';
import { api } from '../App';
import { Card } from "@heroui/react";

interface CommentCardProps {
    content: string;
    created_at: Date;
    is_edited: boolean;
    creator_id: number;
}

function dateToString(date: Date) {
    return new Date(date).toLocaleDateString("LT")
}

// Ideal CommentCard has classname="w-3xl"

function CommentCard({ content, created_at, is_edited, creator_id }: CommentCardProps) {
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
        <div>
            <Card className="w-5xl" variant="default">
                <Card.Header>
                    <Card.Title className="text-xl text-primary mb-1 font-bold">• {username}</Card.Title>
                    <Card.Description className="flex-cols-2 text-xl text-primary">
                        <div className="flex gap-2 items-left justify-left">
                            <p>{dateToString(created_at)}</p>
                            {is_edited && <p>• Edited</p>}
                        </div>
                    </Card.Description>
                </Card.Header>
                <Card.Content>
                    <p className="text-xl">{content}</p>
                </Card.Content>
            </Card>
        </div>
    )
}

export default CommentCard
