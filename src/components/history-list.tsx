import Url from "@/models/url.model";
import UrlListItem from "@/components/url-list-item";

interface HistoryListProps {
    urls: Url[];
}

export default function HistoryList({urls}: HistoryListProps) {
    return (
        <div className={"max-w-lg mx-auto mt-12 bg-gray-800 p-6 rounded shadow"}>
            <h2 className={"text-xl font-bold text-white mb-4"}>History</h2>
            <ul className={"space-y-4"}>
                {urls.map((item, index) => (
                    <UrlListItem key={index} url={item}/>
                ))}
            </ul>
        </div>
    )
}