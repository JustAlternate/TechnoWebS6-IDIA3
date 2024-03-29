"use strict";

var Albums = {
  "Fresh Cream": {
    artist: "Cream",
    year: 1966,
    title: "Fresh Cream",
  },
  "Hot Rats": {
    artist: "Frank Zappa",
    year: 1969,
    title: "Hot Rats",
  },
  "Space Oddity": {
    artist: "David Bowie",
    year: 1969,
    title: "Space Oddity",
  },
};


function AlbumTitle(album) {
  return album.title;
}

function AlbumArtist(album) {
  return album.artist;
}

function AlbumYear(album) {
  return album.year;
}

let album_json = require("./albums.json");

class Album {
  constructor(title, artist, year) {
    this.title = title;
    this.artist = artist;
    this.year = year;
  }

  getTitle(){
    return this.title;
  }
  
  getArtist(){
    return this.artist;
  }

  getYear(){
    return this.year;
  }
}

let jc = new Album('Popo','jc',1931);

let json_objects = Object.entries(album_json);

const albums_json = json_objects.map((k) => k[1] = new Album(k[1].title, k[1].year, k[1].artist));

console.log(albums_json);
