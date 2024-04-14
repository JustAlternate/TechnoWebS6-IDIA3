'use strict';

// import du module Express
let express = require('express');
let fetch = require('node-fetch');
let app = express();

const API_KEY = process.env.API_KEY;

/* Api endpoint that returns the genres*/
app.get('/genres', async function (_, res) {
    const response = await fetch('http://ws.audioscrobbler.com/2.0/?method=tag.getTopTags&api_key=' + API_KEY + '&format=json', {
        method: 'GET',
        mode: 'cors',
        headers: {'Content-Type': 'application/json'},
    });
    const data = await response.json();
    let genres = [];
    let data_as_dict = Object.values(data);
    data_as_dict[0].tag.forEach(element => {
        genres.push(element.name);
    });

    let promises = genres.map(async function (item) {

        const response = await fetch('http://ws.audioscrobbler.com/2.0/?method=tag.getinfo&tag=' + item + '&api_key=' + API_KEY + '&format=json', {
            method: 'GET',
            mode: 'cors',
            headers: {'Content-Type': 'application/json'},
        });

        const data = await response.json();
        let data_as_dict = Object.values(data);
        return data_as_dict;

    });
    let list = [];
    Promise.all(promises)
        .then((values) => {
            values.forEach(element => {
                list.push({
                    'id': element[0].name,
                    'name': element[0].name,
                    'description': element[0].wiki.summary});
            });
            return res.json(list);
        })
        .catch(() => {
            return res.status(404).send('Error when fetching summaries');
        });
});

/* Api endpoint that returns the artists of a genre (max 15 artists)*/
app.get('/genre/*', async function (req, res) {
    const response_genres = await fetch('http://ws.audioscrobbler.com/2.0/?method=tag.getTopTags&api_key=' + API_KEY + '&format=json', {
        method: 'GET',
        mode: 'cors',
        headers: {'Content-Type': 'application/json'},
    });
    const data = await response_genres.json();
    let genres = [];

    data.toptags.tag.forEach((genre) => {
        genres.push(genre.name);
    });



    let args = req.params[0].split('/');

    if (args.length > 1 && genres.includes(args[0]) && (args[1] === 'artists')) {
        res.set('Content-Type', 'application/json; charset=utf-8');
        let artists = [];
        const response = await fetch('http://ws.audioscrobbler.com/2.0/?method=tag.gettopartists&tag=' + args[0] + '&api_key=' + API_KEY + '&format=json&limit=15', {
            method: 'GET',
            mode: 'cors',
            headers: {'Content-Type': 'application/json'},
        });
        const artists_data = await response.json();
        artists_data.topartists.artist.forEach((artist) => {
            artists.push({
                'name': artist.name,
                'genreId': args[0],
                'id': artist.name,
                'photo': artist.image[0]['#text'],
            });
        });
        res.send(artists);
    }
    else {
        res.status(404).send('Not Found !');
    }
});

/* Api endpoint that returns the albums of an artist (5 albums max)
Info : We don't check if an artist exists on the api*/
app.get('/artist/*', async function (req, res) {

    let args = req.params[0].split('/');

    if (args.length > 1 && (args[1] === 'albums')) {

        let albums = [];
        try {
            const response = await fetch('http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=' + args[0] + '&api_key=' + API_KEY + '&format=json&limit=5', {
                method: 'GET',
                mode: 'cors',
                headers: {'Content-Type': 'application/json'},
            });

            const albums_data = await response.json();
            albums_data.topalbums.album.forEach((album) => {
                albums.push({
                    'id': album.name,
                    'title': album.name,
                    'year': '❌',
                    'label': '❌',
                    'artistId': args[0],
                    'cover': album.image[1]['#text'],
                });
            });

            res.set('Content-Type', 'application/json; charset=utf-8');
            res.send(albums);
        }
        catch (error){
            res.status(404).send('Not Found !');
        }
    }
    else {
        res.status(404).send('Not Found !');
    }
});


// export de notre application vers le serveur principal
module.exports = app;
