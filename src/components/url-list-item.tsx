import React from "react";
import CopyButton from "@/components/copy-button";
import Url from "@/models/url.model";
import {useCurrentUrl} from "@/hooks/current-url";

interface UrlListItemProps {
    url: Url;
}

const formattedDate = (dateStr: string) => new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
});

export default function UrlListItem({url}: UrlListItemProps) {
    const [currentUrl, _] = useCurrentUrl();
    const redirectUrl = `${currentUrl}${url.shortUrl}`

    return (
        <li className={"flex justify-between items-center"}>
            <div className={"flex-1 min-w-0 pr-2"}>
                <p className={"font-medium text-white hover:cursor-pointer hover:underline"}
                   onClick={() => window.open(redirectUrl, "_blank")}
                >
                    {redirectUrl}
                </p>
                <p className={"text-sm text-gray-500 overflow-hidden text-ellipsis whitespace-nowrap hover:cursor-pointer hover:underline"}
                   onClick={() => window.open(url.longUrl, "_blank")}
                   title={url.longUrl}
                >
                    {url.longUrl}
                </p>
                <p className={"text-xs text-gray-500"}>Shrunk on {formattedDate(url.createdAt)}</p>
            </div>
            <div className={"ml-2"}>
                <CopyButton content={redirectUrl}/>
            </div>
        </li>
    );
}