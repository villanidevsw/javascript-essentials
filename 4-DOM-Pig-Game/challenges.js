/*
RULES:

1. o jogador perde a pontuacao total se tirar dois 6 seguidos
depois disso é a vez do outro jogador
2.adicionar campo na pagina HTML para que o jogador defina a pontuacao
vencedora do jogo
3. adicionar mais um dado ao jogo, o jogador perde sua pontuacao
se qualquer um dos dados for 1
*/


var scores, roundScore, activePlater,gameRunning;

initialize();

var previousDiceNumber;
var winningScore;

function initialize(){
    scores = [0, 0];
    roundScore = 0;
    activePlater = 0;
    gameRunning = true;

    previousDiceNumber = 0;
    winningScore = 20;

    document.querySelector('.final-score').disabled = false;
    document.querySelector('.final-score').value = '';

    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');

    document.querySelector('.player-0-panel').classList.add('active');
}

//implementacao do botao  ROLL DICE
document.querySelector('.btn-roll').addEventListener('click', function() {
    if (gameRunning) {

        // 1-random number
        var diceNumber = Math.floor(Math.random() * 6) + 1;
        var diceNumber2 = Math.floor(Math.random() * 6) + 1;
        //2-exibe o resultado
        document.getElementById('dice-1').style.display = 'block';
        document.getElementById('dice-2').style.display = 'block';
        //como o elemento é uma img esta linha troca ela
        document.getElementById('dice-1').src = 'dice-' + diceNumber + '.png';
        document.getElementById('dice-2').src = 'dice-' + diceNumber2 + '.png';
        //3- atualiza o roundScore se o numero do dice for diferente de 1
        //ou duas vezes numero 6
        if (diceNumber !== 1 && diceNumber !== 1) {
            roundScore += diceNumber+diceNumber2;
            document.querySelector('#current-' + activePlater).textContent = roundScore;

        } else {
            //4- alterna o jogador
            nextPlayer();
        }

        previousDiceNumber = diceNumber;

    }



});

// implementacao do botao HOLD
document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gameRunning) {

        //1-add scorte atual para o score global
        scores[activePlater] += roundScore;
        //2- atualiza a interface
        document.querySelector('#score-' + activePlater).textContent = scores[activePlater];
        //3- verifica se o jogador ganhou o jogo
        if (scores[activePlater] >= winningScore) {
            document.querySelector('#name-' + activePlater).textContent = 'Winner!';
            document.getElementById('dice-1').style.display = 'none';
            document.getElementById('dice-2').style.display = 'none';
            document.querySelector('.player-'+activePlater+'-panel').classList.toggle('winner');
            document.querySelector('.player-'+activePlater+'-panel').classList.toggle('active');
            document.querySelector('.final-score').disabled = true;
            gameRunning = false;
        } else {
            //4- alterna o jogador
            nextPlayer();
        }
    }

});

function nextPlayer() {

    activePlater === 0 ? activePlater = 1 : activePlater = 0;
    roundScore = 0;
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';

}

//implementa o bota NEW
document.querySelector('.btn-new').addEventListener('click',initialize);

//implementa o valor da pontuacao digitado pelo usuario
document.querySelector('.final-score').addEventListener('change',function(){
    var input = document.querySelector('.final-score').value;
    //undefined, 0, null ou "" são COERCED para false
    // qualquer outro valor é COERCED para true
    if (input) {
        winningScore = input;
    }

});
