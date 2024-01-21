import React, {forwardRef} from 'react';

interface UrlInputProps {
    onUrlChange: (url: string | undefined) => void;
}

const UrlInput = forwardRef<HTMLInputElement, UrlInputProps>(({onUrlChange}, ref) => {
    return (
        <input
            ref={ref}
            className={"flex-1 border rounded p-2 bg-gray-700 text-white outline-none"}
            placeholder={"Enter URL"}
            type={"url"}
            onChange={(e) => onUrlChange(e.target.value)}
        />
    );
});

UrlInput.displayName = "UrlInput";

export default UrlInput;