// Lê o arquivo de texto com os links dos episódios
fetch('eps-kaifuku.txt') 
    .then(response => response.text())
    .then(text => {
        const episodeLines = text.split('\n'); 
        const episodes = {};

        episodeLines.forEach(line => {
            if (line.trim() !== '') { // Ignora linhas em branco
                const [episodeTitle, episodeLink] = line.split(' = ');
                episodes[episodeTitle] = episodeLink.trim(); // Remove espaços em branco extras
            }
        });

        const episodeList = document.getElementById('episode-links');
        for (const episodeTitle in episodes) {
            const listItem = document.createElement('li');
            const episodeLink = document.createElement('a');
            episodeLink.href = '#'; 
            episodeLink.textContent = episodeTitle;
            episodeLink.addEventListener('click', () => {
                document.getElementById('video-iframe').src = episodes[episodeTitle];
            });
            listItem.appendChild(episodeLink);
            episodeList.appendChild(listItem);
        }

        // Carrega o primeiro episódio por padrão
        const firstEpisodeTitle = Object.keys(episodes)[0];
        document.getElementById('video-iframe').src = episodes[firstEpisodeTitle];
    });