'use strict';

// import du module Express
let express = require('express');
let fetch = require('node-fetch');
let app = express();

const API_KEY = 'ca6a5cfa73124b89d760d1e75f993b01'

app.get('/genres', async function (_, res) {
    const response = await fetch('http://ws.audioscrobbler.com/2.0/?method=tag.getTopTags&api_key='+API_KEY+'&format=json', {
        method: 'GET',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' }
    });
    const data = await response.json();
    let genres = [];
    let data_as_dict = Object.values(data);
    data_as_dict[0].tag.forEach(element => {
        genres.push(element.name);
    });

    let promises = genres.map(async function (item) {

        const response = await fetch('http://ws.audioscrobbler.com/2.0/?method=tag.getinfo&tag='+item+'&api_key='+API_KEY+'&format=json', {
            method: 'GET',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' }
        });

        const data = await response.json();
        let data_as_dict = Object.values(data);
        return data_as_dict;

    });
    const dict = {}
    Promise.all(promises)
      .then((values) => {
          values.forEach(element => {
              dict[element[0].name] = element[0].wiki.summary;
          });
          return res.json(dict);
      })
      .catch((error) => {
          return res.status(404).send('Error when fetching summaries');
      });
});

// export de notre application vers le serveur principal
module.exports = app;
