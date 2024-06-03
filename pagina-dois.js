function copiarMensagem() {
    // Pega os valores dos campos de entrada diretamente do localStorage
    var nome = localStorage.getItem('inputName');
    var empresa = localStorage.getItem('inputEmpresa');

    // Verifica se os campos de nome e empresa estão preenchidos
    if (nome && empresa) {
        // Monta a mensagem personalizada
        var mensagem = `Bom dia! Aqui é o ${nome} do suporte da ${empresa}, tudo bem?`;

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
