import React, {useRef, useState} from 'react';
import CopyButton from "@/components/copy-button";
import HistoryList from "@/components/history-list";
import Image from "next/image";
import logoImage from '../../public/logo.png';
import {useFetchUrls} from "@/hooks/fetch-urls";
import UrlInput from "@/components/url-input";
import validator from 'validator';
import {useUrlShrinker} from "@/hooks/url-shrinker";
import {useCurrentUrl} from "@/hooks/current-url";
import {GetServerSideProps} from "next";

interface HomePageProps {
    apiBaseUrl: string;
}

export default function HomePage({apiBaseUrl}: HomePageProps) {
    const [urls, fetchUrls] = useFetchUrls(apiBaseUrl);
    const urlRef = useRef<HTMLInputElement>(null);

    const [shrunkenUrl, setShrunkenUrl] = useState<string>("");
    const onShrinkClick = useUrlShrinker(apiBaseUrl, setShrunkenUrl, fetchUrls);

    const [isValidUrl, setIsValidUrl] = useState<boolean>(false);
    const [currentUrl, currentHostname] = useCurrentUrl();

    return (
        <div className="flex flex-col min-h-screen bg-gray-900">
            <header className="flex items-center justify-center px-4 py-3">
                <Image src={logoImage}
                       alt={"LinkShrink Logo"}
                       className={"logo-img"}/>
            </header>
            <main className="flex-1 px-4 py-3">
                <div className="w-full max-w-lg mx-auto bg-gray-800 p-4 rounded shadow">
                    <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3 mb-3">
                        <UrlInput
                            ref={urlRef}
                            onUrlChange={(url) => {
                                if (shrunkenUrl) setShrunkenUrl("");

                                console.log(`currentHostname: ${currentHostname}`);

                                const isValid = validator.isURL(url || "");
                                const regex = new RegExp(`^(?:https?:\\/\\/)?(?:www\\.)?${currentHostname}`);
                                const isShortenedUrl = regex.test(url || "");

                                setIsValidUrl(isValid && !isShortenedUrl);
                            }}/>
                        <button
                            className={`font-bold py-2 px-4 rounded ${isValidUrl
                                ? 'bg-gray-700 hover:bg-gray-600 text-white'
                                : 'bg-gray-600 text-gray-400 cursor-not-allowed'}`}
                            onClick={() => onShrinkClick(urlRef.current?.value)}
                            disabled={!isValidUrl}>
                            Shrink!
                        </button>
                    </div>
                    <div className="text-center">
                        <div className="flex items-center justify-center space-x-2">
                            <input
                                id={"shrunken-url"}
                                className="text-center cursor-default border rounded p-2 bg-gray-700 text-white outline-none"
                                readOnly
                                type="text"
                                value={`${currentUrl}${shrunkenUrl}`}/>
                            <CopyButton
                                content={`${currentUrl}${shrunkenUrl}`}/>
                        </div>
                    </div>
                </div>
                {urls.length > 0 && <HistoryList urls={urls}/>}
            </main>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async () => {
    return {
        props: {
            apiBaseUrl: process.env.API_BASE_URL
        }
    }
};