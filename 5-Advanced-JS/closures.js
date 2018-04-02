// ********** Closures **********

function retirement(retirementAge) {
    var text = ' anos até a aposentadoria';
    return function(yearOfBirth) {
        var age = 2018 - yearOfBirth;
        console.log((retirementAge - age) + text);
    }
}

//invoca a funcao que retorna outra funcao
var retirementBR = retirement(60);
retirementBR(1990);
//chama diretamente as duas funcoes
retirement(65)(1990);

var retirementUS = retirement(66);
retirementUS(1990);

var retirementGermany = retirement(65);
retirementGermany(1990);

//resolvendo a funcao anterior com closure
function interviewQuestion(job) {
    return function(name) {
        if (job === 'designer') {
            console.log(name + ', por favor nos diga o que é UX?');

        } else if (job === 'teacher') {
            console.log(name + ', por favor nos diga que matéria você leciona?');

        } else {
            console.log('Olá,' + name + ' por favor nos diga o que você faz?');

        }
    }
}

interviewQuestion('designer')('Joao');
