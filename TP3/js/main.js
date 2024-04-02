'use strict';
/* eslint-env browser, es6 */

// Pas besoin d'évenement window.onload puisqu'on utilise l'attribut defer
// lorsque l'on charge notre script
// console.log("Page load après");

function updateSelector(data){
    const select = document.getElementById("genreOption");
    for (let i=0; i<data.length;i++){
        //console.log(data[i].id);
        const opt = document.createElement("option");
        opt.value = i;
        opt.text = data[i].name;
        select.add(opt);
    }
    


}

function loadGenres() {
    fetch('http://localhost:3000/genres', { method: 'GET' })
    .then(response => {
        if (response.ok){
            return response.json();
        }
        else {
            throw (
                new Error("Response not ok")
              );
        }
    })
    .then((data) => {
        updateSelector(data);
        document.getElementById("genreOption").addEventListener('change', (evt) => {loadArtists(data, evt.target.value)});
        loadArtists(data, 0);
    })
    .catch(error => console.log('error:', error));
}

async function updateArtists(genre) {
    const response = await fetch('http://localhost:3000/genres/'+genre+'/artists', { method: 'GET' })
    const artists = await response.json();
    console.log(artists);

    const ul = document.querySelector("#main ul");
    const ul_li_childs = ul.querySelectorAll("li");
    ul_li_childs.forEach(element => {
        element.remove();
    })


    artists.forEach(element => {
        const li = document.createElement("li");
        const h3 = document.createElement("h3");
        const img = document.createElement("img");

        h3.textContent = element.name;
        img.src = element.photo;
        li.appendChild(h3);
        li.appendChild(img);
        ul.appendChild(li);
    });

}


function loadArtists(data, genre_id){

    const h2 = document.querySelector("#main").querySelector("h2");
    h2.textContent = "Top " + data[genre_id].name + " artists";

    const p = document.querySelector("#main > p");
    p.textContent = data[genre_id].description;

    updateArtists(data[genre_id].id);


}

loadGenres();