

var arDrone = require('ar-drone');
var client  = arDrone.createClient();

//var pngStream = client.getPngStream();

client
   .after(40000, function() {
   console.log("in function");
 });

//pngStream.on('data', console.log);
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
process.on("SIGINT", function() {
    console.log("landing drone");
   // client.land();
});
