require('johnny-five')
require('ar-drone')


var lastDist = 0;
var arDrone = require('ar-drone');
var client  = arDrone.createClient();
var five = require("johnny-five"),
    board, ping;
var maxInches = 15;

var dist = 0;
var diff = 0;

board = new five.Board();

board.on("ready", function() {

    console.log("yay! go nodedrone!");

    ping = new five.Ping(6);

    ping.on("data", function( err, value ) {
	process.stdout.write(".");
    });

    ping.on("change", getDistAndFly);
});


function getDistAndFly(){
    console.log( typeof this.inches );

    dist = 0; // debugging
    diff = 0; // debugging

    dist = this.inches;

    diff = Math.abs(dist - lastDist)

    //diff = dist - lastDist
    if(diff > 2 && dist > 1){ // diff from last input must be greater than &&  input must be farter than
	if(dist > maxInches){
	    dist = maxInches;
	}
	
	if(lastDist > dist){
	    var distMiliSeconds = 0; // debugging
	    distMiliSeconds = dist * 1000;
	    console.log( "dist=" + this.inches + ", distMiliSeconds=" + distMiliSeconds);
	    client.takeoff();
	    client.up(.2);
	    client.after(distMiliSeconds, stopLandCopter); // disSeconds is passed through as miliseconds; 1000 / second
	} else {
	    console.log("Move at least 2 inches closer. dist=" + dist); // todo, change 2 to a constant var
	}
	lastDist = dist;
    }
}


function stopLandCopter(){
    console.log("landing drone.");
    this.stop();
    this.land();
    diff = 0;
    dist = 0;
    lastDist = 0;
}


// only if we kill the script, this is an auto-emergency brake
process.on("SIGINT", function() {
    console.log("landing drone");
    console.log( "Object is " + this.inches + "inches away" ); 
    client.land();
});
