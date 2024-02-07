
let imagePairs, num_pairs, rows, colums, level, gameBoard, initialScore;
let negative_score = 0;
let revealedImages = [];


function choose_level(button){
    button.style.backgroundColor = 'aqua';
    let levelButtons = document.getElementsByClassName('level-button');
    for (let button of levelButtons) {
        button.disabled = true;
    }
    level = button.textContent;
    let imageFileNames = [];
    if (level === 'Easy') {
        imageFileNames = ['img1.jpg','img2.jpg','img3.jpg',];
        updateDetailsGame(2, 3, 3, 80);
    } 
    else if (level === 'Medium') {
        imageFileNames = ['img1.jpg',
        'img2.jpg',
        'img3.jpg',
        'img4.jpg',
        'img5.webp',
        'img6.jpg',];
        updateDetailsGame(3, 4, 6, 90);  
    } 
    else if (level === 'Hard') {
        imageFileNames = ['img1.jpg',
        'img2.jpg',
        'img3.jpg',
        'img4.jpg',
        'img5.webp',
        'img6.jpg',
        'img7.webp',
        'img8.jpg',
        'img9.jpg',
        'img10.jpg'];
        updateDetailsGame(4, 5, 10, 100);
    }
    imagePairs = imageFileNames.concat(imageFileNames);
    console.log('choose_level');
}

function goToPlay() {
    updateStyle(level);
    updateGameBoard(rows,colums ,num_pairs, imagePairs);
    console.log('goToPlay');
}

function showImg(){
    let cardIndex = Array.from(this.parentNode.children).indexOf(this);
    let imageIndex = cardIndex + (colums * Array.from(this.parentNode.parentNode.children).indexOf(this.parentNode)); 
    console.log(cardIndex);

    console.log(imageIndex);

    revealedImages.push(imagePairs[imageIndex]);
    this.setAttribute('data-image', imagePairs[imageIndex]);
    this.classList.add('flipped');
    this.style.backgroundImage = `url(images/${imagePairs[imageIndex]})`;
    console.log(revealedImages);
    if (revealedImages.length === 2) {
        checkMatching(revealedImages);
        revealedImages = [];
    }
    console.log('showImg');
}


function checkMatching() {
    if (revealedImages[0] !== revealedImages[1]) {
        let card1 = document.querySelector(`.flipped[data-image="${revealedImages[0]}"]`);
        let card2 = document.querySelector(`.flipped[data-image="${revealedImages[1]}"]`);
        
        if (card1 && card2) {
            setTimeout(() => {
                card1.classList.remove('flipped');
                card2.classList.remove('flipped');
                card1.style.backgroundImage = 'none';
                card2.style.backgroundImage = 'none'; 
                card1.style.transition = 'transform 1.5s';
                card2.style.transition = 'transform 1.5s';
                }, 1100);
        } 
        negative_score = negative_score - 1;     
    }
    else{
        num_pairs--;
    }
    setTimeout(checkWin, 1000);
    console.log('checkMatching');
}

function checkWin(){
    if (num_pairs === 0){
        console.log(num_pairs);
        let finishScore = initialScore + negative_score;
        let winMessage = document.createElement('div');
        gameBoard.appendChild(winMessage);
        winMessage.className = 'win-message';
        winMessage.textContent = 'You winner!\nYour score is: ' + finishScore;
    }
    console.log('checkWin');
}

function updateDetailsGame(num_rows,num_colums, num_of_pairs, initial_score){
    rows = num_rows;
    colums = num_colums;
    num_pairs = num_of_pairs;
    initialScore = initial_score
    console.log('updateDetailsGame');
}

function updateGameBoard(rows,colums, num_pairs, imagePairs){
    shuffleArray(imagePairs);
    for (let i = 0; i < rows; i++) {
        let row = document.createElement('div');
        row.className = 'row';
        for (let j = 0; j < colums; j++) {
            let card = document.createElement('div');
            card.className = 'card';
            row.appendChild(card);
            card.addEventListener("click", showImg);
        }
        gameBoard.appendChild(row);
    }
    console.log('updateGameBoard');
}

function updateStyle(level){
    let newCssLink = document.createElement('link');
    newCssLink.rel = 'stylesheet';
    newCssLink.type = 'text/css';
    newCssLink.href = 'game.css'; 
    document.head.appendChild(newCssLink);

    gameBoard = document.getElementById('game-board');  
    gameBoard.innerHTML = '';  

    let cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        if (level === 'EASY') {
            card.style.width = '200px';
            card.style.height = '200px';
        } else if (level === 'MEDIUM') {
            card.style.width = '150px';
            card.style.height = '150px';
        }
    });
    console.log('updateStyle');
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    console.log('shuffleArray');
}


