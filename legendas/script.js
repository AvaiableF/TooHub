function processFile() {
    const fileInput = document.getElementById('inputFile');
    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = function(event) {
        const contents = event.target.result;
        const newContents = adjustTimes(contents);
        createDownload(newContents);
    };

    reader.readAsText(file);
}

function adjustTimes(contents) {
    const lines = contents.split('\n');
    const newLines = lines.map(line => {
        const match = line.match(/(\d{2}):(\d{2}):(\d{2}),(\d{3}) --> (\d{2}):(\d{2}):(\d{2}),(\d{3})/);
        if (match) {
            const start = addSeconds(match[1], match[2], match[3], match[4], 5); // Adiciona 5 segundos ao tempo inicial
            const end = addSeconds(match[5], match[6], match[7], match[8], 5); // Adiciona 5 segundos ao tempo final
            return start + ' --> ' + end;
        } else {
            return line;
        }
    });
    return newLines.join('\n');
}



function addSeconds(hours, minutes, seconds, milliseconds, extraSeconds) {
    // Crie um objeto Date em UTC com o tempo especificado.
    const date = new Date(Date.UTC(1970, 0, 1, hours, minutes, seconds, milliseconds));

    // Adicione os segundos extras.
    date.setUTCSeconds(date.getUTCSeconds() + extraSeconds);

    // Formate a data de volta para uma string de tempo SRT, preservando os zeros à esquerda.
    const newHours = String(date.getUTCHours()).padStart(2, '0');
    const newMinutes = String(date.getUTCMinutes()).padStart(2, '0');
    const newSeconds = String(date.getUTCSeconds()).padStart(2, '0');
    const newMilliseconds = String(date.getUTCMilliseconds()).padStart(3, '0');

    return newHours + ':' + newMinutes + ':' + newSeconds + ',' + newMilliseconds;
}

function createDownload(contents) {
    const link = document.getElementById('downloadLink');
    const file = new Blob([contents], {type: 'text/plain'});
    link.href = URL.createObjectURL(file);
    link.style.display = 'block';
}
