function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerText = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('show');
    }, 100);

    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 500);
    }, 3000);
}

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

    navigator.clipboard.writeText(mensagem)
        .then(() => showNotification('Mensagem copiada para a área de transferência!'))
        .catch(err => showNotification('Erro ao copiar a mensagem: ' + err));
}

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

let selectedMessage = null;
let clickTimeout = null;

function mostrarFormulario() {
    document.getElementById('novoQuadroModal').style.display = 'flex';
}

function fecharModal() {
    document.getElementById('novoQuadroModal').style.display = 'none';
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        fecharModal();
    }
});

window.addEventListener('click', (event) => {
    if (event.target === document.getElementById('novoQuadroModal')) {
        fecharModal();
    }
});

function salvarMensagem() {
    const titulo = document.getElementById('titulo').value;
    const mensagem = document.getElementById('mensagem').value;

    if (titulo && mensagem) {
        const mensagensSalvas = JSON.parse(localStorage.getItem('mensagensSalvas')) || [];
        mensagensSalvas.push({ titulo, mensagem });
        localStorage.setItem('mensagensSalvas', JSON.stringify(mensagensSalvas));

        const quadro = document.createElement('div');
        quadro.className = 'quadro';
        quadro.innerHTML = `<strong>${titulo}</strong>`;
        quadro.dataset.mensagem = mensagem;

        quadro.onclick = () => {
            const mensagemOculta = quadro.dataset.mensagem;
            navigator.clipboard.writeText(mensagemOculta)
                .then(() => showNotification('Mensagem copiada!'))
                .catch(err => {
                    console.error('Erro ao copiar a mensagem: ', err);
                });

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
        showNotification('Mensagem salva!');

        document.getElementById('titulo').value = '';
        document.getElementById('mensagem').value = '';
        document.getElementById('novoQuadroForm').style.display = 'none';
    } else {
        showNotification('Por favor, preencha o título e a mensagem!');
    }
}

function selectMessage(element) {
    if (selectedMessage) {
        selectedMessage.classList.remove('selected');
    }

    selectedMessage = element;
    selectedMessage.classList.add('selected');

    document.getElementById('btn-editar').disabled = false;
    document.getElementById('btn-excluir').disabled = false;
}

document.getElementById('btn-editar').addEventListener('click', () => {
    if (selectedMessage) {
        const titulo = selectedMessage.querySelector('strong').innerText;
        const mensagem = selectedMessage.dataset.mensagem;

        document.getElementById('novoTitulo').value = titulo;
        document.getElementById('novaMensagem').value = mensagem;

        document.getElementById('modalEditar').style.display = 'block';
    }
});

document.getElementById('salvarEdicao').addEventListener('click', () => {
    if (selectedMessage) {
        const novoTitulo = document.getElementById('novoTitulo').value;
        const novaMensagem = document.getElementById('novaMensagem').value;

        const mensagensSalvas = JSON.parse(localStorage.getItem('mensagensSalvas')) || [];
        const index = mensagensSalvas.findIndex(msg => msg.titulo === selectedMessage.querySelector('strong').innerText);
        
        if (index !== -1) {
            mensagensSalvas[index] = { titulo: novoTitulo, mensagem: novaMensagem };
            localStorage.setItem('mensagensSalvas', JSON.stringify(mensagensSalvas));
            selectedMessage.innerHTML = `<strong>${novoTitulo}</strong>`;
            selectedMessage.dataset.mensagem = novaMensagem;
            document.getElementById('modalEditar').style.display = 'none';
            selectedMessage.classList.remove('selected');
        }
    }
});

document.getElementById('btn-excluir').addEventListener('click', () => {
    if (selectedMessage) {
        const titulo = selectedMessage.querySelector('strong').innerText;

        let mensagensSalvas = JSON.parse(localStorage.getItem('mensagensSalvas')) || [];
        mensagensSalvas = mensagensSalvas.filter(msg => msg.titulo !== titulo);
        localStorage.setItem('mensagensSalvas', JSON.stringify(mensagensSalvas));

        selectedMessage.remove();
        selectedMessage = null;
        document.getElementById('btn-editar').disabled = true;
        document.getElementById('btn-excluir').disabled = true;
    }
});

document.getElementById('fecharModal').addEventListener('click', () => {
    document.getElementById('modalEditar').style.display = 'none';
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        if (selectedMessage) {
            selectedMessage.classList.remove('selected');
            selectedMessage = null;
            document.getElementById('btn-editar').disabled = true;
            document.getElementById('btn-excluir').disabled = true;
        }
    }
});

window.onload = function() {
    const mensagensSalvas = JSON.parse(localStorage.getItem('mensagensSalvas')) || [];
    mensagensSalvas.forEach(({ titulo, mensagem }) => {
        const quadro = document.createElement('div');
        quadro.className = 'quadro';
        quadro.innerHTML = `<strong>${titulo}</strong>`;
        quadro.dataset.mensagem = mensagem;

        quadro.onclick = () => {
            const mensagemOculta = quadro.dataset.mensagem;
            navigator.clipboard.writeText(mensagemOculta)
                .then(() => showNotification('Mensagem copiada!'))
                .catch(err => console.error('Erro ao copiar a mensagem: ', err));

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
