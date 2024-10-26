// Função para mostrar notificações
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerText = message;

    document.body.appendChild(notification);

    // Exibir a notificação
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);

    // Remover a notificação após 3 segundos
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 500); // Tempo de animação de saída
    }, 3000);
}

// Função para copiar mensagem com base no período
function copiarMensagem(periodo) {
    const nome = localStorage.getItem('inputName');
    const empresa = localStorage.getItem('inputEmpresa');

    if (!nome || !empresa) {
        showNotification('Por favor, preencha o nome e o nome da empresa antes de copiar a mensagem!');
        return;
    }

    const saudacao = getSaudacao(periodo);
    const mensagem = saudacao 
        ? `${saudacao} Aqui é o ${nome} do suporte da ${empresa}, tudo bem?`
        : '';

    // Copiar a mensagem usando a API moderna
    navigator.clipboard.writeText(mensagem)
        .then(() => showNotification('Mensagem copiada para a área de transferência!'))
        .catch(err => showNotification('Erro ao copiar a mensagem: ' + err));
}

// Função auxiliar para determinar a saudação com base no período
function getSaudacao(periodo) {
    switch (periodo) {
        case 'manha': return 'Bom dia';
        case 'tarde': return 'Boa tarde';
        case 'noite': return 'Boa noite';
        case 'duvida': return 'Como posso ajudar?';
        case 'explica': return 'Não consegui entender direito, poderia me explicar melhor? Se preferir pode mandar áudio.';
        case 'encerrar': return 'Vou estar encerrando o chat aqui então, qualquer coisa estamos à disposição, tenha um ótimo dia! 😊';
        default: return 'Olá';
    }
}

// Variável para armazenar a mensagem selecionada
let selectedMessage = null;
let clickTimeout = null; // Variável para controlar o tempo do clique

// Função para mostrar o formulário
function mostrarFormulario() {
    document.getElementById('novoQuadroForm').style.display = 'block';
}

// Evento de teclado para esconder o formulário ao pressionar 'Esc'
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        document.getElementById('novoQuadroForm').style.display = 'none';
    }
});

// Função para salvar a mensagem
function salvarMensagem() {
    const titulo = document.getElementById('titulo').value;
    const mensagem = document.getElementById('mensagem').value;

    if (titulo && mensagem) {
        const mensagensSalvas = JSON.parse(localStorage.getItem('mensagensSalvas')) || [];
        mensagensSalvas.push({ titulo, mensagem });
        localStorage.setItem('mensagensSalvas', JSON.stringify(mensagensSalvas));

        // Cria o quadro com o título e adiciona a mensagem como atributo data
        const quadro = document.createElement('div');
        quadro.className = 'quadro';
        quadro.innerHTML = `<strong>${titulo}</strong>`; // Mantém apenas o título visível
        quadro.dataset.mensagem = mensagem; // Armazena a mensagem oculta no atributo data

        // Adiciona evento de clique para copiar a mensagem e selecionar
        quadro.onclick = () => {
            // Copia a mensagem na primeira vez que clicar
            const mensagemOculta = quadro.dataset.mensagem; // Obtém a mensagem oculta
            navigator.clipboard.writeText(mensagemOculta) // Copia a mensagem
                .then(() => {
                    showNotification('Mensagem copiada!'); // Notifica que a mensagem foi copiada
                })
                .catch(err => {
                    console.error('Erro ao copiar a mensagem: ', err);
                });

            // Configura o timeout para verificar se o segundo clique ocorre
            if (clickTimeout) {
                clearTimeout(clickTimeout); // Limpa o timeout se o segundo clique acontecer
                clickTimeout = null; // Reseta o timeout
                selectMessage(quadro); // Seleciona a mensagem no segundo clique
            } else {
                // Se não for o segundo clique, define um novo timeout
                clickTimeout = setTimeout(() => {
                    clickTimeout = null; // Reseta o timeout se não houver segundo clique
                }, 300); // Ajuste o tempo conforme necessário
            }
        };

        document.getElementById('quadrosContainer').appendChild(quadro);
        showNotification('Mensagem salva!');

        // Limpa os campos do formulário
        document.getElementById('titulo').value = '';
        document.getElementById('mensagem').value = '';
        document.getElementById('novoQuadroForm').style.display = 'none';
    } else {
        showNotification('Por favor, preencha o título e a mensagem!');
    }
}

// Função para selecionar a mensagem
function selectMessage(element) {
    // Remove a seleção da mensagem anterior, se houver
    if (selectedMessage) {
        selectedMessage.classList.remove('selected');
    }

    // Define a nova mensagem selecionada
    selectedMessage = element;
    selectedMessage.classList.add('selected');

    // Habilita os botões de editar e excluir
    document.getElementById('btn-editar').disabled = false;
    document.getElementById('btn-excluir').disabled = false;
}

// Função para editar a mensagem selecionada
document.getElementById('btn-editar').addEventListener('click', () => {
    if (selectedMessage) {
        const titulo = selectedMessage.querySelector('strong').innerText;
        const mensagem = selectedMessage.dataset.mensagem; // Obtém a mensagem oculta

        document.getElementById('novoTitulo').value = titulo;
        document.getElementById('novaMensagem').value = mensagem;

        document.getElementById('modalEditar').style.display = 'block';
    }
});

// Função para salvar a edição da mensagem
document.getElementById('salvarEdicao').addEventListener('click', () => {
    if (selectedMessage) {
        const novoTitulo = document.getElementById('novoTitulo').value;
        const novaMensagem = document.getElementById('novaMensagem').value;

        // Atualiza a mensagem no localStorage
        const mensagensSalvas = JSON.parse(localStorage.getItem('mensagensSalvas')) || [];
        const index = mensagensSalvas.findIndex(msg => msg.titulo === selectedMessage.querySelector('strong').innerText);
        
        if (index !== -1) {
            mensagensSalvas[index] = { titulo: novoTitulo, mensagem: novaMensagem };
            localStorage.setItem('mensagensSalvas', JSON.stringify(mensagensSalvas));
            selectedMessage.innerHTML = `<strong>${novoTitulo}</strong>`; // Atualiza apenas o título no quadro
            selectedMessage.dataset.mensagem = novaMensagem; // Atualiza a mensagem oculta
            document.getElementById('modalEditar').style.display = 'none'; // Fechar modal após salvar
            selectedMessage.classList.remove('selected');
        }
    }
});

// Função para excluir a mensagem selecionada
document.getElementById('btn-excluir').addEventListener('click', () => {
    if (selectedMessage) {
        const titulo = selectedMessage.querySelector('strong').innerText;

        // Remove a mensagem do localStorage
        let mensagensSalvas = JSON.parse(localStorage.getItem('mensagensSalvas')) || [];
        mensagensSalvas = mensagensSalvas.filter(msg => msg.titulo !== titulo);
        localStorage.setItem('mensagensSalvas', JSON.stringify(mensagensSalvas));

        selectedMessage.remove(); // Remove a mensagem da lista
        selectedMessage = null; // Limpa a seleção
        document.getElementById('btn-editar').disabled = true; // Desabilita os botões
        document.getElementById('btn-excluir').disabled = true;
    }
});

// Fecha o modal ao clicar na 'x'
document.getElementById('fecharModal').addEventListener('click', () => {
    document.getElementById('modalEditar').style.display = 'none';
});

// Evento de teclado para cancelar a seleção ao pressionar Esc
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        if (selectedMessage) {
            selectedMessage.classList.remove('selected'); // Remove a seleção
            selectedMessage = null; // Limpa a seleção
            document.getElementById('btn-editar').disabled = true; // Desabilita os botões
            document.getElementById('btn-excluir').disabled = true;
        }
    }
});

// Carregar mensagens salvas ao carregar a página
window.onload = function() {
    const mensagensSalvas = JSON.parse(localStorage.getItem('mensagensSalvas')) || [];
    mensagensSalvas.forEach(({ titulo, mensagem }) => {
        const quadro = document.createElement('div');
        quadro.className = 'quadro';
        quadro.innerHTML = `<strong>${titulo}</strong>`;
        quadro.dataset.mensagem = mensagem;

        // Adiciona evento de clique para copiar a mensagem
        quadro.onclick = () => {
            const mensagemOculta = quadro.dataset.mensagem;
            navigator.clipboard.writeText(mensagemOculta)
                .then(() => showNotification('Mensagem copiada!'))
                .catch(err => console.error('Erro ao copiar a mensagem: ', err));

            // Controle de clique
            if (clickTimeout) {
                clearTimeout(clickTimeout);
                clickTimeout = null;
                selectMessage(quadro);
            } else {
                clickTimeout = setTimeout(() => {
                    clickTimeout = null;
                }, 300);
            }
        };

        document.getElementById('quadrosContainer').appendChild(quadro);
    });
};
