
require("dotenv").config();

var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);

var omdb = require ("omdb")

var axios = require("axios");

var moment = require ("moment");

var selector = function(command, userInput){
    switch (command){
        
        case "concert-this":
        concertThis(userInput);
        break;

        case "spotify-this":
        spotifyThis(userInput);
        break;

        case "movie-this":
        movieThis(userInput);
        break;

        case "doWhatItSays":
        break;

        default:

        console.log("Dont know that")



    }
}

// Constructor for user input

var run = function (arg1, arg2){
    selector(arg1, arg2);

}
run(process.argv[2], process.argv[3]);


function concertThis(artist){
    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp") 
.then(function(response){
    console.log(response.data);
    response.data.forEach(function(concert){
        console.log("Venue: " + concert.venue.name);
        console.log("Location: " + concert.venue.city + "," +concert.veniue.country);
        console.log("Date: " + moment(concert.venue.datetime). format("MM/DD/YYYY"));
        console.log("\n------------------------")
    });

});

}

function spotifyThis(song){

    spotify.search({type: ""})
}
 


