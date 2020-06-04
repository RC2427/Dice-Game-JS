/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/


var scores, currentScore, activePlayer, roundScore, gamePlay_state,prevScore;

init();

document.querySelector('.btn-roll').addEventListener('click', function () {

    if (gamePlay_state) {
        var dice = Math.floor(Math.random() * 6) + 1;

        var diceDom = document.querySelector('.dice');
        diceDom.style.display = 'block';
        diceDom.src = 'dice-' + dice + '.png';

        if (dice !== 1 && ((prevScore !== 6) && (dice !== 6))) {
            prevScore = dice;
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        }
        else {
            change_player();
        }
    }
})

document.querySelector('.btn-hold').addEventListener('click', function () {

    if (gamePlay_state) {
        scores[activePlayer] += roundScore;

        var input = document.querySelector('.final-score').value;
        var winningScore;
        if(input){
            winningScore = input;
        }
        else{
            winningScore = 100;
        }

        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        console.log(winningScore);
        if (scores[activePlayer] >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!!'
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlay_state = false;
        }
        else {
            change_player();
        }
    }
})

document.querySelector('.btn-new').addEventListener('click', init);

function change_player() {
    document.getElementById('current-' + activePlayer).textContent = '0';
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    document.querySelector('.dice').style.display = 'none';
}

function init() {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    roundScore = 0;
    prevScore = 0;
    gamePlay_state = true;

    document.querySelector('.dice').style.display = 'none';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('#name-0').textContent = 'Player-1';
    document.querySelector('#name-1').textContent = 'Player-2';

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}