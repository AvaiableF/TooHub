function generateCode() {
    const videoUrl = document.getElementById('videoUrl').value;
    const videoDescription = document.getElementById('videoDescription').value;
    const videoTitle = document.getElementById('videoTitle').value + " - Actitud Roja";
    
    const youtubeId = videoUrl.split('youtu.be/')[1];
    
    const result = `<p style="text-align: justify;">&nbsp;</p>
    <div class="separator" style="clear: both; text-align: center;"><iframe allowfullscreen="" class="BLOG_video_class" height="480" src="https://www.youtube.com/embed/${youtubeId}" width="600" youtube-src-id="${youtubeId}"></iframe></div>
    <div class="separator" style="clear: both; text-align: justify;"><br /></div>
    <span data-darkreader-inline-bgcolor="" face="Roboto, Noto, sans-serif" style="--darkreader-inline-bgcolor: #181a1b; background-color: #1e2122;">
    <div style="font-size: 15px; text-align: justify; white-space-collapse: preserve;"><span data-darkreader-inline-bgcolor="" style="--darkreader-inline-bgcolor: #181a1b; background-color: #1e2122;">
    ${videoDescription}</span></div></span>
    <h2>${videoTitle}</h2><p></p>`; // Note que adicionei o título aqui
    
    const resultElement = document.getElementById('result');
    resultElement.value = result;

    // Copiando para a área de transferência
    resultElement.select();
    document.execCommand('copy');
}

function generateTitle() {
    const videoTitle = document.getElementById('videoTitle').value + " - Actitud Roja";
    
    // Criando um elemento temporário de textarea
    const tempTextArea = document.createElement('textarea');
    tempTextArea.value = videoTitle;

    // Adicionando o textarea ao body
    document.body.appendChild(tempTextArea);

    // Selecionando o texto
    tempTextArea.select();

    // Copiando o texto
    document.execCommand('copy');

    // Removendo o textarea do body
    document.body.removeChild(tempTextArea);
}


function voltarPagina() {
    window.location.href = "../index.html";
 }       


