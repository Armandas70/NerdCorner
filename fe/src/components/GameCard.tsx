import { Card } from "@heroui/react";

interface GameCardProps {
  title: string;
  description: string;
  createdAt: string;
}

function GameCard({title, description, createdAt}: GameCardProps) {
  return (
    <div>
      <Card className="w-5xl hover:cursor-pointer hover:bg-secondary" variant="default">
        <Card.Header>
          <Card.Title className="text-3xl mb-2">{title}</Card.Title>
          <Card.Description className="text-xl text-primary">{createdAt}</Card.Description>
        </Card.Header>
        <Card.Content>
          <p className="text-xl">{description}</p>
        </Card.Content>
      </Card>
    </div>
  )
}

export default GameCard
