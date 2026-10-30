import { Button, Link, SearchField, Input } from "@heroui/react"

export default function Header() {

    //className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground

    return (
        <header className="bg-background border-b sticky top-0 z-69">
            <div className="max-w-8xl mx-auto px-4 py-3 flex">
                <div className="flex gap-4 flex-1">
                    <Link href="/" className="text-3xl font-bold text-primary hover:text-primary/80">
                        Nerd Corner
                    </Link>
                    <div className="relative flex-1 max-w-xl">
                        <SearchField className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search for games..."
                            className="pl-9 w-md text-lg"
                        />
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="lg">
                        <Link href="/login">Log In</Link>
                    </Button>
                    <Button size="lg">
                        <Link href="/register">Sign Up</Link>
                    </Button>
                </div>
            </div>
        </header>
    );
}