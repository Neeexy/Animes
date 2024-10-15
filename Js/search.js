const searchInput = document.querySelector('.input-search');
const searchResults = document.getElementById('search-results');
let animes = [];

// Carregar os dados do arquivo JSON
fetch('animes.json')
    .then(response => response.json())
    .then(data => {
        animes = data;
        console.log(animes); // Você pode usar essa variável para acessar os animes
    })
    .catch(error => console.error('Erro ao carregar os animes:', error));

// Adicionar evento de input para a barra de pesquisa
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();

    // Verifica se a lista de animes foi carregada
    if (animes.length === 0) {
        return; // Se não houver animes, não faz nada
    }

    const filteredAnimes = animes.filter(anime => anime.title.toLowerCase().includes(searchTerm));

    searchResults.innerHTML = ''; // Limpa os resultados anteriores

    filteredAnimes.forEach(anime => {
        const resultItem = document.createElement('div');
        resultItem.classList.add('result-item');

        // Criando um elemento de link
        const link = document.createElement('a');
        link.href = anime.url; // URL do anime
        link.target = "_blank"; // Abre o link em uma nova aba

        // Criando um elemento de imagem
        const img = document.createElement('img');
        img.src = anime.image; // URL da imagem
        img.alt = anime.title; // Texto alternativo
        img.style.width = '50px'; // Define a largura da imagem, ajuste conforme necessário
        img.style.marginRight = '10px'; // Espaçamento entre a imagem e o título

        // Adicionando a imagem e o texto ao link
        link.appendChild(img); // Adiciona a imagem ao link
        link.appendChild(document.createTextNode(anime.title)); // Adiciona o texto do título ao link

        resultItem.appendChild(link); // Adiciona o link ao item de resultado
        searchResults.appendChild(resultItem); // Adiciona o item de resultado à lista
    });

    // Mostrar ou ocultar a aba de resultados com base no número de resultados
    searchResults.style.display = filteredAnimes.length > 0 ? 'block' : 'none';
});

// Para esconder os resultados quando clicar fora da barra de busca
document.addEventListener('click', (e) => {
    if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
        searchResults.style.display = 'none'; // Esconde a aba se clicar fora
    }
});
