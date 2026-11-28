import { useState } from 'react';
import { Link } from "@heroui/react"
import UserMenu from './UserMenu';
import HamburgerButton from './HamburgerButton';
import SideBar from './SideBar';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div>
            <header className="bg-background border-b sticky top-0 z-69">
                <div className="max-w-8xl mx-auto px-4 py-3 flex items-center gap-2">
                    <div className="flex gap-4 flex-1">
                        <Link href="/" className="text-2xl md:text-3xl font-bold text-primary hover:text-primary/80">
                            Nerd Corner
                        </Link>
                    </div>
                    <UserMenu></UserMenu>
                    <HamburgerButton isOpen={isMenuOpen} setIsOpen={setIsMenuOpen}></HamburgerButton>
                </div>

                {/* Mobile menu: the games sidebar lives here below the md breakpoint */}
                {isMenuOpen && (
                    <nav className="md:hidden border-t px-4 py-3 max-h-[70vh] overflow-y-auto">
                        <SideBar></SideBar>
                    </nav>
                )}
            </header>
        </div>
    );
}
