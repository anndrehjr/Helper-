function copiarMensagem(periodo) {
    // Pega os valores dos campos de entrada diretamente do localStorage
    var nome = localStorage.getItem('inputName');
    var empresa = localStorage.getItem('inputEmpresa');

    // Verifica se os campos de nome e empresa estão preenchidos
    if (nome && empresa) {
        // Define a saudação com base no período do dia
        var saudacao;
        switch (periodo) {
            case 'manha':
                saudacao = 'Bom dia';
                break;
            case 'tarde':
                saudacao = 'Boa tarde';
                break;
            case 'noite':
                saudacao = 'Boa noite';
                break;
            case 'duvida':
                saudacao = 'Como posso ajudar?';
                break;
            case 'explica':
                saudacao = 'Não consegui entender direito, poderia me explicar melhor? Se preferir pode mandar áudio.?';
                break;
            case 'encerrar':
                saudacao = 'Vou estar encerrando o chat aqui então, qualquer coisa estamos a disposição, tenha um ótimo dia! 😊';
                break;
            default:
                saudacao = 'Olá';
        }

        // Monta a mensagem personalizada
        var mensagem = `${saudacao} Aqui é o ${nome} do suporte da ${empresa}, tudo bem?`;

        // Cria um elemento temporário para armazenar o texto
        var elementoTemporario = document.createElement('textarea');
        elementoTemporario.value = mensagem;

        // Adiciona o elemento temporário ao body
        document.body.appendChild(elementoTemporario);

        // Seleciona o texto no elemento temporário
        elementoTemporario.select();

        // Executa o comando de cópia
        document.execCommand('copy');

        // Remove o elemento temporário do body
        document.body.removeChild(elementoTemporario);

        // Alerta de sucesso (opcional)
        alert('Mensagem copiada para a área de transferência!');
    } else {
        // Se os campos de nome e empresa não estiverem preenchidos, alerta o usuário
        alert('Por favor, preencha o nome e o nome da empresa antes de copiar a mensagem!');
    }
}

function salvarMensagem() {
    var mensagem = document.getElementById('mensagem').value;
    if (mensagem) {
        var mensagensSalvas = JSON.parse(localStorage.getItem('mensagensSalvas')) || [];
        mensagensSalvas.push(mensagem);
        localStorage.setItem('mensagensSalvas', JSON.stringify(mensagensSalvas));
        adicionarBotaoMensagem(mensagem);
        document.getElementById('mensagem').value = '';
    } else {
        alert('Por favor, digite uma mensagem para salvar.');
    }
}

function adicionarBotaoMensagem(mensagem) {
    var menuMensagens = document.getElementById('menuMensagens');
    var botao = document.createElement('button');
    botao.className = 'btn';
    botao.innerText = mensagem;
    botao.onclick = function() {
        copiarMensagemPersonalizada(mensagem);
    };
    menuMensagens.appendChild(botao);
}

function copiarMensagemPersonalizada(mensagem) {
    var nome = localStorage.getItem('inputName');
    var empresa = localStorage.getItem('inputEmpresa');

    if (nome && empresa) {
        var mensagemCompleta = `${mensagem} Aqui é o ${nome} do suporte da ${empresa}, tudo bem?`;
        var elementoTemporario = document.createElement('textarea');
        elementoTemporario.value = mensagemCompleta;

        document.body.appendChild(elementoTemporario);
        elementoTemporario.select();
        document.execCommand('copy');
        document.body.removeChild(elementoTemporario);

        alert('Mensagem copiada para a área de transferência!');
    } else {
        alert('Por favor, preencha o nome e o nome da empresa antes de copiar a mensagem!');
    }
}

window.onload = function() {
    var mensagensSalvas = JSON.parse(localStorage.getItem('mensagensSalvas')) || [];
    mensagensSalvas.forEach(function(mensagem) {
        adicionarBotaoMensagem(mensagem);
    });
}
