"use client";

import Link from 'next/link';
import { useAppSelector } from '@/hooks/redux'; // Adjust import path as needed

const Header = () => {
    const { isAuthenticated, user } = useAppSelector((state) => state.auth);

    return (
        <header className="bg-gray-800 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-2xl font-bold">
                    <Link href="/">Community Connect</Link>
                </div>
                <nav className="space-x-4">
                    {isAuthenticated && (
                        <Link href="/dashboard" className="hover:text-gray-300">
                            Dashboard
                        </Link>
                    )}
                    <Link href="/report-issue" className="hover:text-gray-300">
                        Report Issue
                    </Link>
                </nav>
                <div className="space-x-4">
                    {!isAuthenticated ? (
                        <>
                            <Link href="/signup">
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                    Sign Up
                                </button>
                            </Link>
                            <Link href="/signin">
                                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                                    Sign In
                                </button>
                            </Link>
                        </>
                    ) : (
                        <div className="flex items-center space-x-4">
                            <span>Welcome, {user?.email}</span>
                            <Link href="/signin">
                                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                    Logout
                                </button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;