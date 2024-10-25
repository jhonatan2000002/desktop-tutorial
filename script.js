const gridContainer = document.getElementById('grid');
const gameOverText = document.getElementById('gameOver');
let grid, score;

function createBoard() {
    grid = Array.from({ length: 4 }, () => Array(4).fill(0));
    score = 0;
    gridContainer.innerHTML = '';
    gameOverText.style.display = 'none';
    addTile();
    addTile();
    updateBoard();
}

function addTile() {
    let emptyTiles = [];
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            if (grid[row][col] === 0) emptyTiles.push({ row, col });
        }
    }
    if (emptyTiles.length) {
        const { row, col } = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
        grid[row][col] = Math.random() < 0.9 ? 2 : 4;
    }
}

function updateBoard() {
    gridContainer.innerHTML = '';
    grid.forEach(row => row.forEach(value => {
        const tile = document.createElement('div');
        tile.classList.add('tile');
        tile.textContent = value || '';
        tile.setAttribute('data-value', value);
        gridContainer.appendChild(tile);
    }));
}

function slide(row) {
    let arr = row.filter(val => val);
    let missing = 4 - arr.length;
    let zeros = Array(missing).fill(0);
    return zeros.concat(arr);
}

function combine(row) {
    for (let i = 3; i >= 1; i--) {
        if (row[i] === row[i - 1] && row[i] !== 0) {
            row[i] *= 2;
            row[i - 1] = 0;
            score += row[i];
        }
    }
    return row;
}

function moveRight() {
    grid = grid.map(row => slide(combine(slide(row))));
}

function moveLeft() {
    grid = grid.map(row => slide(combine(slide(row)).reverse()).reverse());
}

function moveUp() {
    for (let col = 0; col < 4; col++) {
        let column = [grid[0][col], grid[1][col], grid[2][col], grid[3][col]];
        column = slide(combine(slide(column))).reverse();
        for (let row = 0; row < 4; row++) grid[row][col] = column[3 - row];
    }
}

function moveDown() {
    for (let col = 0; col < 4; col++) {
        let column = [grid[0][col], grid[1][col], grid[2][col], grid[3][col]];
        column = slide(combine(slide(column)));
        for (let row = 0; row < 4; row++) grid[row][col] = column[row];
    }
}

function checkGameOver() {
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            if (grid[row][col] === 0) return false;
            if (col < 3 && grid[row][col] === grid[row][col + 1]) return false;
            if (row < 3 && grid[row][col] === grid[row + 1][col]) return false;
        }
    }
    return true;
}

function handleInput(event) {
    if (checkGameOver()) {
        gameOverText.style.display = 'block';
        return;
    }

    switch (event.key) {
        case 'ArrowRight':
            moveRight();
            break;
        case 'ArrowLeft':
            moveLeft();
            break;
        case 'ArrowUp':
            moveUp();
            break;
        case 'ArrowDown':
            moveDown();
            break;
        default:
            return;
    }
    addTile();
    updateBoard();
}

window.addEventListener('keydown', handleInput);
createBoard();
