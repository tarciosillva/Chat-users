"use client";
import io from "socket.io-client";
import { useState, useEffect, use } from "react";

import Message from "@/app/components/Messages";
import { BsFillSendFill } from "react-icons/bs";
import User from "../components/User";
import useStore from "../utils/zustand.store";
import { UserInterface } from "../interfaces/user.interface";
import { fetchDataGetAllUsers } from "../service/usersAPI.service";
import UserItem from "../components/User";

interface messageProps {
    name: string;
    text: string;
}

interface payloadProps {
    name: string;
    text: string;
}

interface userActive {
    id: string,
    nome: string
}

export default function Chat() {
    const { users, setUsers } = useStore();
    const userPhone = sessionStorage.getItem('userPhone')
    const socket = io('http://localhost:80');
    const [message, setMessage] = useState("");

    const [messages, setMessages] = useState<messageProps[]>([]);

    const [user, setUser] = useState<UserInterface>({ _id: '', cpf: '', nome: '', sobrenome: '', telefone: '' })

    useEffect(() => {
        socket.emit('disconnectTosocket');
    }, [])

    useEffect(() => {
        fetchDataGetAllUsers()
            .then((response) => {
                setUsers(response.result)
            });
    }, []);

    useEffect(() => {
        var userFind = users.find((user) => user.telefone === userPhone)
        if (userFind) {
            setUser(userFind)
        }
    }, [users])

    useEffect(() => {
        socket.emit('join');

        socket.on("connect", () => {
            console.log("SOCKET CONNECTED!", socket.id);
        });
    }, [])

    useEffect(() => {
        socket.on('msgToClient', (message: payloadProps) => {
            receivedMessageByServer(message);
        });
    }, [message, messages, user.nome]);

    function receivedMessageByServer(message: messageProps) {
        const newMessage: payloadProps = {
            name: message.name,
            text: message.text,
        };
        setMessages([...messages, newMessage]);
    }

    function validateInput() {
        return user?.nome && message.length > 0;
    }

    function sendMessage() {
        if (validateInput()) {
            const messagePayload: payloadProps = {
                name: user?.nome,
                text: message,
            };
            socket.emit('msgToServer', messagePayload);
            setMessage('');
        }
    }

    return (
        <div className="flex justify-center pt-2 h-full">
            <div className="bg-white w-6/12 h-full rounded-lg">
                <div className="h-10 w-full bg-neutral-800 flex items-center justify-between pl-4 pr-4">
                    <p className="text-gray-100 text-lg">Bem vindo(a), {user?.nome}</p>
                </div>
                <div className="w-full h-[88vh]">
                    <div className="h-[83vh] overflow-y-auto">
                        {messages.map((message, index) => (
                            message.name === user.nome ? (
                                <div className="w-full mt-5 flex justify-end pr-5" key={index}>
                                    <Message
                                        sender="you"
                                        text={message.text}
                                    />
                                </div>
                            ) : (
                                <div className="w-full mt-5 pl-5" key={index}>
                                    <Message
                                        sender="other"
                                        Name={message.name}
                                        phone=""
                                        text={message.text}
                                    />
                                </div>
                            )
                        ))}
                    </div>

                    <div className="
                            p-1 
                            w-6/12
                            bg-white 
                            text-zinc-700
                            text-sm
                            border-t-gray-300 
                            border-t
                            placeholder-gray-500
                            bottom-5 
                            absolute
                            flex 
                            items-center 
                            justify-between
                        ">
                        <input
                            className="bg-transparent w-full p-3 text-sm text-slate-900 font-medium"
                            type="text"
                            name=""
                            id=""
                            placeholder="Escreva sua mensagem ..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                        <button
                            className="w-1/12 rounded-md bg-slate-900 p-2 flex items-center justify-center"
                            onClick={() => sendMessage()}
                        >
                            <BsFillSendFill size={15} color="#ffff" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}