import Usuario from "../../models/User";

interface FormGeneralProps {
    formData: any;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleClose: () => void;
    usuario?: Usuario
}

export default function FormGeneral({ formData, handleChange, handleClose, usuario }: FormGeneralProps) {
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
        </div>
    );
}
