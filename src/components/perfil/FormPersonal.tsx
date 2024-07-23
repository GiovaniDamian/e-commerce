interface FormPersonalProps {
    formData: any;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSave: () => void;
    handleClose: () => void;
}

export default function FormPersonal({ formData, handleChange, handleSave, handleClose }: FormPersonalProps) {
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
                    <label className="block text-gray-600">Endereço:</label>
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
}
