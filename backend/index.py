from flask import Flask, request, render_template
from flask_cors import CORS
from markupsafe import escape
from concurrent.futures import ThreadPoolExecutor
import yt_dlp
from src.media_tools import MediaTools

app = Flask(__name__)
CORS(app)
executor = ThreadPoolExecutor(max_workers=5)

@app.post("/")
def index():
    try:
        if 'file' in request.files:
            test = request.files['file']
        else:
            url = request.form['file']
            ydl_opts = {
    "concurrent_fragment_downloads": 10,
    "format": "bestvideo+bestaudio/best",
    # Куда сохранять
    # "outtmpl": "%(title)s.%(ext)s",
    "retries": 20,
    "fragment_retries": 20,
    "ignoreerrors": True,
    "merge_output_format": "mp4",
    "progress": True,
}
            with yt_dlp.YoutubeDL(ydl_opts) as ydl:
                ydl.download([url])
            
        print(test)
        # highlighter = MediaTools()
        # executor.submit(highlighter.run)
        
        return 'Done!'
    except Exception as e:
        return str(e)

@app.errorhandler(404)
def page_not_found(error):
    return render_template('page_not_found.html'), 404

