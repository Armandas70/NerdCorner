import { useState } from 'react';
import { Link, SearchField, Input } from "@heroui/react"
import UserMenu from './UserMenu';
import Dates from "./Dates";
import HamburgerButton from './HamburgerButton';
import SideBar from './SideBar';

interface HomeHeaderProps {
    filterText: string;
    setFilterText: React.Dispatch<React.SetStateAction<string>>;
    filterDate: string;
    setFilterDate: React.Dispatch<React.SetStateAction<string>>;
}

export default function HomeHeader({ filterText, setFilterText, filterDate, setFilterDate }: HomeHeaderProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const filters = (
        <>
            <div className="relative w-full md:w-md">
                <SearchField className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Search for games..."
                    className="pl-9 w-full text-lg"
                    value={filterText}
                    onChange={(e) => setFilterText(e.target.value)}
                />
            </div>
            <div className="w-full md:w-auto">
                <Dates date={filterDate} setDate={setFilterDate}></Dates>
            </div>
        </>
    );

    return (
        <div>
            <header className="bg-background border-b sticky top-0 z-69">
                <div className="max-w-8xl mx-auto px-4 py-3 flex items-center gap-2">
                    <div className="flex gap-4 flex-1 items-center">
                        <Link href="/" className="text-2xl md:text-3xl font-bold text-primary hover:text-primary/80">
                            Nerd Corner
                        </Link>
                        {/* Desktop: filters inline in the header */}
                        <div className="hidden md:flex gap-4 items-center flex-1 min-w-0">
                            {filters}
                        </div>
                    </div>
                    <UserMenu></UserMenu>
                    <HamburgerButton isOpen={isMenuOpen} setIsOpen={setIsMenuOpen}></HamburgerButton>
                </div>

                {/* Mobile: filters + games sidebar collapse into the hamburger menu */}
                {isMenuOpen && (
                    <nav className="md:hidden border-t px-4 py-3 max-h-[75vh] overflow-y-auto flex flex-col gap-3">
                        {filters}
                        <SideBar></SideBar>
                    </nav>
                )}
            </header>
        </div>
    );
}
