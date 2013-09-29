
require('johnny-five')
require('ar-drone')

var arDrone = require('ar-drone');
var client  = arDrone.createClient();
var five = require("johnny-five"),
    board, ping;

board = new five.Board();

board.on("ready", function() {

    console.log("yay! go nodedrone!");

    (new five.Led(13)).strobe();

    ping = new five.Ping(6);

    ping.on("data", function( err, value ) {
	console.log( "data", value );
    });

    ping.on("change", function( err, value ) {
	console.log( typeof this.inches );
	console.log( "Object is " + this.inches + "inches away" );
    });
});


client
   .after(4000, function() {
   console.log("in function");
 });


/*
client.takeoff();

client.up(.9)

client
   .after(40000, function() {
       this.stop();
   });


//client.animate('flipAhead', 1000);

client.animate('flipBehind', 2000);

//client.animate('flipAhead', 3000);

client
  .after(5000, function() {
    this.clockwise(5.5);
  })
  .after(3000, function() {
    this.stop();
    this.land();
  });

*/

// only if we kill the script, this is an auto-emergency brake
process.on("SIGINT", function() {
    console.log("landing drone");
    console.log( "Object is " + this.inches + "inches away" ); 
   // client.land();
});
