let events = Object.freeze({
    add: "add",
    nothing: "nothing",


});

let currentEvents = events.nothing;

let makeCities = document.getElementById("bForMCircles");

let makeAWays = document.getElementById("bForMWays");

let clearMap = document.getElementById("Clear");

makeCities.addEventListener("click", function () {
    currentEvents = events.add;
});

clearMap.addEventListener("click", function () {

    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    cities = [];
    distances = [];

});




canv.addEventListener('mousedown', function (e) {
    if (currentEvents === events.add) {

        if (cities.length == 0) {
            ctx.fillStyle = 'blue';
        }
        else {
            ctx.fillStyle = 'magenta';
        }


        ctx.beginPath();
        ctx.arc(e.offsetX, e.offsetY, 15, 0, Math.PI * 2);
        let x = e.offsetX;
        let y = e.offsetY;
        ctx.fill();
        cities.push({ x: x, y: y });

    }


});