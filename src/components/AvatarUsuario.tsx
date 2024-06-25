import Link from 'next/link'
import useAuth from '../data/hook/useAuth'
import { useState } from 'react'
import Modal from './Modal'

interface AvatarUsuarioProps {
    className?: string
}

export default function AvatarUsuario({ className }: AvatarUsuarioProps) {
    const { usuario } = useAuth()
    const [imageSrc, setImageSrc] = useState(usuario?.imageUrl ?? '/images/avatar.svg')
    const [ModalOpen, setModalOpen] = useState(false);

    const handleError = () => {
        setImageSrc('/images/avatar.svg')
    }
    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    return (
        usuario?.email ? (
        <Link href="/perfil">
            <img
                src={imageSrc}
                alt="Avatar do Usuário"
                onError={handleError}
                className={`
                    h-7 w-7 rounded-full cursor-pointer mx-4
                    ${className}
                `}
            />
            </Link>) : (<>
                <img
                    onClick={openModal}
                    src={imageSrc}
                    alt="Avatar do Usuário"
                    onError={handleError}
                    className={`
                    h-67 w-7 rounded-full cursor-pointer mx-4
                    ${className}
                `}
                />
                <Modal isOpen={ModalOpen} onClose={closeModal}>
                    <div className="p-6">
                        <h2 className="text-2xl font-semibold mb-4">Você precisa estar logado!</h2>
                        <p className="text-xl text-gray-600">
                            Para acessar esta funcionalidade, você precisa estar logado. Por favor, faça o login para continuar.
                        </p>
                    </div>
                </Modal>
                </>
        )
    )
}
