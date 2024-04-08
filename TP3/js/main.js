'use strict';
/* eslint-env browser, es6 */

/* updateSelector func :
- args : data (json data requested for genres)
- Used to provide a selection of different genres */
function updateSelector(data){
    const select = document.querySelector('#main select');
    console.log('data', data);
    data.forEach((genre, i) => {
        // We use opt = option
        const opt = document.createElement('option');
        opt.value = i;
        opt.text = genre.name;
        select.add(opt);
    });
}

/* loadGenres func :
- args : None
- Function that load the genres and that allows to
update the page with the corresponding artists
- It is using the fetch and .then .data syntax.*/
function loadGenres() {
    fetch('http://localhost:3000/genres', {method: 'GET'})
        .then(response => { // We check the response
            if (response.ok){
                return response.json();
            }
            else {
                throw (
                    new Error('Response not ok')
                );
            }
        })
        .then((data) => {
            updateSelector(data);
            document.querySelector('#main select').addEventListener('change', (evt) => {
                // We are ad
                loadArtists(data, evt.target.value);
            });
            // By default we load the first option of the select element.
            loadArtists(data, 0);
        })
        .catch(error => console.log('error:', error));
}

/* updateArtists func :
- args : genre (str)
- Function that request the artists for a specific genre
update the page with the corresponding artists */
async function updateArtists(genre) {
    const response = await fetch('http://localhost:3000/genres/' + genre + '/artists', {method: 'GET'});
    const artists = await response.json();
    const ul = document.querySelector('#main ul');

    const new_children_to_add = artists.map((element) => {
        const li = document.createElement('li');
        const h3 = document.createElement('h3');
        const img = document.createElement('img');
        // Create an onclick event listener to show the aside popup with the desired artist albums.
        h3.addEventListener('click', (evt) => {
            artistSelected(evt);
        });
        h3.textContent = element.name;
        h3.id = element.id; // Put the id of the artist inside h3.id for the popup to find it.
        img.src = element.photo;
        li.appendChild(h3);
        li.appendChild(img);

        return li;
    });
    // https://stackoverflow.com/questions/3955229/remove-all-child-elements-of-a-dom-node-in-javascript
    // Stackoverflow nice way of wiping all children of a dom element and replacing them by new ones.
    ul.replaceChildren(...new_children_to_add);
}

/* loadArtists func :
- args : None
- Function that load the different artists for a genre*/
function loadArtists(data, genre_id){
    const h2 = document.querySelector('#main').querySelector('h2');
    const p = document.querySelector('#main > p');
    const genre_name = data[genre_id].id;

    h2.textContent = 'Top ' + data[genre_id].name + ' artists';
    p.textContent = data[genre_id].description;

    updateArtists(genre_name);
}

/* artistSelected func :
- args : evt(event)
- Function that load the different albums for an artist in
a popup window*/
async function artistSelected(evt){
    const artist_id = evt.target.id; // Use the id attribut inside h3 to find the artist id.
    const  response = await fetch('http://localhost:3000/artists/' + artist_id + '/albums', {
        method: 'GET',
    });
    const albums = await response.json();
    const popup = document.querySelector('aside');
    const table_v = document.querySelector('aside table tbody');
    const alb_atts = ['cover', 'title', 'year', 'label'];

    // if tbody is empty
    if (!!(table_v.children)){
        table_v.replaceChildren();
    }
    albums.forEach((album) => {
        const tr = document.createElement('tr');
        alb_atts.forEach((att) => {
            const td = document.createElement('td');
            if (att === 'cover'){
                const img = document.createElement('img');
                img.src = album[att];
                td.appendChild(img);
            }
            else {
                td.textContent = album[att];
            }
            tr.appendChild(td);
        });
        table_v.appendChild(tr);
    }
    );
    // launch the animation of appearing
    popup.classList.toggle('show');

    // EventListener to make the popup vanish
    popup.querySelector('button').addEventListener('click', () => {

        popup.classList.remove('show');

        setTimeout(() => {
            const tr = table_v.querySelector('tr');
            tr.replaceChildren();
        }, '1000');
    });
}

// Using a main function to make things a bit more proper looking.
function main(){
    loadGenres();
}
main();
