import Usuario from "../../models/User";

interface FormGeneralProps {
    title: string
    formData: any
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    handleClose?: () => void
    usuario?: Usuario
    mobile?: boolean
}

export default function FormGeneral({ title, formData, handleChange, handleClose, usuario, mobile }: FormGeneralProps) {
    return (
        <div className="flex flex-col justify-between bg-transparent border-4 border-gray-600 rounded-lg p-2 relative text-xsm">
            <button
                className={`absolute top-2 right-2 bg-red-500 text-white rounded px-1.5 py-0.5 text-xsm ${mobile ? 'hidden' : ''}`}
                onClick={handleClose}
            >
                X
            </button>             
            <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
            <form className="mb-2">
                <div className="mb-4">
                    <label className="block text-gray-600">Nome:  <span className='text-red-700'>*</span></label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="border rounded w-full py-2 px-3 text-gray-700"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-600">Telefone: <span className='text-red-700'>*</span></label>
                    <input
                        type="number"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="border rounded w-full py-2 px-3 text-gray-700"
                    />
                </div>
                <div className={`mb-4`}>
                    <label className="block text-gray-600">CPF: <span className='text-red-700'>*</span></label>
                    <input
                        type="number"
                        name="cpf"
                        value={formData.cpf}
                        onChange={handleChange}
                        className="border rounded w-full py-2 px-3 text-gray-700"
                    />
                </div>
                <div>
                    <label className="block text-gray-600">Email:</label>
                    <label>{usuario?.email}</label>
                </div>
            </form>
        </div>
    );
}
