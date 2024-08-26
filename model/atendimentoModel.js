const conexao = require('../infraestrutura/conexao');

const Conversa = {
    getAllConversations: (callback) => {
        const sql = `
            SELECT c.idConversa, cc.nomeCliente, m.textoMensagem, m.dataEnvio
            FROM conversas c
            JOIN contatosClientes cc ON c.idContato = cc.idContato
            LEFT JOIN mensagens m ON c.idConversa = m.idConversa
            WHERE m.idMensagem = (SELECT MAX(idMensagem) FROM mensagens WHERE idConversa = c.idConversa)
            ORDER BY m.dataEnvio DESC
        `;
        conexao.query(sql, callback);
    },

    getMessagesByConversationId: (idConversa, callback) => {
        const sql = `
            SELECT m.*, u.nomeUsuarioInterno
            FROM mensagens m
            LEFT JOIN usuariosInternos u ON m.idUsuario = u.idUsuario
            WHERE m.idConversa = ?
            ORDER BY m.dataEnvio ASC
        `;
        conexao.query(sql, [idConversa], callback);
    },

    addMessage: (idConversa, isMe, idUsuario, textoMensagem, tipoMidia, caminhoMidia, callback) => {
        const sql = `
            INSERT INTO mensagens (idConversa, isMe, idUsuario, textoMensagem, tipoMidia, caminhoMidia)
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        conexao.query(sql, [idConversa, isMe, idUsuario, textoMensagem, tipoMidia, caminhoMidia], callback);
    },

    getContactById: (idContato, callback) => {
        const sql = `SELECT * FROM contatosClientes WHERE idContato = ?`;
        conexao.query(sql, [idContato], callback);
    },

    getUserById: (idUsuario, callback) => {
        const sql = `SELECT * FROM usuariosInternos WHERE idUsuario = ?`;
        conexao.query(sql, [idUsuario], callback);
    }

};


module.exports = Conversa;
