import {GetServerSideProps, NextPage} from "next";
import Image from "next/image";
import logoImage from '../../../public/logo.png';
import React from "react";

type Props = {
    longUrl: string;
};

const ShortUrlRedirect: NextPage<Props> = () => {
    return (
        <div className="flex flex-col min-h-screen bg-gray-900 items-center justify-center">
            <header className="px-4 py-3 mb-5">
                <Image src={logoImage} alt="LinkShrink Logo" className="logo-img"/>
            </header>
            <main className="text-center">
                <div className={"dots-container"}>
                    <div className={"dot"}></div>
                    <div className={"dot"}></div>
                    <div className={"dot"}></div>
                </div>
            </main>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const {shortUrl} = context.params!;

    try {
        const response = await fetch(`${process.env.apiBaseUrl}/v1/url/${shortUrl}`);
        if (!response.ok) {
            return {redirect: {destination: "/error", permanent: false}};
        }

        const {long_url} = await response.json();
        return {redirect: {destination: long_url, permanent: false}};
    } catch (error) {
        return {redirect: {destination: "/error", permanent: false}};
    }

};

export default ShortUrlRedirect;