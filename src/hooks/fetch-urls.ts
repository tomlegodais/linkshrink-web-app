import {useState, useEffect, useCallback} from "react";
import Url from "@/models/url.model";
import {findAll} from "@/services/url-service";

export const useFetchUrls = (apiBaseUrl: string): [Url[], () => Promise<void>] => {
    const [urls, setUrls] = useState<Url[]>([]);
    const fetchUrls = useCallback(async (): Promise<void> => {
        const fetchedUrls = await findAll(apiBaseUrl);
        setUrls(fetchedUrls);
    }, [apiBaseUrl]);

    useEffect(() => {
        (async () => {
            await fetchUrls();
        })();
    }, [fetchUrls]);

    return [urls, fetchUrls];
};