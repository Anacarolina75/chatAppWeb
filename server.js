const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const router = require('./routers/index');
const conexao = require('./infraestrutura/conexao');
const tabelas = require('./infraestrutura/tabelas');

// Configuração para servir arquivos estáticos do frontend
app.use(express.static(path.join(__dirname, 'frontend')));

// Middleware para parsear JSON no corpo das requisições
app.use(express.json());

// Inicializar tabelas e conectar com o banco de dados
tabelas.init(conexao);

// Configurar rotas
router(app);

// Iniciar o servidor
app.listen(port, (error) => {
    if (error) {
        console.log('Erro ao iniciar o servidor:', error);
        return;
    } else {
        console.log(`Servidor rodando na porta ${port}`);
    }
});
