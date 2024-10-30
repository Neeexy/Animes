document.addEventListener('DOMContentLoaded', function() {
    const video = document.querySelector('video');
    const displayContainer = document.querySelector('.vjs-text-track-display');

    if (video) {
        // Controle de teclas
        document.addEventListener('keydown', function(event) {
            if (event.target.tagName.toLowerCase() !== 'input' && event.target.tagName.toLowerCase() !== 'textarea') {
                switch(event.key) {
                    case ' ':
                    case 'k':
                        video.paused ? video.play() : video.pause();
                        break;
                    case 'ArrowUp':
                        video.volume = Math.min(1, video.volume + 0.1);
                        break;
                    case 'ArrowDown':
                        video.volume = Math.max(0, video.volume - 0.1);
                        break;
                    case 'm':
                        video.muted = !video.muted;
                        break;
                }
            }
        });

        document.addEventListener('keydown', function(event) {
            if (event.key.toLowerCase() === 'f') {
                const fullscreenButton = document.querySelector('.vjs-fullscreen-control');
                fullscreenButton?.click();
            }
        });

        // Controle de velocidade com tecla 'v'
        const speedIcon = document.createElement('div');
        speedIcon.classList.add('fluid');
        speedIcon.innerHTML = `<span class='fluid-icons' aria-hidden="true">2x ‣‣</span>
                               <span class="vjs-control-text" aria-live="polite">Speed 2x</span>`;
        
        document.addEventListener('keydown', function(event) { 
            if (event.key === 'v') {
                if (video.paused) video.play();
                if (!displayContainer.contains(speedIcon)) displayContainer.appendChild(speedIcon);
                video.playbackRate = 2.0;
            }
        });
        
        document.addEventListener('keyup', function(event) {
            if (event.key === 'v') {
                if (displayContainer.contains(speedIcon)) displayContainer.removeChild(speedIcon);
                video.playbackRate = 1.0;
            }
        });

        // Controle de velocidade no mobile
        let touchHoldTime;
        video.addEventListener('touchstart', function() {
            touchHoldTime = setTimeout(() => {
                if (video.paused) video.play();
                if (!displayContainer.contains(speedIcon)) displayContainer.appendChild(speedIcon);
                video.playbackRate = 2.0;
            }, 1000);
        });

        video.addEventListener('touchend', function() {
            clearTimeout(touchHoldTime);
            if (displayContainer.contains(speedIcon)) displayContainer.removeChild(speedIcon);
            video.playbackRate = 1.0;
        });

        // Configuração de margem no modo fullscreen
        function isMobile() {
            return /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop|BlackBerry/i.test(navigator.userAgent);
        }

        document.addEventListener('fullscreenchange', function() {
            const videoControls = document.querySelector('.vjs-current-time.vjs-time-control.vjs-control');
            if (document.fullscreenElement) {
                videoControls.style.marginRight = isMobile() ? '77%' : '81%';
            } else {
                videoControls.style.marginRight = '';
            }
        });

        // Controle de volume e PiP em mobile
        const volumePanel = document.querySelector('.vjs-volume-panel');
        const pinP = document.querySelector('.vjs-picture-in-picture-control');
        if (isMobile()) {
            volumePanel?.style.display = 'none';
            pinP?.style.display = 'none';
        }

        // Função de skip/back com toque duplo
        let lastTap = 0;
        const skipVideo = (seconds, message, isRightSide) => {
            video.currentTime += seconds;
            showVisualFeedback(message, isRightSide);
        };

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
            feedbackDiv.style.opacity = '0';
            feedbackDiv.style.transition = 'opacity 0.2s ease';
            feedbackDiv.style.zIndex = '10';
            feedbackDiv.style[isRightSide ? 'right' : 'left'] = '10%';

            displayContainer.appendChild(feedbackDiv);
            setTimeout(() => { feedbackDiv.style.opacity = '1'; }, 0);
            setTimeout(() => {
                feedbackDiv.style.opacity = '0';
                feedbackDiv.addEventListener('transitionend', () => feedbackDiv.remove());
            }, 500);
        };

        video.addEventListener('touchstart', function(event) {
            const currentTime = new Date().getTime();
            const timeSinceLastTap = currentTime - lastTap;
            lastTap = currentTime;
            const touchX = event.touches[0].clientX;
            const isRightSide = touchX > video.clientWidth / 2;

            if (timeSinceLastTap < 300) {
                skipVideo(isRightSide ? 10 : -10, isRightSide ? '10s ▸▸' : '◂◂ 10s', isRightSide);
            }
        });

        document.addEventListener('keydown', function(e){
            switch(e.key){
                case 'l': skipVideo(10, '10s ▸▸', true); break;
                case 'ArrowRight': skipVideo(5, '5s ▸▸', true); break;
                case 'j': skipVideo(-10, '◂◂ 10s', false); break;
                case 'ArrowLeft': skipVideo(-5, '◂◂ 5s', false); break;
            }
        });

        // Botões de retroceder e avançar
        const currentTimeDisplay = document.querySelector('.vjs-current-time-display');
        const rewindButtonDiv = document.createElement('div');
        rewindButtonDiv.classList.add('vjs-control', 'vjs-time-control', 'rewind-button-container');
        const rewindButton = document.createElement('button');
        rewindButton.classList.add('vjs-control', 'vjs-button', 'rewind-button');
        rewindButton.setAttribute('title', 'Retroceder 10 segundos');
        rewindButton.innerHTML = `<span class="rewind10s">↺</span><span class="vjs-control-text">Retroceder 10s</span>`;

        const avanceButton = document.createElement('button');
        avanceButton.classList.add('vjs-control', 'vjs-button', 'avance-button');
        avanceButton.setAttribute('title', 'Avançar 10 segundos');
        avanceButton.innerHTML = `<span class="avance10s">↻</span><span class="vjs-control-text">Avançar 10s</span>`;

        rewindButtonDiv.appendChild(rewindButton);
        rewindButtonDiv.appendChild(avanceButton);
        currentTimeDisplay?.parentNode.insertBefore(rewindButtonDiv, currentTimeDisplay.nextSibling);

        rewindButton.addEventListener('click', () => skipVideo(-10, '◂◂ 10s', false));
        avanceButton.addEventListener('click', () => skipVideo(10, '10s ▸▸', true));

        // Botão de pular abertura
        const controlBar = document.querySelector('.vjs-control-bar');
        const skipOpContainer = document.createElement('div');
        skipOpContainer.classList.add('vjs-control', 'skip-op-container');
        const skipOpButton = document.createElement('button');
        skipOpButton.classList.add('vjs-control', 'vjs-button', 'skip-op-button');
        skipOpButton.innerHTML = `<span class="skipOp">Pular Abertura</span>`;
        skipOpContainer.appendChild(skipOpButton);
        controlBar?.appendChild(skipOpContainer);
        
        skipOpButton.addEventListener('click', () => {
            video.currentTime += 80; // Tempo da abertura
            skipOpContainer.style.display = 'none';
        });
    }
});
