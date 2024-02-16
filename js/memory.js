let imagePairs=0, num_pairs=0, rows=0, colums=0, level=0, gameBoard=0, initialScore=0, finishScore=0;
let negative_score = 0;
let revealedImages = [];
//localStorage.setItem("best_memory_players",[]);


function choose_level(button){
    button.style.backgroundColor = '#EF6D98';
    let levelButtons = document.getElementsByClassName('level-button');
    for (let button of levelButtons) {
        button.disabled = true;
    }
    level = button.textContent;
    let imageFileNames = [];
    if (level === 'Easy') {
        imageFileNames = ['img1.jpg','img2.jpg','img3.jpg',];
        updateDetailsGame(2, 3, 3, 100);
    } 
    else if (level === 'Medium') {
        imageFileNames = ['img1.jpg',
        'img2.jpg',
        'img3.jpg',
        'img4.jpg',
        'img5.jpg',
        'img6.jpg',];
        updateDetailsGame(3, 4, 6, 130);  
    } 
    else if (level === 'Hard') {
        imageFileNames = ['img1.jpg',
        'img2.jpg',
        'img3.jpg',
        'img4.jpg',
        'img5.jpg',
        'img6.jpg',
        'img7.jpg',
        'img8.jpg',
        'img9.jpg',
        'img10.jpg'];
        updateDetailsGame(4, 5, 10, 160);
    }
    imagePairs = imageFileNames.concat(imageFileNames);
}

function goToPlay() {
    updateStyle(level);
    updateGameBoard(rows,colums ,num_pairs, imagePairs);
    updateStyleCard(level);
    updataTimer();
}

function showImg(){
    let cardIndex = Array.from(this.parentNode.children).indexOf(this);
    let imageIndex = cardIndex + (colums * Array.from(this.parentNode.parentNode.children).indexOf(this.parentNode)); 

    revealedImages.push(imagePairs[imageIndex]);
    this.setAttribute('data-image', imagePairs[imageIndex]);
    this.classList.add('flipped');
    this.style.backgroundImage = `url(/images/${imagePairs[imageIndex]})`;

    if (revealedImages.length === 2) {
        checkMatching(revealedImages);
        revealedImages = [];
    }
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
}

function checkWin(){
    if (num_pairs === 0){
        finishScore = initialScore + negative_score;
        let winMessage = document.createElement('div');
        gameBoard.appendChild(winMessage);
        winMessage.className = 'win-message';
        winMessage.textContent = 'You winner!\nYour score is: ' + finishScore;
        updateStorage(finishScore);
    }
}

function updateDetailsGame(num_rows,num_colums, num_of_pairs, initial_score){
    rows = num_rows;
    colums = num_colums;
    num_pairs = num_of_pairs;
    initialScore = initial_score
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
}

function updateStyle(level){
    let newCssLink = document.createElement('link');
    newCssLink.rel = 'stylesheet';
    newCssLink.type = 'text/css';
    newCssLink.href = '/css/memory_game.css'; 
    document.head.appendChild(newCssLink);
    gameBoard = document.getElementById('game-board');  
    gameBoard.innerHTML = '';  
}

function updateStyleCard(level){
    let cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        if (level === 'Easy') {
            card.style.width = '180px';
            card.style.height = '180px';
        } else if (level === 'Medium') {
            card.style.width = '130px';
            card.style.height = '130px';
        }
    });
}

function updataTimer() {
    let timer = document.createElement('div');
    timer.className = 'timer';
    document.body.appendChild(timer);

    let endTime = new Date().getTime() + 180000; 

    function updateDisplay() {
        let currentTime = new Date().getTime();
        let remainingTime = endTime - currentTime;

        if (remainingTime < 0 ) {
            clearInterval(timerInterval); 
            let loseMessage = document.createElement('div');
            gameBoard.appendChild(loseMessage);
            loseMessage.className = 'lose-message';
            loseMessage.textContent = `oops...\nYou're out of time!`;
            loseMessage.style.fontSize = '30px';
            setTimeout(function(){
                window.location.href = "/html/memory.html";
            },3500);
        }else if(num_pairs === 0)
        {
            clearInterval(timerInterval); 
        }
        else {
            let minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
            timer.textContent = 'Time remaining: ' + minutes + 'm ' + seconds + 's';
        }
    }

    let timerInterval = setInterval(updateDisplay, 1000);
    updateDisplay();
}


function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function updateStorage(finishScore){
    var curr_user_Json = localStorage.getItem('current_user');
    var curr_user = JSON.parse(curr_user_Json) || [];
    curr_user.games_scores[1] = finishScore;
    localStorage.setItem('current_user', JSON.stringify(curr_user))

    var users_Json = localStorage.getItem('users');
    var users = JSON.parse(users_Json) || [];
    for(let i = 0; i<users.length; i++){
        if(users[i].user_name === curr_user.user_name)
        {
            users[i].games_scores[1] = finishScore;
            localStorage.setItem('users',JSON.stringify(users));
            break;
        }       
   }

}


function check_out(e){
    console.log("here");
    localStorage.setItem("current_user",JSON.stringify({}));
    window.location.href = "/logIn.html";
}

