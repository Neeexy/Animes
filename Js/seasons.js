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

    // Atualiza a margem do .anime-details
    atualizarMargemAnimeDetails();
}

// Função para verificar se alguma temporada está visível
const isAnyTemporadaOpen = () => {
    return Array.from(seasons).some(temp => temp.style.display === 'block');
};

// Função para atualizar o estilo do .anime-details
const atualizarMargemAnimeDetails = () => {
    if (isAnyTemporadaOpen()) {
        animeDetails.style.marginTop = '0px';
        return; // Sai da função se alguma temporada estiver aberta
    }

    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    if (windowWidth > 1366) {
        animeDetails.style.marginTop = '-150px'; // Telas grandes (maior que 1366px)
    } else if (windowWidth > 768) {
        animeDetails.style.marginTop = '-10px';  // Telas médias (entre 768px e 1366px)
    } else if (windowWidth > 565) {
        animeDetails.style.marginTop = '-90px';  // Telas pequenas (entre 565px e 768px)
    } else if (windowWidth > 324) {
        animeDetails.style.marginTop = '-120px'; // Telas muito pequenas (entre 324px e 565px)
    } 
    // Telas menores que 324px de largura OU menores que 375px de altura
    if (windowHeight <= 379) {
        animeDetails.style.marginTop = '0px';
    } else if (windowHeight >= 340 && windowWidth < 768){
        animeDetails.style.marginTop = '-170px';
    }
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
filterSeasonButtons('none'); // Ou ('dublado')/('legendado')

// Verifica a margem ao carregar a página
atualizarMargemAnimeDetails();

// Também atualiza ao redimensionar a janela
window.addEventListener('resize', atualizarMargemAnimeDetails);