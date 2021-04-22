const API_KEY = 'b167abc3';

const url ='http://www.omdbapi.com/?apikey=b167abc3';



//selectionner doc du DOM
const buttonSearch = document.querySelector("#searchMovie");
const inputTitleMovie = document.querySelector("#inputTitleMovie");

buttonSearch.onclick = function(event) {
    event.preventDefault(); //pour éviter que la page se refresh
    // sans qu'il ne se passe rien après submitsearch
    const value = inputTitleMovie.value;


    const newUrl = url + '&s=' + value
    http://www.omdbapi.com/?apikey=b167abc3&t=parasite&y=2019

    fetch(newUrl)
        .then((res) => res.json()) //resultat en json 
        .then((dataomdb) => {
            console.log('Data: ', dataomdb);
        })
        .catch((error) => {
            console.log('Il y a eu une erreur', error)
        });

    console.log('Ce que tu as tapé:', value);
}