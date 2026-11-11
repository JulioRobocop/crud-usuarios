import { useEffect, useState, type FormEvent } from "react"
import type { User } from "./types"
import { createUser, listUsers, updateUser } from "./api";


function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState('');

  async function loadUsers() {
    setUsers(await listUsers());
  }

  useEffect(() => {
    loadUsers();
  }, []);

  function startEdit(user: User) {
    setName(user.name);
    setEmail(user.email);
    setRole(user.role ?? '');
    setEditingId(user.id)
  }

  function resetForm() {
    setName('');
    setEmail('');
    setRole('');
    setEditingId(null);
    setError('');
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    try {
      const input = { name, email, role: editingId ? role : role || undefined };
      if (editingId) {
        await updateUser(editingId, input)
      } else {
        await createUser(input);
      }
      resetForm();
      await loadUsers();
    } catch (error) {
      setError((error as Error).message);
    }

  }


  return (
    <>
      <h1>Usuarios:</h1>
      <form onSubmit={handleSubmit}>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nome" />
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="E-mail" />
        <input value={role} onChange={(e) => setRole(e.target.value)} placeholder="Cargo (opcional)" />
        <button type="submit">{editingId ? 'Salvar' : "Criar"}</button>
        {editingId && (
          <button type="button" onClick={resetForm}>Cancelar</button>
        )}
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Role</th>
            <th>Criado em</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role || '-'}</td>
              <td>{new Date(u.createdAt).toLocaleString('pt-BR')}</td>
              <td><button onClick={() => startEdit(u)}>Editar</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default App
