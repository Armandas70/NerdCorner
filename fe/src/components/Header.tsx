import { useState } from 'react';
import { Button, Link, SearchField, Input } from "@heroui/react"
import LoginModal from './LoginModal';

export default function Header() {
    const [isLoginModalShown, setIsLoginModalShown] = useState(false);
    const [isSignupModalShown, setIsSignupModalShown] = useState(false);

    //className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground

    return (
        <div>
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
                        <Button
                            variant="outline"
                            size="lg"
                            onClick={() => setIsLoginModalShown(true)}
                        >
                            Log In
                        </Button>
                        <Button
                            size="lg"
                            onClick={() => setIsSignupModalShown(true)}
                        >
                            Sign Up
                        </Button>
                    </div>
                </div>
            </header>
            {isLoginModalShown && <LoginModal isOpen={isLoginModalShown} setIsOpen={setIsLoginModalShown}></LoginModal>}
            {isSignupModalShown && <LoginModal isOpen={isSignupModalShown} setIsOpen={setIsSignupModalShown}></LoginModal>}
        </div>
    );
}