import useAuth from "../../data/hook/useAuth";
import { useState, useEffect } from "react";

export default function PerfilWeb() {
    const { usuario } = useAuth();
    const [isHoveredGeneral, setIsHoveredGeneral] = useState(false);
    const [isHoveredPersonal, setIsHoveredPersonal] = useState(false);
    const [selectedSection, setSelectedSection] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        state: '',
        city: '',
        neighborhood: '',
        street: '',
        houseNumber: 0,
        adjunct: ''
    });

    useEffect(() => {
        if (usuario) {
            setFormData({
                name: usuario?.name || '',
                phone: usuario?.phone || '',
                state: usuario?.address?.state || '',
                city: usuario?.address?.city || '',
                neighborhood: usuario?.address?.neighborhood || '',
                street: usuario?.address?.street || '',
                houseNumber: usuario?.address?.houseNumber || 0,
                adjunct: usuario?.address?.adjunct || ''
            });
        }
    }, [usuario]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSave = () => {
        // Lógica para salvar as informações
        console.log('Salvando dados:', formData);
    };

    const handleClose = () => {
        setSelectedSection('');
    };

    const getBackgroundColor = (isHovered) => {
        return isHovered ? 'bg-gray-600/50' : 'bg-transparent';
    };

    const renderSelectedSection = () => {
        if (selectedSection === "general") {
            return (
                <div className="bg-transparent border-4 border-gray-600 rounded-lg p-4 relative text-xsm">
                    <button
                        className="absolute top-2 right-2 bg-red-500 text-white rounded px-1.5 py-0.5 text-xsm"
                        onClick={handleClose}
                    >
                        X
                    </button>
                    <h2 className="text-2xl font-bold text-gray-800">Editar Informações Gerais</h2>
                    <form className="mb-8">
                        <div className="mb-4">
                            <label className="block text-gray-600">Nome:</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="border rounded w-full py-2 px-3 text-gray-700"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-600">Telefone:</label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="border rounded w-full py-2 px-3 text-gray-700"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-600">Email:</label>
                            <label>{usuario?.email}</label>
                        </div>
                    </form>
                    <button
                        className="absolute bottom-1 right-2 bg-blue-500 text-white text-xsm rounded p-2"
                        onClick={handleSave}
                    >
                        Salvar
                    </button>
                </div>
            );
        } else if (selectedSection === "personal") {
            return (
                <div className="bg-transparent border-4 border-gray-600 rounded-lg p-4 relative text-xsm">
                    <button
                        className="absolute top-2 right-2 bg-red-500 text-white rounded px-1.5 py-0.5 text-xsm"
                        onClick={handleClose}
                    >
                        X
                    </button>
                    <h2 className="text-2xl font-bold text-gray-800">Editar Informações Pessoais</h2>
                    <form className='mb-8'>
                        <div className="mb-4">
                            <label className="block text-gray-600">Estado:</label>
                            <input
                                type="text"
                                name="state"
                                value={formData.state}
                                onChange={handleChange}
                                className="border rounded w-full py-2 px-3 text-gray-700"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-600">Cidade:</label>
                            <input
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                className="border rounded w-full py-2 px-3 text-gray-700"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-600">Bairro:</label>
                            <input
                                type="text"
                                name="neighborhood"
                                value={formData.neighborhood}
                                onChange={handleChange}
                                className="border rounded w-full py-2 px-3 text-gray-700"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-600">Rua:</label>
                            <input
                                type="text"
                                name="street"
                                value={formData.street}
                                onChange={handleChange}
                                className="border rounded w-full py-2 px-3 text-gray-700"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-600">Número:</label>
                            <input
                                type="number"
                                name="houseNumber"
                                value={formData.houseNumber}
                                onChange={handleChange}
                                className="border rounded w-full py-2 px-3 text-gray-700"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-600">Complemento:</label>
                            <input
                                type="text"
                                name="adjunct"
                                value={formData.adjunct}
                                onChange={handleChange}
                                className="border rounded w-full py-2 px-3 text-gray-700"
                            />
                        </div>
                    </form>
                    <button
                        className="absolute bottom-1 right-2 bg-blue-500 text-white rounded p-2"
                        onClick={handleSave}
                    >
                        Salvar
                    </button>
                </div>
            );
        } else {
            return <div className="bg-transparent border-4 border-gray-600 rounded-lg p-4">Selecione uma seção para editar</div>;
        }
    };

    return (
        <div className='flex flex-row m-2 h-full'>
            <div className='flex-col bg-transparent border-4 border-gray-600 rounded-lg p-2 flex space-x-4'>
                <div className="flex flex-row space-x-4">
                    <img src="./images/profile.jpg" alt="Foto de perfil" className="w-32 h-32 rounded-full object-cover border-4 border-gray-600" />
                    <div className={`flex flex-col justify-start rounded-lg px-2 h-3/4 cursor-pointer ${getBackgroundColor(isHoveredGeneral)}`}
                        onMouseEnter={() => setIsHoveredGeneral(true)}
                        onMouseLeave={() => setIsHoveredGeneral(false)}
                        onClick={() => setSelectedSection("general")}>
                        <h1 className="text-2xl font-bold text-gray-800">Informações Gerais</h1>
                        <p className="text-gray-600">Nome: {usuario?.name}</p>
                        <p className="text-gray-600">Email: {usuario?.email.slice(0, 2)}******@***</p>
                        <p className="text-gray-600">Telefone: {usuario?.phone.slice(0, 4) === null ?? `${usuario?.phone.slice(0, 4)}*****`}</p>
                    </div>
                </div>
                <div className={`flex flex-col justify-start rounded-lg m-1 px-2 h-3/4 cursor-pointer ${getBackgroundColor(isHoveredPersonal)}`}
                    onMouseEnter={() => setIsHoveredPersonal(true)}
                    onMouseLeave={() => setIsHoveredPersonal(false)}
                    onClick={() => setSelectedSection("personal")}>
                    <h1 className="text-2xl font-bold text-gray-800">Informações Pessoais</h1>
                    <p className="text-gray-600">Estado: {usuario?.address.state.slice(0, 4) === null ?? `${usuario?.address.state.slice(0, 4)}*****`}</p>
                    <p className="text-gray-600">Cidade: {usuario?.address.city.slice(0, 4) === null ?? `${usuario?.address.city.slice(0, 4)}*****`}</p>
                    <p className="text-gray-600">Bairro: {usuario?.address.neighborhood.slice(0, 4) === null ?? `${usuario?.address.neighborhood.slice(0, 4)}*****`}</p>
                    <p className="text-gray-600">Rua: {usuario?.address.street.slice(0, 4) === null ?? `${usuario?.address.street.slice(0, 4)}*****`}</p>
                    <p className="text-gray-600">Número: {usuario?.address.houseNumber === null ?? `*****`}</p>
                    <p className="text-gray-600">Complemento: {usuario?.address.adjunct.slice(0, 4) === null ?? `${usuario?.address.adjunct.slice(0, 4)}*****`}</p>
                </div>
                <div>teste</div>
            </div>
            <div className='flex-col ml-4 w-1/2'>
                {selectedSection && renderSelectedSection()}
            </div>
        </div>
    );
}
