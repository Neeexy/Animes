// Dragger ( Slides Swipe )

const animeDragger = document.querySelector('.anime-dragger')
let isDragging = false; // Variável para controlar se o arrasto está ativo / 
let startX; // Posição inicial do eixo X
let scrollLeft; // Posição de rolagem atual do container

// Evento que inicia o arrasto quando o botão do mouse é pressionado
animeDragger.addEventListener('mousedown', (e) =>{
    isDragging = true; // Ativa o modo de arrasto
    animeDragger.classList.add('dragging') // Adiciona uma classe ao container para mudar o cursor
    startX = e.pageX - animeDragger.offsetLeft; // Pega a posição inicial do clique no eixo  X, levando em conta a posição do container
    scrollLeft = animeDragger.scrollLeft; // Armazena a posição de rolagem atual
});

// Evento que cancela o arrasto quando o mouse sai do container
animeDragger.addEventListener('mouseup', (e)=>{
    isDragging = false; // Cancela o modo de arrasto
    animeDragger.classList.remove('dragging') // Remove a classe que muda o cursor
});

// Evento que controla o movimento de arrasto enquanto o mouse é movido
animeDragger.addEventListener('mousemove' , (e) =>{
    if (!isDragging) return; // Se não estiver arrastando, não faz nada
    e.preventDefault(); // Evita o comportamento padras do navegador
    const x = e.pageX - animeDragger.offsetLeft; // Calcula a posição atual no mouse no eixo X, ajustada pelo container
    const walk = (x - startX) * 2; // Calcula a distância que o container deve rolar, multiplicando para ajustar a velocidade
    animeDragger.scrollLeft = scrollLeft - walk // Ajusta a rolagem do container
});