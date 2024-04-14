'use strict';

// import du module Express
let express = require('express');
let app = express();
const db = require('./data/db.json');

/* Api endpoint that returns the genres*/
app.get('/genres', function (_, res) {
    res.json(db.genres);
});

/* Api endpoint that returns the artists of a genre*/
app.get('/genre/*', function (req, res) {
    let genres = [];
    db.genres.forEach((genre) => {
        genres.push(genre.id);
    });

    let args = req.params[0].split('/');

    if (args.length > 1 && genres.includes(args[0]) && (args[1] === 'artists')) {
        res.set('Content-Type', 'application/json; charset=utf-8');
        let artists = {};
        db.artists.forEach(
            (artist) => {
                console.log(artist);
                if (artist.genreId === args[0]) {
                    artists[artist.id] = artist;
                }
            });
        res.send(artists);
    }
    else {
        res.status(404).send('Not Found !');
    }
});

/* Api endpoint that returns the artists of the db */
app.get('/artists', function (_, res) {
    res.json(db.artists);
});

/* Api endpoint that returns the albums of an artist */
app.get('/artist/*', function (req, res) {
    let artists = [];
    db.artists.forEach((artist) => {
        artists.push(artist.id);
    });

    let args = req.params[0].split('/');

    if (args.length > 1 && artists.includes(args[0]) && (args[1] === 'albums')) {
        let albums = [];
        db.albums.forEach(
            (album) => {
                if (album.artistId === args[0]) {
                    albums.push(album);
                }
            });
        res.set('Content-Type', 'application/json; charset=utf-8');
        res.send(albums);
    }
    else {
        res.status(404).send('Not Found !');
    }
});

// export de notre application vers le serveur principal
module.exports = app;
