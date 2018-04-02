//*********** Function constructor **********

//jeito normal de se criar um objeto
var jose = {
    name: 'Jose',
    yearOfBirth: 1966,
    job: 'Teacher'
}

//usando orientacao a objetos
//passa-se os atributos no construtor
var Person = function(name, yearOfBirth, job) {
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
    /*this.calculateAge = function(){
    console.log(2018-this.yearOfBirth);
    }*/
};
//usando prototype também funciona
Person.prototype.calculateAge = function() {
    console.log(2018 - this.yearOfBirth);
};

//sera herdado
Person.prototype.lastName = 'Villani';

// instancia do objeto
var thiago = new Person('Thiago', 1990, 'Programmer');
thiago.calculateAge();

var joana = new Person('Joana', 1988, 'Designer');
joana.calculateAge();

console.log(thiago.lastName);
console.log(joana.lastName);

// Object.create

//escreve o prototipo
var personProto = {
    calculateAge2: function() {
        console.log(2018 - this.yearOfBirth);
    }
};

//cria o objeto passando o prototipo
var joao = Object.create(personProto);
joao.name = 'Joao';
joao.yearOfBirth = 1994;
joao.job = 'hairDresser';

//cria o objeto passando o prototipo e os argumentos
var pedro = Object.create(personProto, {
        name: {
            value: 'Pedro'
        },
        yearOfBirth: {
            value: 1983
        },
        job: {
            value: 'Electrician'
        }
    }

);

console.log(pedro);
