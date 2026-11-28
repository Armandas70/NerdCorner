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
        <div className="bg-secondary text-mist-50 flex flex-col gap-4 py-5 shadow-md md:grid md:grid-cols-10 md:items-center">
            <div className="flex-1 max-w-7xl mx-auto px-4 md:ml-8 lg:ml-80 md:col-span-8 min-w-0 break-words">
                <h1 className="text-2xl md:text-4xl font-bold tracking-tight">{title}</h1>
                <span className="inline-block mt-1 text-sm md:text-base opacity-80">Created {dateToString(created_at)}</span>
                <p className="text-lg md:text-xl mt-3 max-w-3xl opacity-95">{description}</p>
            </div>

            <div className="flex gap-2 px-4 md:px-0 md:col-span-2 md:justify-end md:pr-4">
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