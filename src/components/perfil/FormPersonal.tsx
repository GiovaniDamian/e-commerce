interface FormPersonalProps {
    title: string
    formData: any
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    handleClose?: () => void
    mobile?: boolean
}

export default function FormPersonal({ title, formData, handleChange, handleClose, mobile }: FormPersonalProps) {
    return (
        <div className="bg-transparent border-4 border-gray-600 rounded-lg p-4 relative text-xsm">
            <button
                className={`absolute top-2 right-2 bg-red-500 text-white rounded px-1.5 py-0.5 text-xsm  ${mobile ? 'hidden': ''}`}
                onClick={handleClose}
            >
                X
            </button>
            <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
            <form className='mb-8'>
                <div className="mb-4">
                    <label className="block text-gray-600">Estado: <span className='text-red-700'>*</span></label>
                    <input
                        type="text"
                        name="state"
                        value={formData.address.state}
                        onChange={handleChange}
                        className="border rounded w-full py-2 px-3 text-gray-700"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-600">Cidade: <span className='text-red-700'>*</span></label>
                    <input
                        type="text"
                        name="city"
                        value={formData.address.city}
                        onChange={handleChange}
                        className="border rounded w-full py-2 px-3 text-gray-700"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-600">Bairro: <span className='text-red-700'>*</span></label>
                    <input
                        type="text"
                        name="neighborhood"
                        value={formData.address.neighborhood}
                        onChange={handleChange}
                        className="border rounded w-full py-2 px-3 text-gray-700"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-600">CEP: <span className='text-red-700'>*</span></label>
                    <input
                        type="text"
                        name="postalCode"
                        value={formData.address.postalCode}
                        onChange={handleChange}
                        className="border rounded w-full py-2 px-3 text-gray-700"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-600">Endereço: <span className='text-red-700'>*</span></label>
                    <input
                        type="text"
                        name="street"
                        value={formData.address.street}
                        onChange={handleChange}
                        className="border rounded w-full py-2 px-3 text-gray-700"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-600">Número: <span className='text-red-700'>*</span></label>
                    <input
                        type="number"
                        name="houseNumber"
                        value={formData.address.houseNumber}
                        onChange={handleChange}
                        className="border rounded w-full py-2 px-3 text-gray-700"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-600">Complemento:</label>
                    <input
                        type="text"
                        name="adjunct"
                        value={formData.address.adjunct}
                        onChange={handleChange}
                        className="border rounded w-full py-2 px-3 text-gray-700"
                    />
                </div>
            </form>
        </div>
    );
}
