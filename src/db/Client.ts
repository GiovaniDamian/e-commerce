import { snap } from "gsap/all";
import firebase from "../firebase/config";
import Usuario from "../models/User";
import UserRepository from "../models/UserRepository";

export default class UserFireBase implements UserRepository {

    #conversor = {
        toFirestore(cliente: Usuario) {
            return {
                name: cliente.name,
                email: cliente.email,
                cpf: cliente.cpf,
                phone: cliente.phone,
                address: cliente.address,
                historic: cliente.historic
            }
        },
        fromFirestore(snapshot: firebase.firestore.QueryDocumentSnapshot, options: firebase.firestore.SnapshotOptions): Usuario {
            const dados = snapshot.data(options);
            return new Usuario(snapshot.id, dados?.name, dados?.email, dados?.token, dados?.provider, dados?.imageUrl, dados?.cpf, dados?.phone, dados?.historic, dados?.address)
        }
    }

    async salvar(cliente: Usuario): Promise<Usuario> {
        if (cliente?.id) {
            await this.colecao().doc(cliente.id).set(cliente);
            return cliente;
        } else {
            const docRef = await this.colecao().add(cliente);
            const doc = await docRef.get();
            return this.#conversor.fromFirestore(doc as firebase.firestore.QueryDocumentSnapshot, {});
        }
    }

    async obter(cliente: Usuario): Promise<Usuario> {
        const doc = await this.colecao().doc(cliente.id).get();
        const result = this.#conversor.fromFirestore(doc as firebase.firestore.QueryDocumentSnapshot, {})
        return result
    }

    private colecao() {
        return firebase
            .firestore().collection("clientes")
            .withConverter(this.#conversor);
    }
}
