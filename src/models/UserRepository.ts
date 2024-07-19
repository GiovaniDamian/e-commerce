import Usuario from "./User"

export default interface UsuarioRepository {
    salvar(cliente: Usuario): Promise<Usuario>
    obter(cliente: Usuario): Promise<Usuario>
}
