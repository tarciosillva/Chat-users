"use client";
import { useState, useEffect } from "react"
import Link from 'next/link';
import AcessElementForm from './components/acessElementForm';
import useStore from "./utils/zustand.store";
import { fetchDataGetAllUsers, fetchDataLoginAdmin } from "./service/usersAPI.service";

export default function Home() {
  const { users, setUsers } = useStore();

  const [userPhone, setUserPhone] = useState<string>('')

  const [adminPhone, setAdminPhone] = useState<string>('')
  const [adminPassword, setAdminPassword] = useState<string>('')

  useEffect(() => {
    fetchDataGetAllUsers()
      .then((response) => {
        setUsers(response.result)
      });
  }, []);

  const saveStorageUserPhone = () => {
    if (!userPhone) {
      setUserPhone('')
      window.alert('Insira o número de telefone para entrar no chat.')
      return
    }
    var userFind = users.find((user) => user.telefone == userPhone)
    if (!userFind) {
      setUserPhone('')
      window.alert('Insira um número de telefone pré cadastrado na api')
      return
    }
    sessionStorage.setItem('userPhone', userPhone)
    window.location.href = "/chat"
  }

  const logginAdmin = () => {
    fetchDataLoginAdmin({ telefone: adminPhone, password: adminPassword }).then((response) => {

      if (response.access_token) {
        sessionStorage.setItem('TOKEN', response.access_token)
        window.location.href = "/admin"
      } else {
        window.alert('Telefone/Senha inválidos')
      }
    })
  }

  return (
    <main className="h-screen w-full flex justify-center items-center">
      <div className='w-1/2 border-r-gray-400 border-r'>
        <div className='grid m-10 gap-6'>
          <AcessElementForm
            value={userPhone}
            label='Insira o número de telefone para entrar no chat.'
            onChange={setUserPhone}
            placeholder='(00)9XXXXXXXX'
          />
          <button
            onClick={() => saveStorageUserPhone()}

            className="text-zinc-100 bg-gray-950 p-3 rounded-lg cursor-pointer text-center"
          >
            Acessar chat
          </button>
        </div>
      </div>
      <div className='w-1/2'>
        <div className='grid m-10 gap-6'>
          <AcessElementForm
            value={adminPhone}
            label='Insira o número de telefone admin'
            onChange={setAdminPhone}
            placeholder='(00)9XXXXXXXX'
          />
          <AcessElementForm
            value={adminPassword}
            label='Insira a senha admin'
            onChange={setAdminPassword}
            placeholder='***'
          />
          <button
            onClick={() => logginAdmin()}
            className="text-zinc-100 bg-gray-950 p-3 rounded-lg cursor-pointer text-center"
          >
            Acessar administrador
          </button>
        </div>
      </div>
    </main>
  )
}
