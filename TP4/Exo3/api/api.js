'use strict';

// import du module Express
let express = require('express');
let app = express();
let HttpProxyAgent = require( 'http-proxy-agent' );

// a passer en paramètre de vos appels à fetch pour que node puisse utiliser le proxy
// a n'utiliser que si vous êtes sur le réseau de l'université !!!
let options = {
    // l'adresse du cache varie selon la connexion
    // filaire : 'http://cache.ha.univ-nantes.fr:3128'
    // eduroam : 'http://cache.etu.univ-nantes.fr:3128'
    // univ-nantes : 'http://cache.wifi.univ-nantes.fr:3128'
    agent: new HttpProxyAgent( 'http://cache.ha.univ-nantes.fr:3128' ),
};

// export de notre application vers le serveur principal
module.exports = app;
