import useAuth from "../../data/hook/useAuth";
import { useState, useEffect } from "react";
import FormGeneral from "./FormGeneral";
import FormPersonal from "./FormPersonal";
import Image from "next/image";
import Modal from "../Modal";
import useAppData from '../../data/hook/useAppData';
export default function PerfilWeb() {
    const { usuario, salvarUsuario } = useAuth();
    const { theme } = useAppData()
    const [isHoveredGeneral, setIsHoveredGeneral] = useState(false)
    const [isHoveredPersonal, setIsHoveredPersonal] = useState(false)
    const [selectedSection, setSelectedSection] = useState<string>('')
    const [selectedHistoric, setSelectedHistoric] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const [cpfError, setCpfError] = useState<string | null>(null);
    const [formData, setFormData] = useState<any>({
        name: '',
        phone: '',
        cpf: '',
        address: {
            state: '',
            city: '',
            neighborhood: '',
            street: '',
            houseNumber: 0,
            adjunct: '',
            postalCode: ''
        },
    });

    useEffect(() => {
        if (usuario) {
            setFormData({
                name: usuario.name || '',
                phone: usuario.phone || '',
                cpf: usuario.cpf || '',     
                address: {
                    state: usuario.address.state || '',
                    city: usuario.address.city || '',
                    neighborhood: usuario.address.neighborhood || '',
                    street: usuario.address.street || '',
                    houseNumber: usuario.address.houseNumber || 0,
                    adjunct: usuario.address.adjunct || '',
                    postalCode: usuario.address.postalCode || ''
                },
            });
        }
    }, [usuario]);

    const getBackgroundColor = (isHovered) => {
        return isHovered ? 'bg-gray-600/50' : 'bg-transparent';
    };
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
        } else if (!name || !phone || !address.state || !address.city || !address.neighborhood || !address.street || !address.houseNumber || !cpf || !address.postalCode) {
            setIsModalOpen(!isModalOpen)
        }
        else {
            setCpfError(null);
            usuario?.updateInfo(name, phone, address, cpf)
            if (usuario) salvarUsuario(usuario)
        }
    };

    const handleClose = () => {
        setSelectedSection('');
    };

    function renderSelectedSection() {
        switch (selectedSection) {
            case "general":
                return <FormGeneral title={"Editar Informações Gerais"} formData={formData} handleChange={handleChange} handleClose={handleClose} usuario={usuario ?? usuario} />;
            case "personal":
                return <FormPersonal title={"Editar Informações Pessoais"} formData={formData} handleChange={handleChange} handleClose={handleClose} />;
            default:
                return <div className="bg-transparent border-4 border-gray-600 rounded-lg p-4">Selecione uma seção para editar</div>;
        }
    };

    function renderHistoric() {
        if (selectedHistoric) {
            return (
                <div className="bg-transparent border-4 border-gray-600 rounded-lg p-1 relative flex flex-col ">
                    <h1 className="text-2xl font-bold text-gray-800 self-center">Histórico</h1>
                    <h4 className="flex justify-center text-xsm text-gray-600">Dia/Mês/Ano - Hora - Valor(R$) - Items</h4>
                    <ul className="list-disc mx-1 px-1 text-xsm px-4">
                        {usuario?.historic.map((item) => <li key={`${usuario}-${item}`}>{item}</li>)}
                    </ul>
                </div>
            )
        }
        else { return '' }
    }

    return (
        <div className='flex flex-row m-2 h-full'>
            <div className='flex-col bg-transparent border-4 border-gray-600 rounded-lg p-2 flex space-x-4'>
                <div className="flex flex-row space-x-4">
                    <Image src="/images/profile.jpg" alt="Foto de perfil" width={130} height={130} className="rounded-full object-cover border-4 border-gray-600" />
                    <div className="flex flex-col justify-between">
                        <div className={`flex flex-col justify-start rounded-lg px-2 h-3/4 cursor-pointer ${getBackgroundColor(isHoveredGeneral)}`}
                            onMouseEnter={() => setIsHoveredGeneral(true)}
                            onMouseLeave={() => setIsHoveredGeneral(false)}
                            onClick={() => setSelectedSection("general")}>
                            <h1 className="text-2xl font-bold text-gray-800">Informações Gerais</h1>
                            <p className="text-gray-600">Nome: {usuario?.name}</p>
                            <p className="text-gray-600">Email: {usuario?.email.slice(0, 2)}******@***</p>
                            <p className="text-gray-600">CPF: {usuario?.cpf.toString().slice(0, 3)}******</p>
                            <p className="text-gray-600">Telefone: {usuario?.phone.slice(0, 4)}*****</p>
                        </div>
                        <div className="flex justify-center m-2">
                            <button className='bg-blue-500 text-white text-xsm rounded p-1' onClick={() => setSelectedHistoric(!selectedHistoric)}>Histórico</button>
                        </div>
                    </div>
                </div>
                <div className={`flex flex-col justify-start rounded-lg m-1 mb-8 px-2 h-3/4 cursor-pointer ${getBackgroundColor(isHoveredPersonal)}`}
                    onMouseEnter={() => setIsHoveredPersonal(true)}
                    onMouseLeave={() => setIsHoveredPersonal(false)}
                    onClick={() => setSelectedSection("personal")}>
                    <h1 className="text-2xl font-bold text-gray-800">Informações Pessoais</h1>
                    <p className="text-gray-600">Estado: {usuario?.address.state.slice(0, 4)}*****</p>
                    <p className="text-gray-600">Cidade: {usuario?.address.city.slice(0, 4)}*****</p>
                    <p className="text-gray-600">Bairro: {usuario?.address.neighborhood.slice(0, 4)}*****</p>
                    <p className="text-gray-600">CEP: {usuario?.address.postalCode.slice(0, 4)}*****</p>
                    <p className="text-gray-600">Endereço: {usuario?.address.street.slice(0, 4)}*****</p>
                    <p className="text-gray-600">Número: {usuario?.address.houseNumber === null ? '*****' : usuario?.address.houseNumber}</p>
                    <p className="text-gray-600">Complemento: {usuario?.address.adjunct.slice(0, 4)}*****</p>
                </div>
                <button
                    className="bg-blue-500 w-20 self-end text-white rounded p-2"
                    onClick={handleSave}
                >
                    Salvar
                </button>
            </div>
            <div className='flex-col ml-4 w-1/3'>
                {renderSelectedSection()}
            </div>
            <div className='flex-col ml-4 w-1/3'>
                {renderHistoric()}
            </div>
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <div>
                    <h2 className={`text-[1.5rem] font-semibold mb-4 ${theme} dark:text-white`}>Campos com * são obrigatórios!</h2>
                    <p className={`text-2xl text-gray-600 ${theme} dark:text-white`}>
                        {cpfError ? cpfError : 'Por favor, preencha todos os campos obrigatórios.'}
                    </p>
                </div>
            </Modal>
        </div>
    );
}
