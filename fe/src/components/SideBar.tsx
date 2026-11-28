import { useState, useEffect } from 'react';
import { api } from '../App';
import { Card, Link, Button } from "@heroui/react";
import GameAddModal from './GameAddModal';

interface Game {
    id: number;
    title: string;
    description: string;
    created_at: Date;
}

function SideBar() {
    const [games, setGames] = useState<Game[]>([]);
    const [isGameAddModalShown, setIsGameAddModalShown] = useState(false);

    useEffect(() => {
        fetch(`${api}/games`)
            .then((res) => res?.json())
            .then((json) => {
                setGames(json?.data)
            })
    }, []);

    return (
        <div className="md:ml-1 space-y-4">
            <Card className="w-full md:max-w-xs h-5xl border-1 border-solid border-secondary">
                <Card.Header className="ml-2">
                    <div className="flex items-center justify-between gap-2">
                        <Card.Title className="text-2xl text-primary">Games</Card.Title>
                        <div>
                            <Button
                                size='md'
                                onClick={() => setIsGameAddModalShown(true)}
                            >
                                + Add
                            </Button>
                        </div>
                    </div>
                </Card.Header>
                <Card.Content>
                    {games.map((game) => (
                        <div key={game.id}>
                            <Link
                                key={game.id}
                                href={`/games/${game.id}`}
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
            {isGameAddModalShown && <GameAddModal isOpen={isGameAddModalShown} setIsOpen={setIsGameAddModalShown}></GameAddModal>}
        </div>
    )
}
export default SideBar