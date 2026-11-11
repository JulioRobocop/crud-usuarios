import type { User, UserInput } from './types'


const API_URL = 'http://localhost:3000/users';

async function handle<T>(res: Response): Promise<T> {
    const data = await res.json();
    if (!res.ok) {
        const msg = Array.isArray(data.message) ? data.message.join(', ') : data.message;
        throw new Error(msg);
    }
    return data;
}

export async function listUsers(): Promise<User[]> {
    return handle(await fetch(API_URL));

}

export async function createUser(input: UserInput): Promise<User> {
    return handle(
        await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(input)
        })
    )
}

export async function updateUser(id: string, input: UserInput): Promise<User> {
    return handle(
        await fetch(`${API_URL}/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(input)
        })
    )
}