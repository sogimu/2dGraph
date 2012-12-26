
function setPixel(imageData, x, y, r, g, b, a) {
    var index = (x + y * imageData.width) * 4;
    imageData.data[index+0] = r;
    imageData.data[index+1] = g;
    imageData.data[index+2] = b;
    imageData.data[index+3] = a;
}

function getPixel(imageData, x, y) {
    var index = (x + y * imageData.width) * 4;
    return {r:imageData.data[index+0],g:imageData.data[index+1],b: imageData.data[index+2]};
}

var update = function(O) {
    for( var i in O.collection) {
        var obj = O.collection[i];

        obj.point = translateTo( {point: obj.point, offsetX: 25-50*Math.random(), offsetY: 20*Math.random()} );
        obj.points = rotate( {points: obj.points, angel: 45 - 90*Math.random()} );
        obj.points = decZoom( {points: obj.points, zoom: 1 - 1*Math.random()/30} );

    }
}

var draw = function(O) {
    context.clearRect(0,0,1450,640);

    for( var i in O.collection) {
        var obj = O.collection;
        context.beginPath();
        context.moveTo( obj[i].points[0].p1[0]+obj[i].point[0], obj[i].points[0].p1[1]+obj[i].point[1] );
        for(var j in obj[i].points) {
            var obj1 = obj[i].points;
            context.moveTo( obj1[j].p1[0]+obj[i].point[0], obj1[j].p1[1]+obj[i].point[1] );
            context.lineTo( obj1[j].p2[0]+obj[i].point[0], obj1[j].p2[1]+obj[i].point[1] );
        }
        context.strokeStyle = "#0df";
        context.stroke();
        context.closePath();
    }

}

var translateTo = function(O) {
    var M_up = $M([
        [1,0],
        [0,1],
        [O.offsetX,O.offsetY]
    ]);
    var point = O.point;
    var M = $M([point]);
    point = M.x(M_up).elements[0];
    point.push(1);
    return point;
}


var rotate = function(O) {
    var angelRad = O.angel*Math.PI/180;

    var MTrans = $M([
        [Math.cos(angelRad),Math.sin(angelRad),0],
        [-Math.sin(angelRad),Math.cos(angelRad),0],
        [0*(Math.cos(angelRad)-1)+0*Math.sin(angelRad),0*Math.sin(angelRad)-0*(Math.cos(angelRad)-1),1]
    ]);

    var points = [];
    for( var i in O.points ) {
        var obj = O.points[i];
        var M1 = $M([obj.p1]);
        var M2 = $M([obj.p2]);

        points.push( {p1: M1.x(MTrans).elements[0], p2: M2.x(MTrans).elements[0]} );
    }

    return points;

}


var decZoom = function(O) {

    var MTrans = $M([
        [1,0,0],
        [0,1,0],
        [0,0, O.zoom]
    ]);

    var points = O.points;
    for( var i in points) {
        var M1 = $M([points[i].p1]);
        var M2 = $M([points[i].p2]);

        points[i].p1 = M1.x(MTrans).elements[0];
        points[i].p2 = M2.x(MTrans).elements[0];

        points[i].p1[0]=points[i].p1[0]/points[i].p1[2];
        points[i].p1[1]=points[i].p1[1]/points[i].p1[2];
        points[i].p1[2]=1;

        points[i].p2[0]=points[i].p2[0]/points[i].p2[2];
        points[i].p2[1]=points[i].p2[1]/points[i].p2[2];
        points[i].p2[2]=1;

    }

    return points;
}




