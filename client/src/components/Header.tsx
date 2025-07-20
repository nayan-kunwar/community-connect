import Link from 'next/link';
const Header = () => {
    return (
        <header className="bg-gray-800 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-2xl font-bold">
                    <Link href="/">Community Connect</Link>
                </div>
                <nav className="space-x-4">
                    <Link href="/dashboard" className="hover:text-gray-300">
                        Dashboard
                    </Link>
                    <Link href="/report-issue" className="hover:text-gray-300">
                        Report Issue
                    </Link>
                </nav>
                <div className="space-x-4">
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
                </div>
            </div>
        </header>
    );
};

export default Header;