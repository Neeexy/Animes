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
    const iframe = document.querySelector('.vjs-text-track-display')
    const speed_ico = document.createElement('div')
    speed_ico.classList.add('fluid')
    speed_ico.innerHTML = `<span class='fluid-icons' aria-hidden="true">2x ‣‣</span>
    <span class="vjs-control-text"  aria-live="polite">Speed 2x-ico</span>`
    // Alterar velocidade do vídeo enquando a tecla 'v' estiver pressionada
    document.addEventListener('keydown', function(speed){ 
        if (speed.key === 'v'){
            if (video.paused) {
                video.play();
            }
        // Adicinar simbolo '2x'
            if(!iframe.contains(speed_ico)){
                iframe.appendChild(speed_ico);
            }
        // Aumenta a velocidade do video
        video.playbackRate = 2.0
        }
    })
    // Detecta quando a tecla é solta
    document.addEventListener('keyup', function(speed){
        if(speed.key === 'v'){
             // Remove o ícone de velocidade e ajusta a velocidade do vídeo
                if (iframe.contains(speed_ico)) {
                iframe.removeChild(speed_ico);
            }
            video.playbackRate = 1.0
        }
    })
// Speed Function Phone
// Evento para quando o usuário pressiona a tela do vídeo
let touchHoldTime;
video.addEventListener('touchstart', function() {
    // Inicia um timeout de 1 segundo para realizar a função
    touchHoldTime = setTimeout(() =>{
        if (video.paused) {
            video.play();
        }
    // Adicinar simbolo '2x'
    if(!iframe.contains(speed_ico)){
        iframe.appendChild(speed_ico);
    }
    // Aumenta a velocidade do vídeo para 2x
    video.playbackRate = 2.0;
},1000); // 1000ms = 1s
});

// Evento para quando o usuário solta a tela do vídeo
video.addEventListener('touchend', function() {
    // Cancela o timeout se o toque foi rápido
    clearTimeout(touchHoldTime);
    // Remove o ícone de velocidade e ajusta a velocidade do vídeo ao normal, caso o toque tenha sido longo
    if (iframe.contains(speed_ico)) {
        iframe.removeChild(speed_ico);
        video.playbackRate = 1.0;
    }
});


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

// DoubleClick skip/back

document.addEventListener('DOMContentLoaded', function () {
    const video = document.querySelector('video');
    const displayContainer = document.querySelector('.vjs-text-track-display');
    
    if (video && displayContainer) {
        let lastTap = 0;

        // Função para avançar ou retroceder o vídeo e mostrar a confirmação visual
        const skipVideo = (seconds, message, isRightSide) => {
            video.currentTime += seconds;
            showVisualFeedback(message, isRightSide);
        };

        // Função para exibir o feedback visual dinâmico
        const showVisualFeedback = (message, isRightSide) => {
            const feedbackDiv = document.createElement('div');
            feedbackDiv.className = 'feedback-circle';
            feedbackDiv.innerText = message;
            feedbackDiv.style.position = 'absolute';
            feedbackDiv.style.fontSize = '1.8em';
            feedbackDiv.style.fontWeight = '650';
            feedbackDiv.style.color = 'white';
            feedbackDiv.style.padding = '15px';
            feedbackDiv.style.background = '#36353544';
            feedbackDiv.style.borderRadius = '50px';
            feedbackDiv.style.top = '43%';
            feedbackDiv.style.opacity = '0'; // Inicialmente invisível para o efeito fade-in
            feedbackDiv.style.transition = 'opacity 0.2s ease'; // Transição de fade-in
            feedbackDiv.style.zIndex = '10';
        
            if (isRightSide) {
                feedbackDiv.style.right = '10%';
            } else {
                feedbackDiv.style.left = '10%';
            }

            displayContainer.appendChild(feedbackDiv);

            // Inicia o efeito de fade-in
            setTimeout(() => {
                feedbackDiv.style.opacity = '1';
            }, 0);
        
            // Fade-out e remoção após 500 ms
            setTimeout(() => {
                feedbackDiv.style.opacity = '0';
                feedbackDiv.addEventListener('transitionend', () => feedbackDiv.remove());
            }, 500);
        };

        video.addEventListener('touchstart', function (event) {
            const currentTime = new Date().getTime();
            const timeSinceLastTap = currentTime - lastTap;
            lastTap = currentTime;

            const touchX = event.touches[0].clientX;
            const videoWidth = video.clientWidth;
            const isRightSide = touchX > videoWidth / 2;
            const isLeftSide = touchX <= videoWidth / 2;

            if (timeSinceLastTap < 300) {
                if (isRightSide) {
                    skipVideo(10, '10s ▸▸', true);  // Avança 10 segundos
                } else if (isLeftSide) {
                    skipVideo(-10, '◂◂ 10s', false); // Retrocede 10 segundos
                }
            }
        });

        document.addEventListener('keydown', function(e){
            switch(e.key){
                case 'l':
                    // Avançar 10 segundos com a letra 'l'
                    skipVideo(10, '10s ▸▸', true);
                    break;
                case 'ArrowRight':
                    // Avançar 5 segundos com a seta direita
                    skipVideo(5, '5s ▸▸', true);
                    break;
                case 'j':
                    // Retroceder 10 segundos com a letra 'j'
                    skipVideo(-10, '◂◂ 10s', false);
                    break;
                case 'ArrowLeft':
                    // Retroceder 5 segundos com a seta esquerda
                    skipVideo(-5, '◂◂ 5s', false);
                    break;
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
                skipVideo(-10, '◂◂ 10s', false);
            }
        });
        avanceButton.addEventListener('click', function() {
            const videoPlayer = document.querySelector('video');
            if (videoPlayer) {
                skipVideo(10, '10s ▸▸', true);
            }
        });

        // Insere o botão após o .vjs-current-time-display
        if (currentTimeDisplay) {
            currentTimeDisplay.parentNode.insertBefore(rewindButton, currentTimeDisplay.nextSibling);
        }
    }
});

// Skip Opening

// Aguarda o carregamento do DOM
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        // Encontre o elemento da barra de controle onde será inserido o botão (dentro da .vjs-control-bar)
        const controlBar = document.querySelector('.vjs-control-bar');
        
        if (controlBar) { // Verifica se a barra de controle foi encontrada
            // Cria um novo contêiner (div) para o botão de pular abertura
            const skipOpContainer = document.createElement('div');
            skipOpContainer.classList.add('vjs-control', 'skip-op-container');

            // Cria um novo botão para pular abertura
            const skipOpButton = document.createElement('button');
            skipOpButton.classList.add('vjs-control', 'vjs-button', 'skip-op-button');
            skipOpButton.setAttribute('type', 'button');
            skipOpButton.setAttribute('title', 'Pular Abertura');

            // Adiciona o texto ou ícone ao botão
            skipOpButton.innerHTML = `<span class="skipOp" aria-hidden="true">Pular Abertura</span>
            <span class="vjs-control-text" aria-live="polite">Pular Abertura</span>`;

            // Adiciona o botão à nova div
            skipOpContainer.appendChild(skipOpButton);

            // Insere a nova div acima da barra de progresso
            const fullscreenctrl = controlBar.querySelector('.vjs-fullscreen-control');
            if (fullscreenctrl) {
                fullscreenctrl.insertAdjacentElement('afterend', skipOpContainer);
            }

            // Variável para contar quantas vezes o botão foi clicado
            let skippedOp = 0;

            // Adiciona o evento de clique ao botão
            skipOpButton.addEventListener('click', () => {
                const video = document.querySelector('video'); // Seleciona o elemento de vídeo
                if (video) {
                    video.currentTime += 87; // Avança 87 segundos (1.5min) no vídeo
                    skippedOp++;

                    // Esconde o botão se já tiver sido clicado uma vez
                    if (skippedOp !== 0) {
                        skipOpContainer.style.display = 'none';
                    }
                    
                }
            });
        } else {
            console.warn("A barra de controle não foi encontrada.");
        }
        // Esconde o botão SkipOp se a minutagem for maior que 5 minutos
        const video = document.querySelector('video'); // Seleciona o elemento de vídeo
        video.addEventListener('timeupdate', () => {
        if(video.currentTime > 300){
            skipOpContainer.style.display = 'none';
        }})
            // Botão de Pular ending/término
        if(video.currentTime > 1090){
            skipOpButton.innerHTML = `<span class="skipOp" aria-hidden="true">Pular Término</span>
            <span class="vjs-control-text" aria-live="polite">Pular Término</span>`;
            skipOpContainer.style.display = 'block';
            skippedOp++;
        }

    }, 100); // Atraso de 100 ms para garantir o carregamento do DOM
});


// Video Progress Save
document.addEventListener('DOMContentLoaded', ()=>{
    const video = document.getElementById('video-frame')

    // Gerar uma chave de progresso única com base no URL do vídeo
    const playbackKey = `videoProgress_${window.location.pathname}`

    // Salva o progresso a cada atualização de tempo
    video.ontimeupdate = () =>{
        localStorage.setItem(playbackKey, video.currentTime);
    };

    // Carrega a posição salva ao iniciar
    window.onload = () =>{
        const savedTime = localStorage.getItem(playbackKey);
        if(savedTime){
            video.currentTime = savedTime
        }
    }

    // Limpa o progresso ao terminar o vídeo
    video.onended = () =>{
        localStorage.removeItem(playbackKey)
    }
})
