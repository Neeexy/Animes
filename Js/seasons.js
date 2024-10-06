const botoesTemporada = document.querySelectorAll('.temporada-selector button');
const temporadas = document.querySelectorAll('.temporada');
const animeDetails = document.querySelector('.anime-details');

// Função para verificar se alguma temporada está visível
const isAnyTemporadaOpen = () => {
    return Array.from(temporadas).some(temp => temp.style.display === 'block');
};

// Função para atualizar o estilo do .anime-details
const atualizarMargemAnimeDetails = () => {
    if (isAnyTemporadaOpen()) {
        animeDetails.style.marginTop = '0px';  // Zera a margem quando uma temporada está aberta
    } else {
        const windowWidth = window.innerWidth;
        if (windowWidth > 768) {
            animeDetails.style.marginTop = '-150px';  // Margem para resolução maior que 768px
        } else {
            animeDetails.style.marginTop = '-350px';  // Margem para resolução menor que 768px
        }
    }
};

// Adiciona o evento de clique em cada botão de temporada
botoesTemporada.forEach(botao => {
    botao.addEventListener('click', () => {
        const temporadaId = `temporada-${botao.dataset.temporada}`;

        // Esconde todas as temporadas
        temporadas.forEach(temp => {
            temp.style.display = 'none';
        });

        // Mostra a temporada selecionada
        document.getElementById(temporadaId).style.display = 'block';

        // Atualiza a margem do .anime-details
        atualizarMargemAnimeDetails();
    });
});

// Verifica a margem ao carregar a página
atualizarMargemAnimeDetails();

// Também atualiza ao redimensionar a janela
window.addEventListener('resize', atualizarMargemAnimeDetails);
