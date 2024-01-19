import React, {createContext, useContext, useState} from "react";
import Toaster from "@/components/toaster";

export interface Notification {
    message: string;
    type: 'success' | 'error'
}

interface NotificationContextType {
    triggerNotification: (message: string, type: 'success' | 'error', duration?: number) => void;
}

const defaultContext: NotificationContextType = {
    triggerNotification: () => {
        /* noop */
    }
}

const NotificationContext = createContext<NotificationContextType>(defaultContext);

export const useNotification = () => {
    return useContext(NotificationContext);
};

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [notification, setNotification] = useState<Notification | null>(null);
    const triggerNotification = (message: string, type: 'success' | 'error', duration = 5000) => {
        setNotification({message, type});
        setTimeout(() => setNotification(null), duration);
    };

    return (
        <NotificationContext.Provider value={{triggerNotification}}>
            {children}
            {notification && <Toaster notification={notification}/>}
        </NotificationContext.Provider>
    )
};