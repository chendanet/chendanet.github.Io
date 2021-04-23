const API_KEY = 'b167abc3';

const url =`https://www.omdbapi.com/?apikey=${API_KEY}`;



//selectionner doc du DOM
const buttonSearch = document.querySelector("#searchMovie"); // récupération de l'élément qui a l'id "searchMovie"
const inputTitleMovie = document.querySelector("#inputTitleMovie"); // récupération de l'élément qui a l'id "inputTitleMovie"

buttonSearch.onclick = function(event) {
    event.preventDefault(); //pour éviter que la page se refresh
    // sans qu'il ne se passe rien après submitsearch
    const value = inputTitleMovie.value;
    const newUrl = url + '&s=' + value;

    fetch(newUrl) //recuperer donnée asynchrone à partir de l'URL
        .then((res) => res.json()) //resultat en json 
        .then((dataomdb) => {
            const tableauFilms = dataomdb.Search; // Search est un élément dans la console

            // si Search est undefined, ca veut dire que l'api n'a trouvé aucun film correspondant
            if (tableauFilms === undefined) {
                return []; // on renvoit une liste vide au prochain .then
            }

            // si par contre l'api trouve des films, on va aller récupérer le détail pour chaque film
            // càd que l'on va exécuter un fetch pour chaque film du tableau
            return Promise.all(
                tableauFilms.map(film => {
                    return fetch(`${url}&i=${ film.imdbID }&plot=full`)
                        .then((res) => res.json()) //resultat en json 
                })
            );

            /*
            .map(film => fetch(`http://www.omdbapi.com/?apikey=b167abc3&i=${ film.imdbID }`)
            [
                fetch(`http://www.omdbapi.com/?apikey=b167abc3&i=0),
                fetch(`http://www.omdbapi.com/?apikey=b167abc3&i=3),
                fetch(`http://www.omdbapi.com/?apikey=b167abc3&i=2),
            ]
            */
        })
        .then((tableauFilms) => {
            const elementResultats = document.querySelector('#resultats'); // récupère l'élément #resultats
            elementResultats.innerHTML = ''; // vide le contenu de l'élément HTML #resultats

            // si films est vide, c'est que la recherche n'a pas de résultat
            if (tableauFilms.length === 0) {
                elementResultats.innerHTML = 'Pas de résultat pour ce nom de film.';
            } else {
                // parcours le tableau
                for (let i = 0; i < tableauFilms.length; i++) {
                    const film = tableauFilms[i];
                    // ajouter le html de la carte d'un film

                    // margin: 10px auto; => margin-top: 10px; margin-bottom: 10px; margin-left: auto; margin-right: auto;
                    elementResultats.innerHTML += `
                    <div class="card" style="width: 18rem; margin: 20px auto; ">
                        <img src="${ film.Poster }" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${ film.Title }</h5>
                            <p class="card-text">${ film.Year }</p>
                            <button type="button" class="btn btn-info" data-bs-toggle="modal" data-bs-target="#film-${ film.imdbID }">
                                Read more
                            </button>

                            <div class="modal fade" id="film-${ film.imdbID }" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel">${ film.Title }</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        <img src="${ film.Poster }" />
                                        <p>${ film.Plot }</p>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    `;
                }
            }
        })
        .catch((error) => {
            console.log('Il y a eu une erreur', error)
        });

    console.log('Ce que tu as tapé:', value);
}

