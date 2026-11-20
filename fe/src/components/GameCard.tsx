import { Card } from "@heroui/react";

interface GameCardProps {
  title: string;
  description: string;
  created_at: Date;
}

function dateToString(date: Date) {
  return new Date(date).toLocaleDateString("LT")
}

function GameCard({ title, description, created_at }: GameCardProps) {
  return (
    <div>
      <Card className="w-5xl hover:cursor-pointer hover:bg-secondary border-1 border-solid border-secondary"
        variant="default">
        <Card.Header>
          <Card.Title className="text-3xl mb-2">{title}</Card.Title>
          <Card.Description className="text-xl text-primary">{dateToString(created_at)}</Card.Description>
        </Card.Header>
        <Card.Content>
          <p className="text-xl">{description}</p>
        </Card.Content>
      </Card>
    </div>
  )
}

export default GameCard
