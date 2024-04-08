'use strict';

// import du module Express
let express = require('express');
let app = express();
const db = require('./data/db.json');


app.get('/genres', function (req, res) {
    res.set('Content-Type', 'application/json; charset=utf-8');
    res.send(db.genres);
  })


app.get('/genre/*', function (req, res) {
    let genres = [];
    db.genres.forEach( (genre) => {
        genres.push(genre.id);
    })

    let args = req.params[0].split('/');


    if (args.length > 1 && !(args[0] in genres) && (args[1] == 'artists')){
        res.set('Content-Type', 'application/json; charset=utf-8');
        let artists = {};
        db.artists.forEach(
            (artist) => {
                console.log(artist);
                if (artist.genreId == args[0]){
                    artists[artist.id] = artist;
                }
            }
        )
        res.send(artists);
    }
    else {
        res.send("Don't do it !");
    };
    

  })

// export de notre application vers le serveur principal
module.exports = app;
