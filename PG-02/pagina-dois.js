// script.js
function copiarMensagem(periodo) {
    var nome = localStorage.getItem('inputName');
    var empresa = localStorage.getItem('inputEmpresa');

    if (nome && empresa) {
        var saudacao = '';
        var mensagem;

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
                mensagem = 'Como posso ajudar?';
                break;
            case 'explica':
                mensagem = 'Não consegui entender direito, poderia me explicar melhor? Se preferir pode mandar áudio.';
                break;
            case 'encerrar':
                mensagem = 'Vou estar encerrando o chat aqui então, qualquer coisa estamos à disposição, tenha um ótimo dia! 😊';
                break;
            default:
                saudacao = 'Olá';
        }

        if (saudacao) {
            mensagem = `${saudacao} Aqui é o ${nome} do suporte da ${empresa}, tudo bem?`;
        }

        // Copiar a mensagem usando a API moderna
        navigator.clipboard.writeText(mensagem).then(() => {
            alert('Mensagem copiada para a área de transferência!');
        }).catch(err => {
            alert('Erro ao copiar a mensagem: ' + err);
        });
    } else {
        alert('Por favor, preencha o nome e o nome da empresa antes de copiar a mensagem!');
    }
}

function mostrarFormulario() {
    document.getElementById('novoQuadroForm').style.display = 'block';
}

function salvarMensagem() {
    var titulo = document.getElementById('titulo').value;
    var mensagem = document.getElementById('mensagem').value;

    if (titulo.length > 0 && titulo.length <= 30 && mensagem.length > 0 && mensagem.length <= 200) {
        var mensagensSalvas = JSON.parse(localStorage.getItem('mensagensSalvas')) || [];
        mensagensSalvas.push({ titulo: titulo, mensagem: mensagem });
        localStorage.setItem('mensagensSalvas', JSON.stringify(mensagensSalvas));
        adicionarBotaoMensagem(titulo, mensagem);
        document.getElementById('titulo').value = '';
        document.getElementById('mensagem').value = '';
        document.getElementById('novoQuadroForm').style.display = 'none';
    } else {
        alert('O título deve ter até 30 caracteres e a mensagem deve ter até 200 caracteres.');
    }
}

function adicionarBotaoMensagem(titulo, mensagem) {
    var menuMensagens = document.getElementById('menuMensagens');

    var divBotao = document.createElement('div');
    divBotao.className = 'mensagem-container';

    var botao = document.createElement('button');
    botao.className = 'btn';
    botao.innerText = titulo;
    botao.onclick = function() {
        copiarMensagemPersonalizada(mensagem);
    };

    var botaoEditar = document.createElement('button');
    botaoEditar.className = 'btn-editar';
    botaoEditar.innerText = '';
    botaoEditar.onclick = function() {
        editarMensagem(titulo, mensagem, botao);
    };

    var botaoExcluir = document.createElement('button');
    botaoExcluir.className = 'btn-excluir';
    botaoExcluir.innerText = '';
    botaoExcluir.onclick = function() {
        excluirMensagem(titulo, divBotao);
    };

    divBotao.appendChild(botao);
    divBotao.appendChild(botaoEditar);
    divBotao.appendChild(botaoExcluir);

    menuMensagens.appendChild(divBotao);
}

function copiarMensagemPersonalizada(mensagem) {
    navigator.clipboard.writeText(mensagem).then(() => {
        alert('Mensagem copiada para a área de transferência!');
    }).catch(err => {
        alert('Erro ao copiar a mensagem: ' + err);
    });
}

function editarMensagem(tituloAntigo, mensagemAntiga, botao) {
    var novoTitulo = prompt('Edite o título:', tituloAntigo);
    var novaMensagem = prompt('Edite a mensagem:', mensagemAntiga);

    if (novoTitulo !== null && novaMensagem !== null && novoTitulo.length <= 30 && novaMensagem.length <= 200) {
        var mensagensSalvas = JSON.parse(localStorage.getItem('mensagensSalvas')) || [];
        var index = mensagensSalvas.findIndex(msg => msg.titulo === tituloAntigo && msg.mensagem === mensagemAntiga);
        if (index !== -1) {
            mensagensSalvas[index] = { titulo: novoTitulo, mensagem: novaMensagem };
            localStorage.setItem('mensagensSalvas', JSON.stringify(mensagensSalvas));
            botao.innerText = novoTitulo;
        }
    } else {
        alert('O título deve ter até 30 caracteres e a mensagem deve ter até 200 caracteres.');
    }
}

function excluirMensagem(titulo, divBotao) {
    var mensagensSalvas = JSON.parse(localStorage.getItem('mensagensSalvas')) || [];
    var index = mensagensSalvas.findIndex(msg => msg.titulo === titulo);
    if (index !== -1) {
        mensagensSalvas.splice(index, 1);
        localStorage.setItem('mensagensSalvas', JSON.stringify(mensagensSalvas));
        divBotao.remove();
    }
}

window.onload = function() {
    var mensagensSalvas = JSON.parse(localStorage.getItem('mensagensSalvas')) || [];
    mensagensSalvas.forEach(function(mensagemObj) {
        adicionarBotaoMensagem(mensagemObj.titulo, mensagemObj.mensagem);
    });
};
