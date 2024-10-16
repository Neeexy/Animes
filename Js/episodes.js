// Função para carregar o JSON de animes
async function loadAnimes() {
    try {
        const response = await fetch('episodes.json'); // Carrega o arquivo JSON
        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`); // Tratamento de erro caso o arquivo não seja carregado
        }
        const data = await response.json();          // Converte a resposta para JSON
        console.log(data); // Verifique os dados carregados no console
        if (data.animes && Array.isArray(data.animes)) {
            displayEpisodes(data.animes);            // Chama a função que exibe os episódios
        } else {
            console.error("Formato inesperado do JSON"); // Erro se a estrutura do JSON estiver incorreta
        }
    } catch (error) {
        console.error('Erro ao carregar o arquivo JSON:', error);
    }
}

// Função para exibir episódios de cada anime (limite de 15 episódios)
function displayEpisodes(animes) {
    const episodesContainer = document.getElementById('episodes-container');
    let episodeCount = 0; // Variável para contar o número de episódios exibidos

    animes.forEach(anime => {
        if (anime.episodes && Array.isArray(anime.episodes)) {
            anime.episodes.forEach(episode => {
                if (episodeCount >= 16) return; // Se já exibiu 15 episódios, parar

                // Cria o HTML para cada episódio
                const episodeHTML = `
                    <article class="item-episode" id="post-${episode.number}">
                        <a href="${episode.url}" target="_blank">
                            <div class="index-poster">
                                <img src="${episode.poster}" alt="Poster do ${anime.name} - Episódio ${episode.number}">
                                <div class="play-button"></div>
                            </div>
                        </a>
                        <div class="data">
                            <center>
                                <h3>
                                    <a href="${episode.url}" target="_blank">${anime.name}</a>
                                </h3>
                                <span>Episódio ${episode.number}</span>
                            </center>
                        </div>
                    </article>
                `;

                // Adiciona o episódio ao container de episódios
                episodesContainer.insertAdjacentHTML('beforeend', episodeHTML);
                episodeCount++; // Incrementa o contador de episódios exibidos
            });
        } else {
            console.error(`Episódios inválidos para o anime ${anime.name}`);
        }
    });
}

// Carregar os animes e episódios quando a página for carregada
document.addEventListener('DOMContentLoaded', loadAnimes);
