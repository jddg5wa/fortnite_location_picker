// var mapViewport;
// var mapContainer;
// var marker;
// var miniMapMarker;
// var miniMapTopbar;
// var miniMapSidebar;

// //bounding box points taken from map source image dimensions
// var srcBoundingPolygon = [[1345, 745], [2275, 678], [2968, 865], [3729, 1274], 
//                          [6805, 1096], [6991, 1564], [7300,1760], [7508, 3455], 
//                          [7682, 3622], [7682, 4247], [7457, 4487], [7457, 4942], 
//                          [7008, 5559], [7306,5940], [7235, 6469], [6287,7339], 
//                          [5368,7041], [4975,7556], [4038,7556], [3464,7020], 
//                          [3050,7252], [2790,7252], [2599,7000], [2653,6254], 
//                          [2313, 5770], [2082,5811], [525, 455], [641, 3452], 
//                          [1026, 1991], [1018, 1519], [1196, 1274]];

// var srcBoundingBox = [[323, 455], [7796, 455], [7796, 7639], [323, 7639]];

// var webBoundingBoxPoints = [[0,0], [0,0]];


// //converts [x,y] points from one image to relatively fit an image of another size. 
// //points = array of arrays containing both [x, y] coordinates
// //element =  image object
// function convertRelativePointsLocation(points, element) { 
//     var offsetPoints = [];

//     //percentage difference between original image resolution and new image resolution.
//     var horizontalDiff = element.offsetHeight/element.naturalHeight;
//     var verticalDiff = element.offsetWidth/element.naturalWidth;
    

//     points.forEach(point => {
//         var newX = Math.floor(point[0]*horizontalDiff);
//         var newY = Math.floor(point[1]*verticalDiff);
//         offsetPoints.push([newX, newY]);

//         // console.log("point", point[0], point[1]);
//         // console.log("offset point",newX, newY);
//     });

//     return offsetPoints;
// }

// //returns a random [x,y] coordinate point on an element
// function getRandomPoint(element) {
//     var randomPoint = [getRandomWholeNumber(0, element.offsetHeight), getRandomWholeNumber(0, element.offsetWidth)];
//     return randomPoint;
// }

// //point = array containing [x, y] coordinates of offset point origin
// //element = object to get offset point in
// function getRandomOffsetPoint(point, element){
//     var offsetPoint;

//     offsetPoint = [Math.abs(Math.floor(point[0])), Math.abs(Math.floor(point[1]))];

//     return offsetPoint;
// }

// function getRandomWholeNumber(min,max){
//     var randomNumber= Math.abs(Math.floor(Math.random()*(max-min + 1))) + min;
//     return randomNumber;
// }

// function pointInPoly(polygon, point)
// {
//   var nvert = polygon.length;
//   var vertx = [];
//   var verty = [];
//   var testx = point[0];
//   var testy = point[1];

//   polygon.forEach(point  => {
//     vertx.push(point[0]);
//     verty.push(point[1]);
//   });

//   var i, j, c = 0;
//   for (i = 0, j = nvert-1; i < nvert; j = i++) {
//     if ( ((verty[i]>testy) != (verty[j]>testy)) &&
//      (testx < (vertx[j]-vertx[i]) * (testy-verty[i]) / (verty[j]-verty[i]) + vertx[i]) )
//        c = !c;
//   }
//   return c;
// }

// function pointInRect(rectangle, point){
//     var minX = rectangle[0][0];
//     var maxX = rectangle[0][0];
//     var minY = rectangle[1][1];
//     var maxY = rectangle[1][1];

//     var insideX = true;
//     var insideY = true;

//     rectangle.forEach(point => {
//         if( minX > point[0]){
//             minX = point[0]
//         }
//         if( maxX < point[0]){
//             maxX = point[0]
//         }
//         if( minY > point[1]){
//             minY = point[1]
//         }
//         if( maxY < point[1]){
//             maxY = point[1]
//         }
//     });

//     // console.log(minX);
//     // console.log(maxX);
//     // console.log(minY);
//     // console.log(maxY);
//     // console.log(point);
//     // console.log(rectangle[0]);


//     if (point[0] >= minX && point[0] <= maxX){
//         insideX = true;
//     }
//     else {
//         insideX = false;
//     }

//     if (point[1] >= minY && point[1] <= maxY){
//         insideY = true;
//     }
//     else{
//         insideY = false;
//     }

//     if (insideX == true && insideY == true){
//         return true;
//     }
//     else{
//         return false;
//     }
// }

// //map = map to set position of based on screen size
// //point = [x,y] coordinate point to offset map position too
// //screenOffset = decimal percentage of screen to offset map position by
// //randomLimit = decimal percentage of screen to randomize screenOffset
// function setMapPosition(map, point, verticalOffset, horizontalOffset, randomLimit){
//     var verticalOffsetRandom = verticalOffset + Math.random()*randomLimit;
//     var horizontalOffsetRandom = horizontalOffset + Math.random()*randomLimit;
//     var mapPosition = [Math.abs(point[0]-(screen.height*verticalOffsetRandom)), Math.abs(point[1]-(screen.width*horizontalOffsetRandom))]

//     //checks if map edge is inside screen
//     //adjusts map edge to stay on edge of screen
//     if (point[0] > map.offsetHeight-(screen.height*(1-verticalOffset))){
//         mapPosition[0] = map.offsetHeight-screen.height;
//     }

//     if (point[1] > map.offsetWidth-(screen.width*(1-horizontalOffset))){
//         mapPosition[1] = map.offsetWidth-screen.width;
//     }

//     mapContainer.style.top = -mapPosition[0] + 'px';
//     mapContainer.style.left = -mapPosition[1] + 'px';
// }

// function setMiniMapPosition(map, container, viewport,  point, verticalOffset, horizontalOffset, randomLimit){
//     var verticalOffsetRandom = verticalOffset + Math.random()*randomLimit;
//     var horizontalOffsetRandom = horizontalOffset + Math.random()*randomLimit;
//     var mapPosition = [Math.abs(Math.floor(point[0]-(viewport.offsetHeight*verticalOffsetRandom))), Math.abs(Math.floor(point[1]-(viewport.offsetWidth*horizontalOffsetRandom)))];

//     // checks if map edge is inside viewport
//     // adjusts map edge to stay on edge of viewport
//     if (point[0] > map.offsetHeight-(viewport.offsetHeight*(1-verticalOffset))){
//         mapPosition[0] = map.offsetHeight-viewport.offsetHeight;
//     }

//     if (point[1] > map.offsetWidth-(viewport.offsetWidth*(1-horizontalOffset))){
//         mapPosition[1] = map.offsetWidth-viewport.offsetWidth;
//     }

//     container.style.top = -mapPosition[0] + 'px';
//     container.style.left = -mapPosition[1] + 'px';

//     miniMapTopbar.style.left = -mapPosition[1] + 'px';
//     miniMapSidebar.style.top = -mapPosition[0] + 'px';
// }



// function randomMapLocation(map) {
//     var randomPoint = getRandomPoint(map);
//     var boundingBox = convertRelativePointsLocation(srcBoundingPolygon, mapImage);
//     var inPoly = pointInPoly(boundingBox, randomPoint);

//     // console.log("in poly:", inPoly);
//     // console.log("random point:", randomPoint);

//     while(inPoly != true || inPoly == 0) {
//         randomPoint = getRandomPoint(map);
//         inPoly = pointInPoly(boundingBox, randomPoint);

//         // console.log("in poly:", inPoly);
//         // console.log("random point:", randomPoint);
//     }

//     marker.style.top = randomPoint[0]-(marker.offsetHeight*.5) + 'px';
//     marker.style.left = randomPoint[1]-(marker.offsetWidth*.5) + 'px';

//     miniMapMarker.style.top = Math.floor(randomPoint[0]*(miniMapImage.offsetHeight/mapImage.offsetHeight))-(miniMapMarker.offsetHeight*.5) + 'px';
//     miniMapMarker.style.left = Math.floor(randomPoint[1]*(miniMapImage.offsetWidth/mapImage.offsetWidth))-(miniMapMarker.offsetWidth*.5) + 'px';

//     var mapPoint = [Math.abs(Math.floor(randomPoint[0])), Math.abs(Math.floor(randomPoint[1]))];
//     var miniMapPoint = [Math.abs(Math.floor(randomPoint[0]*(miniMapImage.offsetHeight/mapImage.offsetHeight))), Math.abs(Math.floor(randomPoint[1]*(miniMapImage.offsetWidth/mapImage.offsetWidth)))];

//     // console.log("mapPoint:", mapPoint[0], mapPoint[1]);
//     // console.log("miniMapPoint:", miniMapPoint[0], miniMapPoint[1])

//     setMapPosition(mapImage, mapPoint, .5, .3, .1);
//     setMiniMapPosition(miniMapImage, miniMapContainer, miniMapViewport, miniMapPoint, .45, .45, .05);

//     // console.log("map size: " + mapWebDimensions);     
//     // console.log("marker position: " + randomPoint);   
//     // console.log("map position: " + mapOffset);
//     // console.log("screen width: " + viewport.offsetWidth + " -- screen height: " + viewport.offsetHeight);
//     // console.log("-----------------------------------");
// }
// window.onload = function load() {
//     mapContainer = document.getElementById("map_container");
//     mapImage = document.getElementById("map_img");
//     mapViewport = document.getElementById("map_viewport");

//     miniMapViewport = document.getElementById("mini_map_viewport");
//     miniMapContainer = document.getElementById("mini_map_container");
//     miniMap = document.getElementById("mini_map");
//     miniMapImage = document.getElementById("mini_map_img");
//     miniMapMarker = document.getElementById("mini_map_marker");

//     miniMapTopbar = document.getElementById("mini_map_topbar");
//     miniMapSidebar = document.getElementById("mini_map_sidebar");

//     mapContainer.style.height = mapImage.offsetHeight;
//     mapContainer.style.width = mapImage.offsetWidth;

//     // console.log(convertRelativePointsLocation(srcBoundingPolygon, mapImage))

//     marker = document.getElementById("map_marker");
//     randomMapLocation(mapImage);
// };