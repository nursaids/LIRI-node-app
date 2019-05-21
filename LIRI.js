
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

function spotifyThisSong(song){
    if(song.length === 0){
        song = 'Bohemian rhapsody';
    }
    spotify
    .search({type: 'track', query: song})
    .then((response) => {
        const firstTrack = response.tracks.items[0];

    log(`
        Artist: $(firstTrack.artists[0].name)
        Song Name: $(firstTrack.name)
        Preview Link: ${firstTrack.preview_url || firstTrack.external_urls.spotify}
        Album: ${firstTrack.album.name}
       \n`)    
    })

    .catch((error)=>{
        log('error getting song info', error, '\n');
    });
}

function movieThis(movie){
    if(movie.legth === 0){
        movie = "Pulp Fiction"
    }
    axios.get(`http://www.omdbapi.com/?t=${encodeURI(movie)}&apikey=${keys.omdbapi.apiKey}`)
   
    .then((response) =>{
        response.data 
    
        log(`
    
        Title: ${response.data.Title}
        Year: ${response.data.Year}
        IMDB Rating: ${response.data.Ratings.filter(r => r.Source === 'Internet Movie Database')[0].Value}
        RT Rating: ${response.data.Ratings.filter(r => r.Source === 'Rotten Tomatoes')[0].Value}
        Country: ${response.data.Country}
        Language: ${response.data.Language}
        Actors: ${response.data.Plot}\n`);
    })

   .catch((error)=>{
       log('error getting movie info', error, '/n');
   });

}

function weather(city){
    if (city.length === 0){
        city = 'Bellevue'
    }
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(city)}&appid=${keys.openweather.apiKey}`
    .then(response =>{
        log(`
        The weather in ${response.data.name} is currently ${response.data.weather[0].description}.

        `)
    })
    .catch(err =>{
        log(`Error getting weather.` , err, '\n');

    });
}