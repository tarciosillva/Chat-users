const baseURL = 'http://localhost:3000'

import { UserInterface } from "../interfaces/user.interface"

export interface userCreateProps {
    nome: string
    sobrenome: string
    telefone: string
    cpf: string
}

export async function fetchDataGetAllUsers() {
    try {
        const response = await fetch(`${baseURL}/users`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log('Error:', error);
        return null;
    }
}

export async function fetchDataLoginAdmin(object: { telefone: string, password: string }) {
    const TOKEN = sessionStorage.getItem('TOKEN')

    try {
        const response = await fetch(`${baseURL}/auth/authentication`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${TOKEN}`
            },
            body: JSON.stringify(object)
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log('Error:', error);
        return null;
    }
}

export async function fetchDataPostUser(user: userCreateProps) {
    const TOKEN = sessionStorage.getItem('TOKEN')

    try {
        const response = await fetch(`${baseURL}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${TOKEN}`
            },
            body: JSON.stringify(user)
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log('Error:', error);
        return null;
    }
}

export async function fetchDataPutUser(user: UserInterface) {
    const TOKEN = sessionStorage.getItem('TOKEN')

    try {
        const response = await fetch(`${baseURL}/users/${user._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${TOKEN}`
            },
            body: JSON.stringify(user)
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log('Error:', error);
        return null;
    }
}

export async function fetchDataDeleteUser(userId: string) {
    const TOKEN = sessionStorage.getItem('TOKEN')

    try {
        const response = await fetch(`${baseURL}/users/${userId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${TOKEN}`
            }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log('Error:', error);
        return null;
    }
}