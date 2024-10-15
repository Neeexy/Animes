const animeDragger = document.querySelector('.anime-dragger');
let isDragging = false; 
let startX; 
let scrollLeft; 

// Função comum para iniciar o arrasto
function startDragging(e) {
    isDragging = true; 
    animeDragger.classList.add('dragging');
    startX = (e.pageX || e.touches[0].pageX) - animeDragger.offsetLeft; 
    scrollLeft = animeDragger.scrollLeft;
}

// Função comum para cancelar o arrasto
function stopDragging() {
    isDragging = false; 
    animeDragger.classList.remove('dragging');
}

// Evento para iniciar o arrasto (mouse ou toque)
animeDragger.addEventListener('mousedown', startDragging);
animeDragger.addEventListener('touchstart', startDragging);

// Evento para cancelar o arrasto (mouse ou toque)
animeDragger.addEventListener('mouseup', stopDragging);
animeDragger.addEventListener('mouseleave', stopDragging);
animeDragger.addEventListener('touchend', stopDragging);

// Evento que controla o movimento de arrasto (mouse ou toque)
animeDragger.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = (e.pageX || e.touches[0].pageX) - animeDragger.offsetLeft; 
    const walk = (x - startX) * 2; 
    animeDragger.scrollLeft = scrollLeft - walk;
});

// Suporte ao evento de movimento em dispositivos móveis
animeDragger.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - animeDragger.offsetLeft;
    const walk = (x - startX) * 4;
    animeDragger.scrollLeft = scrollLeft - walk;
});
