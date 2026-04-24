"use client"
import { useState } from 'react';
import Link from 'next/link'; // or 'react-router-dom'
import { NavLink } from '../../constants/modoule';

export const NavDropdown = ({ navLinks }: { navLinks: NavLink[] }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative inline-block text-left">
            {/* Trigger Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-1 text-gray-600 hover:text-blue-600 px-3 py-2 transition-colors font-medium focus:outline-none"
            >
                My content
                <svg
                    className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <>
                    {/* Invisible backdrop to close menu when clicking outside */}
                    <div
                        className="fixed inset-0 z-10"
                        onClick={() => setIsOpen(false)}
                    ></div>

                    <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-20 overflow-hidden">
                        <div className="py-1 flex flex-col">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                                    onClick={() => setIsOpen(false)} // Close menu after selection
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};