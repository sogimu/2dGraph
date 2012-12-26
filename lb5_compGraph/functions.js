
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
    var tmpPoints = project();
	
	context1.clearRect(0,0,500,500);

    context1.beginPath();
    for(var i in tmpPoints) {
		context1.moveTo(tmpPoints[i].p1[0]+mainPoint[0], tmpPoints[i].p1[1]+mainPoint[1]);
		context1.lineTo(tmpPoints[i].p2[0]+mainPoint[0], tmpPoints[i].p2[1]+mainPoint[1]);
    }
    context1.stroke();
    context1.closePath();
		
	draw_coordinates();
}

var draw_coordinates = function() {
    context1.beginPath();
    context1.stroke();
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

    context1.beginPath();
    context1.arc(mainPoint[0], mainPoint[1], 5, 0, Math.PI * 2, false);
    context1.fillStyle = "#0f0";
    context1.stroke();
    context1.fill();
    context1.closePath();

}

var project = function() {
	var tmpPoints = [];
	
	for(var i in points) {
		var oldP1 = $M([points[i].p1]);
		var newP1 = oldP1.x(projectedM);
		var p13D = [];
		p13D[0] = newP1.elements[0][0]/newP1.elements[0][3];
		p13D[1] = newP1.elements[0][1]/newP1.elements[0][3];
		p13D[2] = newP1.elements[0][2]/newP1.elements[0][3];
		p13D[3] = 1;
		
		var oldP2 = $M([points[i].p2]);
		var newP2 = oldP2.x(projectedM);
		var p23D = [];
		p23D[0] = newP2.elements[0][0]/newP2.elements[0][3];
		p23D[1] = newP2.elements[0][1]/newP2.elements[0][3];
		p23D[2] = newP2.elements[0][2]/newP2.elements[0][3];
		p23D[3] = 1;
		
		tmpPoints.push({p1: p13D, p2: p23D});
	}
	
	return tmpPoints;
	
}

var matrixStand = function() {	
	projectedM = $M([
        [1,0,0,0],
        [0,1,0,0],
        [0,0,0,r],
        [0,0,0,1]
    ]);
	
	draw();
}

var matrixPersp = function() {
	var ag = 45;
    var a = ag*Math.PI/180;
	projectedM = $M([
        [1,0,0,0],
        [0,1,0,0],
        [0,0,1,0.005],
        [0,0,0,1]
    ]);
	
	draw();
}
var matrixKaval = function() {
	var ag = 45;
    var a = ag*Math.PI/180;
	projectedM = $M([
        [1,0,0,0],
        [0,1,0,0],
        [Math.cos(a),Math.sin(a),0,0],
        [0,0,0,1]
    ]);
	
	draw();
}


var toUp = function() {
    var inc = -15;
    var M_up = $M([
        [1,0,0,0],
        [0,1,0,0],
        [0,0,1,0],
        [0,inc,0,1]
    ]);

    var M = $M([mainPoint]);
    mainPoint = M.x(M_up).elements[0];
    //mainPoint.push(1);

    draw();
}

var toDown = function() {
    var inc = 15;
	var M_up = $M([
        [1,0,0,0],
        [0,1,0,0],
        [0,0,1,0],
        [0,inc,0,1]
    ]);


    var M = $M([mainPoint]);
    mainPoint = M.x(M_up).elements[0];

    draw();
}

var toLeft = function() {
    var inc = -15;
	var M_up = $M([
        [1,0,0,0],
        [0,1,0,0],
        [0,0,1,0],
        [inc,0,0,1]
    ]);

    var M = $M([mainPoint]);
    mainPoint = M.x(M_up).elements[0];

    draw();
}

var toRight = function() {
    var inc = 15;
	var M_up = $M([
        [1,0,0,0],
        [0,1,0,0],
        [0,0,1,0],
        [inc,0,0,1]
    ]);


    var M = $M([mainPoint]);
    mainPoint = M.x(M_up).elements[0];

    draw();
}

var toBootom = function() {
    var inc = -15;
	var M_up = $M([
        [1,0,0,0],
        [0,1,0,0],
        [0,0,1,0],
        [0,0,inc,1]
    ]);

    var M = $M([mainPoint]);
    mainPoint = M.x(M_up).elements[0];
	console.log(mainPoint);
    draw();
}

var toTop = function() {
	
    var inc = 15;
	var M_up = $M([
        [1,0,0,0],
        [0,1,0,0],
        [0,0,1,0],
        [0,0,inc,1]
    ]);


    var M = $M([mainPoint]);
    mainPoint = M.x(M_up).elements[0];
	console.log(mainPoint);
    draw();
}


var rotateX = function() {
    var inc = 10;
    var angelRad = inc*Math.PI/180;

    var MTrans = $M([
        [1,0,0,0],
		[0,Math.cos(angelRad),Math.sin(angelRad),0],
        [0,-Math.sin(angelRad),Math.cos(angelRad),0],
        [0,0,0,1]
    ]);

    for( var i in points) {
        var M1 = $M([points[i].p1]);
        var M2 = $M([points[i].p2]);

        points[i].p1 = M1.x(MTrans).elements[0];
        points[i].p2 = M2.x(MTrans).elements[0];
    }

    draw();
}

var rotateY = function() {
    var inc = 10;
    var angelRad = inc*Math.PI/180;

    var MTrans = $M([
        [Math.cos(angelRad),0,-Math.sin(angelRad),0],
		[0,1,0,0],
        [Math.sin(angelRad),0,Math.cos(angelRad),0],
        [0,0,0,1]
    ]);

    for( var i in points) {
        var M1 = $M([points[i].p1]);
        var M2 = $M([points[i].p2]);

        points[i].p1 = M1.x(MTrans).elements[0];
        points[i].p2 = M2.x(MTrans).elements[0];
    }

    draw();
}

var rotateZ = function() {
    var inc = 10;
    var angelRad = inc*Math.PI/180;

    var MTrans = $M([
        [Math.cos(angelRad),Math.sin(angelRad),0,0],
		[-Math.sin(angelRad),Math.cos(angelRad),0,0],
        [0,0,1,0],
        [0,0,0,1]
    ]);

    for( var i in points) {
        var M1 = $M([points[i].p1]);
        var M2 = $M([points[i].p2]);

        points[i].p1 = M1.x(MTrans).elements[0];
        points[i].p2 = M2.x(MTrans).elements[0];
    }

    draw();
}

var refresh = function() {
    mainPoint = [150,150,150, 1];
	
	point = [50,0,1];
	
    points = [];
    points.push({p1:[-75,0,-75, 1],p2:[-60,-30,-75, 1]});
    points.push({p1:[-60,-30,-75, 1],p2:[60,-30,-75, 1]});
    points.push({p1:[60,-30,-75, 1],p2:[75,0,-75, 1]});
    points.push({p1:[75,0,-75, 1],p2:[60,30,-75, 1]});
    points.push({p1:[60,30,-75, 1],p2:[-60,30,-75, 1]});
    points.push({p1:[-60,30,-75, 1],p2:[-75,0,-75, 1]});    

    points.push({p1:[-75,0,-75, 1],p2:[-75,0,75, 1]});
    points.push({p1:[-60,-30,-75, 1],p2:[-60,-30,75, 1]});
    points.push({p1:[60,-30,-75, 1],p2:[60,-30,75, 1]});
    points.push({p1:[75,0,-75, 1],p2:[75,0,75, 1]});
    points.push({p1:[60,30,-75, 1],p2:[60,30,75, 1]});
    points.push({p1:[-60,30,-75, 1],p2:[-60,30,75, 1]});    	
	
	points.push({p1:[-75,0,75, 1],p2:[-60,-30,75, 1]});
    points.push({p1:[-60,-30,75, 1],p2:[60,-30,75, 1]});
    points.push({p1:[60,-30,75, 1],p2:[75,0,75, 1]});
    points.push({p1:[75,0,75, 1],p2:[60,30,75, 1]});
    points.push({p1:[60,30,75, 1],p2:[-60,30,75, 1]});
    points.push({p1:[-60,30,75, 1],p2:[-75,0,75, 1]}); 
	
	matrixStand();
	
    draw();
}

var decZoom = function() {
    var zoom = 2;
    var MTrans = $M([
        [1,0,0,0],
        [0,1,0,0],
        [0,0,1,0],
        [0,0,0,zoom]
    ]);

    for( var i in points) {
        var M1 = $M([points[i].p1]);
        var M2 = $M([points[i].p2]);

        points[i].p1 = M1.x(MTrans).elements[0];
        points[i].p2 = M2.x(MTrans).elements[0];

        points[i].p1[0]=points[i].p1[0]/points[i].p1[3];
        points[i].p1[1]=points[i].p1[1]/points[i].p1[3];
        points[i].p1[2]=points[i].p1[2]/points[i].p1[3];
        
		points[i].p2[0]=points[i].p2[0]/points[i].p2[3];
        points[i].p2[1]=points[i].p2[1]/points[i].p2[3];
        points[i].p2[2]=points[i].p2[2]/points[i].p2[3];
        
    }

    draw();
}

var incZoom = function() {
    var zoom = 0.5;
    var MTrans = $M([
        [1,0,0,0],
        [0,1,0,0],
        [0,0,1,0],
        [0,0,0,zoom]
    ]);

    for( var i in points) {
        var M1 = $M([points[i].p1]);
        var M2 = $M([points[i].p2]);

        points[i].p1 = M1.x(MTrans).elements[0];
        points[i].p2 = M2.x(MTrans).elements[0];

        points[i].p1[0]=points[i].p1[0]/points[i].p1[3];
        points[i].p1[1]=points[i].p1[1]/points[i].p1[3];
        points[i].p1[2]=points[i].p1[2]/points[i].p1[3];
        
		points[i].p2[0]=points[i].p2[0]/points[i].p2[3];
        points[i].p2[1]=points[i].p2[1]/points[i].p2[3];
        points[i].p2[2]=points[i].p2[2]/points[i].p2[3];
        
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




