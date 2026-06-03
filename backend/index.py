from flask import Flask, request, render_template
from concurrent.futures import ThreadPoolExecutor
from src.media_tools import MediaTools
from moviepy import VideoFileClip

app = Flask(__name__)
executor = ThreadPoolExecutor(max_workers=5)

@app.get("/")
def index():
    try:
        file = VideoFileClip('input.mp4')
        sound = file.audio
        sound.write_audiofile('audio.mp3')
        # ffmpeg.input("input.mp4").output('audio.mp3').run()
        # highlighter = MediaTools()
        # executor.submit(highlighter.run)
        return f'Done!'
    except Exception as e:
        return str(e)

@app.errorhandler(404)
def page_not_found(error):
    return render_template('page_not_found.html'), 404

