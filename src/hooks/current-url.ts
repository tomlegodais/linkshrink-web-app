import React, {useEffect} from "react";

export const useCurrentUrl = () => {
    const [currentUrl, setCurrentUrl] = React.useState<string>("");
    useEffect(() => {
        const protocol = window.location.protocol;
        const host = window.location.host;

        setCurrentUrl(`${protocol}//${host}/`);
    }, []);
    return currentUrl;
};