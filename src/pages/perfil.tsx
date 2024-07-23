import useAuth from "../data/hook/useAuth"
import useAppData from '../data/hook/useAppData';
import route from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from "react";
import PerfilWeb from "../components/perfil/PerfilWeb";
import PerfilMobile from "../components/perfil/PerfilMobile";
export default function Profile() {
    const { theme } = useAppData()
    const [scale, setScale] = useState(1)

    function home() {
        route.push('/')
    }

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 950) {
                setScale(0.4);
            } else {
                setScale(1);
            }
        }; handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    function renderPerfil() {
        if (scale === 1) {
            return <PerfilWeb />
        } else {
            return <PerfilMobile />
        }
    }

    return (
        <main className={`${theme} flex flex-col h-screen w-screen bg-zinc-400`}>
            <div className='text-gray-500 text-xs p-2' >
                <button onClick={home}><FontAwesomeIcon icon={faArrowLeft} /> Voltar</button>
            </div>
            {renderPerfil() }
        </main>
    )
}
