from flask import Flask, request, render_template
from concurrent.futures import ThreadPoolExecutor
from process import Highlighter

app = Flask(__name__)
executor = ThreadPoolExecutor(max_workers=5)

@app.route("/")
def hello_world():
    try:
        video_path = 'input.mp4'
        audio_path = 'audio.mp3'
        highlighter = Highlighter(video_path, audio_path)
        executor.submit(highlighter.run)
        return f'Done!'
    except Exception as e:
        return str(e)

@app.errorhandler(404)
def page_not_found(error):
    return render_template('page_not_found.html'), 404

