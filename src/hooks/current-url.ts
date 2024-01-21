import React from "react";

export const useCurrentUrl = () => {
    const [currentUrl, setCurrentUrl] = React.useState<string>("");
    React.useEffect(() => {
        const protocol = window.location.protocol;
        const host = window.location.host;

        setCurrentUrl(`${protocol}//${host}/`);
    }, []);
    return currentUrl;
};