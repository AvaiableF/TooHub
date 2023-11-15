// Estado para controlar as frases sorteadas
var frasesSorteadas = [];

// Variável para armazenar a quantidade de elogios disponíveis
var elogiosDisponiveis = elogios_es.length;

// Função para gerar uma frase aleatória
function gerarFrase() {
  // Verificar se todas as frases já foram sorteadas
  if (frasesSorteadas.length === elogios_es.length) {
    // Resetar o estado das frases sorteadas
    frasesSorteadas = [];
  }

  // Verificar se todas as frases já foram sorteadas novamente após o reset
  if (frasesSorteadas.length === elogios_es.length) {
    alert("Todas as frases já foram sorteadas. Reinicie o programa para sortear novamente.");
    return;
  }

  // Verificar se há elogios disponíveis
  if (elogiosDisponiveis === 0) {
    alert("Não há mais elogios disponíveis.");
    return;
  }

  var frase;

  // Enquanto a frase sorteada já estiver no estado das frases sorteadas, sorteie outra
  do {
    var randomIndex = Math.floor(Math.random() * elogios_es.length);
    frase = elogios_es[randomIndex];
  } while (frasesSorteadas.includes(frase));

  // Adicionar a frase sorteada ao estado das frases sorteadas
  frasesSorteadas.push(frase);

  document.getElementById("phrase").textContent = frase;

  // Copiar a frase para a área de transferência
  navigator.clipboard.writeText(frase);

  // Exibir notificação
  if ("Notification" in window && Notification.permission === "granted") {
    new Notification("Frase copiada!", { body: "La frase se ha copiado al portapapeles." });
  }

  // Atualizar a lista das últimas 3 frases sorteadas
  atualizarListaUltimasFrases();

  // Atualizar o contador de elogios disponíveis
  elogiosDisponiveis--;

  // Atualizar o contador de elogios restantes
  atualizarContador();
}

// Função para atualizar o contador de elogios restantes
function atualizarContador() {
  var contador = elogios_es.length - frasesSorteadas.length;
  document.getElementById("counter").textContent = "Elogios restantes: " + contador;
}

// Função para atualizar a lista das últimas 3 frases sorteadas
function atualizarListaUltimasFrases() {
  var lista = document.getElementById("recent-list");
  lista.innerHTML = "";

  // Mostrar as últimas 3 frases sorteadas, se houver
  var ultimasFrases = frasesSorteadas.slice(-3);
  for (var i = ultimasFrases.length - 1; i >= 0; i--) {
    var frase = ultimasFrases[i];
    var item = document.createElement("li");
    item.textContent = frase;
    lista.appendChild(item);
  }
}

// Solicitar permissão para exibir notificações
if ("Notification" in window && Notification.permission !== "granted") {
  Notification.requestPermission();
}

// Associar a função gerarFrase ao botão "Generar Frase"
document.getElementById("generate-button").addEventListener("click", gerarFrase);

window.addEventListener('DOMContentLoaded', function() {
  var versionNumberElement = document.getElementById('version-number');
  versionNumberElement.innerText = '1.2.6'; // Coloque a versão atual do seu programa aqui

  // Exibir o contador de elogios disponíveis inicialmente
  atualizarContador();
});
