import os
import subprocess

# Lista de episódios
episodios = ['11']  # Por exemplo, episódios 1 a 5

# Caminho base para os vídeos e miniaturas
base_video_url = "https://cdn-s01.mywallpaper-4k-image.net/stream/d/dungeon-ni-deai-o-motomeru-no-wa-machigatteiru-darou-ka/"
base_thumb_path = r"C:\Users\Gabriel\OneDrive\Documentos\Projects\Animes\assistir-anime\Dungeon Ni Deai\thumb-frames"

# Função para converter segundos em formato MM:SS
def format_time(seconds):
    minutes = seconds // 60
    seconds = seconds % 60
    return f"{minutes:02}:{seconds:02}"

for episodio in episodios:
    # Criar diretório para cada episódio
    episodio_dir = os.path.join(base_thumb_path, str(episodio))
    os.makedirs(episodio_dir, exist_ok=True)
    
    # URL do vídeo
    video_url = f"{base_video_url}/{episodio}.mp4/index.m3u8"
    
    # Gerar miniaturas em tempos diferentes
    for time in [10, 30, 60, 90, 120]:  # Exemplo de tempos: 10s, 30s, 60s, 90s, 120s
        output_path = os.path.join(episodio_dir, f"thumbnail-{time}s.jpg")
        formatted_time = format_time(time)  # Converte o tempo para MM:SS
        command = [
            "ffmpeg", "-i", video_url, "-ss", f"00:{formatted_time}.000",
            "-vframes", "1", "-update", "1", output_path
        ]
        subprocess.run(command)
