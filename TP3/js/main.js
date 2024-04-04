'use strict';
/* eslint-env browser, es6 */

function updateSelector(data){
    const select = document.querySelector("#main select");
    for (let i=0; i<data.length;i++){
        const opt = document.createElement("option");
        opt.value = i;
        opt.text = data[i].name;
        select.add(opt);
    }
}
// Function using the fetch and .then .data syntax.
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
        document.querySelector("#main select").addEventListener('change', (evt) => {loadArtists(data, evt.target.value)});
        loadArtists(data, 0);
    })
    .catch(error => console.log('error:', error));
}
async function updateArtists(genre) {
    const response = await fetch('http://localhost:3000/genres/'+genre+'/artists', { method: 'GET' })
    const artists = await response.json();
    const ul = document.querySelector("#main ul");

    const new_children_to_add = artists.map((element) => {
        const li = document.createElement("li");
        const h3 = document.createElement("h3");
        const img = document.createElement("img");
        // Create an onclick event listener to show the aside popup with the desired artist albums.
        h3.addEventListener('click', (evt) => {artistSelected(evt)});
        h3.textContent = element.name;
        h3.id = element.id; // Put the id of the artist inside h3.id for the popup to find it.
        img.src = element.photo;
        li.appendChild(h3);
        li.appendChild(img);

        return li;
    });
    // https://stackoverflow.com/questions/3955229/remove-all-child-elements-of-a-dom-node-in-javascript
    // Stackoverflow nice way of wiping all children of an dom element and replacing them by new ones.
    ul.replaceChildren(...new_children_to_add);
};
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
  popup.style.visibility = "visible";
  popup.style.opacity = 0.9;
  popup.style.transform = 'translateX(400px)';
}

// Using a main function to make things a bit more proper looking.
function main(){
  loadGenres();
}
main()
