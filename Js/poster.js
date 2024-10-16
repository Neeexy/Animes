        // Poster Script
        const poster = document.getElementById('video-poster');
const iframe = document.getElementById('video-frame');

poster.addEventListener('click',function(){
    // Esconder o poster
    poster.style.display = 'none'

    // Recuperar URL do vídeo atribuido pelo "data-src" e adicionar o autoplay
    const videoSrc = iframe.getAttribute('data-src') + "?autoplay=1";
    iframe.setAttribute('src',videoSrc);

    // Mostrar iframe com o vídeo
    iframe.style.display = 'block'
})
