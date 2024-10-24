 // Função para adicionar um card de anime
function addAnimeCard(animeTitle, posterUrl, rating, year, link) {
    const container = document.getElementById('animes-container');

    // Criação da estrutura do card com template literals
    const animeCardHTML = `
        <div class="anime-card">
            <a href="${link}" target="_self">
                <img src="${posterUrl}" alt="${animeTitle} - poster" class="poster">
            </a>
            <div class="card-content">
                <h2>${animeTitle}</h2>
                <div class="card-rating">
                    ${generateRatingStars(rating)}
                </div>
            </div>
        </div>
        <div class="data-feature">
            <h3 class="anime-title"><a href="${link}" target="_self">${animeTitle}</a></h3>
            <span class="date">${year}</span>
        </div>
    `;

    // Adiciona o card ao container
    container.innerHTML += animeCardHTML;
}

// Função auxiliar para gerar estrelas de rating
function generateRatingStars(rating) {
    let starsHTML = '';
    const fullStars = Math.floor(rating);  // Estrelas completas
    const halfStar = rating % 1 !== 0;  // Se existe meia estrela

    for (let i = 0; i < fullStars; i++) {
        starsHTML += '<ion-icon name="star" class="star"></ion-icon>';
    }

    if (halfStar) {
        starsHTML += '<ion-icon name="star-half" class="star"></ion-icon>';
    }

    return starsHTML;
}

// Exemplo de uso para adicionar o card de "Re:Zero"
addAnimeCard(
    'Re:Zero Kara Hajimeru Isekai Seikatsu',
    'https://i.ibb.co/LSqnJc9/re-zero-kara-hajimeru-isekai-seikatsu.jpg',
    3.5,
    '2016',
    'assistir-anime/Re-Zero-1/Re-Zero.html'
);

// Você pode adicionar outros cards chamando a função novamente
addAnimeCard(
    'Outro Anime',
    'https://link-para-o-poster-do-anime.jpg',
    4,
    '2020',
    'assistir-anime/Outro-Anime-1/Outro-Anime.html'
);