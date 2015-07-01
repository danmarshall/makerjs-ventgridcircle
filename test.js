var makerjs = require('makerjs');
var ventgridcircle = require('./ventgridcircle.js');

console.log(makerjs.exporter.toSVG(new ventgridcircle(2, 50, 30)));