var main_map_height = document.getElementById("map").offsetHeight;
var main_map_width = document.getElementById("map").offsetWidth;

var map_marker_height = document.getElementById("map_marker").offsetHeight;
var map_marker_width = document.getElementById("map_marker").offsetWidth;
var marker_position = [ 0, 0];



new_marker_position = [ Math.floor(Math.random() * main_map_height), Math.floor(Math.random() * main_map_height)];