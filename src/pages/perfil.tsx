import useAuth from "../data/hook/useAuth"
import useAppData from '../data/hook/useAppData';
import route from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";
export default function Profile() {
    const { usuario } = useAuth()
    const { theme } = useAppData()

    const [isHovered, setIsHovered] = useState(false);

    function home() {
        route.push('/')
    }


    return (
        <main className={`${theme} flex flex-col h-screen w-screen bg-zinc-400`}>
            <div className='text-gray-500 text-xs p-2' >
                <button onClick={home}><FontAwesomeIcon icon={faArrowLeft} /> Voltar</button>
            </div>
            <div className='flex flex-row m-2 h-full'>
                <div className='flex-col bg-transparent border-4 border-gray-600 rounded-lg p-2 flex space-x-4'>
                    <div className="flex flex-row space-x-4">
                        <img src="./images/profile.jpg" alt="Foto de perfil" className="w-32 h-32 rounded-full object-cover border-4 border-gray-600" />
                        <div className={`flex flex-col justify-start rounded-lg px-2 h-3/4 ${isHovered ? 'bg-gray-600/50' : 'bg-transparent'}`}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}>
                            <h1 className="text-2xl font-bold text-gray-800">Informações Gerais</h1>
                            <p className="text-gray-600">Nome: {usuario?.name}</p>
                            <p className="text-gray-600">Email: {usuario?.email.slice(0, 4)}******</p>
                            <p className="text-gray-600">Telefone: {usuario?.phone.slice(0, 4)}****** </p>
                        </div>
                    </div>
                    <div className={`flex flex-col justify-start rounded-lg px-2 h-3/4 ${isHovered ? 'bg-gray-600/50' : 'bg-transparent'}`}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}>
                        <h1 className="text-2xl font-bold text-gray-800">Informações Pessoais</h1>
                        <p className="text-gray-600">Estado: {usuario?.address.state}</p>
                        <p className="text-gray-600">Cidade: {usuario?.address.city}</p>
                        <p className="text-gray-600">Bairro: {usuario?.address.neighborhood}</p>
                        <p className="text-gray-600">Rua: {usuario?.address.street}</p>
                        <p className="text-gray-600">Número: {usuario?.address.houseNumber}</p>
                        <p className="text-gray-600">Complemento: {usuario?.address.adjunct}</p>
                    </div>
                    <div>teste</div>
                </div>
            </div>
        </main>
    )
}
