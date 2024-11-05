const searchInput = document.querySelector('.input-search');
const searchResults = document.getElementById('search-results');
const btn_search = document.querySelector('.btn-search');
const logo = document.getElementById('logo');
const menu = document.getElementById('menu')
const pageContent = document.getElementById('page-content'); // Contêiner principal da página
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

    if (filteredAnimes.length > 0) {
        // Se houver resultados, exibe os itens correspondentes
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

        searchResults.style.display = 'block';
        pageContent.style.filter = 'blur(5px)'; // Aplica o blur ao conteúdo da página

    } else {
        // Se não houver resultados, exibe a mensagem de indisponibilidade
        const noResultsMessage = document.createElement('div');
        noResultsMessage.textContent = 'Lamentamos, mas este anime está indisponível.';
        noResultsMessage.style.color = 'gray';
        noResultsMessage.style.textAlign = 'center';
        noResultsMessage.style.padding = '10px';
        searchResults.appendChild(noResultsMessage);

        searchResults.style.display = 'block';
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

// Remover a logo quando clicar no botão de pesquisa, se a tela for menor que 560px width
btn_search.addEventListener('click', (e) =>{
    let nav_flex = document.getElementById('nav')
    let view_portWd = document.documentElement.clientWidth

    // Esconde a logo se a largura da tela for menor que 560px
    if (view_portWd <= 560){
        nav_flex.style.justifyContent = 'end';
        logo.style.display = 'none'
    };

    
    // Adiciona o evento de clique no documento para trazer a logo de volta ao clicar fora da aba de pesquisa
    document.addEventListener('click', function ClickOutSite(event){
        // Verifica se o clique foi fora do botão de busca e fora da barra de pesquisa
        if (!btn_search.contains(event.target) && !searchInput.contains(event.target)) {
            nav_flex.style.justifyContent = 'space-between';
            logo.style.display = 'block'

        // Remove o event listner após restaurar a logo
            document.removeEventListener('click',ClickOutSite);
        }
    })

})