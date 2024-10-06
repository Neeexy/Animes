const botoesTemporada = document.querySelectorAll('.temporada-selector button');
const temporadas = document.querySelectorAll('.temporada');

botoesTemporada.forEach(botao => {
    botao.addEventListener('click', () => {
    const temporadaId = `temporada-${botao.dataset.temporada}`;

    // Esconde todas as temporadas
    temporadas.forEach(temp => {
    temp.style.display = 'none';
    });

    // Mostra a temporada selecionada
    document.getElementById(temporadaId).style.display = 'block';
});
});