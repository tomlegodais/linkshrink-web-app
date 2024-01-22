import {GetServerSideProps} from "next";
import Image from "next/image";
import logoImage from '../../../public/logo.png';
import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {findLongUrl} from "@/services/url-service";

interface ShortUrlRedirectProps {
    apiBaseUrl: string;
}

const ShortUrlRedirect = ({apiBaseUrl}: ShortUrlRedirectProps) => {
    const [isLoading, setLoading] = useState<boolean>(true);
    const router = useRouter();
    const {shortUrl} = router.query;

    useEffect(() => {
        const redirect = async () => {
            if (!shortUrl) {
                await router.push('/error');
                return;
            }

            try {
                window.location.href = await findLongUrl(apiBaseUrl, shortUrl as string);
            } catch (error) {
                console.error(`Error finding long URL for short URL ${shortUrl}: ${error}`);
                await router.push('/error');
            } finally {
                setLoading(false);
            }
        };

        (async () => {
            await redirect();
        })();
    }, [apiBaseUrl, shortUrl, router]);

    if (isLoading) {
        return (
            <div className="flex flex-col min-h-screen bg-gray-900 items-center justify-center">
                <header className="px-4 py-3 mb-5">
                    <Image src={logoImage} alt="LinkShrink Logo" className="logo-img"/>
                </header>
                <main className="text-center">
                    <div className={"dots-container"}>
                        <div className={"dot"}></div>
                        <div className={"dot"}></div>
                        <div className={"dot"}></div>
                    </div>
                </main>
            </div>
        );
    }

    return null;
}

export const getServerSideProps: GetServerSideProps = async () => {
    return {
        props: {
            apiBaseUrl: process.env.API_BASE_URL
        }
    }
};

export default ShortUrlRedirect;