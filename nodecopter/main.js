require('johnny-five')
require('ar-drone')

var dist = 0;
var lastDist = 0;
var arDrone = require('ar-drone');
var client  = arDrone.createClient();
var five = require("johnny-five"),
    board, ping;
var maxInches = 10;
var notReady = false;


console.log("1");
board = new five.Board();
console.log("2");


board.on("ready", function() {

    console.log("yay! go nodedrone!");

    ping = new five.Ping(6);

    console.log("3");
    ping.on("data", function( err, value ) {
	console.log( "data", value );
    });

    ping.on("change", function( err, value ) {
	console.log( typeof this.inches );
	dist = this.inches;

	diff = Math.abs(dist - lastDist)
	//diff = dist - lastDist
	if(diff > 5 && dist > 2){
	    if(dist > maxInches){
		dist = maxInches;
	    }

	    console.log("Distance detected. Not flying. Just resetting last dist");

	    if(lastDist > dist){

		distSeconds = dist * 1000;
		console.log( "I'm flying, object is " + this.inches + "inches away" );
		client.takeoff();
		client.up(.2);
		client.after(distSeconds, stopLandCopter); // disSeconds is passed through as miliseconds; 1000 / second
	    }
		lastDist = dist;
	}		
    });
});


function stopLandCopter(){
    console.log("5");
    this.stop();
    this.land();
}


// only if we kill the script, this is an auto-emergency brake
process.on("SIGINT", function() {
    console.log("landing drone");
    console.log("6");
    console.log( "Object is " + this.inches + "inches away" ); 
    client.land();
});
