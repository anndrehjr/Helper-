function salvarValores(event) {
    event.preventDefault();

    const nome = document.getElementById('inputName').value;
    const empresa = document.getElementById('inputEmpresa').value;

    // Armazenando os valores no localStorage
    localStorage.setItem('inputName', nome);
    localStorage.setItem('inputEmpresa', empresa);

    const novoRegistro = { nome, empresa };
    const registros = JSON.parse(localStorage.getItem('registros')) || [];
    registros.push(novoRegistro);
    localStorage.setItem('registros', JSON.stringify(registros));

    document.getElementById('inputName').value = '';
    document.getElementById('inputEmpresa').value = '';

    // Mostrar o alerta sem redirecionar
    Swal.fire({
        title: 'Dados adicionados com sucesso!',
        text: 'Os dados foram salvos. Você pode continuar.',
        icon: 'success',
        confirmButtonText: 'OK'
    });
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
