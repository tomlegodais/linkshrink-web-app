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
                <meta name="description" content="LinkShrink: A simple, efficient way to shorten URLs."/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <meta charSet="UTF-8"/>
                <meta name="robots" content="index, follow"/>
            </Head>
            <Component {...pageProps} />
        </NotificationProvider>
    )
}

export default App;