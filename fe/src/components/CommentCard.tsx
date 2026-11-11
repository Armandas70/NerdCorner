import { Card } from "@heroui/react";

interface CommentCardProps {
    creator: string;
    content: string;
    createdAt: string;
    isEdited: boolean;
}

function CommentCard({ creator, content, createdAt, isEdited }: CommentCardProps) {
    return (
        <div>
            <Card className="w-4xl" variant="default">
                <Card.Header>
                    <Card.Title className="text-xl text-primary mb-1 font-bold">• {creator}</Card.Title>
                    <Card.Description className="flex-cols-2 text-xl text-primary">
                        <div className="flex gap-2 items-left justify-left">
                            <p>{createdAt}</p>
                            {isEdited && <p>• Edited</p>}
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
