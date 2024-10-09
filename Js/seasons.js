


const seasonButtons = document.querySelectorAll('.temporada-selector button');
const languageButtons = document.querySelectorAll('.linguagem-selector button');
const seasons = document.querySelectorAll('.temporada');
const animeDetails = document.querySelector('.anime-details');


// Função para mostrar/esconder botões de temporada baseados na linguagem
function filterSeasonButtons(language) {
    seasonButtons.forEach(button => {
        button.style.display = button.dataset.linguagem === language ? 'inline-block' : 'none';
    });

    // Foca no primeiro botão de temporada visível
    const firstVisibleSeasonButton = Array.from(seasonButtons).find(button => button.style.display === 'inline-block');
    if (firstVisibleSeasonButton) {
        firstVisibleSeasonButton.focus();
    }
}

// Função para mostrar/esconder temporadas
function showSeason(seasonId) {
    seasons.forEach(sea => {
        sea.style.display = sea.id === seasonId ? 'block' : 'none';
    });

    // Foca no primeiro episódio da temporada
    const season = document.getElementById(seasonId);
    if (season) {
        const firstEpisode = season.querySelector('.episodes a'); // Corrigido aqui
        if (firstEpisode) {
            // Opcional: rolar suavemente até o episódio
            firstEpisode.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

}

// Função para verificar se alguma temporada está visível
const isAnyTemporadaOpen = () => {
    return Array.from(seasons).some(temp => temp.style.display === 'block');
};


// Event listeners para botões de idioma
languageButtons.forEach(button => {
    button.addEventListener('click', () => {
        const language = button.dataset.linguagem;
        filterSeasonButtons(language);
    });
});

// Event listeners para botões de temporada
seasonButtons.forEach(button => {
    button.addEventListener('click', () => {
        const seasonId = `temporada-${button.dataset.temporada}-${button.dataset.linguagem}`;
        showSeason(seasonId);
    });
});

// Inicialmente, mostrar todos os botões de temporada
filterSeasonButtons('dublado'); // Ou ('dublado')/('legendado')


// Dragger nas temporadas (deslizar)
const SeasonSelector = document.querySelector('.temporada-selector');
const SeasonButtons = document.querySelectorAll('.temporada-selector > button'); // Seleciona todos os botões de temporada
let isDragging = false; // Variável para controlar se o arrasto está ativo
let startX; // Posição inicial do clique no eixo X
let scrollLeft; // Posição de rolagem atual

// Função para mudar o cursor para 'grabbing' nos botões
function setGrabbingCursor() {
    SeasonButtons.forEach(button => {
        button.style.cursor = 'grabbing'; // Aplica o cursor 'grabbing' a todos os botões
    });
}

// Função para resetar o cursor para 'grab' nos botões
function resetCursor() {
    SeasonButtons.forEach(button => {
        button.style.cursor = 'grab'; // Volta o cursor para 'grab'
    });
}

// Evento que inicia o arrasto quando o botão do mouse é pressionado
SeasonSelector.addEventListener('mousedown', (e) => {
    console.log("Mouse Down");
    isDragging = true; // Ativa o modo de arrasto
    SeasonSelector.classList.add('dragging'); // Adiciona a classe de estilo de arrasto
    startX = e.pageX - SeasonSelector.offsetLeft; // Posição X do clique menos a posição do container
    scrollLeft = SeasonSelector.scrollLeft; // Pega a posição atual
    setGrabbingCursor(); // Muda o cursor para 'grabbing' nos botões
});

// Evento que cancela o arrasto caso o mouse saia da área do container
SeasonSelector.addEventListener('mouseleave', () => {
    isDragging = false;
    SeasonSelector.classList.remove('dragging');
    resetCursor(); // Reseta o cursor nos botões para 'grab'
});

// Evento que cancela o arrasto quando o botão do mouse é solto
SeasonSelector.addEventListener('mouseup', () => {
    isDragging = false;
    SeasonSelector.classList.remove('dragging');
    resetCursor(); // Reseta o cursor nos botões para 'grab'
});

// Evento que controla o movimento de arrasto enquanto o mouse é movido
SeasonSelector.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    console.log("Mouse Move");
    e.preventDefault();
    const x = e.pageX - SeasonSelector.offsetLeft;
    const walk = (x - startX) * 2;
    SeasonSelector.scrollLeft = scrollLeft - walk;
    setGrabbingCursor();
});