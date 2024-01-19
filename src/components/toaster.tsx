import React, {CSSProperties, useEffect, useState} from "react";
import {Notification} from "@/context/notification.context";

interface ToasterProps {
    notification: Notification;
}

export default function Toaster({notification}: ToasterProps) {
    const [fadeOut, setFadeOut] = useState(false);
    useEffect(() => {
        const timer = setTimeout(() => setFadeOut(true), 4500);
        return () => clearTimeout(timer);
    }, []);

    const {message, type} = notification;
    const toasterStyle: CSSProperties = {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        backgroundColor: type === 'success' ? '#4caf50' : '#f44336',
        color: '#fff',
        padding: '10px',
        borderRadius: '5px',
    };

    return <div className={fadeOut ? 'toaster-exit' : 'toaster-enter'} style={toasterStyle}>{message}</div>
}