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
            <div className="max-w-7xl px-4 md:ml-8 lg:ml-80 min-w-0 break-words">
                <h1 className="text-2xl md:text-4xl font-bold tracking-tight">{title}</h1>
                <span className="inline-block mt-1 text-sm md:text-base opacity-80">Created {dateToString(created_at)}</span>
                <p className="text-lg md:text-xl mt-3 max-w-3xl opacity-95">{description}</p>

                <div className="flex flex-wrap gap-2 mt-5 pt-4 border-t border-white/25">
                    <Button
                        variant="secondary"
                        size="md"
                        onClick={() => setIsGameEditModalShown(true)}
                    >
                        Edit
                    </Button>
                    <Button
                        variant="danger-soft"
                        size="md"
                        onClick={() => setIsGameDeleteModalShown(true)}
                    >
                        Delete
                    </Button>
                </div>
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