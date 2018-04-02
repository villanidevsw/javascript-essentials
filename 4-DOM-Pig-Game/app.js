/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/


var scores, roundScore, activePlater, gameRunning;

initialize();

function initialize() {
    scores = [0, 0];
    roundScore = 0;
    activePlater = 0;
    gameRunning = true;
    //detalhe o querySelector busca apenas o primeiro elemento que ele encontra
    //busca o elemento html e seta a string HTML dentro do elemento
    //document.querySelector('#current-'+activePlater).innerHTML = '<em>'+dice+'<em>';
    //buscar o elemento html e pega o seu valor
    //var x = document.querySelector('#score-0').textContent;
    //console.log(x);

    //para manipular o css em javascript primeiro busca o elemento e depois style.propriedade css = valor
    document.querySelector('.dice').style.display = 'none';

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

//manipular evento adicionando callback function (pode ser reusada)
/*function rollDices(){
    //codigo
}
//aqui passo apenas o nome da funcao que sera invocada
document.querySelector('.btn-roll').addEventListener('click',rollDices);
*/
//manipular evento adicionando uma funcao anonima diretamente (nao pode ser reusada)
//implementacao do botao  ROLL DICE
document.querySelector('.btn-roll').addEventListener('click', function() {
    if (gameRunning) {

        // 1-random number
        //math.floor arredonda numeros para inteiro
        ///math.random retorna um numero aleatorio entre 0 e 1. o dado possui 6 lados, entao preciso de um numero de 1 a 6
        var diceNumber = Math.floor(Math.random() * 6) + 1;

        //2-exibe o resultado
        //display block exibe o elemento
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        //como o elemento é uma img esta linha troca ela
        diceDOM.src = 'dice-' + diceNumber + '.png';

        //3- atualiza o roundScore se o numero do dice for diferente de 1
        // senao troca o jogador
        if (diceNumber !== 1) {
            roundScore += diceNumber;
            //busca o elemento html e seta apenas texto dentro do elemento
            document.querySelector('#current-' + activePlater).textContent = roundScore;

        } else {
            //alterna o jogador
            nextPlayer();
        }
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
        if (scores[activePlater] >= 20) {
            document.querySelector('#name-' + activePlater).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlater + '-panel').classList.toggle('winner');
            document.querySelector('.player-' + activePlater + '-panel').classList.toggle('active');
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
    //remove o atributo da classe css
    //document.querySelector('.player-0-panel').classList.remove('active');
    //adiciona o atributo da classe css
    //document.querySelector('.player-0-panel').classList.add('active');

    //mas existe um jeito melhor de fazer usando toggle
    // toggle faz a operacao de alternar entre o que estiver ativo no momento
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('.dice').style.display = 'none';

}

//implementa o bota NEW
document.querySelector('.btn-new').addEventListener('click', initialize);
