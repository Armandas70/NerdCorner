interface HamburgerButtonProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

// Hamburger toggle, only visible below the `md` breakpoint (mobile layout).
export default function HamburgerButton({ isOpen, setIsOpen }: HamburgerButtonProps) {
    return (
        <button
            type="button"
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((open) => !open)}
            className="md:hidden flex items-center justify-center h-10 w-10 rounded-lg bg-primary text-primary-foreground hover:cursor-pointer"
        >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                {isOpen ? (
                    <>
                        <line x1="5" y1="5" x2="19" y2="19" />
                        <line x1="19" y1="5" x2="5" y2="19" />
                    </>
                ) : (
                    <>
                        <line x1="4" y1="6" x2="20" y2="6" />
                        <line x1="4" y1="12" x2="20" y2="12" />
                        <line x1="4" y1="18" x2="20" y2="18" />
                    </>
                )}
            </svg>
        </button>
    );
}
