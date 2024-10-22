document.addEventListener('DOMContentLoaded', function() {
    const video = document.querySelector('video');
    if (video) {

        // Detecta o pressionamento das teclas
        document.addEventListener('keydown', function(event) {
            // Se o foco estiver no player de vídeo, ou evitar conflitos com espaço em outros elementos
            if (event.target.tagName.toLowerCase() !== 'input' && event.target.tagName.toLowerCase() !== 'textarea') {
                switch(event.key) {
                    case ' ':
                        // Pausar ou tocar o vídeo com a barra de espaço
                        if (video.paused) {
                            video.play();
                        } else {
                            video.pause();
                        }
                        event.preventDefault(); // Evitar scroll ao pressionar espaço
                        event.stopPropagation(); // Prevenir o evento de continuar propagando
                        break;
                    case 'l':
                        // Avançar 10 segundos com a letra 'l'
                        video.currentTime += 10;
                        break;
                    case 'ArrowRight':
                        // Avançar 5 segundos com a seta direita ou 'l'
                        video.currentTime += 5;
                        break;
                    case 'j':
                        // Avançar 10 segundos com a letra 'j'
                        video.currentTime -= 10;
                        break;
                    case 'ArrowLeft':
                        // Voltar 5 segundos com a seta esquerda ou 'j'
                        video.currentTime -= 5;
                        break;
                    case 'ArrowUp':
                        // Aumentar volume com a seta para cima
                        video.volume = Math.min(1, video.volume + 0.1); // Máximo de 1
                        break;
                    case 'ArrowDown':
                        // Diminuir volume com a seta para baixo
                        video.volume = Math.max(0, video.volume - 0.1); // Mínimo de 0
                        break;
                    case 'm':
                        // Mutar ou desmutar com a tecla 'm'
                        video.muted = !video.muted;
                        break;
                    case 'f':
                        // Alternar tela cheia com a tecla 'f'
                        if (!document.fullscreenElement) {
                            if (video.requestFullscreen) {
                                video.requestFullscreen();
                            } else if (video.mozRequestFullScreen) { // Firefox
                                video.mozRequestFullScreen();
                            } else if (video.webkitRequestFullscreen) { // Chrome, Safari e Opera
                                video.webkitRequestFullscreen();
                            } else if (video.msRequestFullscreen) { // Internet Explorer/Edge
                                video.msRequestFullscreen();
                            }
                        } else {
                            if (document.exitFullscreen) {
                                document.exitFullscreen();
                            } else if (document.mozCancelFullScreen) { // Firefox
                                document.mozCancelFullScreen();
                            } else if (document.webkitExitFullscreen) { // Chrome, Safari e Opera
                                document.webkitExitFullscreen();
                            } else if (document.msExitFullscreen) { // Internet Explorer/Edge
                                document.msExitFullscreen();
                            }
                        }
                        break;
                }
            }
        });
    }

    // Encontre o elemento onde será inserido o botão (depois de .vjs-current-time-display)
const currentTimeDisplay = document.querySelector('.vjs-current-time-display');

// Cria um novo botão para retroceder 10 segundos
const rewindButton = document.createElement('button');
rewindButton.classList.add('vjs-control', 'vjs-button', 'rewind-button');
rewindButton.setAttribute('type', 'button');
rewindButton.setAttribute('title', 'Rewind 10 seconds');

// Adiciona o texto ao botão
rewindButton.innerHTML = `<span class="rewind10s" aria-hidden="true">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
        <polygon points="11 19 2 12 11 5 11 19" />
        <polygon points="22 19 13 12 22 5 22 19" />
    </svg>
</span>
<span class="vjs-control-text" aria-live="polite">Rewind 10s</span>`;

// Função para retroceder 10 segundos no vídeo
rewindButton.addEventListener('click', function() {
    const videoPlayer = document.querySelector('video');
    if (videoPlayer) {
        videoPlayer.currentTime = Math.max(0, videoPlayer.currentTime - 10);
    }
});

// Insere o botão após o .vjs-current-time-display
if (currentTimeDisplay) {
    currentTimeDisplay.parentNode.insertBefore(rewindButton, currentTimeDisplay.nextSibling);
}

});
