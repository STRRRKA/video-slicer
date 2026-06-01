import ffmpeg

class AudioProccesor:
    def __init__(self, video_path, audio_path):
        self.video_path = video_path
        self.audio_path = audio_path

    def extract_audio(self):
        ffmpeg.input(self.video_path).output(self.audio_path).run()