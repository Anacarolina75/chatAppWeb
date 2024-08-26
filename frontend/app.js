document.addEventListener('DOMContentLoaded', () => {
    const conversationsList = document.getElementById('conversations');
    const messagesContainer = document.getElementById('messages');
    const contactName = document.getElementById('contact-name');
    const messageInput = document.getElementById('message');
    const sendButton = document.getElementById('send');
    let currentConversationId = null;

    // Carregar conversas
    function loadConversations() {
        fetch('/atendimentos')
            .then(response => response.json())
            .then(conversations => {
                conversationsList.innerHTML = conversations.map(conversation => `
                    <li data-id="${conversation.idConversa}">
                        ${conversation.contactName}
                    </li>
                `).join('');
            });
    }

    // Carregar mensagens da conversa selecionada
    function loadMessages(conversationId) {
        fetch(`/atendimentos/${conversationId}/mensagens`)
            .then(response => response.json())
            .then(messages => {
                messagesContainer.innerHTML = messages.map(message => `
                    <div class="${message.isMe ? 'my-message' : 'other-message'}">
                        ${message.textoMensagem}
                    </div>
                `).join('');
                messagesContainer.scrollTop = messagesContainer.scrollHeight;
            });
    }

    // Enviar mensagem
    function sendMessage() {
        const message = messageInput.value;
        if (!message || !currentConversationId) return;

        fetch(`/atendimentos/${currentConversationId}/mensagens`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                idConversa: currentConversationId,
                isMe: true,
                idUsuario: 1, // Ajuste conforme necessário
                textoMensagem: message,
                tipoMidia: 'texto',
                caminhoMidia: null
            })
        })
        .then(response => response.json())
        .then(() => {
            messageInput.value = '';
            loadMessages(currentConversationId);
        });
    }

    // Eventos
    conversationsList.addEventListener('click', (event) => {
        if (event.target.tagName === 'LI') {
            currentConversationId = event.target.getAttribute('data-id');
            loadMessages(currentConversationId);
            contactName.textContent = event.target.textContent;
        }
    });

    sendButton.addEventListener('click', sendMessage);
    messageInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    });

    loadConversations();
});
