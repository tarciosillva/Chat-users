import { fetchDataDeleteUser, fetchDataPostUser, fetchDataPutUser } from "@/app/service/usersAPI.service"
import { useState } from "react"
import { MdOutlineLibraryAdd } from "react-icons/md"

export interface UserInterface {
    _id: string
    indexCount: number
    nome: string
    sobrenome: string
    telefone: string
    cpf: string
    buttonType: 'delete' | 'save'
}

export default function Tr(props: UserInterface) {
    const [changed, setChanged] = useState<boolean>(false)
    const [nome, setnome] = useState<string>(props.nome)
    const [sobrenome, setsobrenome] = useState<string>(props.sobrenome)
    const [telefone, settelefone] = useState<string>(props.telefone)
    const [cpf, setcpf] = useState<string>(props.cpf)

    const createUser = () => {
        fetchDataPostUser({
            cpf,
            nome,
            sobrenome,
            telefone
        }).then((response) => {
            console.log(response)
            if (response.success) {
                window.location.reload()
            }
        })
    }

    const deleteUser = () => {
        fetchDataDeleteUser(props._id).then((response) => {
            console.log(response)
            if (response.success) {
                window.location.reload()
            }
        })
    }

    const updateUser = () => {
        fetchDataPutUser({
            _id: props._id,
            cpf,
            nome,
            sobrenome,
            telefone
        }).then((response) => {
            console.log(response)
            if (response.success) {
                window.location.reload()
            }
        })
    }

    return (
        <tr className={props.buttonType==="save"?('border-b-gray-300 border-b'):('')}>
        
            <td className="py-2 px-4 text-gray-800 flex justify-center">
                {props.buttonType === "save" ? (
                    <MdOutlineLibraryAdd size={25} color="green" />
                ) : (
                    props.indexCount
                )}
            </td>
            <td className="py-2 px-4 text-gray-800 text-center">
                <input
                    className="bg-transparent w-full text-center font-medium"
                    type="text"
                    placeholder={nome}
                    onChange={(e) => {
                        setnome(e.target.value),
                            setChanged(true)
                    }}
                />
            </td>
            <td className="py-2 px-4 text-gray-800 text-center">
                <input
                    className="bg-transparent w-full text-center font-medium"
                    type="text"
                    placeholder={sobrenome}
                    onChange={(e) => {
                        setsobrenome(e.target.value),
                            setChanged(true)
                    }}
                />
            </td>
            <td className="py-2 px-4 text-gray-800 text-center">
                <input
                    className="bg-transparent w-full text-center font-medium"
                    type="text"
                    placeholder={telefone}
                    onChange={(e) => {
                        settelefone(e.target.value),
                            setChanged(true)
                    }}
                />
            </td>
            <td className="py-2 px-4 text-gray-800 text-center">
                <input
                    className="bg-transparent w-full text-center font-medium"
                    type="text"
                    placeholder={cpf}
                    onChange={(e) => {
                        setcpf(e.target.value),
                            setChanged(true)
                    }}
                />
            </td>
            {!changed && props.buttonType === "delete" && (
                <td className="py-2 px-4 flex justify-center">
                    <button
                        onClick={() => deleteUser()}
                        className="bg-red-600 text-white p-2 cursor-pointer rounded-md"
                    >
                        Excluir
                    </button>
                </td>
            )}

            {changed && props.buttonType === "delete" && (
                <td className="py-2 px-4 flex justify-center">
                    <button
                        onClick={() => updateUser()}
                        className="bg-yellow-600 text-white p-2 cursor-pointer rounded-md"
                    >
                        Atualizar
                    </button>
                </td>
            )}

            {props.buttonType === "save" && (
                <td className="py-2 px-4 flex justify-center">
                    <button
                        onClick={() => createUser()}
                        className="bg-green-600 text-white p-2 cursor-pointer rounded-md"
                    >
                        Salvar
                    </button>
                </td>
            )}
        </tr>
    )
}