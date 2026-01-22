import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-[#111827] text-gray-300 py-12 text-sm mt-auto">
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Brand Section */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2 text-white font-bold text-lg">
                        <div className="bg-white/10 p-1 rounded-md">
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="text-white w-5 h-5"
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
                        CA MONK
                    </div>
                    <p className="text-gray-400 leading-relaxed text-xs">
                        Empowering the next generation of financial leaders with tools, community, and knowledge.
                    </p>
                </div>

                {/* Resources */}
                <div className="space-y-4">
                    <h4 className="text-gray-500 font-semibold uppercase tracking-wider text-xs">Resources</h4>
                    <ul className="space-y-2">
                        <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Webinars</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Case Studies</a></li>
                    </ul>
                </div>

                {/* Platform */}
                <div className="space-y-4">
                    <h4 className="text-gray-500 font-semibold uppercase tracking-wider text-xs">Platform</h4>
                    <ul className="space-y-2">
                        <li><a href="#" className="hover:text-white transition-colors">Job Board</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Practice Tests</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Mentorship</a></li>
                    </ul>
                </div>

                {/* Connect */}
                <div className="space-y-4">
                    <h4 className="text-gray-500 font-semibold uppercase tracking-wider text-xs">Connect</h4>
                    <ul className="space-y-2">
                        <li className="flex items-center gap-2"><Linkedin className="w-4 h-4" /> <a href="#" className="hover:text-white transition-colors">LinkedIn</a></li>
                        <li className="flex items-center gap-2"><Twitter className="w-4 h-4" /> <a href="#" className="hover:text-white transition-colors">Twitter</a></li>
                        <li className="flex items-center gap-2"><Instagram className="w-4 h-4" /> <a href="#" className="hover:text-white transition-colors">Instagram</a></li>
                    </ul>
                </div>
            </div>

            <div className="container mx-auto px-4 mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
                <p>&copy; 2024 CA Monk. All rights reserved.</p>
                <div className="flex gap-6 mt-4 md:mt-0">
                    <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                    <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                </div>
            </div>
        </footer>
    );
}
