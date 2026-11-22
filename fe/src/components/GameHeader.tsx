import { useState } from 'react';
import { Button } from "@heroui/react";
import GameEditModal from './GameEditModal';
import GameDeleteModal from './GameDeleteModal';

interface GameProps {
    id: number;
    title: string;
    description: string;
    created_at: Date;
}

function dateToString(date: Date) {
    return new Date(date).toLocaleDateString("LT")
}

function GameHeader({ id, title, description, created_at }: GameProps) {
    const [isGameEditModalShown, setIsGameEditModalShown] = useState(false);
    const [isGameDeleteModalShown, setIsGameDeleteModalShown] = useState(false);

    return (
        <div className="bg-secondary text-mist-50 grid grid-cols-10">
            <div className="flex-1 max-w-7xl mx-auto px-4 mt-4 ml-80 col-span-8">
                <h1 className="text-3xl font-bold">{title}</h1>
                <span className="text-lg">• Created {dateToString(created_at)}</span>
                <p className="text-xl mt-1">{description}</p>
            </div>

            <div className="flex gap-2 col-span-2">
                <Button
                    variant='secondary'
                    size="lg"
                    onClick={() => setIsGameEditModalShown(true)}
                >
                    Edit
                </Button>
                <Button
                    variant="danger"
                    size="lg"
                    onClick={() => setIsGameDeleteModalShown(true)}
                >
                    Delete
                </Button>
            </div>
            {isGameEditModalShown && (
                <GameEditModal 
                    isOpen={isGameEditModalShown} 
                    setIsOpen={setIsGameEditModalShown}
                    id={id}
                    title={title}
                    description={description}
                >
                </GameEditModal>
            )}
            {isGameDeleteModalShown && (
                <GameDeleteModal 
                    isOpen={isGameDeleteModalShown} 
                    setIsOpen={setIsGameDeleteModalShown}
                    id={id}
                >
                </GameDeleteModal>
            )}
        </div>
    )
}
export default GameHeader