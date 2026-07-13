import { BrainCircuit, MessageSquare, FileText, BarChart3, Menu, X } from "lucide-react";
import { useState } from "react";

function Navbar() {

    const [menuOpen, setMenuOpen] = useState(false);

    const menuItems = [
        { title: "Upload", href: "#upload", icon: <FileText size={16} /> },
        { title: "ATS", href: "#ats", icon: <BarChart3 size={16} /> },
        { title: "Summary", href: "#summary", icon: <FileText size={16} /> },
        { title: "Skills", href: "#skills", icon: <BrainCircuit size={16} /> },
        { title: "Chat", href: "#chat", icon: <MessageSquare size={16} /> },
    ];

    return (

        <nav className="sticky top-0 z-50 backdrop-blur-lg bg-white/90 border-b border-slate-200 shadow-sm">

            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

                {/* Logo */}

                <div>

                    <h1 className="flex items-center gap-2 text-2xl font-bold text-blue-700">

                        <BrainCircuit size={30} />

                        AI Resume Analyzer

                    </h1>

                    <p className="text-sm text-gray-500">

                        FastAPI • LangChain • ChromaDB • Groq

                    </p>

                </div>

                {/* Desktop Menu */}

                <div className="hidden lg:flex items-center gap-6">

                    {

                        menuItems.map((item) => (

                            <a

                                key={item.title}

                                href={item.href}

                                className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition font-medium"

                            >

                                {item.icon}

                                {item.title}

                            </a>

                        ))

                    }

                </div>

                {/* Right Side */}

                <div className="flex items-center gap-4">

                    <div className="hidden md:flex items-center gap-2 bg-green-100 px-3 py-2 rounded-full">

                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>

                        <span className="text-sm font-medium text-green-700">

                            AI Online

                        </span>

                    </div>

                    <a

                        href="https://www.linkedin.com/in/rajmahadik/"

                        target="_blank"

                        rel="noreferrer"

                        className="hidden md:block bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl transition"

                    >

                        LinkedIn

                    </a>

                    {/* Mobile Menu */}

                    <button

                        className="lg:hidden"

                        onClick={() => setMenuOpen(!menuOpen)}

                    >

                        {

                            menuOpen

                            ?

                            <X />

                            :

                            <Menu />

                        }

                    </button>

                </div>

            </div>

            {/* Mobile Menu */}

            {

                menuOpen && (

                    <div className="lg:hidden bg-white border-t border-slate-200">

                        {

                            menuItems.map((item) => (

                                <a

                                    key={item.title}

                                    href={item.href}

                                    onClick={() => setMenuOpen(false)}

                                    className="flex items-center gap-3 px-6 py-4 hover:bg-slate-100"

                                >

                                    {item.icon}

                                    {item.title}

                                </a>

                            ))

                        }

                    </div>

                )

            }

        </nav>

    );

}

export default Navbar;