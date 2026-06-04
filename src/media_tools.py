from moviepy import VideoFileClip

class MediaTools:
    def __init__(self, video='input.mp4'):
        self.video_path = video
        self.audio_path = 'audio.mp3'

    def extract_audio(self):
        file = VideoFileClip('input.mp4')
        sound = file.audio
        sound.write_audiofile('audio.mp3')

    def run(self):
        print('run')
        # self.extract_audio()