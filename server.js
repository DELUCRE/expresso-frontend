const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Roteamento para páginas específicas
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/sobre', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'sobre.html'));
});

app.get('/servicos', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'servicos.html'));
});

app.get('/contato', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'contato.html'));
});

app.get('/rastreamento', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'rastreamento.html'));
});

app.get('/gestao/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'gestao', 'login.html'));
});

// Fallback para SPA - sempre retorna index.html para rotas não encontradas
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Frontend server running on port ${PORT}`);
});
