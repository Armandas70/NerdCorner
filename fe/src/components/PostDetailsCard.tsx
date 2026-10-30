import { Card } from "@heroui/react";

interface PostDetailsProps {
    title: string;
    description: string;
    createdAt: string;
    isEdited: boolean;
    creator: string;
}

function PostDetailsCard({
    title,
    description,
    createdAt,
    isEdited,
    creator
}: PostDetailsProps) {
    return (
        <Card>
            <Card.Header>
                <div className="flex flex-row items-left justify-left w-1/2 gap-x-2">
                    <Card.Title className="text-md">{creator}</Card.Title>
                </div>
                <Card.Description>
                    <div className="flex gap-2 items-left justify-left">
                        <p>Created at: {createdAt}</p>
                        <p>Edited: {isEdited}</p>
                    </div>
                </Card.Description>
                <div>
                    <h1 className="text-2xl font-bold">{title}</h1>
                </div>
            </Card.Header>
            <Card.Content>
                <div className="min-w-xl max-w-5xl">
                    <p>Something</p>
                    <br></br>
                    <p>{description}</p>
                </div>
            </Card.Content>
        </Card>
    );
}
export default PostDetailsCard;