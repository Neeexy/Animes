document.addEventListener('DOMContentLoaded', function() {
    const video = document.querySelector('video');
    if (video) {

        // Detecta o pressionamento das teclas
        document.addEventListener('keydown', function(event) {
            // Se o foco estiver no player de vídeo, ou evitar conflitos com espaço em outros elementos
            if (event.target.tagName.toLowerCase() !== 'input' && event.target.tagName.toLowerCase() !== 'textarea') {
                switch(event.key) {
                    case ' ':
                        case 'k':
                        // Pausar ou tocar o vídeo com a barra de espaço
                        if (video.paused) {
                            video.play();
                        } else {
                            video.pause();
                        }
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
                }
            }
        });
    }

    document.addEventListener('keydown', function(event) {
        // Verifica se a tecla pressionada é o 'F'
        if (event.key.toLowerCase() === 'f') {
            // Seleciona o botão de fullscreen
            const fullscreenButton = document.querySelector('.vjs-fullscreen-control');
            
            // Simula o clique no botão de fullscreen
            if (fullscreenButton) {
                fullscreenButton.click();
            }
        }
    });
// Encontre o elemento da barra de controle onde será inserido o botão (depois de .vjs-current-time-display)
const currentTimeDisplay = document.querySelector('.vjs-current-time-display');

// Cria um novo contêiner (div) para o botão de retroceder
const rewindButtonDiv = document.createElement('div');
rewindButtonDiv.classList.add('vjs-control', 'vjs-time-control', 'rewind-button-container');

// Cria um novo botão para retroceder 10 segundos
const rewindButton = document.createElement('button');
rewindButton.classList.add('vjs-control', 'vjs-button', 'rewind-button');
rewindButton.setAttribute('type', 'button');
rewindButton.setAttribute('title', 'Rewind 10 seconds');

// Adiciona o ícone de rewind (ou símbolo) ao botão
rewindButton.innerHTML = `<span class="rewind10s" aria-hidden="true">↺</span>
<span class="vjs-control-text" aria-live="polite">Rewind 10s</span>`;

// Cria um novo botão para Avançar 10 segundos
const avanceButton = document.createElement('button');
avanceButton.classList.add('vjs-control', 'vjs-button', 'avance-button');
avanceButton.setAttribute('type', 'button');
avanceButton.setAttribute('title', 'avance 10 seconds');

// Adiciona o ícone de rewind (ou símbolo) ao botão
avanceButton.innerHTML = `<span class="avance10s" aria-hidden="true">↻</span>
<span class="vjs-control-text" aria-live="polite">Rewind 10s</span>`;

// Adiciona o botão à nova div
rewindButtonDiv.appendChild(rewindButton);
rewindButtonDiv.appendChild(avanceButton);

// Insere a nova div logo após a .vjs-current-time-display
currentTimeDisplay.parentNode.insertBefore(rewindButtonDiv, currentTimeDisplay.nextSibling);


// Função para retroceder 10 segundos no vídeo
rewindButton.addEventListener('click', function() {
    const videoPlayer = document.querySelector('video');
    if (videoPlayer) {
        videoPlayer.currentTime = Math.max(0, videoPlayer.currentTime - 10);
    }
});
avanceButton.addEventListener('click', function() {
    const videoPlayer = document.querySelector('video');
    if (videoPlayer) {
        videoPlayer.currentTime = Math.max(0, videoPlayer.currentTime + 10);
    }
});

// Insere o botão após o .vjs-current-time-display
if (currentTimeDisplay) {
    currentTimeDisplay.parentNode.insertBefore(rewindButton, currentTimeDisplay.nextSibling);
}


// Função para verificar se o dispositivo é mobile
function isMobile() {
    return /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop|BlackBerry/i.test(navigator.userAgent);
}

document.addEventListener('fullscreenchange', function() {
    const videoControls = document.querySelector('.vjs-current-time.vjs-time-control.vjs-control');

    if (document.fullscreenElement) {
        if (isMobile()) {
            // Se for mobile, define margin-right como 75%
            videoControls.style.marginRight = '77%';
        } else {
            // Caso não seja mobile, usa 81%
            videoControls.style.marginRight = '81%';
        }
    } else {
        // Se o vídeo não está em fullscreen, restaura o estilo original
        videoControls.style.marginRight = '';
    }
});

// Seleciona o botão de volume e o modo Picture-in-Picture (PiP)
const volumePanel = document.querySelector('.vjs-volume-panel');
const PinP = document.querySelector('.vjs-picture-in-picture-control');

// Esconde o botão de volume e PiP se o usuário estiver em um dispositivo móvel
if (isMobile()) {
    if (volumePanel) {
        volumePanel.style.display = 'none';
        if (PinP) {
            PinP.style.display = 'none';
        }
    }
}})
