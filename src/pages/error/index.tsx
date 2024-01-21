import React from "react";
import logoImage from '../../../public/logo.png';
import Link from 'next/link';
import Image from "next/image";

const ErrorPage: React.FC = () => {
    return (
        <div className="flex flex-col min-h-screen bg-gray-900 items-center justify-center">
            <header className="px-4 py-3 mb-5">
                <Image src={logoImage} alt="LinkShrink Logo" className="logo-img"/>
            </header>
            <main className="text-center ">
                <div className="bg-gray-800 p-4 rounded shadow error-container">
                    <h1 className="text-white text-2xl mb-3">Oops! Something went wrong.</h1>
                    <p className="text-white mb-5">The page you are looking for might have been removed, had its name
                        changed, or is temporarily unavailable.</p>
                    <Link href="/" className="text-white hover:underline">
                        Go back to home page
                    </Link>
                </div>
            </main>
        </div>
    );
};

export default ErrorPage;