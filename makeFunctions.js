function dist(point1, point2) {
    return Math.abs(point2.y - point1.y) + Math.abs(point2.x - point1.x);
}
function makeDistances() {
    for (let i = 0; i < cities.length; i++) {
        distances[i] = [];
    }
    for (let i = 0; i < cities.length; i++) {
        for (let j = 0; j < cities.length; j++) {
            distances[i][j] = dist(cities[i], cities[j]);
        }
    }
}
function clear() {
    let itterations = 0;
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < cities.length; i++) {

        if (itterations == 0) {
            ctx.fillStyle = 'blue';
            itterations++;
        }
        else {
            ctx.fillStyle = 'magenta';
        }


        ctx.beginPath();
        ctx.arc(cities[i].x, cities[i].y, 15, 0, Math.PI * 2);
        ctx.fill();
    }

}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function drowBestPath(bestPath) {
    clear();

    ctx.strokeStyle = "darkBlue";
    ctx.beginPath();
    ctx.moveTo(cities[0].x, cities[0].y);

    for (let i = 1; i < bestPath.length; i++) {

        ctx.lineTo(cities[bestPath[i]].x, cities[bestPath[i]].y);
        ctx.stroke();
    }
    ctx.closePath();
    ctx.stroke();
}

async function drowPath(paths, bestPath) {
    ctx.strokeStyle = "green";
    ctx.lineWidth = 2;



    let i = 0;


    while (i < paths.length) {
        clear();

        ctx.beginPath();
        ctx.moveTo(cities[paths[i][0]].x, cities[paths[i][0]].y);
        for (let j = 0; j < paths[i].length - 1; j++) {


            ctx.lineTo(cities[paths[i][j + 1]].x, cities[paths[i][j + 1]].y);
            ctx.stroke();



        }
        ctx.closePath();
        ctx.stroke();


        i++;

        await sleep(500);

    }

    drowBestPath(bestPath);

}
