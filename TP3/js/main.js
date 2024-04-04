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
        //TODO : try to find a more efficient and prettty looking way than using a forEach to wipe ul children.
        element.remove(); // We remove any left li inside our ul.
    })
    artists.forEach(element => {
        const li = document.createElement("li");
        const h3 = document.createElement("h3");
        const img = document.createElement("img");
        h3.addEventListener('click', (evt) => {artistSelected(evt)});

        h3.textContent = element.name;
        h3.id = element.id; // Put the id of the artist inside h3.id for the popup.
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
async function artistSelected(evt){
  let artist_id = evt.target.id; // Use the id attribut inside h3 to find the artist id.
  let response = await fetch('http://localhost:3000/artists/'+artist_id+'/albums', { method: 'GET' })
  let albums = await response.json();
  let popup = document.querySelector('aside');

  let table_v = document.querySelector('aside table tbody');
  popup.style.visibility = "visible";
  popup.style.opacity = 1;
  popup.style.transform = 'translateX(350px)';
  
  const alb_atts = ["cover","title","year","label"];

  for (let num_alb = 0; num_alb<albums.length; num_alb++){

    const tr = document.createElement("tr");

    for (let att=0 ; att < alb_atts.length; att++){
        const td = document.createElement("td");
        if (alb_atts[att] === "cover"){
            const img = document.createElement("img");
            img.src = albums[num_alb][alb_atts[att]];
            td.appendChild(img);
        }
        else {
            td.textContent = albums[num_alb][alb_atts[att]];
        }
        tr.appendChild(td);
    }

    table_v.appendChild(tr);

  }

}

loadGenres();
