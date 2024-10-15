// Dragger nos animes (deslizar)
const animeDragger = document.querySelector('.anime-dragger');
const animeItems = document.querySelectorAll('.anime-dragger > img'); // Supondo que você esteja arrastando imagens ou itens dentro do contêiner
let isDragging = false; // Variável para controlar se o arrasto está ativo
let startX; // Posição inicial do clique no eixo X
let scrollLeft; // Posição de rolagem atual

// Função para mudar o cursor para 'grabbing' nos itens
function setGrabbingCursor() {
    animeItems.forEach(item => {
        item.style.cursor = 'grabbing'; // Aplica o cursor 'grabbing' a todos os itens
    });
}

// Função para resetar o cursor para 'grab' nos itens
function resetCursor() {
    animeItems.forEach(item => {
        item.style.cursor = 'grab'; // Volta o cursor para 'grab'
    });
}

// Evento que inicia o arrasto quando o botão do mouse é pressionado
animeDragger.addEventListener('mousedown', (e) => {
    console.log("Mouse Down");
    isDragging = true; // Ativa o modo de arrasto
    animeDragger.classList.add('dragging'); // Adiciona a classe de estilo de arrasto
    startX = e.pageX - animeDragger.offsetLeft; // Posição X do clique menos a posição do container
    scrollLeft = animeDragger.scrollLeft; // Pega a posição atual
    setGrabbingCursor(); // Muda o cursor para 'grabbing' nos itens
});

// Evento que cancela o arrasto caso o mouse saia da área do container
animeDragger.addEventListener('mouseleave', () => {
    isDragging = false;
    animeDragger.classList.remove('dragging');
    resetCursor(); // Reseta o cursor nos itens para 'grab'
});

// Evento que cancela o arrasto quando o botão do mouse é solto
animeDragger.addEventListener('mouseup', () => {
    isDragging = false;
    animeDragger.classList.remove('dragging');
    resetCursor(); // Reseta o cursor nos itens para 'grab'
});

// Evento que controla o movimento de arrasto enquanto o mouse é movido
animeDragger.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    console.log("Mouse Move");
    e.preventDefault();
    const x = e.pageX - animeDragger.offsetLeft;
    const walk = (x - startX) * 0.5; // Multiplica o movimento para ajustar a sensibilidade
    animeDragger.scrollLeft = scrollLeft - walk;
    setGrabbingCursor();
});

// Adicione o preventDefault para imagens dentro do animeDragger
animeDragger.querySelectorAll('img').forEach((img) => {
    img.addEventListener('mousedown', (e) => e.preventDefault());
});