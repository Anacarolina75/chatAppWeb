class Tabelas {
    init(conexao) {
        this.conexao = conexao;
        this.criarTabelas();
    }

    criarTabelas() {
        const sqlContatosClientes = `
            CREATE TABLE IF NOT EXISTS contatosClientes (
                idContato INT AUTO_INCREMENT PRIMARY KEY,
                numero VARCHAR(15) UNIQUE NOT NULL,
                nomeCliente VARCHAR(255),
                emailCliente VARCHAR(255)
            );
        `;

        const sqlUsuariosInternos = `
            CREATE TABLE IF NOT EXISTS usuariosInternos (
                idUsuario INT AUTO_INCREMENT PRIMARY KEY,
                nomeUsuarioInterno VARCHAR(255) NOT NULL,
                email VARCHAR(255) UNIQUE,
                numeroWhats VARCHAR(15),
                tagUsuario VARCHAR(15) NOT NULL
            );
        `;

        const sqlConversas = `
            CREATE TABLE IF NOT EXISTS conversas (
                idConversa INT AUTO_INCREMENT PRIMARY KEY,
                idContato INT,
                idUsuario INT NOT NULL,
                dataCriacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (idContato) REFERENCES contatosClientes(idContato),
                FOREIGN KEY (idUsuario) REFERENCES usuariosInternos(idUsuario)
            );
        `;

        const sqlMensagens = `
            CREATE TABLE IF NOT EXISTS mensagens (
                idMensagem INT AUTO_INCREMENT PRIMARY KEY,
                idConversa INT,
                isMe BOOLEAN,
                idUsuario INT,
                textoMensagem TEXT,
                dataEnvio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                tipoMidia ENUM('texto', 'imagem', 'video', 'documento'),
                caminhoMidia VARCHAR(255),
                FOREIGN KEY (idConversa) REFERENCES conversas(idConversa) ON DELETE CASCADE,
                FOREIGN KEY (idUsuario) REFERENCES usuariosInternos(idUsuario)
            );
        `;

        const sqlTagConversa = `
            CREATE TABLE IF NOT EXISTS tagConversa (
                idTagConversa INT AUTO_INCREMENT PRIMARY KEY,
                nomeTagConversa VARCHAR(255) NOT NULL,
                corTagConversa VARCHAR(7)
            );
        `;

        const sqlConversasTag = `
            CREATE TABLE IF NOT EXISTS conversas_tag (
                idConversa INT,
                idTagConversa INT,
                PRIMARY KEY (idConversa, idTagConversa),
                FOREIGN KEY (idConversa) REFERENCES conversas(idConversa) ON DELETE CASCADE,
                FOREIGN KEY (idTagConversa) REFERENCES tagConversa(idTagConversa)
            );
        `;

        // Executar as queries para criar as tabelas
        this.conexao.query(sqlContatosClientes, (error) => {
            if (error) {
                console.log("Erro ao criar a tabela contatosClientes:", error.message);
                return;
            }
            console.log("Tabela contatosClientes criada com sucesso!");
        });

        this.conexao.query(sqlUsuariosInternos, (error) => {
            if (error) {
                console.log("Erro ao criar a tabela usuariosInternos:", error.message);
                return;
            }
            console.log("Tabela usuariosInternos criada com sucesso!");
        });

        this.conexao.query(sqlConversas, (error) => {
            if (error) {
                console.log("Erro ao criar a tabela conversas:", error.message);
                return;
            }
            console.log("Tabela conversas criada com sucesso!");
        });

        this.conexao.query(sqlMensagens, (error) => {
            if (error) {
                console.log("Erro ao criar a tabela mensagens:", error.message);
                return;
            }
            console.log("Tabela mensagens criada com sucesso!");
        });

        this.conexao.query(sqlTagConversa, (error) => {
            if (error) {
                console.log("Erro ao criar a tabela tagConversa:", error.message);
                return;
            }
            console.log("Tabela tagConversa criada com sucesso!");
        });

        this.conexao.query(sqlConversasTag, (error) => {
            if (error) {
                console.log("Erro ao criar a tabela conversas_tag:", error.message);
                return;
            }
            console.log("Tabela conversas_tag criada com sucesso!");
        });
    }
}

module.exports = new Tabelas();
