import useAuth from "../../data/hook/useAuth"
export default function PerflWeb() {
    const { usuario } = useAuth()
    return (
        <div className='flex flex-row m-2 h-full'>
            <div className='flex-col bg-transparent border-4 border-gray-600 rounded-lg p-2 flex space-x-4'>
                <div className="flex flex-row space-x-4">
                    <img src="./images/profile.jpg" alt="Foto de perfil" className="w-32 h-32 rounded-full object-cover border-4 border-gray-600" />
                    <div className={`flex flex-col justify-start rounded-lg px-2 h-3/4 bg-transparent`}>
                        <h1 className="text-2xl font-bold text-gray-800">Informações Gerais</h1>
                        <p className="text-gray-600">Nome: {usuario?.name}</p>
                        <p className="text-gray-600">Email: {usuario?.email.slice(0, 4)}******</p>
                        <p className="text-gray-600">Telefone: {usuario?.phone.slice(0, 4)}****** </p>
                    </div>
                </div>
                <div className={`flex flex-col justify-start rounded-lg px-2 h-3/4 bg-transparent`}  >
                    <h1 className="text-2xl font-bold text-gray-800">Informações Pessoais</h1>
                    <p className="text-gray-600">Estado: {usuario?.address.state}</p>
                    <p className="text-gray-600">Cidade: {usuario?.address.city}</p>
                    <p className="text-gray-600">Bairro: {usuario?.address.neighborhood}</p>
                    <p className="text-gray-600">Rua: {usuario?.address.street}</p>
                    <p className="text-gray-600">Número: {usuario?.address.houseNumber}</p>
                    <p className="text-gray-600">Complemento: {usuario?.address.adjunct}</p>
                </div>
                <div>teste</div>
            </div>
        </div>
    )
}
