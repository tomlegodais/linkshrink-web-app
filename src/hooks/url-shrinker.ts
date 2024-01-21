import React from "react";
import {useNotification} from "@/context/notification.context";
import {shrinkUrl} from "@/services/url-service";

type UseUrlShrinker = (
    setShrunkenUrl: React.Dispatch<React.SetStateAction<string>>,
    fetchUrls: () => Promise<void>,
) => (longUrl?: string) => Promise<void>;

export const useUrlShrinker: UseUrlShrinker = (setShrunkenUrl, fetchUrls) => {
    const {triggerNotification} = useNotification();
    return async (longUrl?: string) => {
        if (!longUrl) {
            triggerNotification("Please enter a valid URL", "error");
            return;
        }

        const result = await shrinkUrl(longUrl);
        if (result.success) {
            setShrunkenUrl(result.shortUrl!);
            triggerNotification("URL successfully shrunk!", "success");
        } else {
            triggerNotification(result.errorMessage!, "error");
        }

        await fetchUrls();
    };
};