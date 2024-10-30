const animeDragger = document.querySelector('.anime-dragger');
let isDragging = false;
let startX;
let scrollLeft;

// Função para definir o cursor como 'grabbing'
function setGrabbingCursor() {
    animeDragger.style.cursor = 'grabbing';
}

// Função para resetar o cursor para 'grab'
function resetCursor() {
    animeDragger.style.cursor = 'grab'; // Volta o cursor para 'grab'
}

// Evento que inicia o arrasto quando o botão do mouse é pressionado
animeDragger.addEventListener('mousedown', (e) => {
    isDragging = true; // Ativa o modo de arrasto
    animeDragger.classList.add('dragging'); // Adiciona a classe de estilo de arrasto
    startX = e.pageX - animeDragger.offsetLeft; // Posição X do clique
    scrollLeft = animeDragger.scrollLeft; // Posição atual do scroll
    setGrabbingCursor(); // Muda o cursor para 'grabbing'
});

// Evento que cancela o arrasto quando o mouse sai da área do container
animeDragger.addEventListener('mouseleave', () => {
    isDragging = false;
    animeDragger.classList.remove('dragging');
    resetCursor(); // Reseta o cursor para 'grab'
});

// Evento que cancela o arrasto quando o botão do mouse é solto
animeDragger.addEventListener('mouseup', () => {
    isDragging = false;
    animeDragger.classList.remove('dragging');
    resetCursor(); // Reseta o cursor para 'grab'
});

// Evento que controla o movimento de arrasto enquanto o mouse é movido
animeDragger.addEventListener('mousemove', (e) => {
    if (!isDragging) return; // Se não está arrastando, não faz nada
    e.preventDefault(); // Previne o comportamento padrão
    const x = e.pageX - animeDragger.offsetLeft; // Nova posição do mouse
    const walk = (x - startX) * 1.5; // Multiplicador para suavizar o movimento
    animeDragger.scrollLeft = scrollLeft - walk; // Move o scroll
});

// Adiciona suporte ao toque para dispositivos móveis
animeDragger.addEventListener('touchstart', (e) => {
    isDragging = true;
    animeDragger.classList.add('dragging');
    startX = e.touches[0].pageX - animeDragger.offsetLeft; // Posição do toque
    scrollLeft = animeDragger.scrollLeft;
    setGrabbingCursor();
});

animeDragger.addEventListener('touchend', () => {
    isDragging = false;
    animeDragger.classList.remove('dragging');
    resetCursor();
});

animeDragger.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.touches[0].pageX - animeDragger.offsetLeft;
    const walk = (x - startX) * 1.5 ; // Multiplicador para suavizar o movimento
    animeDragger.scrollLeft = scrollLeft - walk;
});
