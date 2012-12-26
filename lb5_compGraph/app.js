window.onload = function(O){
    var container = document.getElementById( 'container' )
    var canvas1 = document.createElement('canvas');
    canvas1.width = 500;
    canvas1.height = 500;
    canvas1.style.id = '2k2nd';
    container.appendChild( canvas1 );

    context1 = canvas1.getContext('2d');

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

	k = 1000000;
	r = 1/k;
	projectedM = $M([
        [1,0,0,0],
        [0,1,0,0],
        [0,0,0,r],
        [0,0,0,1]
    ]);
	
    draw();
}