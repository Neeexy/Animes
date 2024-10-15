const searchInput = document.querySelector('.input-search');
const searchResults = document.getElementById('search-results');
const btn_search = document.querySelector('.btn-search');
const logo = document.getElementById('logo');
const pageContent = document.getElementById('page-content'); // Contêiner principal da página
const view_portWd = document.documentElement.clientWidth
let isSearchActive = false;
let animes = [];

// Carregar os dados do arquivo JSON
fetch('animes.json')
    .then(response => response.json())
    .then(data => {
        animes = data;
    })
    .catch(error => console.error('Erro ao carregar os animes:', error));

// Adicionar evento de input para a barra de pesquisa
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();

    if (animes.length === 0) return;

    const filteredAnimes = animes.filter(anime => anime.title.toLowerCase().includes(searchTerm));

    searchResults.innerHTML = ''; // Limpa os resultados anteriores
    filteredAnimes.forEach(anime => {
        const resultItem = document.createElement('div');
        resultItem.classList.add('result-item');
        resultItem.style.display = 'flex';
        resultItem.style.alignItems = 'center';
        resultItem.style.justifyContent = 'start';

        const link = document.createElement('a');
        link.href = anime.url;
        link.target = "_self";
        link.style.textDecoration = 'none';
        link.style.display = 'flex';

        const img = document.createElement('img');
        img.src = anime.image;
        img.alt = anime.title;

        const titleText = document.createElement('span');
        titleText.textContent = anime.title;
        titleText.style.display = 'flex';
        titleText.style.flexDirection = 'column';
        titleText.style.gap = '5px';

        const dateText = document.createElement('span');
        dateText.classList.add('date');
        dateText.textContent = anime.date;

        link.appendChild(img);
        link.appendChild(titleText);
        titleText.appendChild(dateText);

        resultItem.appendChild(link);
        searchResults.appendChild(resultItem);
    });

    searchResults.style.display = filteredAnimes.length > 0 ? 'block' : 'none';

    // Aplicar o efeito de blur ao conteúdo da página quando houver uma pesquisa ativa
    if (filteredAnimes.length > 0) {
        pageContent.style.filter = 'blur(5px)'; // Aplica o blur ao conteúdo da página
    } else {
        pageContent.style.filter = 'none'; // Remove o blur se não houver resultados
    }
});

// Remover o efeito de blur quando clicar fora da barra de busca ou resultados
document.addEventListener('click', (e) => {
    if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
        searchResults.style.display = 'none';
        pageContent.style.filter = 'none'; // Remove o blur
    }
});

// Limpar o input e remover o blur ao clicar no botão de pesquisa
btn_search.addEventListener('click', () => {
    searchInput.value = ''; // Limpa o valor do campo de entrada
    searchResults.style.display = 'none'; // Esconde a aba de resultados
    pageContent.style.filter = 'none'; // Remove o efeito de blur
});


btn_search.addEventListener('click', ()=>{
    let nav_flex = document.getElementById('nav')
    if(view_portWd <560){
        nav_flex.style.justifyContent = 'end'
        logo.style.display = 'none'}
})
