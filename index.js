const express = require('express');
const app = express();
const port = 3000;
const router = require('./routers/index');
const conexao = require('./infraestrutura/conexao');
const tabelas = require('./infraestrutura/tabelas');

tabelas.init(conexao);

router(app);

app.listen(3000, (error) => {
    if(error){
        console.log('deu ruim')
        return;
    } else {
        console.log('deu bom')
    }
});