window.onload = function(O){
    var container = document.getElementById( 'container' )
    var canvas1 = document.createElement('canvas');
    canvas1.width = 250;
    canvas1.height = 250;
    canvas1.style.id = '2k2nd';
    container.appendChild( canvas1 );

    var canvas2 = document.createElement('canvas');
    canvas2.width = 250;
    canvas2.height = 250;
    canvas2.style.id = '43ws23';
    container.appendChild( canvas2 );

    var context1 = canvas1.getContext('2d');
    var context2 = canvas2.getContext('2d');

    var points = [];
    points.push({p1:{x: 100, y: 100},p2:{x: 120, y: 120}});
    points.push({p1:{x: 120, y: 120},p2:{x: 180, y: 130}});
    points.push({p1:{x: 180, y: 130},p2:{x: 150, y: 50}});
    points.push({p1:{x: 150, y: 50},p2:{x: 120, y: 70}});
    points.push({p1:{x: 120, y: 70},p2:{x: 100, y: 100}});

    context1.clearRect(0,0,250,250);
    
	context1.rotate()	
	context1.beginPath();    
		context1.moveTo(points[0].p1.x, points[0].p1.y);
		context1.lineTo(points[i].p2.x, points[i].p2.y);
		context1.fillText("Standart drawing functions", 10, 10);
		context1.fillStyle = "#abc";

		context1.beginPath();    
			context1.moveTo(points[0].p1.x, points[0].p1.y);
			context1.lineTo(points[i].p2.x, points[i].p2.y);
			context1.fillText("Standart drawing functions", 10, 10);
			context1.fillStyle = "#abc";
		context1.closePath();

	context1.closePath();
	
    context1.stroke();
    context1.fill();


	 
	

    context2.clearRect(0,0,250,250);
    context2.beginPath();
    context2.moveTo(points[0].p1.x, points[0].p1.y);
    for(var i in points) {
        context2.lineTo(points[i].p2.x, points[i].p2.y);

    }
	context2.rect(120, 50, 25, 25);
    context2.fillText("My drawing functions", 10, 10);
    context2.strokeStyle = "#00ff00"
    context2.stroke();
    context2.fillStyle = "#00ff00";
    //context2.fill();
    context2.closePath();


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

    var colorFill = {};
    colorFill.r = 255;
    colorFill.g = 255;
    colorFill.b = 0;


    var imageData = context2.getImageData(0,0,canvas2.width, canvas2.height);
    var list = [{x:150,y:100}];
    while( list.length >= 1 ) {
        for(var i in list) {
            var color = getPixel( imageData, list[i].x,list[i].y );
            if( "#"+color.r+""+color.g+""+color.b != "#02550" && "#"+color.r+""+color.g+""+color.b != "#"+colorFill.r+""+colorFill.g+""+colorFill.b) {
                setPixel( imageData,list[i].x,list[i].y, colorFill.r, colorFill.g, colorFill.b, 255);
                var x = list[i].x;
                var y = list[i].y;
                list.splice(i,1);

                list.push({ x: x+1, y: y});
                list.push({ x: x, y: y+1});
                list.push({ x: x-1, y: y});
                list.push({ x: x, y: y-1});
            } else {
                list.splice(i,1);
            }


        }
    }
    context2.putImageData(imageData, 0, 0);


}