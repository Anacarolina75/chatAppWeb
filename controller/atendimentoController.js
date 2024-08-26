const atendimentoModel = require("../model/atendimentoModel");

const AtendimentoController = {
    sendMessage: (req, res) => {
        console.log('Requisição recebida:', req.body);
        const { idConversa, isMe, idUsuario, textoMensagem, tipoMidia, caminhoMidia } = req.body;
        
        atendimentoModel.addMessage(idConversa, isMe, idUsuario, textoMensagem, tipoMidia, caminhoMidia, (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Erro ao enviar mensagem' });
            }
            res.json({ message: 'Mensagem enviada com sucesso!' });
        });
    },

    listConversations: (req, res) => {
        atendimentoModel.getAllConversations((err, results) => {
            if (err) {
                return res.status(500).json({ error: 'Erro ao buscar conversas' });
            }
            res.json(results);
        });
    },

    listMessages: (req, res) => {
        const { idConversa } = req.params;
        atendimentoModel.getMessagesByConversationId(idConversa, (err, results) => {
            if (err) {
                return res.status(500).json({ error: 'Erro ao buscar mensagens' });
            }
            res.json(results);
        });
    },


};

module.exports = AtendimentoController;