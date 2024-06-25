import useAppData from "../data/hook/useAppData";
import useAuth from "../data/hook/useAuth";
import { IconeLua, IconeSol } from '../icons';
import AvatarUsuario from "./AvatarUsuario";
import route from 'next/router';
import CartIcon from "./CartIcon";
import { useState } from "react";
import Modal from "./Modal";


export default function Header() {
    const { theme, changeTheme } = useAppData();
    const { logout, carregando } = useAuth();
    const [ ModalOpen, setModalOpen] = useState(false);

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);
    function login() {
        route.push('/autenticacao');
    }

    return (
        <>
            <div className={`${theme} flex flex-row h-12 justify-between p-1 bg-gray-300 dark:bg-gray-800`}>
                <div className="flex items-center">
                    {theme === 'dark' ? (
                        <div
                            onClick={changeTheme}
                            className={`
                                    sm:flex items-center cursor-pointer
                                    bg-gradient-to-r from-yellow-300 to-yellow-600
                                    w-6 md:w-12 lg:w-16 h-6 p-0.5 rounded-full
                                `}
                        >
                            <div
                                className={`
                                        flex items-center justify-center
                                        bg-white text-yellow-600
                                        w-4 h-4 rounded-full
                                    `}
                            >
                                {IconeSol(4)}
                            </div>
                            <div
                                className={`
                                        hidden lg:flex items-center ml-1
                                        text-white
                                    `}
                            >
                                <span className="text-xs">Claro</span>
                            </div>
                        </div>
                    ) : (
                        <div
                            onClick={changeTheme}
                            className={`
                                    sm:flex items-center justify-end cursor-pointer
                                    bg-gradient-to-r from-gray-500 to-gray-900
                                    w-6 md:w-12 lg:w-16 h-6 p-0.5 rounded-full
                                `}
                            >


                            <div
                                className={`
                                        hidden lg:flex items-center mx-1
                                        text-gray-300
                                    `}
                            >
                                    <span className="text-xs">Escuro</span>
                            </div>
                            <div
                                className={`
                                        flex items-center justify-center
                                        bg-black text-yellow-300
                                        w-4 h-4 rounded-full
                                    `}
                            >
                                {IconeLua(4)}
                            </div>
                        </div>
                    )}
                </div>
                <div className="flex flex-row items-center">
                    <div className="p-2" onClick={openModal}>
                        <CartIcon />
                    </div>
                    {carregando ? <img src='/images/loading.gif' alt="Avatar do Usuário" className={` h-10 w-10`} /> : <AvatarUsuario />}
                    <button                                                                                                           
                        className="flex h-3/4 items-center justify-center bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-3 rounded ml-1"
                        onClick={login}
                    >
                        Login
                    </button>
                    <button
                        className="flex h-3/4 items-center justify-center text-sm bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded m-1"
                        onClick={logout}
                    >
                        Logout
                    </button>
                </div>
            </div>
        </>
    )
}
