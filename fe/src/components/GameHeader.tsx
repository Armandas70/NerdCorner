interface GameProps {
    title: string;
    description: string;
    created_at: Date;
}

function dateToString(date: Date) {
  return new Date(date).toLocaleDateString("LT")
}

function GameHeader({ title, description, created_at }: GameProps) {
    return (
        <div className="bg-secondary text-mist-50">
            <div className="flex-1 max-w-7xl mx-auto px-4 mt-4 ml-80">
                <h1 className="text-3xl font-bold">{title}</h1>
                <span className="text-lg">• Created {dateToString(created_at)}</span>
                <p className="text-xl mt-1">{description}</p>
            </div>
        </div>
    )
}
export default GameHeader