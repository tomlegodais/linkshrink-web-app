import Url from "@/models/url.model";
import UrlListItem from "@/components/url-list-item";

interface HistoryListProps {
    urls: Url[];
}

export default function HistoryList({urls}: HistoryListProps) {
    return (
        <div className={"max-w-lg mx-auto mt-12 bg-gray-800 p-6 rounded shadow"}>
            <ul className={"space-y-4"}>
                {urls.map((item, index) => (
                    <UrlListItem key={index} url={item}/>
                ))}
            </ul>
        </div>
    )
}