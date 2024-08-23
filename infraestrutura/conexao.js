const mysql = require('mysql2');

// Criação da conexão com o banco de dados
const conexao = mysql.createConnection({
    host: 'localhost',     
    user: 'root',   
    port: 3306, 
    password: 'Abc12345',  
    database: 'servicoConversas' 
});

module.exports = conexao;