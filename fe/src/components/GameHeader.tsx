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
        <div className="bg-secondary text-mist-50 py-6 shadow-md">
            <div className="px-4 md:pr-6 md:ml-8 lg:ml-80 min-w-0">
                <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-3">
                    <h1 className="text-2xl md:text-4xl font-bold tracking-tight break-words min-w-0">{title}</h1>
                    <div className="flex gap-2 shrink-0">
                        <Button
                            variant="primary"
                            size="md"
                            className="bg-background text-primary font-semibold hover:bg-background/85"
                            onClick={() => setIsGameEditModalShown(true)}
                        >
                            Edit
                        </Button>
                        <Button
                            variant="danger"
                            size="md"
                            className="font-semibold ring-2 ring-white/70"
                            onClick={() => setIsGameDeleteModalShown(true)}
                        >
                            Delete
                        </Button>
                    </div>
                </div>
                <span className="inline-block mt-1 text-sm md:text-base opacity-80">Created {dateToString(created_at)}</span>
                <p className="text-lg md:text-xl mt-3 max-w-3xl break-words opacity-95">{description}</p>
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