const searchInput = document.querySelector('.input-search');
const searchResults = document.getElementById('search-results');
const btn_search = document.querySelector('.btn-search');
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
        resultItem.style.display = 'flex'; // Define o display como 'flex' para alinhar a imagem e o texto
        resultItem.style.alignItems = 'center'; // Alinha os itens verticalmente
        resultItem.style.justifyContent = 'start'; // Alinha os itens verticalmente

        // Criando um elemento de link
        const link = document.createElement('a');
        link.href = anime.url; // URL do anime
        link.target = "_self"; // Abre o link em uma nova aba
        link.style.textDecoration = 'none'; // Remove o sublinhado do link
        link.style.display = 'flex'

        // Criando um elemento de imagem
        const img = document.createElement('img');
        img.src = anime.image; // URL da imagem
        img.alt = anime.title; // Texto alternativo

        // Criando o texto do título do anime
        const titleText = document.createElement('span');
        titleText.textContent = anime.title; // Adiciona o título do anime
        titleText.style.display = 'flex'
        titleText.style.flexDirection = 'column'
        titleText.style.gap = '5px'

        // Criando o texto do título do anime
        const dateText = document.createElement('span');
        dateText.classList.add('date')
        dateText.textContent = anime.date; // Adiciona o título do anime

        // Adicionando a imagem e o texto ao link
        link.appendChild(img); // Adiciona a imagem ao link
        link.appendChild(titleText); // Adiciona o texto do título ao link
        titleText.appendChild(dateText)

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
// // Fechar aba de resultado quando o mouse sair da janela do navegador
// window.addEventListener('mouseout', (e) =>{
//     if (!e.relatedTarget && e.clientY <= 0){
//         searchResults.style.display = 'none' // Esconde a barra de resultados
//     }
// });

// // Fechar a aba de resultados quando a janela perde o foco (quando o usuário muda de janela ou de monitor)
// window.addEventListener('blur',()=>{
//     searchResults.style.display = 'none'
// })
// Limpa input ao clicar no botão
btn_search.addEventListener('click', (e) => {
    searchInput.value = ''; // Limpa o valor do campo de entrada
    searchResults.style.display = 'none'; // Esconde a aba de resultados
});
