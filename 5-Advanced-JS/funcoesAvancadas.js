// ********** passando funcoes como argumentos *********
//"callbacks"
var years = [1990, 1995, 1925, 1987];

function arraCalc(array, callbackFunction) {
    var result = [];

    for (var i = 0; i < array.length; i++) {
        result.push(callbackFunction(array[i]));
    }
    return result;
}

function calAge(element) {
    return 2018 - element;
}
//passa os parametros, e passa apenas o nome da funcao
var ages = arraCalc(years, calAge);
console.log(ages);

function isFullAge(element) {
    return element >= 18;
}

var fullAges = arraCalc(ages, isFullAge);
console.log(fullAges);

// ********** funcao que retorna outra funcao **********
function interviewQuestion(job) {
    if (job === 'designer') {
        return function(name) {
            console.log(name + ', por favor nos diga o que é UX?');
        }

    } else if (job === 'teacher') {
        return function(name) {
            console.log(name + ', por favor nos diga que matéria você leciona?');
        }
    } else {
        return function(name) {
            console.log('Olá,' + name + ' por favor nos diga o que você faz?');
        }
    }
}
// o retorno é um objeto, que por acaso também é uma função!
var teacherQuestion = interviewQuestion('teacher');
// e aqui eu chama a funcao que foi retornada
teacherQuestion('Thiago');

//ou pode-se chamar direto, o que é meio estranho
interviewQuestion('designer')('Joao');


// ********** IIFE = immediately invoked function expressions **********

//funcao declarada padrao
/*function game(){
    var score = Math.random() * 10;
    console.log(score);
    console.log(score >= 5);
}
game();*/

// IIFE - uma funcao anonima do tipo expression que executa uma acao imediatamente
// funcao que nao sera reusada
// o escopo das variaveis sao apenas acessadas dentro da funcao (variaveis ficam privadas)
(function(){
    var score = Math.random() * 10;
    console.log(score);
    console.log(score >= 5);
})();

// passando parametros (o paramentro é declarado normalmente, e é passado ali em baixo...estranho)
(function(param){
    var score = Math.random() * 10;
    console.log(score);
    console.log(score >= 5);
})(5);
