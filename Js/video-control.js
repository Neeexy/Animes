document.addEventListener('DOMContentLoaded', function() {
    const video = document.querySelector('video');

    if (video) {
         // Função para retroceder 10 segundos
    function goBack10Seconds() {
        video.currentTime(video.currentTime() - 10);
    }

    // Criar o botão de voltar 10s
    const rewindButton = video.controlBar.addChild('button', {
        text: 'Voltar 10s',
        className: 'vjs-rewind-button'
    });

    // Definir o comportamento do botão
    rewindButton.el().innerHTML = '<span class="vjs-icon-placeholder"></span><span class="vjs-control-text">Voltar 10s</span>';
    rewindButton.on('click', goBack10Seconds);

    // Inserir o botão de voltar 10s entre play/pause e volume
    const playControl = video.controlBar.playToggle.el();
    const volumeControl = video.controlBar.volumePanel.el();
    video.controlBar.el().insertBefore(rewindButton.el(), volumeControl);

        
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
});
