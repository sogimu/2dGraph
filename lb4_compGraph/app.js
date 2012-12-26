window.onload = function(O){
    var container = document.getElementById( 'container' )
    var canvas1 = document.createElement('canvas');
    canvas1.width = 500;
    canvas1.height = 500;
    canvas1.style.id = '2k2nd';
    container.appendChild( canvas1 );

    context1 = canvas1.getContext('2d');

    mainPoint = [150,150,1];
    point = [50,0,1];

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