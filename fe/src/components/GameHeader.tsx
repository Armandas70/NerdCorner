interface GameProps {
    title: string;
    description: string;
    createdAt: string;
}

function GameHeader({ title, description, createdAt }: GameProps) {
    return (
        <div className="bg-secondary text-mist-50">
            <div className="flex-1 max-w-7xl mx-auto px-4 mt-4 ml-80">
                <h1 className="text-3xl font-bold">{title}</h1>
                <span className="text-lg">• Created {createdAt}</span>
                <p className="text-xl mt-1">{description}</p>
            </div>
        </div>
    )
}
export default GameHeader