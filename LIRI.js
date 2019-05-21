
require("dotenv").config();

const keys = require("./keys.js");

const Spotify = require('node-spotify-api');

const rl = require('readline')

const axios = require('axios');

const moment = require ('moment');

const fs = require ('fs');

const spotify = new Spotify(keys.spotify);

const validCommands = [
    'concert-this',
    'spotify-this-song',
    'movie-this',
    'weather-here',
    'do-what-it-says'

];

const command = process.argv[2];

if (validCommands.indexOf(command)=== -1){
    log('invalid command\n');
    return;

}

let parameter;
if(command !== 'do-what-it-says'){
    
  parameter = process.argv.slice(2).join(' ');

}

function processCommand(command, parameter){
    switch(command){
        case 'concert-this':
             concertThis(parameter);
            break;
        case 'spotify-this-song':
            spotifyThisSong(parameter);
            break;
        case 'movie-this':
            movieThis(parameter);
            break;
        case 'weather-here':
            weatherHere(parameter);
            break;
        case 'do-what-it-says':
            doWhatItSays();
            break;
        defailt:
            log('Cant interpet command\n');
            return;       

    }
}
processCommand(command, parameter);

function concertThis(artist){
   
    axios.get(`https://rest.bandsintown.com/artists/${encodeURI(artist)}/events?app_id=${keys.bandsintown.apiKey}`)
  .then((response) => {
      const concert = response.data[0];
      log(`
      Venue: ${concert.venue.name}
      City: ${concert.venue.city}, ${concert.venue.region || concert.venue.country}
      Date: ${moment(concert.datetime).format(MM/DD/YYYY)}\n`);
  })

  .catch((error) =>{
      log("error getting concerts", error, '\n');
  });
     
};
