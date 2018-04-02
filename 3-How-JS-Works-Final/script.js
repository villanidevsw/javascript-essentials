/////////////////////////////////////
// Lecture: Hoisting

/*
// functions
calculateAge(1965);

function calculateAge(year) {
    console.log(2016 - year);
}

// retirement(1956);
var retirement = function(year) {
    console.log(65 - (2016 - year));
}


// variables

console.log(age);
var age = 23;

function foo() {
    console.log(age);
    var age = 65;
    console.log(age);
}
foo();
console.log(age);
*/



/////////////////////////////////////
// Lecture: Scoping

/*
// First scoping example
var a = 'Hello!';
first();

function first() {
    var b = 'Hi!';
    second();

    function second() {
        var c = 'Hey!';
        console.log(a + b + c);
    }
}


// Example to show the differece between execution stack and scope chain
var a = 'Hello!';
first();

function first() {
    var b = 'Hi!';
    second();

    function second() {
        var c = 'Hey!';
        third()
    }
}

function third() {
    var d = 'John';
    //console.log(c);
    console.log(a+d);
}
*/



/////////////////////////////////////
// Lecture: The this keyword

/*

//retorna a window
//console.log(this);

calculateAge(1985);

function calculateAge(year) {
    console.log(2016 - year);
    //retorna a window
    //pois em chamadas de funcao declaradas
    // o objeto "pai" é window
    console.log(this);
}

var john = {
    name: 'John',
    yearOfBirth: 1990,
    calculateAge: function() {
        //retorna o objeto john
        console.log(this);
        console.log(2016 - this.yearOfBirth);

        function innerFunction() {
            //retorna o objeto window
            //pois em chamadas de funcao declaradas
            // o objeto "pai" é window
            console.log(this);
        }
        innerFunction();
    }
}

john.calculateAge();

var mike = {
    name: 'Mike',
    yearOfBirth: 1984
};

//method borrowing
// a variavel this vai apontar para o metodo que a chamou
// e recebera o valor do objeto em que o metodo pertence
mike.calculateAge = john.calculateAge;
//aqui chama o metodo
mike.calculateAge();
*/
