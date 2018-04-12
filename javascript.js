var map;
var mapDimensions = [0, 0];

var marker;
var markerDimenions = [0, 0];

// var boundingBoxPoints = [[0,0],[0,0]]

function getRandomLocation() {
    //get map and marker dimensions incase they changed
    mapDimensions = [map_img.offsetHeight, map_img.offsetWidth];
    markerDimenions = [marker.offsetHeight, marker.offsetWidth];  

    //offset to account for screen size
    var offsetRandomizer = (.25 + Math.random()*.10);
    var screenOffset = [screen.width * offsetRandomizer, screen.height * offsetRandomizer]

    // set marker position
    var newMarkerPosition = [Math.abs(Math.floor(Math.random()*mapDimensions[0])-(markerDimenions[0]*.5)), 
                             Math.abs(Math.floor(Math.random()*mapDimensions[1])-(markerDimenions[1]*.5))];
    marker.style.top = newMarkerPosition[0] + 'px';
    marker.style.left = newMarkerPosition[1] + 'px';

    //set map position
    var newMapOffset = [Math.abs(Math.floor(newMarkerPosition[0]-screenOffset[1])), 
                        Math.abs(Math.floor(newMarkerPosition[1]-screenOffset[0]))];

    //checks if viewport goes off map    
    if (newMapOffset[0] > mapDimensions[0]-screen.height){
        newMapOffset[0] = mapDimensions[0]-screen.height;
    }

    if (newMapOffset[1] > mapDimensions[1]-screen.width){
        newMapOffset[1] = mapDimensions[1]-screen.width;
    }

    map.style.top = "-" + newMapOffset[0]  + 'px';
    map.style.left = "-" + newMapOffset[1] + 'px';

    console.log("map size: " + mapDimensions);     
    console.log("marker position: " + newMarkerPosition);   
    console.log("map offset: " + newMapOffset);
    console.log("screen width: " + screen.width + " -- screen height: " + screen.height);
    console.log("-----------------------------------");
}

function isPointInPoly(poly, pt){
    for(var c = false, i = -1, l = poly.length, j = l - 1; ++i < l; j = i)
        ((poly[i].y <= pt.y && pt.y < poly[j].y) || (poly[j].y <= pt.y && pt.y < poly[i].y))
        && (pt.x < (poly[j].x - poly[i].x) * (pt.y - poly[i].y) / (poly[j].y - poly[i].y) + poly[i].x)
        && (c = !c);
    return c;
}

window.onload = function load() {
    map = document.getElementById("map_container");
    map_img = document.getElementById("map_img");

    marker = document.getElementById("map_marker");
    getRandomLocation();
};