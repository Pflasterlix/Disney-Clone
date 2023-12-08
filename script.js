        // Array für Filmdaten
        let movies = [
            { name: 'Loki', des: 'Beschreibung für Loki', image: 'pfad-zum-bild' },
            // Weitere Filme hinzufügen
        ];

        // Carousel
        const carousel = document.querySelector('.carousel');
        let sliders = [];
        let slideIndex = 0; // um den aktuellen Index des Slides zu verfolgen.

        const createSlide = () => {
            if (slideIndex >= movies.length) {
                slideIndex = 0;
            }

            // DOM-Elemente erstellen
            let slide = document.createElement('div');
            let content = document.createElement('div');
            let h1 = document.createElement('h1');
            let p = document.createElement('p');

            // Elemente verknüpfen
            h1.appendChild(document.createTextNode(movies[slideIndex].name));
            p.appendChild(document.createTextNode(movies[slideIndex].des));
            content.appendChild(h1);
            content.appendChild(p);
            slide.appendChild(content);

            // Klassen zuweisen
            slide.className = 'slider';
            content.className = 'slide-content';
            h1.className = 'movie-title';
            p.className = 'movie-des';

            sliders.push(slide);

            // Slider-Effekte hinzufügen
            if (sliders.length > 1) {
                sliders[0].style.marginLeft = `-${100 * (sliders.length - 1)}%`;
            }

            slideIndex++;
        };

        // Initial drei Slides erstellen
        for (let i = 0; i < 3; i++) {
            createSlide();
        }

        // Slides alle 3 Sekunden aktualisieren
        setInterval(() => {
            createSlide();
        }, 3000);

        // Video Cards
        const videoCards = [...document.querySelectorAll('.video-card')];

        videoCards.forEach(item => {
            item.addEventListener('mouseover', () => {
                let video = item.children[1];
                video.play();
            });

            item.addEventListener('mouseleave', () => {
                let video = item.children[1];
                video.pause();
            });
        });

        // Card Sliders
        let cardContainers = [...document.querySelectorAll('.card-container')];
        let preBtns = [...document.querySelectorAll('.pre-btn')];
        let nxtBtns = [...document.querySelectorAll('.nxt-btn')];

        cardContainers.forEach((item, i) => {
            let containerDimensions = item.getBoundingClientRect();
            let containerWidth = containerDimensions.width;

            nxtBtns[i].addEventListener('click', () => {
                item.scrollLeft += containerWidth - 200;
            });

            preBtns[i].addEventListener('click', () => {
                item.scrollLeft -= containerWidth + 200;
            });
        });