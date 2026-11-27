// import { useState } from 'react';
import { Link } from "@heroui/react"
import UserMenu from './UserMenu';

export default function Header() {
    //className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground

    return (
        <div>
            <header className="bg-background border-b sticky top-0 z-69">
                <div className="max-w-8xl mx-auto px-4 py-3 flex">
                    <div className="flex gap-4 flex-1">
                        <Link href="/" className="text-3xl font-bold text-primary hover:text-primary/80">
                            Nerd Corner
                        </Link>
                    </div>
                    <UserMenu></UserMenu>
                </div>
            </header>
        </div>
    );
}