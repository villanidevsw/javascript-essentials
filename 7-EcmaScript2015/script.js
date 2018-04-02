// let e const

//es5

var name5 = 'Thiago';
var age5 = 23;
name5 = 'Jose';
console.log(name5);

// es6
//constantes
const name6 = 'Thiago';
let age6 = 23;
name6 = 'Jose Mane';
console.log(name6);

//es5
function driversLicence5(passed) {
    if (passed) {
        console.log(firstName);
        var firstName = 'Thiago';
        var yearOfBirth = 1990;

    }
    console.log(firstName+','+yearOfBirth);
}

driversLicence5(true);


//es6
//escopo de bloco
function driversLicence6(passed) {
    console.log(firstName);
    let firstName;
    const yearOfBirth = 1990;
    if (passed) {
        //let firstName = 'Thiago';
        //const yearOfBirth = 1990;
        firstName = 'Thiago';
    }

    console.log(firstName+','+yearOfBirth);
}

driversLicence6(true);

//es5
var i = 23;
for (var i = 0; i < 5; i++) {
    console.log(i);
}
console.log(i);

//es6
let j = 23;
for (let j = 0; j < 5; j++) {
    console.log(j);
}
console.log(j);


// blocos e IIFES
//es6
{
    const a = 1;
    let b = 2;
}

console.log(a+b);

//es5
(function() {
    var c = 3;
})();

console.log(c);

//strings
let firstName = 'thiago';
let lastName = 'villani';
const yearOfBirth = 1990;

function calcAge(year) {
    return new Date().getFullYear() - year;
}

//es5
console.log('O '+firstName+' '+lastName+',nasceu em '+
yearOfBirth + '. Hoje ele tem '+calcAge(yearOfBirth)+' anos de idade');

//es6
console.log(`O ${firstName} ${lastName},nasceu em ${yearOfBirth}.
    Hoje ele tem ${calcAge(yearOfBirth)} anos de idade`);

const name = `${firstName} ${lastName}`;
console.log(name.startsWith('t'));
console.log(name.endsWith('t'));
console.log(name.includes('l'));
console.log(firstName.repeat(3));
console.log(`${firstName} `.repeat(3));

// arrow function
const years = [1990, 1965, 1982, 1937];

// ES5
var ages5 = years.map(function(el) {
    return 2016 - el;
});
console.log(ages5);


// ES6
//com 1 parametro
let ages6 = years.map(el => 2016 - el);
console.log(ages6);

//com 2 parametros
ages6 = years.map((el, index) => `Age element ${index + 1}: ${2016 - el}.`);
console.log(ages6);

//com mais de uma linha
ages6 = years.map((el, index) => {
    const now = new Date().getFullYear();
    const age = now - el;
    return `Age element ${index + 1}: ${age}.`
});
console.log(ages6);

//es5
var box5 = {
    color: 'green',
    position:1,
    clickMe:function(){
        //aqui o this funciona pois esta associado ao obj
        // belo workaround
        var self = this;
        document.querySelector('.green').addEventListener('click',function () {
            //desta maneira nao funciona o this
            //pois esta funcao esta associada a window
            var text = 'Box número '+self.position + ' e cor '+self.color;
            alert (text);
        });
    }
};

box5.clickMe();

//es6
var box6 = {
    color: 'green',
    position:1,
    clickMe:function(){
        document.querySelector('.green').addEventListener('click',() => {
            //com arrow function o this funciona
            var text = 'Box número '+this.position + ' e cor '+this.color;
            alert (text);
        });
    }
};

box6.clickMe();

var box66 = {
    color: 'green',
    position:1,
    //aqui a arrow function aponta o this para window
    clickMe:()=>{
        document.querySelector('.green').addEventListener('click',() => {
            //com arrow function o this funciona
            var text = 'Box número '+this.position + ' e cor '+this.color;
            alert (text);
        });
    }
};

box66.clickMe();

function Person(name) {
    this.name = name;
}

// ES5
Person.prototype.myFriends5 = function(friends) {

    //aqui o this aponta para window
    /*var arr = friends.map(function(el) {
       return this.name + ' is friends with ' + el;
    };*/

    //macete para fazer o this apontar para o objeto
    // pessoa, usando bind
    var arr = friends.map(function(el) {
       return this.name + ' is friends with ' + el;
    }.bind(this));

    console.log(arr);
};

var friends = ['Bob', 'Jane', 'Mark'];
new Person('John').myFriends5(friends);

// es6
Person.prototype.myFriends6 = function(friends) {
    var arr = friends.map(el => `${this.name} is friends with ${el}`);
    console.log(arr);
};

new Person('Mike').myFriends6(friends);

//destructuring

//es5
var thiago = ['Thiago',27];
//var nome = thiago[0];
//var idade = thiago[1];

//es6
const [nome,idade] = ['Thiago',27];
console.log(nome + idade);

const obj = {
    firstName:'Thiago',
    lastName:'Villani'
};

const {firstName,lastName} = obj;
console.log(firstName + lastName);

const {firstName:a,lastName:b} = obj;
console.log(a + b);

function calcAgeRetirement(year) {
    const age = new Date().getFullYear() - year;
    return [age, 65 - age];
}

const [age2, retirement] = calcAgeRetirement(1990);
console.log(age2);
console.log(retirement);

// Arrays
const boxes = document.querySelectorAll('.box');

//ES5
var boxesArr5 = Array.prototype.slice.call(boxes);
boxesArr5.forEach(function(cur) {
    cur.style.backgroundColor = 'dodgerblue';
});

//ES6
const boxesArr6 = Array.from(boxes);
Array.from(boxes).forEach(cur => cur.style.backgroundColor = 'dodgerblue');

//ES5
for(var i = 0; i < boxesArr5.length; i++) {

    if(boxesArr5[i].className === 'box blue') {
        continue;
    }

    boxesArr5[i].textContent = 'I changed to blue!';

}
//ES6
for (const cur of boxesArr6) {
    if (cur.className.includes('blue')) {
        continue;
    }
    cur.textContent = 'I changed to blue!';
}

//ES5
var ages = [12, 17, 8, 21, 14, 11];
var full = ages.map(function(cur) {
    return cur >= 18;
});
console.log(full);
console.log(full.indexOf(true));
console.log(ages[full.indexOf(true)]);
//ES6
console.log(ages.findIndex(cur => cur >= 18));
console.log(ages.find(cur => cur >= 18));

// spread operator usa-se na chamada da funcao
function addFourAges (a, b, c, d) {
    return a + b + c + d;
}

var sum1 = addFourAges(18, 30, 12, 21);
console.log(sum1);

//ES5
var ages = [18, 30, 12, 21];
var sum2 = addFourAges.apply(null, ages);
console.log(sum2);

//ES6
const sum3 = addFourAges(...ages);
console.log(sum3);

const familySmith = ['John', 'Jane', 'Mark'];
const familyMiller = ['Mary', 'Bob', 'Ann'];
const bigFamily = [...familySmith, 'Lily', ...familyMiller];
console.log(bigFamily);

const h = document.querySelector('h1');
const boxes = document.querySelectorAll('.box');
const all = [h, ...boxes];

Array.from(all).forEach(cur => cur.style.color = 'purple');

// Rest usa-se no argumento da funcao
//ES5
function isFullAge5() {
    //console.log(arguments);
    var argsArr = Array.prototype.slice.call(arguments);

    argsArr.forEach(function(cur) {
        console.log((2016 - cur) >= 18);
    })
}


//isFullAge5(1990, 1999, 1965);
//isFullAge5(1990, 1999, 1965, 2016, 1987);


//ES6
function isFullAge6(...years) {
    years.forEach(cur => console.log( (2016 - cur) >= 18));
}

isFullAge6(1990, 1999, 1965, 2016, 1987);

//ES5
function isFullAge5(limit) {
    var argsArr = Array.prototype.slice.call(arguments, 1);

    argsArr.forEach(function(cur) {
        console.log((2016 - cur) >= limit);
    })
}


//isFullAge5(16, 1990, 1999, 1965);
isFullAge5(1990, 1999, 1965, 2016, 1987);


//ES6
function isFullAge6(limit, ...years) {
    years.forEach(cur => console.log( (2016 - cur) >= limit));
}

isFullAge6(16, 1990, 1999, 1965, 2016, 1987);

// default parameters
// ES5
function SmithPerson(firstName, yearOfBirth, lastName, nationality) {

    lastName === undefined ? lastName = 'Smith' : lastName = lastName;
    nationality === undefined ? nationality = 'american' : nationality = nationality;

    this.firstName = firstName;
    this.lastName = lastName;
    this.yearOfBirth = yearOfBirth;
    this.nationality = nationality;
}

//ES6
function SmithPerson(firstName, yearOfBirth, lastName = 'Smith', nationality = 'american') {
    this.firstName = firstName;
    this.lastName = lastName;
    this.yearOfBirth = yearOfBirth;
    this.nationality = nationality;
}

var john = new SmithPerson('John', 1990);
var emily = new SmithPerson('Emily', 1983, 'Diaz', 'spanish');

// Lecture: Maps

const question = new Map();
question.set('question', 'What is the official name of the latest major JavaScript version?');
question.set(1, 'ES5');
question.set(2, 'ES6');
question.set(3, 'ES2015');
question.set(4, 'ES7');
question.set('correct', 3);
question.set(true, 'Correct answer :D');
question.set(false, 'Wrong, please try again!');

console.log(question.get('question'));
//console.log(question.size);

if(question.has(4)) {
    //question.delete(4);
    //console.log('Answer 4 is here')
}
//question.clear();
//question.forEach((value, key) => console.log(`This is ${key}, and it's set to ${value}`));

for (let [key, value] of question.entries()) {
    console.log(`essa eh a chave ${key}, e esse eh o valor ${value}`);

    if (typeof(key) === 'number') {
        console.log(`Answer ${key}: ${value}`);
    }
}

const ans = parseInt(prompt('Write the correct answer'));
console.log(question.get(ans === question.get('correct')));

// classes

//es5
var Person5 = function(name, yearOfBirth, job) {
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
}

Person5.prototype.calculateAge = function() {
    var age = new Date().getFullYear - this.yearOfBirth;
    console.log(age);
}

var john5 = new Person5('John', 1990, 'teacher');

//ES6
class Person6 {
    constructor (name, yearOfBirth, job) {
        this.name = name;
        this.yearOfBirth = yearOfBirth;
        this.job = job;
    }

    calculateAge() {
        var age = new Date().getFullYear - this.yearOfBirth;
        console.log(age);
    }

    static greeting() {
        console.log('Hey there!');
    }
}

const john6 = new Person6('John', 1990, 'teacher');
Person6.greeting();

// classes e heranca
//es5
var Person5 = function(name, yearOfBirth, job) {
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
}

Person5.prototype.calculateAge = function() {
    var age = new Date().getFullYear() - this.yearOfBirth;
    console.log(age);
}

//cria a subclasse e seta o this para ela
var Athlete5 = function(name, yearOfBirth, job, olymicGames, medals) {
    Person5.call(this, name, yearOfBirth, job);
    this.olymicGames = olymicGames;
    this.medals = medals;
}
//herda de classe pai
Athlete5.prototype = Object.create(Person5.prototype);
//add metodo especifico só da subclasse
Athlete5.prototype.wonMedal = function() {
    this.medals++;
    console.log(this.medals);
}

var johnAthlete5 = new Athlete5('John', 1990, 'swimmer', 3, 10);
johnAthlete5.calculateAge();
johnAthlete5.wonMedal();

//es6
class Person6 {
    constructor (name, yearOfBirth, job) {
        this.name = name;
        this.yearOfBirth = yearOfBirth;
        this.job = job;
    }

    calculateAge() {
        var age = new Date().getFullYear() - this.yearOfBirth;
        console.log(age);
    }
}

class Athlete6 extends Person6 {
    constructor(name, yearOfBirth, job, olympicGames, medals) {
        super(name, yearOfBirth, job);
        this.olympicGames = olympicGames;
        this.medals = medals;
    }

    wonMedal() {
        this.medals++;
        console.log(this.medals);
    }
}

const johnAthlete6 = new Athlete6('John', 1990, 'swimmer', 3, 10);

johnAthlete6.wonMedal();
johnAthlete6.calculateAge()
