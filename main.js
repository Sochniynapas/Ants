makeAWays.addEventListener("click", function () {

    currentEvents = events.nothing;


    makeDistances();

    let bestPath;
    let bestPathLength;
    // Задаем параметры алгоритма
    const numAnts = temp.value; // количество муравьев
    const evaporationRate = 0.5; // коэффициент испарения феромона
    const alpha = 1; // вес феромона
    const beta = 3; // вес расстояния
    const initialPheromone = 1; // начальное значение феромона


    // Инициализируем массив феромонов
    let pheromones = [];
    for (let i = 0; i < distances.length; i++) {
        pheromones[i] = [];
        for (let j = 0; j < distances[i].length; j++) {
            pheromones[i][j] = initialPheromone;
        }
    }

    // Основной цикл алгоритма

    // Инициализируем массивы путей и длин путей для каждого муравья
    let paths = [];
    let pathLengths = [];
    for (let i = 0; i < numAnts; i++) {
        let path = [];
        let visited = [];
        let currentCity = 0;
        path.push(currentCity);
        visited[currentCity] = true;
        let pathLength = 0;
        for (let j = 0; j < distances.length - 1; j++) {
            let probabilities = [];
            let denominator = 0;
            //Заполнение эеланий муравья пойти к тому или иному городу + denominator - сумма желаний муравья
            for (let k = 0; k < distances.length; k++) {
                if (!visited[k]) {
                    let pheromone = pheromones[currentCity][k];
                    let distance = distances[currentCity][k];
                    let probability = Math.pow(pheromone, alpha) * Math.pow(1 / distance, beta);
                    probabilities[k] = probability;
                    denominator += probability;
                }
            }

            let rouletteWheel = Math.random() * denominator;
            let accumulated = 0;
            for (let k = 0; k < distances.length; k++) {
                if (!visited[k]) {
                    accumulated += probabilities[k];
                    if (accumulated >= rouletteWheel) {
                        currentCity = k;
                        break;
                    }
                }
            }
            path.push(currentCity);
            visited[currentCity] = true;
            pathLength += distances[path[j]][currentCity];
        }
        pathLength += distances[path[path.length - 1]][path[0]];
        paths.push(path);
        pathLengths.push(pathLength);
    }

    // Находим лучший путь и его длину
    bestPath = paths[0];
    bestPathLength = pathLengths[0];
    for (let i = 1; i < paths.length; i++) {
        if (pathLengths[i] < bestPathLength) {
            bestPath = paths[i];
            bestPathLength = pathLengths[i];
        }
    }

    // Обновляем феромоны на ребрах лучшего пути и испаряем феромоны на всех ребрах
    for (let i = 0; i < pheromones.length; i++) {
        for (let j = 0; j < pheromones[i].length; j++) {
            pheromones[i][j] *= (1 - evaporationRate);
        }
    }
    for (let i = 0; i < bestPath.length - 1; i++) {
        let city1 = bestPath[i];
        let city2 = bestPath[i + 1];
        pheromones[city1][city2] += 1 / bestPathLength;
        pheromones[city2][city1] += 1 / bestPathLength;
    }


    // Выводим лучший путь и его длину
    drowPath(paths, bestPath);



});