import useAuth from "../../data/hook/useAuth";
import { useState, useEffect } from "react";
import FormGeneral from "./FormGeneral";
import FormPersonal from "./FormPersonal";
import FormPayment from "./FormPayment";
import Image from "next/image";

export default function PerfilWeb() {
    const { usuario } = useAuth();
    const [isHoveredGeneral, setIsHoveredGeneral] = useState(false)
    const [isHoveredPersonal, setIsHoveredPersonal] = useState(false)
    const [isHoveredPayment, setIsHoveredPayment] = useState(false)
    const [selectedSection, setSelectedSection] = useState<string>('')
    const [selectedHistoric, setSelectedHistoric] = useState(false)
    const [formData, setFormData] = useState<any>({
        name: '',
        phone: '',
        state: '',
        city: '',
        neighborhood: '',
        street: '',
        houseNumber: 0,
        adjunct: '',
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
                state: usuario.address.state || '',
                city: usuario.address.city || '',
                neighborhood: usuario.address.neighborhood || '',
                street: usuario.address.street || '',
                houseNumber: usuario.address.houseNumber || 0,
                adjunct: usuario.address.adjunct || '',
                cpf: usuario.cpf || '',
                cardNumber: '',  // Assuming you will handle card details separately
                cardExpiry: '',  // Assuming you will handle card details separately
                cardCVV: ''      // Assuming you will handle card details separately
            });
        }
    }, [usuario]);

    const getBackgroundColor = (isHovered) => {
        return isHovered ? 'bg-gray-600/50' : 'bg-transparent';
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSave = () => {
        console.log('Salvando dados:', formData);
        // Add logic to save data
    };

    const handleClose = () => {
        setSelectedSection('');
    };

    function renderSelectedSection() {
        switch (selectedSection) {
            case "general":
                return <FormGeneral formData={formData} handleChange={handleChange} handleSave={handleSave} handleClose={handleClose} usuario={usuario ?? usuario} />;
            case "personal":
                return <FormPersonal formData={formData} handleChange={handleChange} handleSave={handleSave} handleClose={handleClose} />;
            case "payment":
                return <FormPayment formData={formData} handleChange={handleChange} handleSave={handleSave} handleClose={handleClose} />;
            default:
                return <div className="bg-transparent border-4 border-gray-600 rounded-lg p-4">Selecione uma seção para editar</div>;
        }
    };

    function renderHistoric() {
        if (selectedHistoric) {
            return (
                <div className="bg-transparent border-4 border-gray-600 rounded-lg p-1 relative flex flex-col ">
                    <h1 className="text-2xl font-bold text-gray-800 self-center">Histórico</h1>
                    <ul className="list-disc mx-1 px-1 text-xsm px-4">
                        {usuario?.historic.map((item) => <li key={`${usuario}-${item}` }>{item}</li>)}
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
                    <Image src="./images/profile.jpg" alt="Foto de perfil" className="w-32 h-32 rounded-full object-cover border-4 border-gray-600" />
                    <div className="flex flex-col justify-between">
                        <div className={`flex flex-col justify-start rounded-lg px-2 h-3/4 cursor-pointer ${getBackgroundColor(isHoveredGeneral)}`}
                            onMouseEnter={() => setIsHoveredGeneral(true)}
                            onMouseLeave={() => setIsHoveredGeneral(false)}
                            onClick={() => setSelectedSection("general")}>
                            <h1 className="text-2xl font-bold text-gray-800">Informações Gerais</h1>
                            <p className="text-gray-600">Nome: {usuario?.name}</p>
                            <p className="text-gray-600">Email: {usuario?.email.slice(0, 2)}******@***</p>
                            <p className="text-gray-600">Telefone: {usuario?.phone.slice(0, 4)}*****</p>
                        </div>
                        <div className="flex justify-center m-2">
                            <button className='bg-blue-500 text-white text-xsm rounded p-1' onClick={() => setSelectedHistoric(!selectedHistoric)}>Histórico</button>
                        </div>
                    </div>
                </div>
                <div className={`flex flex-col justify-start rounded-lg m-1 px-2 h-3/4 cursor-pointer ${getBackgroundColor(isHoveredPersonal)}`}
                    onMouseEnter={() => setIsHoveredPersonal(true)}
                    onMouseLeave={() => setIsHoveredPersonal(false)}
                    onClick={() => setSelectedSection("personal")}>
                    <h1 className="text-2xl font-bold text-gray-800">Informações Pessoais</h1>
                    <p className="text-gray-600">Estado: {usuario?.address.state.slice(0, 4)}*****</p>
                    <p className="text-gray-600">Cidade: {usuario?.address.city.slice(0, 4)}*****</p>
                    <p className="text-gray-600">Bairro: {usuario?.address.neighborhood.slice(0, 4)}*****</p>
                    <p className="text-gray-600">Endereço: {usuario?.address.street.slice(0, 4)}*****</p>
                    <p className="text-gray-600">Número: {usuario?.address.houseNumber === null ? '*****' : usuario?.address.houseNumber}</p>
                    <p className="text-gray-600">Complemento: {usuario?.address.adjunct.slice(0, 4)}*****</p>
                </div>
                <div className={`flex flex-col justify-start rounded-lg m-1 px-2 h-3/4 cursor-pointer ${getBackgroundColor(isHoveredPayment)}`}
                    onMouseEnter={() => setIsHoveredPayment(true)}
                    onMouseLeave={() => setIsHoveredPayment(false)}
                    onClick={() => setSelectedSection("payment")}>
                    <h1 className="text-2xl font-bold text-gray-800">Informações de Pagamento</h1>
                    <p className="text-gray-600">CPF: {usuario?.cpf.toString().slice(0, 3)} . *** . *** - **</p>
                    <p className="text-gray-600">Número do Cartão: ******</p>
                    <p className="text-gray-600">Data de Validade: ** / ** </p>
                    <p className="text-gray-600">CVV: ***</p>
                </div>
            </div>
            <div className='flex-col ml-4 w-1/3'>
                {renderSelectedSection()}
            </div>
            <div className='flex-col ml-4 w-1/3'>
                {renderHistoric()}
            </div>
        </div>
    );
}
