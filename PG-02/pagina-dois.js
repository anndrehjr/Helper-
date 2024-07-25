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
            default:
                saudacao = 'Olá';
        }
        
        // Monta a mensagem personalizada
        var mensagem = `${saudacao}! Aqui é o ${nome} do suporte da ${empresa}, tudo bem?`;
        var mensagem = 'Como posso ajudar?';
        var mensagem = 'Não consegui entender direito, poderia me explicar melhor? Se preferir pode mandar áudio.?';
        var mensagem = 'Vou estar encerrando o chat aqui então, qualquer coisa estamos a disposição, tenha um ótimo dia! 😊';

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
           // Função para salvar a mensagem no localStorage
           function salvarMensagem() {
            var mensagem = document.getElementById('mensagem').value;
            localStorage.setItem('mensagemSalva', mensagem);
            document.getElementById('mensagemSalva').innerText = 'Mensagem salva: ' + mensagem;
        }

        // Função para carregar a mensagem salva ao carregar a página
        window.onload = function() {
            var mensagemSalva = localStorage.getItem('mensagemSalva');
            if (mensagemSalva) {
                document.getElementById('mensagem').value = mensagemSalva;
                document.getElementById('mensagemSalva').innerText = 'Mensagem salva: ' + mensagemSalva;
            }
        }

        // Alerta de sucesso (opcional)
        alert('Mensagem copiada para a área de transferência!');
    } else {
        // Se os campos de nome e empresa não estiverem preenchidos, alerta o usuário
        alert('Por favor, preencha o nome e o nome da empresa antes de copiar a mensagem!');
    }
}
