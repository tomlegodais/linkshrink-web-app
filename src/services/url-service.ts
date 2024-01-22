import Url from "@/models/url.model";
import {plainToInstance} from "class-transformer";

export const findAll = async (apiBaseUrl: string): Promise<Url[]> => {
    const result = await fetch(`${apiBaseUrl}/v1/url`);
    const jsonData = await result.json();
    return plainToInstance(Url, jsonData, {excludeExtraneousValues: true});
};

export const findLongUrl = async (apiBaseUrl: string, shortUrl: string): Promise<string> => {
    const result = await fetch(`${apiBaseUrl}/v1/url/${shortUrl}`);
    const {long_url} = await result.json();
    return long_url;
};

export const shrinkUrl = async (apiBaseUrl: string, longUrl: string): Promise<{
    success: boolean;
    shortUrl?: string;
    errorMessage?: string;
}> => {
    try {
        const res = await fetch(`${apiBaseUrl}/v1/url/shrink`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({'long_url': longUrl})
        });

        if (!res.ok) {
            console.error(`Unexpected response: ${res.statusText}`);
            return {success: false, errorMessage: "Failed to shrink URL"};
        }

        const {short_url} = await res.json();
        console.log(`Shrunk URL: ${short_url}`);
        return {success: true, shortUrl: short_url};
    } catch (error) {
        console.error(`Failed to shrink URL: ${error}`);
        return {success: false, errorMessage: "Failed to shrink URL"};
    }
};