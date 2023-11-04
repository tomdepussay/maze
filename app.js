let generate = document.getElementById('generate');
let solve = document.getElementById('solve');
let reset = document.getElementById('reset');
let menu = document.getElementsByClassName('menu')[0];
let table = document.querySelector('table');

let grid = [];

let maze_is_generated = false;

let initial_max_grid_size = 51;

let grid_size_x;
let grid_size_y;

let cell_size;

let time_init = 0;

let time = time_init;

let difficulty_init = 30;
let difficulty = difficulty_init;

let level = []

window.onload = function() {
    createGrid();

    generate.addEventListener('click', generateFunction);
    solve.addEventListener('click', solveFunction);
    reset.addEventListener('click', resetFunction);
}

function createGrid(){

    if(maze_is_generated){
        resetFunction();
    }
    
    let ratio = table.offsetWidth / table.offsetHeight;
    
    if(ratio > 1){
        grid_size_x = initial_max_grid_size;
        grid_size_y = Math.round(initial_max_grid_size / ratio);
    } else {
        grid_size_x = Math.round(initial_max_grid_size * ratio);
        grid_size_y = initial_max_grid_size;
    }

    if(grid_size_x % 2 == 0){
        grid_size_x--;
    }

    if(grid_size_y % 2 == 0){
        grid_size_y--;
    }

    maze_is_generated = true;

    for(let i = 0; i < grid_size_y; i++){
        let row = document.createElement('tr');
        grid.push([]);

        for(let j = 0; j < grid_size_x; j++){
            let cell = document.createElement('td');
            cell.style.width = cell_size + 'px';
            cell.style.height = cell_size + 'px';

            if(i == 0 || i == grid_size_y - 1 || j == 0 || j == grid_size_x - 1){
                cell.classList.add('wall');
            } else {
                cell.classList.add('cell');

                cell.id = 'x_' + (j - 1) + "_y_" + (i - 1);

                if(i == 1 && j == 1){
                    let start = document.createElement('div');
                    start.classList.add('start');
                    cell.appendChild(start);
                } else if(i == grid_size_y - 2 && j == grid_size_x - 2){
                    let end = document.createElement('div');
                    end.classList.add('end');
                    cell.appendChild(end);
                }

                if(i % 2 == 0 && j % 2 == 0){
                    cell.classList.add('cell_1');
                } else if(i % 2 == 1 && j % 2 == 1){
                    cell.classList.add('cell_1');
                } else {
                    cell.classList.add('cell_2');
                }
                
            }

            row.appendChild(cell);
            grid[i].push(cell);
        }

        table.appendChild(row);
    }
}

function generateFunction(){
    // let select = document.querySelector('select').value; 

    let select = "kruskal";

    solve.disabled = true;

    if(select == "kruskal"){
        kruskal();
    }
}

function kruskal(){

    let grid = [];

    let wall_breakable = [];

    let grid_color = [];

    for(let i = 1; i < grid_size_y - 1; i++){
        grid.push([]);

        for(let j = 1; j < grid_size_x - 1; j++){
            grid[i - 1].push(document.getElementById('x_' + (j - 1) + "_y_" + (i - 1)));
        }
        
    }

    for(let i = 0; i < grid.length; i++){
        for(let j = 0; j < grid[i].length; j++){
            
            if(i % 2 == 1 || j % 2 == 1){
                grid[i][j].classList.add('wall');
            }

            if(i % 2 == 0 ^ j % 2 == 0){
                wall_breakable.push(grid[i][j]);
            }

        }
    }

   
    for(let i = 0; i < grid.length; i++){
        for(let j = 0; j < grid[i].length; j++){
            let interval = setTimeout(function(){
                
                if(!grid[i][j].classList.contains('wall')){
                    grid_color.push(
                        {
                            cells: [grid[i][j]],
                            color: `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`
                        }
                    )
                
                    grid[i][j].style.backgroundColor = grid_color[grid_color.length - 1].color;
                }

                if(i == grid.length - 1 && j == grid[i].length - 1){
                    clearInterval(interval);
                    wallBreakable();
                }

            }, 0);
        }
    }

    function wallBreakable() {

        function mergeAndUpdateCells() {
            let randomWallIndex = Math.floor(Math.random() * wall_breakable.length);
            let randomWall = wall_breakable[randomWallIndex];
            
            let coordinates = getCoordinates(randomWall);
            let x = coordinates.x;
            let y = coordinates.y;
            
            let adjacentCells = [];
            if (x % 2 === 0) {
                adjacentCells.push(grid[y - 1][x]);
                adjacentCells.push(grid[y + 1][x]);
            } else {
                adjacentCells.push(grid[y][x - 1]);
                adjacentCells.push(grid[y][x + 1]);
            }
          
            let adjacentCellsIndex = [];
            for (let i = 0; i < grid_color.length; i++) {
                if (grid_color[i].cells.includes(adjacentCells[0])) {
                    adjacentCellsIndex.push(i);
                }
                if (grid_color[i].cells.includes(adjacentCells[1])) {
                    adjacentCellsIndex.push(i);
                }
            }
          
            let colorToKeep = grid_color[adjacentCellsIndex[0]].color;
          
            if (adjacentCellsIndex[0] !== adjacentCellsIndex[1]) {
                for (let i = 0; i < grid_color[adjacentCellsIndex[1]].cells.length; i++) {
                    grid_color[adjacentCellsIndex[0]].cells.push(grid_color[adjacentCellsIndex[1]].cells[i]);
                    grid_color[adjacentCellsIndex[1]].cells[i].style.backgroundColor = colorToKeep;
                }
            
                grid_color.splice(adjacentCellsIndex[1], 1);
                randomWall.classList.remove('wall');
                wall_breakable.splice(randomWallIndex, 1);
                grid_color[adjacentCellsIndex[0]].cells.push(randomWall);
                randomWall.style.backgroundColor = colorToKeep;
                time = time_init;
            } else {
                time = 0;
            }
          
            // Vérifiez si toutes les opérations sont terminées
            if (grid_color.length > 1) {
                // Exécutez la prochaine itération après un délai de 50 ms
                setTimeout(mergeAndUpdateCells, time);
            } else {
                difficulty = difficulty_init;
                difficultyUpdate();
            }
        }
      
        // Démarrez la première itération
        mergeAndUpdateCells();

        function difficultyUpdate(){

            random = Math.floor(Math.random() * wall_breakable.length);
            randomWall = wall_breakable[random];

            randomWall.classList.remove('wall');

            wall_breakable.splice(random, 1);

            grid_color[0].cells.push(randomWall);
            randomWall.style.backgroundColor = grid_color[0].color;

            if(difficulty > 0){
                difficulty--;
                setTimeout(difficultyUpdate, 10);
            } else {
                finishUpdate();
            }
        }

        function finishUpdate(){
            setTimeout(function(){

                for(let i = 0; i < grid_color[0].cells.length; i++){

                    grid_color[0].cells[i].style.backgroundColor = '';
                    solve.disabled = false;

                }

            }, 1000)
        }

    }
      


}

function getCoordinates(cell){
    return {
        x: parseInt(cell.id.split('_')[1]),
        y: parseInt(cell.id.split('_')[3])
    
    };
}

function solveFunction(){
    
    let trouver = false;
    let level_actuel = 0;
    let grid = [];

    for(let i = 1; i < grid_size_y - 1; i++){
        grid.push([]);

        for(let j = 1; j < grid_size_x - 1; j++){
            grid[i - 1].push(document.getElementById('x_' + (j - 1) + "_y_" + (i - 1)));
        }
        
    }

    let start = getCoordinates(grid[0][0]);
    let end = getCoordinates(grid[grid.length - 1][grid[grid.length - 1].length - 1]);

    level.push([{
        parent: null,
        cell: grid[start.y][start.x]
    }]);
    grid[start.x][start.y].classList.add('visited');

    level.push([]);

    while(!trouver){

        for(let i = 0; i < level[level_actuel].length; i++){

            let cell = level[level_actuel][i].cell;
            let coordinates = getCoordinates(cell);

            // Vérification cellule du haut
            if((coordinates.y - 1) >= 0 && !grid[coordinates.y - 1][coordinates.x].classList.contains('wall') && !grid[coordinates.y - 1][coordinates.x].classList.contains('visited')){
                grid[coordinates.y - 1][coordinates.x].classList.add('visited');

                level[level_actuel + 1].push({
                    parent: cell,
                    cell: grid[coordinates.y - 1][coordinates.x]
                })
            }

            // Vérification cellule du bas
            if((coordinates.y + 1) < grid.length && !grid[coordinates.y + 1][coordinates.x].classList.contains('wall') && !grid[coordinates.y + 1][coordinates.x].classList.contains('visited')){
                grid[coordinates.y + 1][coordinates.x].classList.add('visited');

                level[level_actuel + 1].push({
                    parent: cell,
                    cell: grid[coordinates.y + 1][coordinates.x]
                })
            }

            // Vérification cellule de gauche
            if((coordinates.x - 1) >= 0 && !grid[coordinates.y][coordinates.x - 1].classList.contains('wall') && !grid[coordinates.y][coordinates.x - 1].classList.contains('visited')){
                grid[coordinates.y][coordinates.x - 1].classList.add('visited');

                level[level_actuel + 1].push({
                    parent: cell,
                    cell: grid[coordinates.y][coordinates.x - 1]
                })
            }

            // Vérification cellule de droite
            if((coordinates.x + 1) < grid[0].length && !grid[coordinates.y][coordinates.x + 1].classList.contains('wall') && !grid[coordinates.y][coordinates.x + 1].classList.contains('visited')){
                grid[coordinates.y][coordinates.x + 1].classList.add('visited');

                level[level_actuel + 1].push({
                    parent: cell,
                    cell: grid[coordinates.y][coordinates.x + 1]
                })
            }

        }

        for(let i = 0; i < level[level_actuel + 1].length; i++){
            if(level[level_actuel + 1][i].cell == grid[end.y][end.x]){
                trouver = true;
            }
        }

        if(!trouver){
            level.push([]);
        }

        level_actuel++;
    }

    let scale = Math.round(255 / (level.length - 1));
    current_color = 255;

    let i = 0;
    let j = 0;

    function step() {
        if (i < level.length) {
            
            level[i][j].cell.style.backgroundColor = `rgb(255, ${current_color}, 0)`;

            if(j < level[i].length - 1){
                j++;
            } else {
                i++;
                j = 0;
                current_color -= scale;
            }

            if(i < level.length && j < level[i].length){
                setTimeout(step, 0); // Appeler la fonction step avec un délai
            } else {
                trouverChemin();
            }
        }
    }

    // Appelez la fonction step pour commencer la boucle avec un délai initial
    step();

    function trouverChemin(){

        let chemin = [];
        let finish_trouver_chemin = false;
        let depart;
        let iteration = level.length - 2;

        for(let i = 0; i < level[level.length - 1].length; i++){
            if(level[level.length - 1][i].cell == grid[end.y][end.x]){
                depart = level[level.length - 1][i];
            }
        }

        chemin.push(depart);

        while(!finish_trouver_chemin){
            
            let parent = chemin[chemin.length - 1].parent;
            
            if(getCoordinates(parent).x == 0 && getCoordinates(parent).y == 0){
                finish_trouver_chemin = true;
                chemin.push(level[iteration][0]);
                step2(chemin);
            } else {
                for(let i = 0; i < level[iteration].length; i++){
                    if(level[iteration][i].cell == parent){
                        chemin.push(level[iteration][i]);
                        iteration--;
                    }
                }
            }

        }
    }

    function step2(chemin){

        let i = 0;

        function step() {
            if (i < chemin.length) {
                
                chemin[i].cell.style.backgroundColor = `rgb(0, 255, 0)`;

                i++;

                if(i < chemin.length){
                    setTimeout(step, 0); // Appeler la fonction step avec un délai
                }
            }
        }

        // Appelez la fonction step pour commencer la boucle avec un délai initial
        step();

    }
}

function resetFunction(){
    table.innerHTML = '';
    grid = [];
    maze_is_generated = false;
    createGrid();
}