import ffmpeg

class MediaTools:
    def __init__(self, video='input.mp4'):
        self.video_path = video
        self.audio_path = 'audio.mp3'

    def extract_audio(self):
        ffmpeg.input(self.video_path).output(self.audio_path).run()

    def run(self):
        print('run')
        # self.extract_audio()
        ffmpeg.input(self.video_path).output(self.audio_path).run() 