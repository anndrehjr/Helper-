function salvarValores(event) {
    event.preventDefault(); // Impede o comportamento padrão do formulário

    const nome = document.getElementById('inputName').value;
    const empresa = document.getElementById('inputEmpresa').value;

    // Verifica se os campos não estão vazios
    if (!nome || !empresa) {
        Swal.fire({
            title: 'Erro!',
            text: 'Por favor, preencha todos os campos.',
            icon: 'error',
            confirmButtonText: 'OK',
        });
        return; // Interrompe a execução se os campos estiverem vazios
    }

    // Armazenando os valores no localStorage
    localStorage.setItem('inputName', nome);
    localStorage.setItem('inputEmpresa', empresa);

    const novoRegistro = { nome, empresa };
    const registros = JSON.parse(localStorage.getItem('registros')) || [];
    registros.push(novoRegistro);
    localStorage.setItem('registros', JSON.stringify(registros));

    // Mostrar o alerta sem redirecionar
    Swal.fire({
        title: 'Dados adicionados com sucesso!',
        text: 'Os dados foram salvos. Você será redirecionado.',
        icon: 'success',
        confirmButtonText: 'OK',
        background: '#fff',
        backdrop: `
            rgba(0, 0, 123, 0.4)
            url("https://www.google.com/url?sa=i&url=https%3A%2F%2Fbr.pinterest.com%2Fpin%2F679832506226751803%2F&psig=AOvVaw2q8DVAlHRTKmeU6-Y9oMJJ&ust=1730037649563000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCJinnaearIkDFQAAAAAdAAAAABAI") 
            left top
            no-repeat
        `,
        customClass: {
            title: 'swal-title',
            content: 'swal-content'
        }
    }).then((result) => {
        if (result.isConfirmed) {
            // Log para verificar se o código é executado
            console.log('Redirecionando para a página...');

            // Redireciona para outra página após o alerta
            window.location.href = '/PG-02/pagina-dois.html'; // Substitua pela URL desejada
        }
    });

    // Limpa os campos após o alerta
    document.getElementById('inputName').value = '';
    document.getElementById('inputEmpresa').value = '';
}

// Efeito de transição entre as páginas (CSS e JavaScript)
document.addEventListener("DOMContentLoaded", function() {
    const links = document.querySelectorAll('a'); // Seleciona todos os links

    links.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // Impede o redirecionamento padrão
            const targetUrl = this.getAttribute('href'); // Obtém a URL do link

            // Adiciona uma classe para a animação
            document.body.classList.add('fade-out');

            // Redireciona após a animação
            setTimeout(() => {
                window.location.href = targetUrl; // Redireciona após 0.5s
            }, 500);
        });
    });
});

// Adiciona o listener ao formulário
document.getElementById('submitButton').addEventListener('click', salvarValores);
