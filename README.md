YahooHackApp
======================

Description:

Accessibility hardware hack that allows anyone to fly a quadricopter using hand gestures. The height of the flight depends on the distance you are from the sensor. We use node.js johnny-five module to communicate with Arudrino Uno and receive info from Parallax ultra sonic sensor. ar-drone node.js module is used to communicate with Parrot drone


To Run:
npm install

As described on Johnny-Five github repo:
Download Arduino IDE
Plug in your Arduino or Arduino compatible microcontroller via USB
Open the Arduino IDE, select: File > Examples > Firmata > StandardFirmata
Click the "Upload" button.

To get firmata to work and the sonar senor to read data, Emily pointed us to https://github.com/rwaldron/johnny-five/issues/18
These directions must be followed. If necessary, move Arduino app into Applications directory.




