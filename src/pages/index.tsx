import React, {useEffect, useRef, useState} from 'react';
import CopyButton from "@/components/copy-button";
import {plainToInstance} from "class-transformer";
import Url from "@/models/url.model";
import HistoryList from "@/components/history-list";
import {useNotification} from "@/context/notification.context";
import Image from "next/image";
import logoImage from '../../public/logo.png';

const URL_REGEX = new RegExp(
    '^(https?:\\/\\/)?' + // validate protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // validate domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // validate OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // validate port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // validate query string
    '(\\#[-a-z\\d_]*)?$', 'i'
);

const validateUrl = (url: string | undefined) => {
    if (!url) {
        return false;
    }

    return URL_REGEX.test(url);
};

const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>,
                         shrunkUrl: string,
                         setShrunkenUrl: React.Dispatch<React.SetStateAction<string>>,
                         setIsValidUrl: React.Dispatch<React.SetStateAction<boolean>>) => {
    if (shrunkUrl) {
        setShrunkenUrl("");
    }

    const url = e.target?.value;
    setIsValidUrl(validateUrl(url));
};

export default function HomePage() {
    const [urls, setUrls] = useState<Url[]>([]);
    const fetchUrls = async () => {
        const res = await fetch('http://127.0.0.1:8000/api/v1/url')
        const jsonData = await res.json()
        const urls = plainToInstance(Url, jsonData, {excludeExtraneousValues: true})
        setUrls(urls);
    };

    useEffect(() => {
        (async () => {
            await fetchUrls();
        })();
    }, []);

    const urlRef = useRef<HTMLInputElement>(null);
    const [shrunkenUrl, setShrunkenUrl] = useState<string>("");
    const [isValidUrl, setIsValidUrl] = useState<boolean>(false);
    const {triggerNotification} = useNotification();
    const onShrinkClick = async () => {
        const longUrl = urlRef.current?.value;
        if (!longUrl) {
            triggerNotification("Please enter a valid URL", "error");
            return;
        }

        try {
            const res = await fetch(`http://127.0.0.1:8000/api/v1/url/shrink`, {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({'long_url': longUrl})
            });

            if (!res.ok) {
                console.error(`Unexpected response: ${res.statusText}`);
                triggerNotification("Failed to shrink URL", "error");
                return;
            }

            const {short_url} = await res.json();
            setShrunkenUrl(short_url);
            triggerNotification("Successfully shrunken URL.", "success");

            await fetchUrls();
        } catch (error) {
            console.error(`Failed to shrink URL: ${error}`);
            triggerNotification("Failed to shrink URL", "error");
        }
    };


    return (
        <div className="flex flex-col min-h-screen bg-gray-900">
            <header className="flex items-center justify-center px-4 py-3">
                <Image src={logoImage}
                       alt={"LinkShrink Logo"}
                       className={"logo-img"}/>
            </header>
            <main className="flex-1 px-4 py-3">
                <div className="w-full max-w-lg mx-auto bg-gray-800 p-4 rounded shadow">
                    <h2 className="text-lg md:text-xl font-bold text-white mb-3">Shrink URL</h2>
                    <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3 mb-3">
                        <input
                            ref={urlRef}
                            className="flex-1 border rounded p-2 bg-gray-700 text-white outline-none"
                            placeholder="Enter URL"
                            type="url"
                            onChange={(e) => handleUrlChange(e, shrunkenUrl, setShrunkenUrl, setIsValidUrl)}
                        />
                        <button
                            className={`font-bold py-2 px-4 rounded ${isValidUrl ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-600 text-gray-400 cursor-not-allowed'}`}
                            onClick={onShrinkClick}
                            disabled={!isValidUrl}>
                            Shrink!
                        </button>
                    </div>
                    <div className="text-center">
                        <div className="flex items-center justify-center space-x-2">
                            <input
                                className="text-center cursor-default border rounded p-2 bg-gray-700 text-white outline-none"
                                readOnly
                                type="text"
                                value={`http://127.0.0.1/${shrunkenUrl}`}
                            />
                            <CopyButton content={`http://127.0.0.1:8000/api/v1/url/redirect?short_url=${shrunkenUrl}`}/>
                        </div>
                    </div>
                </div>
                {urls.length > 0 && <HistoryList urls={urls}/>}
            </main>
        </div>
    )
}