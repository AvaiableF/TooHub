from flask import Flask, render_template, request, send_from_directory
from pytube import YouTube
import os

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/baixar', methods=['POST'])
def baixar():
    url = request.form['url']
    caminho_salvar = "videos"
    
    if not os.path.exists(caminho_salvar):
        os.makedirs(caminho_salvar)

    try:
        yt = YouTube(url)
        ys = yt.streams.get_highest_resolution()
        ys.download(caminho_salvar)
        nome_arquivo = ys.default_filename
        return send_from_directory(caminho_salvar, nome_arquivo, as_attachment=True)
    except Exception as e:
        return str(e)

if __name__ == '__main__':
    app.run(debug=True)
