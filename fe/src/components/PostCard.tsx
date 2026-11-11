import { Card } from "@heroui/react";

interface PostCardProps {
    creator: string;
    title: string;
    description: string;
    createdAt: string;
    isEdited: boolean;
}

function PostCard({ creator, title, description, createdAt, isEdited }: PostCardProps) {
    return (
        <div>
            <Card className="w-5xl hover:cursor-pointer hover:bg-secondary" variant="default">
                <Card.Header>
                    <Card.Description className="text-xl text-primary mb-1 font-bold">• {creator}</Card.Description>
                    <Card.Title className="text-3xl mb-2">{title}</Card.Title>
                    <Card.Description className="text-xl text-primary">{createdAt}</Card.Description>
                    {isEdited && <Card.Description className="text-xl text-primary">Edited</Card.Description>}
                </Card.Header>
                <Card.Content>
                    <p className="text-xl">{description}</p>
                </Card.Content>
            </Card>
        </div>
    )
}

export default PostCard
