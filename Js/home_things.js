// Captura o elemente de amostragem de qnt de visitas no footer
const visitas = document.getElementById('visitas')
// Contador de visitas no site
let contador_visitas = localStorage.getItem('contador_visitas')

// Se for a primeira visita, inicializa o contador
if(!contador_visitas){
    contador_visitas = 1;
}else{
    // Incrementa o contador se já existir
    contador_visitas = parseInt(contador_visitas) + 1;
}

// Atualiza o contador no LocalStorage
localStorage.setItem('contador_visitas', contador_visitas);

// Exibe a quantidade de visitas no footer
visitas.innerHTML = `<p> Acessos: ${contador_visitas}</p>`