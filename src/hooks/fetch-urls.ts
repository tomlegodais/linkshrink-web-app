import {useState, useEffect} from "react";
import Url from "@/models/url.model";
import {findAll} from "@/services/url-service";

export const useFetchUrls = (): [Url[], () => Promise<void>] => {
    const [urls, setUrls] = useState<Url[]>([]);
    const fetchUrls = async (): Promise<void> => {
        const urls = await findAll();
        setUrls(urls);
    };

    useEffect(() => {
        (async () => {
            await fetchUrls();
        })();
    }, []);

    return [urls, fetchUrls];
};