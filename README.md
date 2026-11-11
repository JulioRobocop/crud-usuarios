# CRUD de Usuários — React + NestJS

Aplicação full-stack para listar, criar e editar usuários.

- **Backend:** NestJS + TypeScript (armazenamento em memória)
- **Frontend:** React + TypeScript (Vite)

## Pré-requisitos

- **Node.js 24.x** (desenvolvido e testado com 24.19.0)
- npm (incluso no Node)

## Estrutura

```
crud-usuarios/
├── backend/   # API NestJS (porta 3000)
└── frontend/  # React + Vite (porta 5173)
```

## Como rodar

### Backend

```bash
cd backend
npm install
npm run start:dev
```

A API sobe em `http://localhost:3000`.

### Frontend

Em outro terminal, com o backend rodando:

```bash
cd frontend
npm install
npm run dev
```

Acesse `http://localhost:5173`.

## Endpoints

| Método | Rota | Descrição | Respostas |
|---|---|---|---|
| GET | `/users` | Lista todos os usuários | 200 |
| GET | `/users/:id` | Busca um usuário pelo id | 200, 404 |
| POST | `/users` | Cria um usuário | 201, 400, 409 |
| PATCH | `/users/:id` | Edita um usuário (parcial) | 200, 400, 404, 409 |

Exemplo de body (POST):

```json
{ "name": "Julio", "email": "julio@email.com", "role": "admin" }
```

## Validações

- `name` e `email` são obrigatórios
- `email` precisa ter formato válido
- `email` é único (na criação e na edição)
- `id` (UUID) e `createdAt` são gerados no backend; campos extras enviados no body são descartados

## Decisões técnicas

- **Email duplicado retorna 409 Conflict**: Uso 400 quando os dados enviados são inválidos (formato, campo obrigatório). Email duplicado retorna 409 porque o dado em si é válido, mas conflita com o estado atual do recurso (já existe um usuário com aquele email). 
- **PATCH em vez de PUT**: Utilizar um método PATCH permite a alteração de campos específicos do dado, diferente do método PUT, o qual altera o dado interio.
- **Banco em memória**: Como não há a necessidade da integração com um banco de dados, o banco é salvo em memória e é perdido a cada reinicialização do backend
- **Validação com `class-validator` + `ValidationPipe`**: As regras são declaradas no DTO via decorators e o ValidationPipe global valida cada requisição em runtime, retornando 400 com as mensagens de erro. O whitelist: true descarta campos não declarados.

## Principais dependências

### Backend

- NestJS 12
- class-validator 0.15 / class-transformer 0.5
- TypeScript 6

### Frontend

- React 19
- Vite 8
- TypeScript 6