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
  
    Swal.fire({
        title: 'Dados adicionados com sucesso!',
        text: 'Você será redirecionado para a lista de clientes.',
        icon: 'success',
        confirmButtonText: 'OK'
    }).then((result) => {
        if (result.isConfirmed) {
            window.location.href = '../PG-02/pagina-dois.html'; // Substitua pela URL correta
        }
    });
    
   
}
