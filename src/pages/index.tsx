import Head from 'next/head';
import { useEffect, useState } from 'react';
import { IconeLua, IconeSol } from '../icons';
import products from '../data/products.json';
import ShoppingCart from '../components/ShoppingCart';
import AvatarUsuario from '../components/AvatarUsuario';
import useAppData from '../data/hook/useAppData';
import useAuth from '../data/hook/useAuth';
import route from 'next/router';
import Header from '../components/Header';

export default function Home() {
    const { theme } = useAppData()

    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    function renderClientContent() {


        return (
            <div className={`${theme} h-screen w-screen bg-gray-300 dark:bg-gray-800 overflow-hidden`}>
                <Head>
                    <title>LG ~ IoT</title>
                    <meta name="description" content="IoT ecommerce" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>

                <Header />
                <main className={`flex flex-row h-screen w-screen bg-gray-300 dark:bg-gray-800`}>
                </main>

                <footer>
                </footer>
            </div>
        );
    }

    return (
        <div>
            {!isClient ? null : renderClientContent()}
        </div>
    );
}
