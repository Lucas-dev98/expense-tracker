# 💸 Gestão de Gastos IA

Bem-vindo ao **Gestão de Gastos IA**!  
Um sistema completo para controle financeiro pessoal, com insights automáticos de IA, gráficos, autenticação segura e deploy pronto para nuvem.

---

## 🚀 Tecnologias Utilizadas

- **Frontend:** React + TypeScript + TailwindCSS + SASS
- **Backend:** Node.js + Express
- **Banco de Dados:** Firebase Firestore
- **Autenticação:** Firebase Authentication
- **IA:** Gemini (Google AI Studio)
- **Deploy:** Azure App Service (backend), Firebase Hosting (frontend)

---

## ✨ Funcionalidades

- Cadastro e login de usuários
- Adição, edição e remoção de gastos
- Visualização de lista de gastos e gráfico de evolução
- Geração automática de insights financeiros com IA
- Interface responsiva e moderna
- Deploy automatizado via GitHub Actions

---

## 📁 Estrutura do Projeto
expense-tracker/ backend/ controllers/ models/ routes/ services/ utils/ config/ index.js package.json .env serviceAccountKey.json # NÃO subir para o GitHub! frontend/ src/ components/ hooks/ pages/ types/ utils/ context/ services/ App.tsx index.tsx public/ package.json .env firebase.json tailwind.config.js tsconfig.json


---

## 🛠️ Como rodar localmente

### 1. Pré-requisitos

- Node.js 18+
- Conta no Firebase (Firestore e Authentication ativados)
- Chave de serviço do Firebase (`serviceAccountKey.json`) na pasta `backend/`
- API Key do Gemini

### 2. Backend

```sh
cd backend
npm install
# Crie o arquivo .env com:
# GEMINI_API_KEY=sua-chave-gemini
npm start
cd frontend
npm install
# Crie o arquivo .env com as variáveis do Firebase:
# REACT_APP_FIREBASE_API_KEY=...
# REACT_APP_FIREBASE_AUTH_DOMAIN=...
# REACT_APP_FIREBASE_PROJECT_ID=...
# REACT_APP_FIREBASE_STORAGE_BUCKET=...
# REACT_APP_FIREBASE_MESSAGING_SENDER_ID=...
# REACT_APP_FIREBASE_APP_ID=...
# REACT_APP_API_URL=http://localhost:3001
npm start

📜 Scripts úteis
Backend
npm start — inicia o servidor Express
npm test — (placeholder, pode ser customizado)
Frontend
npm start — inicia o React em modo desenvolvimento
npm run build — gera o build de produção
npm test — roda os testes
📬 Contato
Dúvidas ou sugestões?
Abra uma issue ou envie um PR!
Feito com 💙 por [Seu Nome ou Time]

