// ********** Bind, call e aply **********

var thiago = {
    name: 'Thiago',
    age: 27,
    job: 'programador',
    presentation: function(style,timeOfDay){
        if (style === 'formal') {
            console.log('Bom/Boa '+timeOfDay+ ', senhoras e senhores! me chamo ' + this.name +' e sou '+
            this.job+', e tenho '+this.age+' anos .');
        } else if (style === 'descontraido'){
            console.log('Iae eu sou ' + this.name +' e sou '+
            this.job+', e tenho '+this.age+ ' anos, tenha um(a) Bom/Boa '+timeOfDay );
        }
    }
};

var pedro = {
    name: 'Pedro',
    age: 22,
    job: 'dba'
};

thiago.presentation('descontraido','dia');
// o metodo call  deixa setar quem vai ser o 'this', que aqui no caso é o Pedro
// mais uma maneira de fazer 'method borrowing'
thiago.presentation.call(pedro,'formal','noite');
// o aply é a mesma coisa, porém se passa os parametros em forma de vetor
//thiago.presentation.aply(pedro,['formal','noite']);

// o bind faz a copia de uma funcao, com um argumento 'pre-setado'
// e depois retorna uma funcao, que depois pode ser chamada (semore com o valor 'pre-setado')
var thiagoDescontraido = thiago.presentation.bind(thiago,'descontraido');
thiagoDescontraido('noite');

thiagoDescontraido('tarde');

var pedroFormal = thiago.presentation.bind(pedro,  'formal');
pedroFormal('dia');

var years = [1990, 2001, 1925, 1987];

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

function isFullAge(limit,element) {
    return element >= limit;
}
//passa os parametros, com o bind da funcao pre-setado
var ages = arraCalc(years, calAge);
console.log(ages);
var fullAges = arraCalc(ages, isFullAge.bind(this,20));
console.log(fullAges);
