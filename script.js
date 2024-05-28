const inputName = document.getElementById('inputName');
const inputEmpresa = document.getElementById('inputEmpresa');
const submitButton = document.getElementById('submitButton');

// Esconder o botão de salvar inicialmente
submitButton.style.display = 'none';

inputName.addEventListener('input', toggleSubmitButton);
inputEmpresa.addEventListener('input', toggleSubmitButton);

function toggleSubmitButton() {
    if (inputName.value.trim() !== '' && inputEmpresa.value.trim() !== '') {
        submitButton.style.display = 'block';
    } else {
        submitButton.style.display = 'none';
    }
}

submitButton.addEventListener('click', function() {
    alert('Informações salvas com sucesso!');
});
