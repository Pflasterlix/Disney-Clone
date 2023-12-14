document.addEventListener('DOMContentLoaded', () => {
    // Array für Filmdaten
    let movies = [
        { name: 'Loki', des: 'Beschreibung für Loki', imdbID: 'tt9140554' },
        // Weitere Filme hinzufügen
    ];

    // Carousel
    const carousel = document.querySelector('.carousel');
    let sliders = [];
    let slideIndex = 0; // um den aktuellen Index des Slides zu verfolgen.

    const createSlide = async () => {
        if (slideIndex >= movies.length) {
            slideIndex = 0;
        }

        // DOM-Elemente erstellen
        let slide = document.createElement('div');
        let content = document.createElement('div');
        let h1 = document.createElement('h1');
        let p = document.createElement('p');
        let img = document.createElement('img'); // Bilddatei hinzufügen

        // Elemente verknüpfen
        h1.appendChild(document.createTextNode(movies[slideIndex].name));
        p.appendChild(document.createTextNode(movies[slideIndex].des));
        img.src = await getPosterUrl(movies[slideIndex].imdbID); // Bilddatei von der API abrufen
        content.appendChild(h1);
        content.appendChild(p);
        content.appendChild(img); // Bilddatei dem Inhalt hinzufügen
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

        // Trailer-URL abrufen und Tab öffnen
        const trailerUrl = await getTrailerUrl(movies[slideIndex].imdbID);
        if (trailerUrl) {
            // Event-Listener für den Klick auf den Slide und das Öffnen des Trailers hinzufügen
            slide.addEventListener('click', () => window.open(trailerUrl, '_blank'));
        } else {
            console.warn('Trailer-URL nicht verfügbar.');
        }

        slideIndex++;
    };

    // Funktion zum Abrufen der Poster-URL aus der OMDB-API
    const getPosterUrl = async (imdbID) => {
        const apiKey = '614e1de6';
        const apiUrl = `http://www.omdbapi.com/?i=${imdbID}&apikey=${apiKey}`;

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            // Hier die Logik anpassen, um die Poster-URL aus den API-Daten zu extrahieren.
            const posterUrl = data.Poster;  // Hier müsste die korrekte Eigenschaft aus den API-Daten verwendet werden.

            if (posterUrl) {
                return posterUrl;
            } else {
                console.warn('Poster-URL nicht verfügbar.');
                return null;
            }
        } catch (error) {
            console.error('Fehler beim Abrufen der Poster-URL:', error);
            return null;
        }
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

    function attachClickEvent(videoCard) {
        videoCard.addEventListener('click', function () {
            // Hier sollte Logik für die Trailer-Wiedergabe stehen
            // Zum Beispiel: Zeigen Sie ein Popup-Fenster mit dem Video an oder leiten Sie auf eine andere Seite um
            console.log('Trailer abspielen für:', videoCard.querySelector('.card-img').alt);
        });
    }

    videoCards.forEach(item => {
        item.addEventListener('mouseover', () => {
            let video = item.querySelector('video'); // Beachte die Änderung des Selektors auf 'video'
            video.play().catch(error => {
                // Ignoriere den Fehler, wenn das automatische Abspielen blockiert wurde
                if (error.name === 'NotAllowedError') {
                    console.warn('Automatisches Abspielen blockiert. Benutzerinteraktion erforderlich.');
                }
            });
        });

        item.addEventListener('mouseleave', () => {
            let video = item.querySelector('video'); // Beachte die Änderung des Selektors auf 'video'
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
});
