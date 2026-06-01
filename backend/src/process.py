from audio import AudioProccesor

class Highlighter:
    def __init__(self, video_path, audio_path):
        self.video_path = video_path
        self.audio_path = audio_path
        self.audio = AudioProccesor(video_path, audio_path)
    
    def run(self):
        pass