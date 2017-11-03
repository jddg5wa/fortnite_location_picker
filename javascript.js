var locations = ["Anarchy Acres", "Fatal Fields","Flush Factory","Greasy Grove","Lonely Lodge","Loot Lake","Moisty Mire","Pleasant Park","Retail Row","Wailing Woods"];

function getRandomLocation(){
    if (Math.random() < .5){
        var randLoc1 = locations[Math.floor(Math.random()* locations.length)];
        var randLoc2 = locations[Math.floor(Math.random()* locations.length)];
        while (randLoc1 == randLoc2){
            var randLoc2 = locations[Math.floor(Math.random()* locations.length)];
        }
        document.getElementById('outputText').innerHTML = "inbetween <u>" + randLoc1 + "</u> and <u>" + randLoc2 + "</u>";
    }
    else {
        var randLoc = locations[Math.floor(Math.random()* locations.length)];
        document.getElementById('outputText').innerHTML = "<u>" + randLoc + "</u>";
    }
}
