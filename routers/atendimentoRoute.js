const { Router } = require('express');
const AtendimentoController = require('../controller/atendimentoController');
const router = Router();

//get post put delete

router.get('/atendimentos', AtendimentoController.listConversations);

router.post('/mensagens', AtendimentoController.sendMessage);

router.get('/atendimentos/:idConversa/mensagens', AtendimentoController.listMessages);


router.delete('/atendimentos/:id', (req, res) => {
    const { id } = req.params;
    res.send('Chegou aqui, estamos deletando o atendimento ' + id + '...');
});

module.exports = router;
