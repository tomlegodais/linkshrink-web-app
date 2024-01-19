import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClipboard} from "@fortawesome/free-regular-svg-icons";
import {useNotification} from "@/context/notification.context";

interface CopyButtonProps {
    content: string;
}

const CopyButton = ({content}: CopyButtonProps) => {
    const {triggerNotification} = useNotification();
    const copyToClipboard = () => {
        navigator.clipboard.writeText(content)
            .then(() => {
                triggerNotification("Copied to clipboard", "success");
            }, () => {
                triggerNotification("Failed to copy to clipboard", "error");
            });
    };

    return (
        <button
            className={`py-2 px-4 rounded flex items-center justify-center ${!content ? 'bg-gray-600 text-gray-400 cursor-not-allowed' : 'bg-gray-700 hover:bg-gray-600 text-white'}`}
            title="Copy to Clipboard"
            onClick={copyToClipboard}
            disabled={!content}
        >
            <FontAwesomeIcon icon={faClipboard} className={"h-6 w-6"}/>
            <span className={"sr-only"}>Copy</span>
        </button>
    );
}

export default CopyButton;