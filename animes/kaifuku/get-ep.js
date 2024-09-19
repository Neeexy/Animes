// Lê o arquivo de texto com os links dos episódios
fetch('eps-kaifuku.txt') 
    .then(response => response.text())
    .then(text => {
        const episodeLines = text.split('\n');
        const episodes = {};
        let currentEpisode = 1; 

        episodeLines.forEach(line => {
            if (line.trim() !== '') {
                const [episodeTitle, episodeLink] = line.split(' = ');
                episodes[episodeTitle] = episodeLink.trim();
            }
        });

        const episodeList = document.getElementById('episode-links');
        const videoIframe = document.getElementById('video-iframe');
        const episodeTitleElement = document.getElementById('episode-title');
        const prevButton = document.getElementById('prev-episode');
        const nextButton = document.getElementById('next-episode');

        // Cria a lista de episódios
        for (const episodeTitle in episodes) {
            const listItem = document.createElement('li');
            const episodeLink = document.createElement('a');
            episodeLink.href = '#';
            episodeLink.textContent = episodeTitle;
            episodeLink.addEventListener('click', () => {
                currentEpisode = parseInt(episodeTitle.split(' ')[1]); 
                updateVideoAndTitle();
            });
            listItem.appendChild(episodeLink);
            episodeList.appendChild(listItem);
        }

        // Função para atualizar o vídeo e o título
        function updateVideoAndTitle() {
            const currentEpisodeTitle = `Episódio ${currentEpisode}`;
            videoIframe.src = episodes[currentEpisodeTitle];
            episodeTitleElement.textContent = `[ Kaifuku Jutsushi no Yarinaoshi ] - ${currentEpisodeTitle}`;

            // Atualiza a classe 'active' na lista de episódios
            const episodeLinks = episodeList.querySelectorAll('a');
            episodeLinks.forEach(link => link.classList.remove('active'));
            episodeLinks[currentEpisode - 1].classList.add('active'); 

            // Habilita/desabilita os botões de navegação
            prevButton.disabled = (currentEpisode === 1);
            nextButton.disabled = (currentEpisode === Object.keys(episodes).length);
        }

        // Adiciona os eventos aos botões de navegação
        prevButton.addEventListener('click', () => {
            if (currentEpisode > 1) {
                currentEpisode--;
                updateVideoAndTitle();
            }
        });

        nextButton.addEventListener('click', () => {
            if (currentEpisode < Object.keys(episodes).length) {
                currentEpisode++;
                updateVideoAndTitle();
            }
        });

        // Carrega o primeiro episódio por padrão
        updateVideoAndTitle();
    });