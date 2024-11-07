function salvarValores(event) {
    event.preventDefault();

    const nome = document.getElementById('inputName').value;
    const empresa = document.getElementById('inputEmpresa').value;

    if (!nome || !empresa) {
        Swal.fire({
            title: 'Erro!',
            text: 'Por favor, preencha todos os campos.',
            icon: 'error',
            confirmButtonText: 'OK',
        });
        return;
    }

    localStorage.setItem('inputName', nome);
    localStorage.setItem('inputEmpresa', empresa);

    const novoRegistro = { nome, empresa };
    const registros = JSON.parse(localStorage.getItem('registros')) || [];
    registros.push(novoRegistro);
    localStorage.setItem('registros', JSON.stringify(registros));

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
            console.log('Redirecionando para a página...');
            window.location.href = '/PG-02/pagina-dois.html';
        }
    });

    document.getElementById('inputName').value = '';
    document.getElementById('inputEmpresa').value = '';
}

document.addEventListener("DOMContentLoaded", function() {
    const links = document.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetUrl = this.getAttribute('href');
            document.body.classList.add('fade-out');
            setTimeout(() => {
                window.location.href = targetUrl;
            }, 500);
        });
    });
});

document.getElementById('submitButton').addEventListener('click', salvarValores);
