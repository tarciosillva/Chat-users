"use client";
import { useState, useEffect } from "react";
import Tr from "../components/Tr";
import { fetchDataGetAllUsers } from "../service/usersAPI.service";
import useStore from "../utils/zustand.store";

export default function Admin() {
    const { users, setUsers } = useStore();
    useEffect(() => {
        fetchDataGetAllUsers()
            .then((response) => {
                setUsers(response.result)
            });
    }, []);

    return (
        <div className="p-5">
            <h3 className="text-slate-800 mb-3">
                Gerenciador de usuários
            </h3>
            <table className="min-w-full bg-white shadow-md overflow-hidden">
                <thead className="bg-gray-600">
                    <tr>
                        <th className="py-2 px-4 text-center"> </th>
                        <th className="py-2 px-4 text-center">Nome</th>
                        <th className="py-2 px-4 text-center">Sobrenome</th>
                        <th className="py-2 px-4 text-center">Telefone</th>
                        <th className="py-2 px-4 text-center">CPF</th>
                        <th className="py-2 px-4 text-center">{" "}</th>
                        <th className="py-2 px-4 text-center">{" "}</th>
                    </tr>
                </thead>
                <tbody>
                    <Tr
                        _id=""
                        nome={'Insira o nome...'}
                        sobrenome={'Insira o sobrenome...'}
                        cpf={'Insira o CPF...'}
                        telefone={'telefone (DDD)9XXXXXXXX'}
                        indexCount={0}
                        buttonType="save"
                    />
                    {users.map((user, index) => (
                        <Tr
                            key={index}
                            _id={user._id}
                            nome={user.nome}
                            sobrenome={user.sobrenome}
                            cpf={user.cpf}
                            telefone={user.telefone}
                            indexCount={index + 1}
                            buttonType="delete"
                        />
                    ))}
                </tbody>
            </table>

        </div>
    )
}