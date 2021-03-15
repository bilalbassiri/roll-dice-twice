let newGame = document.getElementById('new-game'),
    dice = document.getElementById('dice'),
    gameProgress = document.getElementById('game-progress'),
    audio = new Audio('./sounds/w.mp3');
let currentPlayer = 1;
const score = [0,0,0];
let diceRepeat = [0,0];
let rollTimes = 0,     diceRepeatIndex = 0, doubleR = [0,0,0], scoreIndex=0;
newGame.addEventListener('click', ()=> location.reload());

dice.addEventListener('click', playAndRoll);

function roll() {
    rollTimes++;
    getDouble(currentPlayer).parentElement.style.animation = '';
    let diceNumber = Math.floor(Math.random()*6)+1;
    dice.firstElementChild.src = 'img/dice_' + diceNumber + '.png';
    dice.classList.add('dice-anim');
    dice.addEventListener('animationend', ()=> dice.classList.remove('dice-anim'))
    getCurrentScore(currentPlayer).textContent = diceNumber;
    score[currentPlayer] += diceNumber;
    document.getElementById(`progress-${currentPlayer}`).textContent
    = score[currentPlayer];
    diceRepeat[diceRepeatIndex] = diceNumber;
    diceRepeatIndex++;
    if(rollTimes == 2){
        if(diceRepeat[0]==diceRepeat[1]){
            score[currentPlayer] -=(2*diceRepeat[0]);
            doubleR[currentPlayer] +=1;
            getDouble(currentPlayer).textContent = doubleR[currentPlayer];
            document.getElementById(`progress-${currentPlayer}`).textContent
    = score[currentPlayer];
            getDouble(currentPlayer).parentElement.style.animation = `s 1s linear`
        }else {
           
        }
        getCurrentPlayer(currentPlayer).classList.remove('current-player');
        if((score[1] + score[2]) >= 200) {
            let winner= score[1]>score[2]? 1: 2;
            setWinner(winner);
            dice.firstElementChild.src = 'img/game-over.png';
            dice.firstElementChild.classList.add('game-over');
            gameProgress.style.width = '100%';
            gameProgress.style.backgroundColor = '#166ae9';
            dice.removeEventListener('click', playAndRoll);
            return
       }
       let width = ((score[1] + score[2])/200)*100;
       gameProgress.style.width =
       `${width}%`;
       currentPlayer = currentPlayer == 1? 2:1;
        getCurrentPlayer(currentPlayer).classList.add('current-player');
        getCurrentScore(currentPlayer).textContent = '0';
        rollTimes = 0;
        diceRepeatIndex = 0;
        diceRepeat = [0,0];

    }
}

function getCurrentScore(a){
    return document.getElementById(`current-${a}`);
}
function getCurrentPlayer(b){
    return document.getElementById(`player-play-${b}`);
}
function getDouble(c){
    return document.getElementById(`double-${c}`);
}
function setWinner(winner) {
    document.querySelector(`.score-${winner}`).innerHTML = `
    <img src="img/cup.png" alt="winner" class="winner">`
}
function playAudio(){
    audio.currentTime = 0;
    audio.play();
}
function playAndRoll(){
    playAudio();
    roll();
}