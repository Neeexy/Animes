const video = document.getElementById('video-frame');
const progressBar = document.querySelector('.vjs-progress-holder');
const thumbnailPreview = document.getElementById('thumbnail-preview');
const thumbnailImg = document.getElementById('thumbnail-img');

// Função para calcular o tempo do vídeo de acordo com a posição do mouse
function getVideoTime(mouseX, progressBar) {
    const progressBarRect = progressBar.getBoundingClientRect();
    const progressBarWidth = progressBarRect.width;
    const relativeX = mouseX - progressBarRect.left;
    const percentage = relativeX / progressBarWidth;
    const videoDuration = video.duration;
    return Math.floor(percentage * videoDuration); // Tempo do vídeo correspondente
}

// Função para formatar o tempo em MM:SS
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

// Função para obter o caminho correto das miniaturas
function getThumbnailPath(videoId, videoTime) {
    const episodeNumber = videoId; // Assumindo que o ID do vídeo seja o número do episódio
    return `C:/Users/Gabriel/OneDrive/Documentos/Projects/Animes/assistir-anime/Dungeon Ni Deai/thumb-frames/${episodeNumber}/thumbnail-${videoTime}s.jpg`;
}

// Quando o mouse passar sobre a barra de progresso
progressBar.addEventListener('mousemove', (e) => {
    const videoTime = getVideoTime(e.clientX, progressBar);

    // Aqui assumimos que o vídeo tenha um ID que corresponde ao número do episódio
    const videoId = video.getAttribute('data-episode-id'); // Exemplo: "1"
    
    // Formatar o tempo do vídeo corretamente (MM:SS)
    const formattedTime = formatTime(videoTime);

    // Atualizar a imagem da miniatura com base no tempo e no número do episódio
    thumbnailImg.src = getThumbnailPath(videoId, formattedTime);
    
    // Mostrar a miniatura
    thumbnailPreview.style.display = 'block';
    
    // Posicionar a miniatura corretamente
    thumbnailPreview.style.left = `${e.clientX - 60}px`; // 60 é metade da largura da miniatura
    thumbnailPreview.style.top = `${e.clientY - 80}px`;  // Ajuste para posicionar acima do mouse
});

// Esconder a miniatura quando o mouse sair da barra de progresso
progressBar.addEventListener('mouseleave', () => {
    thumbnailPreview.style.display = 'none';
});