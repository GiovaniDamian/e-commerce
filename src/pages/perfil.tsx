import useAppData from "../data/hook/useAppData";
import useAuth from "../data/hook/useAuth"

export default function AvatarUsuario(props: any) {
    const { usuario } = useAuth()
    const { cart } = useAppData();
    return (<>
        <h1>{usuario?.name}</h1>
        <p>{usuario?.id}</p>
        <p>{usuario?.cpf}</p>
        <p>{usuario?.email}</p>
        <p>{usuario?.historic}</p>
        <p>{usuario?.phone}</p>
        <p>{usuario?.address?.state}</p>


    </>
    )
}
