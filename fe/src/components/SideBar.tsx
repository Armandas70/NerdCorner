import { useState } from 'react';
import { Card, Link } from "@heroui/react";

// interface SideBarProps {
//     games: Game[];
// }

// interface Game {
//     id: number;
//     title: string;
//     description: string;
//     createdAt: string;
// }

function SideBar() {
    const [title, setTitle] = useState("Persona 5");
    const [description, setDescription] = useState("This is a place to talk about the most stylistic game OAT");
    const [createdAt, setCreatedAt] = useState("2026-09-20");

    const game = {
        id: 0, title, description, createdAt
    }
    const [games, setGames] = useState([game, game, game]);

    return (
        <div className="ml-1 space-y-4">
            <Card className="max-w-xs h-5xl border-1 border-solid border-secondary">
                <Card.Header className="ml-2">
                    <Card.Title className="text-2xl text-primary">Games</Card.Title>
                </Card.Header>
                <Card.Content>
                    {games.map((game) => (
                        <div>
                            <Link
                                key={game.id}
                                href={`/game/${game.id}`}
                                className="flex items-center p-1 hover:underline"
                            >
                                <div className="flex-1">
                                    <p className="font-medium text-lg">{game.title}</p>
                                </div>
                            </Link>
                            <hr className="bg-secondary"></hr>
                        </div>
                    ))}
                </Card.Content>
            </Card>
        </div>
    )
}
export default SideBar