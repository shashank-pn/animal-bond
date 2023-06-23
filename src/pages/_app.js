import '../assets/globals.css';
import Head from 'next/head';
import NProgress from 'nprogress';
import { useEffect } from "react";
import { Inter } from 'next/font/google'
import { useRouter } from 'next/router';
import { GlobalProvider } from "@/context/globalContext";
import HomeLayout from '../components/layouts/home-layout';


const inter = Inter({ display: "swap", subsets: ['latin'] })

export default function App({ Component, pageProps }) {
    const router = useRouter();

    useEffect(() => {
        const handleStart = () => NProgress.start();
        const handleComplete = () => NProgress.done(false);

        router.events.on('routeChangeStart', handleStart);
        router.events.on('routeChangeComplete', handleComplete);
        router.events.on('routeChangeError', handleComplete);

        return () => {
            router.events.off('routeChangeStart', handleStart);
            router.events.off('routeChangeComplete', handleComplete);
            router.events.off('routeChangeError', handleComplete);
        };
    }, []);

    return (
        <>
            <Head>
                <title>Animal Bond</title>
                <meta name="description" content="This website helps finding perfect matches for your pets." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <style jsx global>{`* {
              font-family: ${inter.style.fontFamily}, 'Arial' !important
            }`}</style>
            <GlobalProvider>
                {
                    Component.getLayout ?
                        (Component.getLayout({ ...<Component {...pageProps} /> }))
                        :
                        <HomeLayout>
                            <Component {...pageProps} />
                        </HomeLayout>
                }
            </GlobalProvider>
        </>
    )
}


