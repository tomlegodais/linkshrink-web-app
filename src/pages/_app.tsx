import "../styles/globals.css";
import {AppProps} from "next/app";
import React from "react";
import {NotificationProvider} from "@/context/notification.context";
import Head from "next/head";

function App({Component, pageProps}: AppProps) {
    return (
        <NotificationProvider>
            <Head>
                <title>LinkShrink</title>
                <meta name="description" content="LinkShrink"/>
            </Head>
            <Component {...pageProps} />
        </NotificationProvider>
    )
}

export default App;