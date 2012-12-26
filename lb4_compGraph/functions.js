
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

var draw = function() {
    context1.clearRect(0,0,500,500);

    context1.beginPath();
    context1.moveTo(points[0].p1[0]+mainPoint[0], points[0].p1[1]+mainPoint[1]);
    for(var i in points) {
        context1.lineTo(points[i].p2[0]+mainPoint[0], points[i].p2[1]+mainPoint[1]);
    }
    context1.stroke();
    context1.closePath();

    context1.beginPath();
    for(var i in circle) {
        var obj = circle[i];
        context1.moveTo(obj.begin[0]+mainPoint[0], obj.begin[1]+mainPoint[1]);
        context1.bezierCurveTo(obj.p1[0]+mainPoint[0], obj.p1[1]+mainPoint[1], obj.p2[0]+mainPoint[0], obj.p2[1]+mainPoint[1], obj.end[0]+mainPoint[0], obj.end[1]+mainPoint[1]);

    }
    context1.stroke();

    context1.closePath();

    context1.beginPath();
    context1.moveTo(250, 10);
    context1.lineTo(250, 480);
    context1.fillText("Y",255,20);
    context1.stroke();
    context1.closePath();

    context1.beginPath();
    context1.moveTo(10, 250);
    context1.lineTo(480, 250);
    context1.fillText("X",470,265);
    context1.stroke();
    context1.closePath();
    var m = document.getElementById( 'x' ).value*1;
    var n = document.getElementById( 'y' ).value*1;

    if( m >= 0) { m = 250 + m;}
    if( m < 0) { m = 250 + m;}

    if( n >= 0) { n = 250 - n;}
    if( n < 0) { n = 250 - n;}

    context1.beginPath();
    context1.arc(m, n, 5, 0, Math.PI * 2, false);
    context1.fillStyle = "#f00";
    context1.stroke();
    context1.fill();
    context1.closePath();

    context1.beginPath();
    context1.arc(mainPoint[0], mainPoint[1], 5, 0, Math.PI * 2, false);
    context1.fillStyle = "#0f0";
    context1.stroke();
    context1.fill();
    context1.closePath();

}

var up = function() {
    var inc = -15;
    var M_up = $M([
        [1,0],
        [0,1],
        [0,inc]
    ]);

    var M = $M([mainPoint]);
    mainPoint = M.x(M_up).elements[0];
    mainPoint.push(1);

    draw();
}

var down = function() {
    var inc = 15;
    var M_up = $M([
        [1,0],
        [0,1],
        [0,inc]
    ]);

    var M = $M([mainPoint]);
    mainPoint = M.x(M_up).elements[0];
    mainPoint.push(1);

    draw();
}

var left = function() {
    var inc = -15;
    var M_up = $M([
        [1,0],
        [0,1],
        [inc,0]
    ]);

    var M = $M([mainPoint]);
    mainPoint = M.x(M_up).elements[0];
    mainPoint.push(1);

    draw();
}

var right = function() {
    var inc = 25;
    var M_up = $M([
        [1,0],
        [0,1],
        [inc,0]
    ]);

    var M = $M([mainPoint]);
    mainPoint = M.x(M_up).elements[0];
    mainPoint.push(1);

    draw();
}


var rotateLeft = function() {
    var inc = 10;
    var angelRad = inc*Math.PI/180;

    var m = document.getElementById( 'x' ).value*1;
    var n = document.getElementById( 'y' ).value*1;

    if( m >= 0) { m = 250 + m;}
    if( m < 0) { m = 250 + m;}

    if( n >= 0) { n = 250 - n;}
    if( n < 0) { n = 250 - n;}

    var MTrans = $M([
        [Math.cos(angelRad),Math.sin(angelRad),0],
        [-Math.sin(angelRad),Math.cos(angelRad),0],
        [0*(Math.cos(angelRad)-1)+0*Math.sin(angelRad),0*Math.sin(angelRad)-0*(Math.cos(angelRad)-1),1]
    ]);


    var MTrans1 = $M([
        [Math.cos(angelRad),Math.sin(angelRad),0],
        [-Math.sin(angelRad),Math.cos(angelRad),0],
        [-m*(Math.cos(angelRad)-1)+n*Math.sin(angelRad),-m*Math.sin(angelRad)-n*(Math.cos(angelRad)-1),1]
    ]);

    var M5 = $M([mainPoint]);
    mainPoint = M5.x(MTrans1).elements[0];


    for( var i in points) {
        var M1 = $M([points[i].p1]);
        var M2 = $M([points[i].p2]);

        points[i].p1 = M1.x(MTrans).elements[0];
        points[i].p2 = M2.x(MTrans).elements[0];
    }

    for( var i in circle) {
        var M1 = $M([circle[i].p1]);
        var M2 = $M([circle[i].p2]);
        var M3 = $M([circle[i].begin]);
        var M4 = $M([circle[i].end]);

        circle[i].p1 = M1.x(MTrans).elements[0];
        circle[i].p2 = M2.x(MTrans).elements[0];
        circle[i].begin = M3.x(MTrans).elements[0];
        circle[i].end = M4.x(MTrans).elements[0];
    }

    draw();
}

var rotateRigth = function() {
    var inc = -25;
    var angelRad = inc*Math.PI/180;

    var m = document.getElementById( 'x' ).value*1;
    var n = document.getElementById( 'y' ).value*1;

    if( m >= 0) { m = 250 + m;}
    if( m < 0) { m = 250 + m;}

    if( n >= 0) { n = 250 - n;}
    if( n < 0) { n = 250 - n;}

    var MTrans = $M([
        [Math.cos(angelRad),Math.sin(angelRad),0],
        [-Math.sin(angelRad),Math.cos(angelRad),0],
        [0*(Math.cos(angelRad)-1)+0*Math.sin(angelRad),0*Math.sin(angelRad)-0*(Math.cos(angelRad)-1),1]
    ]);


    var MTrans1 = $M([
        [Math.cos(angelRad),Math.sin(angelRad),0],
        [-Math.sin(angelRad),Math.cos(angelRad),0],
        [-m*(Math.cos(angelRad)-1)+n*Math.sin(angelRad),-m*Math.sin(angelRad)-n*(Math.cos(angelRad)-1),1]
    ]);

    var M5 = $M([mainPoint]);
    mainPoint = M5.x(MTrans1).elements[0];


    for( var i in points) {
        var M1 = $M([points[i].p1]);
        var M2 = $M([points[i].p2]);

        points[i].p1 = M1.x(MTrans).elements[0];
        points[i].p2 = M2.x(MTrans).elements[0];
    }

    for( var i in circle) {
        var M1 = $M([circle[i].p1]);
        var M2 = $M([circle[i].p2]);
        var M3 = $M([circle[i].begin]);
        var M4 = $M([circle[i].end]);

        circle[i].p1 = M1.x(MTrans).elements[0];
        circle[i].p2 = M2.x(MTrans).elements[0];
        circle[i].begin = M3.x(MTrans).elements[0];
        circle[i].end = M4.x(MTrans).elements[0];
    }

    draw();
}

var refresh = function() {
    mainPoint = [100,100,1];

    points = [];
    points.push({p1:[-75,0,1],p2:[-20,-20,1]});
    points.push({p1:[-20,-20,1],p2:[0,-75,1]});
    points.push({p1:[0,-75,1],p2:[20,-20,1]});
    points.push({p1:[20,-20,1],p2:[75,0,1]});
    points.push({p1:[75,0,1],p2:[20,20,1]});
    points.push({p1:[20,20,1],p2:[0,75,1]});
    points.push({p1:[0,75,1],p2:[-20,20,1]});
    points.push({p1:[-20,20,1],p2:[-75,0,1]});

    circle = [];
    circle.push({begin: [-75,0,1], p1: [-77,-37,1], p2: [-37,-77,1], end: [0,-75,1]});
    circle.push({begin: [0,-75,1], p1: [37,-77,1], p2: [77,-37,1], end: [75,0,1]});
    circle.push({begin: [75,0,1], p1: [77,37,1], p2: [37,77,1], end: [0,75,1]});
    circle.push({begin: [0,75,1], p1: [-37,77,1], p2: [-77,37,1], end: [-75,0,1]});

    draw();
}

var decZoomX = function() {
    var zoom = 2;
    var MTrans = $M([
        [1,0,0],
        [0,1,0],
        [0,0,zoom]
    ]);

    for( var i in points) {
        var M1 = $M([points[i].p1]);
        var M2 = $M([points[i].p2]);

        points[i].p1 = M1.x(MTrans).elements[0];
        points[i].p2 = M2.x(MTrans).elements[0];

        points[i].p1[0]=points[i].p1[0]/points[i].p1[2];
        //points[i].p1[1]=points1[i].p1[1]/points1[i].p1[2];
        points[i].p1[2]=1;

        points[i].p2[0]=points[i].p2[0]/points[i].p2[2];
        //points1[i].p2[1]=points1[i].p2[1]/points1[i].p2[2];
        points[i].p2[2]=1;

    }

    for( var i in circle) {
        var M1 = $M([circle[i].p1]);
        var M2 = $M([circle[i].p2]);
        var M3 = $M([circle[i].begin]);
        var M4 = $M([circle[i].end]);

        circle[i].p1 = M1.x(MTrans).elements[0];
        circle[i].p2 = M2.x(MTrans).elements[0];
        circle[i].begin = M3.x(MTrans).elements[0];
        circle[i].end = M4.x(MTrans).elements[0];

        circle[i].p1[0]=circle[i].p1[0]/circle[i].p1[2];
        circle[i].p1[2]=1;

        circle[i].p2[0]=circle[i].p2[0]/circle[i].p2[2];
        circle[i].p2[2]=1;

        circle[i].begin[0]=circle[i].begin[0]/circle[i].begin[2];
        circle[i].begin[2]=1;

        circle[i].end[0]=circle[i].end[0]/circle[i].end[2];
        circle[i].end[2]=1;

    }

    draw();
}

var decZoomY = function() {
    var zoom = 2;
    var MTrans = $M([
        [1,0,0],
        [0,1,0],
        [0,0,zoom]
    ]);

    for( var i in points) {
        var M1 = $M([points[i].p1]);
        var M2 = $M([points[i].p2]);

        points[i].p1 = M1.x(MTrans).elements[0];
        points[i].p2 = M2.x(MTrans).elements[0];

        points[i].p1[1]=points[i].p1[1]/points[i].p1[2];
        points[i].p1[2]=1;

        points[i].p2[1]=points[i].p2[1]/points[i].p2[2];
        points[i].p2[2]=1;
    }

    for( var i in circle) {
        var M1 = $M([circle[i].p1]);
        var M2 = $M([circle[i].p2]);
        var M3 = $M([circle[i].begin]);
        var M4 = $M([circle[i].end]);

        circle[i].p1 = M1.x(MTrans).elements[0];
        circle[i].p2 = M2.x(MTrans).elements[0];
        circle[i].begin = M3.x(MTrans).elements[0];
        circle[i].end = M4.x(MTrans).elements[0];

        circle[i].p1[1]=circle[i].p1[1]/circle[i].p1[2];
        circle[i].p1[2]=1;

        circle[i].p2[1]=circle[i].p2[1]/circle[i].p2[2];
        circle[i].p2[2]=1;

        circle[i].begin[1]=circle[i].begin[1]/circle[i].begin[2];
        circle[i].begin[2]=1;

        circle[i].end[1]=circle[i].end[1]/circle[i].end[2];
        circle[i].end[2]=1;

    }


    draw();
}
var incZoomX = function() {
    var zoom = 0.5;
    var MTrans = $M([
        [1,0,0],
        [0,1,0],
        [0,0,zoom]
    ]);

    for( var i in points) {
        var M1 = $M([points[i].p1]);
        var M2 = $M([points[i].p2]);

        points[i].p1 = M1.x(MTrans).elements[0];
        points[i].p2 = M2.x(MTrans).elements[0];

        points[i].p1[0]=points[i].p1[0]/points[i].p1[2];
        //points[i].p1[1]=points1[i].p1[1]/points1[i].p1[2];
        points[i].p1[2]=1;

        points[i].p2[0]=points[i].p2[0]/points[i].p2[2];
        //points1[i].p2[1]=points1[i].p2[1]/points1[i].p2[2];
        points[i].p2[2]=1;

    }

    for( var i in circle) {
        var M1 = $M([circle[i].p1]);
        var M2 = $M([circle[i].p2]);
        var M3 = $M([circle[i].begin]);
        var M4 = $M([circle[i].end]);

        circle[i].p1 = M1.x(MTrans).elements[0];
        circle[i].p2 = M2.x(MTrans).elements[0];
        circle[i].begin = M3.x(MTrans).elements[0];
        circle[i].end = M4.x(MTrans).elements[0];

        circle[i].p1[0]=circle[i].p1[0]/circle[i].p1[2];
        circle[i].p1[2]=1;

        circle[i].p2[0]=circle[i].p2[0]/circle[i].p2[2];
        circle[i].p2[2]=1;

        circle[i].begin[0]=circle[i].begin[0]/circle[i].begin[2];
        circle[i].begin[2]=1;

        circle[i].end[0]=circle[i].end[0]/circle[i].end[2];
        circle[i].end[2]=1;

    }

    draw();
}

var incZoomY = function() {
    var zoom = 0.5;
    var MTrans = $M([
        [1,0,0],
        [0,1,0],
        [0,0,zoom]
    ]);


    for( var i in points) {
        var M1 = $M([points[i].p1]);
        var M2 = $M([points[i].p2]);

        points[i].p1 = M1.x(MTrans).elements[0];
        points[i].p2 = M2.x(MTrans).elements[0];

        points[i].p1[1]=points[i].p1[1]/points[i].p1[2];
        points[i].p1[2]=1;

        points[i].p2[1]=points[i].p2[1]/points[i].p2[2];
        points[i].p2[2]=1;
    }

    for( var i in circle) {
        var M1 = $M([circle[i].p1]);
        var M2 = $M([circle[i].p2]);
        var M3 = $M([circle[i].begin]);
        var M4 = $M([circle[i].end]);

        circle[i].p1 = M1.x(MTrans).elements[0];
        circle[i].p2 = M2.x(MTrans).elements[0];
        circle[i].begin = M3.x(MTrans).elements[0];
        circle[i].end = M4.x(MTrans).elements[0];

        circle[i].p1[1]=circle[i].p1[1]/circle[i].p1[2];
        circle[i].p1[2]=1;

        circle[i].p2[1]=circle[i].p2[1]/circle[i].p2[2];
        circle[i].p2[2]=1;

        circle[i].begin[1]=circle[i].begin[1]/circle[i].begin[2];
        circle[i].begin[2]=1;

        circle[i].end[1]=circle[i].end[1]/circle[i].end[2];
        circle[i].end[2]=1;

    }

    draw();
}

var reproduceY = function() {
    mainPoint[0] = 500 - mainPoint[0];

    draw();
}

var reproduceX = function() {
    mainPoint[1] = 500 - mainPoint[1];

    draw();
}

var reproduceXY = function() {
    mainPoint[0] = 500 - mainPoint[0];
    mainPoint[1] = 500 - mainPoint[1];

    draw();
}




