
require('johnny-five')
require('ar-drone')

var dist = 0;
var arDrone = require('ar-drone');
var client  = arDrone.createClient();
var five = require("johnny-five"),
    board, ping;


console.log("1");
board = new five.Board();
console.log("2");
board.on("ready", function() {

    console.log("yay! go nodedrone!");

    (new five.Led(13)).strobe();

    ping = new five.Ping(6);

    console.log("3");
    ping.on("data", function( err, value ) {
	console.log( "data", value );
    });

    ping.on("change", function( err, value ) {
	console.log( typeof this.inches );
	dist = this.inches;
	if(dist > 10){
	dist = 9;
	}
        dist = dist * 1000;
	console.log( "Object is " + this.inches + "inches away" );
	
	client.takeoff();

	client.up(.2);

	client
	    .after(3000, function() {
		console.log("5");
		this.stop();
		this.land();
 });

    });
});


/*
client
   .after(2000, function() {
   console.log("4");
   console.log("in function dist=" + dist);
 });



client.takeoff();

client.up(.9)

client
   .after(3000, function() {
       console.log("5");
       this.stop();
       this.land();
 });
*/

// only if we kill the script, this is an auto-emergency brake
process.on("SIGINT", function() {
    console.log("landing drone");
    console.log("6");
    console.log( "Object is " + this.inches + "inches away" ); 
   // client.land();
});
