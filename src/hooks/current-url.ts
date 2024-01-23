import {useEffect, useState} from "react";

export const useCurrentUrl = () => {
    const [currentUrl, setCurrentUrl] = useState<string>("");
    const [currentHostname, setCurrentHostname] = useState<string>("");

    useEffect(() => {
        const url = new URL(window.location.href);

        setCurrentUrl(`${url.protocol}//${url.host}/`);
        setCurrentHostname(url.hostname);
    }, []);

    return [currentUrl, currentHostname];
};