const animeDragger = document.querySelector('.anime-dragger');
const animeItems = document.querySelectorAll('.anime-dragger > img');
let isDragging = false;
let isScrolling = true; // Controla o scroll automático
let startX;
let scrollLeft;
let scrollInterval;
let scrollDirection = 1; // 1 para a direita, -1 para a esquerda

// Função para iniciar o scroll automático
function startAutoScroll() {
    stopAutoScroll(); // Garante que qualquer scroll anterior é parado
    scrollInterval = setInterval(() => {
        if (isScrolling) {
            animeDragger.scrollLeft += scrollDirection; // Controla a direção do scroll

            // Altera a direção ao atingir o final ou o início
            if (animeDragger.scrollLeft >= animeDragger.scrollWidth - animeDragger.clientWidth - 1) {
                scrollDirection = -1; // Inverte a direção para a esquerda
            } else if (animeDragger.scrollLeft <= 0) {
                scrollDirection = 1; // Inverte a direção para a direita
            }
        }
    }, 15); // Tempo de atualização do scroll
}

// Função para parar o scroll automático
function stopAutoScroll() {
    clearInterval(scrollInterval);
}

// Função para mudar o cursor para 'grabbing' nos itens
function setGrabbingCursor() {
    animeItems.forEach(item => {
        item.style.cursor = 'grabbing';
    });
}

// Função para resetar o cursor para 'grab' nos itens
function resetCursor() {
    animeItems.forEach(item => {
        item.style.cursor = 'grab';
    });
}

// Função para iniciar o arrasto
function startDrag(e) {
    isDragging = true;
    isScrolling = false; // Para o scroll automático ao iniciar o arrasto
    animeDragger.classList.add('dragging');
    startX = e.type === 'mousedown' ? e.pageX - animeDragger.offsetLeft : e.touches[0].pageX - animeDragger.offsetLeft;
    scrollLeft = animeDragger.scrollLeft;
    setGrabbingCursor();
}

// Evento que inicia o arrasto quando o botão do mouse é pressionado ou toque começa
animeDragger.addEventListener('mousedown', startDrag);
animeDragger.addEventListener('touchstart', startDrag);

// Evento que cancela o arrasto caso o mouse saia da área do container
function stopDrag() {
    isDragging = false;
    isScrolling = true; // Retoma o scroll automático ao sair da área
    animeDragger.classList.remove('dragging');
    resetCursor();
    startAutoScroll();
}

animeDragger.addEventListener('mouseleave', stopDrag);
animeDragger.addEventListener('mouseup', stopDrag);
animeDragger.addEventListener('touchend', stopDrag);

// Evento que controla o movimento de arrasto enquanto o mouse é movido ou toque se move
animeDragger.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - animeDragger.offsetLeft;
    const walk = (x - startX) * 0.8;
    animeDragger.scrollLeft = scrollLeft - walk;
    setGrabbingCursor();
});

// Adicione o movimento de toque
animeDragger.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.touches[0].pageX - animeDragger.offsetLeft;
    const walk = (x - startX) * 0.8;
    animeDragger.scrollLeft = scrollLeft - walk;
    setGrabbingCursor();
});

// Evento para parar o scroll automático quando o mouse entra no container
animeDragger.addEventListener('mouseenter', () => {
    isScrolling = false;
    stopAutoScroll();
});

// Evento de resize para garantir que o efeito seja reiniciado corretamente ao mudar o tamanho da tela
window.addEventListener('resize', () => {
    if (!isDragging) {
        isScrolling = true;
        startAutoScroll();
    }
});

// Adicione o preventDefault para imagens dentro do animeDragger
animeDragger.querySelectorAll('img').forEach((img) => {
    img.addEventListener('mousedown', (e) => e.preventDefault());
});

// Inicia o scroll automático quando a página carrega
startAutoScroll();
