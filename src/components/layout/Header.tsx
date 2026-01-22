import { Button } from "@/components/ui/button";

export function Header() {
    return (
        <header className="w-full bg-white border-b py-4">
            <div className="container mx-auto px-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="bg-primary/10 p-1 rounded-md">
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="text-primary w-6 h-6"
                        >
                            <path
                                d="M12 2L2 7L12 12L22 7L12 2Z"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M2 17L12 22L22 17"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M2 12L12 17L22 12"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>
                    <span className="text-xl font-bold tracking-tight text-slate-900">CA MONK</span>
                </div>

                <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
                    <a href="#" className="hover:text-primary transition-colors">Tools</a>
                    <a href="#" className="hover:text-primary transition-colors">Practice</a>
                    <a href="#" className="hover:text-primary transition-colors">Events</a>
                    <a href="#" className="hover:text-primary transition-colors">Job Board</a>
                    <a href="#" className="hover:text-primary transition-colors">Points</a>
                </nav>

                <Button className="bg-primary hover:bg-primary/90 text-white font-medium px-6">
                    Profile
                </Button>
            </div>
        </header>
    );
}
