window.onload = function(O){
    var container = document.getElementById( 'container' )
    var canvas = document.createElement('canvas');
    canvas.width = 1450;
    canvas.height = 640;
    canvas.style.id = '2k2nd';
    container.appendChild( canvas );

    context = canvas.getContext('2d');


    var collection = [];

    setInterval( function() {
        var count = 7 * Math.random();
        for( var i=0;i<count;i++ ) {
            var obj = {points: [], point: [(canvas.width-25)*Math.random(), 0, 1]};
            obj.points.push( {p1:[-7,0,1],p2:[7,0,1]} );
            obj.points.push( {p1:[-5,-6,1],p2:[5,6,1]} );
            obj.points.push( {p1:[5,-6,1],p2:[-5,6,1]} );

            collection.push( obj );
        }
    }, 700 );


    setInterval( function() {
        update( {collection: collection} )
        draw( {collection: collection} )

        for ( var i in collection) {
            if( collection[i].point[1] > canvas.height ) {
                collection.splice(i,1);
            }

        }

    }, 100 );

    setInterval( function() {
        for(k=0; k<15;k++)
        for ( var i in collection) {
            collection[i].point = translateTo( {point: collection[i].point, offsetX: 4, offsetY: 0} );
        }

    }, 350 );



}