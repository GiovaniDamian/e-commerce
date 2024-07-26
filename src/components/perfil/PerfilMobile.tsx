import Image from "next/image"
import useAuth from "../../data/hook/useAuth"
import FormGeneral from "./FormGeneral"
import FormPersonal from "./FormPersonal";
import { useEffect, useState } from "react";
import Modal from "../Modal";
import useAppData from '../../data/hook/useAppData';
export default function PerflWeb() {
    const { usuario, salvarUsuario } = useAuth();
    const { theme } = useAppData()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const closeModal = () => setIsModalOpen(false);
    const [cpfError, setCpfError] = useState<string | null>(null);
    const [formData, setFormData] = useState<any>({
        name: '',
        phone: '',
        address: {
            state: '',
            city: '',
            neighborhood: '',
            street: '',
            houseNumber: 0,
            adjunct: '',
        },
        cpf: '',
        cardNumber: '',
        cardExpiry: '',
        cardCVV: ''
    });

    useEffect(() => {
        if (usuario) {
            setFormData({
                name: usuario.name || '',
                phone: usuario.phone || '',
                address: {
                    state: usuario.address.state || '',
                    city: usuario.address.city || '',
                    neighborhood: usuario.address.neighborhood || '',
                    street: usuario.address.street || '',
                    houseNumber: usuario.address.houseNumber || 0,
                    adjunct: usuario.address.adjunct || '',
                },
                cpf: usuario.cpf || '',
                cardNumber: '',  
                cardExpiry: '',  
                cardCVV: ''      
            });
        }
    }, [usuario]);

    function isValidCPF(cpf: string): boolean {
        cpf = cpf.replace(/[^\d]/g, "");

        if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
            return false;
        }

        let sum = 0;
        let remainder;

        for (let i = 1; i <= 9; i++) {
            sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
        }

        remainder = (sum * 10) % 11;
        if (remainder === 10 || remainder === 11) remainder = 0;
        if (remainder !== parseInt(cpf.substring(9, 10))) return false;

        sum = 0;

        for (let i = 1; i <= 10; i++) {
            sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
        }

        remainder = (sum * 10) % 11;
        if (remainder === 10 || remainder === 11) remainder = 0;
        if (remainder !== parseInt(cpf.substring(10, 11))) return false;

        return true;
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const regex = /^[a-zA-Z0-9\s]*$/;

        if (regex.test(value)) {
            if (name in formData.address) {
                setFormData({
                    ...formData,
                    address: {
                        ...formData.address,
                        [name]: value
                    }
                });
            } else {
                setFormData({
                    ...formData,
                    [name]: value
                });
            }
        }
    };

    function handleSave() {
        const { name, phone, address, cpf } = formData

        if (!isValidCPF(cpf)) {
            setCpfError("CPF inválido");
            setIsModalOpen(!isModalOpen)
        } else if (!name || !phone || !address.state || !address.city || !address.neighborhood || !address.street || !address.houseNumber || !cpf) {
            setIsModalOpen(!isModalOpen)
        }
        else {
            setCpfError(null);
            usuario?.updateInfo(name, phone, address, cpf)
            if (usuario) salvarUsuario(usuario)
        }
    };

   
    return (
        <div className='flex flex-row justify-center h-full'>
            <div className='flex flex-col w-full m-1 bg-transparent border-4 border-gray-600 rounded-lg p-2 flex space-x-4'>
                <div className="flex flex-row space-x-4 mb-1">
                    <Image src="/images/profile.jpg" alt="Foto de perfil" width={140} height={1} className="rounded-full object-cover border-4 border-gray-600" />
                    <div className='w-screen'>
                        <FormGeneral title={"Informações Gerais"} formData={formData} handleChange={handleChange} usuario={usuario ?? usuario} mobile/>
                    </div>
                </div>
                <div className="my-1">
                    <FormPersonal title={"Informações Pessoais"} formData={formData} handleChange={handleChange} mobile/>
                </div>
                <div className="flex flex-col bg-transparent border-4 border-gray-600 rounded-lg p-1 relative mb-1">
                    <h1 className="text-2xl font-bold text-gray-800 self-center">Histórico</h1>
                    <h4 className="flex justify-center text-xsm text-gray-600">Dia/Mês/Ano - Hora - Valor(R$) - Items</h4>
                    <ul className="list-disc mx-1 px-1 text-xsm px-4">
                        {usuario?.historic.map((item) => <li key={`${usuario}-${item}`}>{item}</li>)}
                    </ul>
                </div>
                <button
                    className="bg-blue-500 w-20 self-end text-white rounded p-2"
                    onClick={handleSave}
                >
                    Salvar
                </button>
                <Modal isOpen={isModalOpen} onClose={closeModal}>
                    <div>
                        <h2 className={`text-[1.5rem] font-semibold mb-4 ${theme} dark:text-white`}>Campos com * são obrigatórios!</h2>
                        <p className={`text-2xl text-gray-600 ${theme} dark:text-white`}>
                            {cpfError ? cpfError : 'Por favor, preencha todos os campos obrigatórios.'}
                        </p>
                    </div>
                </Modal>
            </div>
        </div>
    )
}
