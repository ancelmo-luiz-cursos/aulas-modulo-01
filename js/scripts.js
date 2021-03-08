window.addEventListener('load', start);

var listaDeNomes = ['Um', 'Dois', 'Três', 'Quatro', 'cinco'];
var inputNome = null;

function start() {
  inputNome = document.querySelector('#nome');
  previnirSubmitDoFormulario();
  ativarInput();
  render();
}

function previnirSubmitDoFormulario() {
  function comportamentoPadrao(evento) {
    evento.preventDefault();
  }
  var formulario = document.querySelector('form');
  formulario.addEventListener('submit', comportamentoPadrao);
}

function ativarInput() {
  inputNome.focus();
  inputNome.addEventListener('keyup', aoDigitar);

  function inserirNome(novoNome) {
    listaDeNomes.push(novoNome);
    render();
  }

  function aoDigitar(evento) {
    if (evento.key === 'Enter') {
      inserirNome(evento.target.value);
    }
  }
}

function render() {
  function createDeleteButton(index) {
    function deleteNome() {
      listaDeNomes.splice(index, 1);
      render();
    }

    var button = document.createElement('button');
    button.classList.add('btn-danger');
    button.textContent = 'X';
    button.addEventListener('click', deleteNome);
    return button;
  }

  function createSpan(nome) {
    function editItem() {
      inputNome.value = nome;
      inputNome.focus();
    }
    var span = document.createElement('span');
    span.classList.add('clickable');
    span.textContent = nome;
    span.addEventListener('click', editItem);
    return span;
  }

  var divNomes = document.querySelector('#listaDeNomes');
  divNomes.innerHTML = '';
  var ul = document.createElement('ul');

  for (var i = 0; i < listaDeNomes.length; i++) {
    var nome = listaDeNomes[i];
    var li = document.createElement('li');

    var button = createDeleteButton();
    var span = createSpan(nome);
    li.appendChild(button);
    li.appendChild(span);
    ul.appendChild(li);
  }

  divNomes.appendChild(ul);
  limparInput();
}

function limparInput() {
  inputNome.value = '';
  inputNome.focus();
}
