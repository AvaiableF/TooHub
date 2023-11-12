// Função para redirecionar para a página principal com o idioma selecionado
function redirect(language) {
    // Mapear os códigos de idioma para as páginas correspondentes
    var pages = {
      spanish: "index_es/index_es.html",
      english: "index_en/index_en.html",
      portuguese: "index_pt/index_pt.html",
    };
  
    // Verificar se o idioma está mapeado
    if (language in pages) {
      window.location.href = pages[language];
    } else {
      alert("Idioma selecionado não é suportado.");
    }
  }
  
  // Associar a função de redirecionamento aos botões de idioma
  document.getElementById("spanish-button").addEventListener("click", function () {
    redirect("spanish");
  });
  
  document.getElementById("english-button").addEventListener("click", function () {
    redirect("english");
  });
  
  document.getElementById("portuguese-button").addEventListener("click", function () {
    redirect("portuguese");
  });
  
  
  
  // Adicionar o código de animação da transição aqui
  document.addEventListener('DOMContentLoaded', function() {
    var languageLinks = document.querySelectorAll('.language-link');
    
    for (var i = 0; i < languageLinks.length; i++) {
      languageLinks[i].addEventListener('click', function(e) {
        e.preventDefault();
        var target = e.target.getAttribute('href');
  
        document.body.classList.remove('transition-animation');
        setTimeout(function() {
          window.location.href = target;
        }, 300);
      });
    }
  });
  