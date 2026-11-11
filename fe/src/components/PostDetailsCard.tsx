import { Card } from "@heroui/react";

interface PostDetailsProps {
    creator: string;
    title: string;
    description: string;
    createdAt: string;
    isEdited: boolean;
}

function PostDetailsCard({
    creator,
    title,
    description,
    createdAt,
    isEdited,
}: PostDetailsProps) {
    return (
        <Card className="max-w-5xl w-full">
            <Card.Header>
                <div className="flex flex-row items-left justify-left w-1/2 gap-x-2">
                    <Card.Title className="text-xl text-primary font-bold">• {creator}</Card.Title>
                </div>
                <Card.Description className="text-xl text-primary">
                    <div className="flex gap-2 items-left justify-left">
                        <p>Created at: {createdAt}</p>
                        {isEdited && <p>• Edited</p>}
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