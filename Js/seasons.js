


const seasonButtons = document.querySelectorAll('.temporada-selector button');
const languageButtons = document.querySelectorAll('.linguagem-selector button');
const seasons = document.querySelectorAll('.temporada');
const animeDetails = document.querySelector('.anime-details');
const temp_ind = document.querySelector('.temp-indicator')
const footer = document.getElementById('footer')


// Inicialmente, esconde todos os botões de temporada
seasonButtons.forEach(button =>{
    button.style.display = 'none'
})
// Função para mostrar/esconder botões de temporada baseados na linguagem com scroll suave
function filterSeasonButtons(language) {
    seasonButtons.forEach(button => {
        button.style.display = button.dataset.linguagem === language ? 'block' : 'none';
    });


}

// Função para mostrar/esconder temporadas com scroll suave
function showSeason(seasonId) {
    // Mostra a temporada selecionada
    seasons.forEach(sea => {
        sea.style.display = sea.id === seasonId ? 'block' : 'none';
    });

    // Scroll suave para a temporada selecionada após a seleção
    const season = document.getElementById(seasonId);
    if (season) {
        setTimeout(() => {
            season.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest'
            });
        }, 1200); // Atraso de 1 segundo (1000 ms)
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
        temp_ind.style.display = 'block'

    });
});


// Event listeners para botões de temporada
seasonButtons.forEach(button => {
    button.addEventListener('click', () => {
        footer.classList.add('relative')
        const seasonId = `temporada-${button.dataset.temporada}-${button.dataset.linguagem}`;
        showSeason(seasonId);

    });
});


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


// Reverter lista de episódios
document.addEventListener('DOMContentLoaded', ()=>{
    const seasons = document.querySelectorAll('.season');
    seasons.forEach(season =>{
        const episodes = Array.from(season.querySelectorAll('.episodes'));
        episodes.reverse().forEach(episode => season.appendChild(episode))
    })
})

// Alterar estilo dos números dos episódios
document.addEventListener('DOMContentLoaded', ()=>{
    const episodeNumbers = document.querySelectorAll('.episode-number');

    episodeNumbers.forEach(episodeNumber =>{
        const text = episodeNumber.textContent // Pega o texto completo
        const episodeDigit = text.slice(9,11) // Pega os caracteres 10 e 11 (os números)
        const newText = text.slice(0,9) + `<span class="episode-digit">${episodeDigit}</span>`; // Envolve os números em uma span
        episodeNumber.innerHTML = newText
    })
})


// Função para monitorar a rolagem e mostrar/ocultar o botão
window.addEventListener("scroll", function () {
    const backToTopButton = document.querySelector(".btt");
    if (window.scrollY > 200) { // Mostra o botão após rolar 200 pixels
        backToTopButton.classList.add("show");
    } else {
        backToTopButton.classList.remove("show");
    }
});