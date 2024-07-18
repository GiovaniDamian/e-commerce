import Usuario from "./User"

export default interface UsuarioRepository {
    salvar(cliente: Usuario): Promise<Usuario | undefined>
    obter(cliente: Usuario): Promise<Usuario | null>
}
