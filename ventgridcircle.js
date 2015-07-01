///<reference path="typings/tsd.d.ts"/>
//https://github.com/danmarshall/makerjs-ventgridcircle
var makerjs = require('makerjs');
var ventgrid = require('makerjs-ventgrid');
var VentgridCircle = (function () {
    function VentgridCircle(filterRadius, spacing, radius) {
        this.filterRadius = filterRadius;
        this.spacing = spacing;
        this.radius = radius;
        this.id = 'ventgridcircleInstance';
        this.units = makerjs.unitType.Millimeter;
        this.paths = [];
        this.rim = new makerjs.paths.Circle('container', [0, 0], radius);
        var ventgridInstance = new ventgrid(filterRadius, spacing, radius, radius);
        for (var i = 0; i < ventgridInstance.paths.length; i++) {
            var circle = ventgridInstance.paths[i];
            this.checkCircle(circle);
        }
    }
    VentgridCircle.prototype.checkCircle = function (circle) {
        var distanceToCenter = makerjs.measure.pointDistance([0, 0], circle.origin);
        if (makerjs.round(distanceToCenter + circle.radius) <= this.radius) {
            //inside
            this.paths.push(circle);
        }
        else if (makerjs.round(distanceToCenter - circle.radius) > this.radius) {
        }
        else {
            //border
            var arcIntersection = makerjs.tools.pathIntersection(circle, this.rim);
            if (arcIntersection && arcIntersection.path1Angles.length == 2) {
                var filterArc = new makerjs.paths.Arc('filterArc', circle.origin, circle.radius, arcIntersection.path1Angles[1], arcIntersection.path1Angles[0]);
                this.paths.push(filterArc);
                var rimArc = new makerjs.paths.Arc('filterArcRim', [0, 0], this.radius, arcIntersection.path2Angles[0], arcIntersection.path2Angles[1]);
                this.paths.push(rimArc);
            }
        }
    };
    return VentgridCircle;
})();
VentgridCircle.metaParameters = [
    { title: "filterRadius", type: "range", min: 1, max: 20, value: 6 },
    { title: "spacing", type: "range", min: 10, max: 100, value: 30 },
    { title: "radius", type: "range", min: 20, max: 200, value: 100 }
];
module.exports = VentgridCircle;
