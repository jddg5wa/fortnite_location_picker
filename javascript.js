var viewport;
var mapContainer;
var mapSrcDimensions = [0, 0];
var mapWebDimensions = [0, 0];

var marker;
var markerDimensions = [0, 0];

//bounding box points taken from map source image dimensions
var srcBoundingPolygon = [[1345, 745], [2275, 678], [2968, 865], [3729, 1274], 
                         [6805, 1096], [6991, 1564], [7300,1760], [7508, 3455], 
                         [7682, 3622], [7682, 4247], [7457, 4487], [7457, 4942], 
                         [7008, 5559], [7306,5940], [7235, 6469], [6287,7339], 
                         [5368,7041], [4975,7556], [4038,7556], [3464,7020], 
                         [3050,7252], [2790,7252], [2599,7000], [2653,6254], 
                         [2313, 5770], [2082,5811], [525, 455], [641, 3452], 
                         [1026, 1991], [1018, 1519], [1196, 1274]];

var srcBoundingBox = [[323, 455], [7796, 455], [7796, 7639], [323, 7639]];

var webBoundingBoxPoints = [[0,0], [0,0]];


//converts [x,y] points from one image to relatively fit an image of another size. 
//points = array of arrays containing both [x, y] coordinates
//element =  image object
function convertRelativePointLocation(points, element) { 
    var offsetPoints = [];

    //percentage difference between original image resolution and new image resolution.
    var horizontalDiff = 100*(element.offsetHeight/element.naturalHeight);
    var verticalDiff = 100*(element.offsetWidth/element.naturalWidth);
    

    points.forEach(point => {
        var newX = point[0]*horizontalDiff;
        var newY = point[1]*verticalDiff;
        offsetPoints.push([newX, newY]);
    });

    return offsetPoints;
}

//returns a random [x,y] coordinate point on an element
function getRandomPoint(element) {
    var randomPoint = [getRandomWholeNumber(0, element.offsetHeight), getRandomWholeNumber(0, element.offsetWidth)];
    return randomPoint;
}

//point = array containing [x, y] coordinates of offset point origin
//element = object to get offset point in
//viewportOffset = decimal fraction of screen to map offset horizontally
//randomLimit = decimal fraction of screen to grab random offset point in relation viewport offset and the origin point.
function getRandomOffsetPoint(point, element){
    var offsetPoint;

    offsetPoint = [Math.abs(Math.floor(point[0])), Math.abs(Math.floor(point[1]))];

    return offsetPoint;
}

function getRandomWholeNumber(min,max){
    var randomNumber= Math.abs(Math.floor(Math.random()*(max-min + 1))) + min;
    return randomNumber;
}

function pointInPoly(polygon, point)
{
  var nvert = polygon.length;
  var vertx = [];
  var verty = [];
  var testx = point[0];
  var testy = point[1];

  polygon.forEach(point  => {
    vertx.push(point[0]);
    verty.push(point[1]);
  });

  var i, j, c = 0;
  for (i = 0, j = nvert-1; i < nvert; j = i++) {
    if ( ((verty[i]>testy) != (verty[j]>testy)) &&
     (testx < (vertx[j]-vertx[i]) * (testy-verty[i]) / (verty[j]-verty[i]) + vertx[i]) )
       c = !c;
  }
  return c;
}


//map = map to set position of based on screen size
//point = [x,y] coordinate point to offset map position too
//screenOffset = decimal percentage of screen to offset map position by
//randomLimit = decimal percentage of screen to randomize screenOffset
function setMapPosition(map, point, verticalOffset, horizontalOffset, randomLimit){
    var verticalOffsetRandom = verticalOffset + Math.random()*randomLimit;
    var horizontalOffsetRandom = horizontalOffset + Math.random()*randomLimit;
    var mapPosition = [Math.abs(point[0]-(viewport.offsetHeight*verticalOffsetRandom)), Math.abs(point[1]-(viewport.offsetWidth*horizontalOffsetRandom))]

    //checks if map edge is inside screen
    //adjusts map edge to stay on edge of screen
    if (point[0] > map.offsetHeight-(viewport.offsetHeight*(1-verticalOffset))){
        mapPosition[0] = map.offsetHeight-viewport.offsetHeight;
    }

    if (point[1] > map.offsetWidth-(viewport.offsetWidth*(1-horizontalOffset))){
        mapPosition[1] = map.offsetWidth-viewport.offsetWidth;
    }

    mapContainer.style.top = -mapPosition[0] + 'px';
    mapContainer.style.left = -mapPosition[1] + 'px';
}

function randomMapLocation(map) {
    var randomPoint = getRandomPoint(map);

    // while(pointInPoly(convertRelativePointLocation(srcBoundingBox, mapImage), randomPoint) == 0) {
    //     randomPoint = getRandomPoint;
    // }

    marker.style.top = randomPoint[0]-(marker.offsetHeight*.5) + 'px';
    marker.style.left = randomPoint[1]-(marker.offsetWidth*.5) + 'px';

    var mapOffset = getRandomOffsetPoint(randomPoint, map);

    setMapPosition(mapImage, mapOffset, .5, .35, .1)

    console.log("map size: " + mapWebDimensions);     
    console.log("marker position: " + randomPoint);   
    console.log("map position: " + mapOffset);
    console.log("screen width: " + viewport.offsetWidth + " -- screen height: " + viewport.offsetHeight);
    console.log("-----------------------------------");
}
window.onload = function load() {
    mapContainer = document.getElementById("map_container");
    mapImage = document.getElementById("map_img");
    viewport = document.getElementById("viewport");

    // console.log(convertRelativePointLocation(srcBoundingPolygon, mapImage))

    marker = document.getElementById("map_marker");
    randomMapLocation(mapImage);
};