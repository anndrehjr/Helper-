let selectedMessage = null;

function mostrarFormulario() {
    document.getElementById('novoQuadroForm').style.display = 'block';
}

function salvarMensagem() {
    const titulo = document.getElementById('titulo').value;
    const mensagem = document.getElementById('mensagem').value;

    if (titulo && mensagem) {
        const quadro = document.createElement('div');
        quadro.className = 'quadro';
        quadro.innerHTML = `<strong>${titulo}</strong><br>${mensagem}`;
        quadro.onclick = () => selectMessage(quadro);

        document.getElementById('quadrosContainer').appendChild(quadro);
        document.getElementById('mensagemSalva').innerText = 'Mensagem salva!';
        document.getElementById('titulo').value = '';
        document.getElementById('mensagem').value = '';
    }
}

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

document.getElementById('btn-editar').addEventListener('click', () => {
    if (selectedMessage) {
        const titulo = selectedMessage.querySelector('strong').innerText;
        const mensagem = selectedMessage.innerText.replace(titulo, '').trim();

        document.getElementById('novoTitulo').value = titulo;
        document.getElementById('novaMensagem').value = mensagem;

        document.getElementById('modalEditar').style.display = 'block';
    }
});

document.getElementById('salvarEdicao').addEventListener('click', () => {
    if (selectedMessage) {
        const novoTitulo = document.getElementById('novoTitulo').value;
        const novaMensagem = document.getElementById('novaMensagem').value;

        selectedMessage.innerHTML = `<strong>${novoTitulo}</strong><br>${novaMensagem}`;
        document.getElementById('modalEditar').style.display = 'none';
        selectedMessage.classList.remove('selected');
    }
});

document.getElementById('btn-excluir').addEventListener('click', () => {
    if (selectedMessage) {
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
