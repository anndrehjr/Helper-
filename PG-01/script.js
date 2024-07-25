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
  
    alert('Dados adicionados com sucesso! Você será redirecionado para a lista de clientes.');
    window.location.href = '../PG-02/pagina-dois.html';
}
