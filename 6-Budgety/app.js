// implementar o module pattern em javascript
//IIFE + closures
var budgetController = (function() {

    var Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;

    };

    var Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    };

    Expense.prototype.calcPercentage = function(totalIncome) {
        if (totalIncome > 0) {
            this.percentage = Math.round((this.value / totalIncome) * 100);
        } else {
            this.percentage = -1;
        }

    };

    Expense.prototype.getPercentage = function() {
        return this.percentage;
    };

    var data = {
        allItems: {
            expenses: [],
            incomes: []
        },
        totals: {
            expense: 0,
            income: 0
        },
        bugdet: 0,
        percentage: -1
    };

    var calculateTotal = function(type) {
        var sum = 0;
        if (type === 'exp') {
            data.allItems.expenses.forEach(function(current) {
                sum = sum + current.value;
            });
            data.totals.expense = sum;
        } else if (type === 'inc') {
            data.allItems.incomes.forEach(function(current) {
                sum = sum + current.value;
            });
            data.totals.income = sum;
        }


    };

    return {
        addItem: function(type, description, value) {
            var newItem, id, lastId;

            if (type === 'exp') {
                if (data.allItems.expenses.length > 0) {
                    lastId = data.allItems.expenses[data.allItems.expenses.length - 1].id;
                    id = lastId + 1;
                } else {
                    id = 0;
                }
                newItem = new Expense(id, description, value);
                data.allItems.expenses.push(newItem);
            } else if (type === 'inc') {

                if (data.allItems.incomes.length > 0) {
                    lastId = data.allItems.incomes[data.allItems.incomes.length - 1].id;
                    id = lastId + 1;
                } else {
                    id = 0;
                }

                newItem = new Income(id, description, value);
                data.allItems.incomes.push(newItem);
            }

            return newItem;
        },
        deleteItem: function(typeOf, id) {
            var ids, index;
            var type = typeOf === 'inc' ? 'incomes' : 'expenses';
            //o map retorna um novo array
            ids = data.allItems[type].map(function(current) {
                return current.id;
            });
            //pega o index do elemento que queremos deletar
            index = ids.indexOf(id);
            if (index !== -1) {
                //remove o elemento no indice desejado
                data.allItems[type].splice(index, 1);
            }
        },
        calculateBudget: function() {
            // calcular total income e expenses
            calculateTotal('inc');
            calculateTotal('exp');
            // calcular o budget = income - expenses
            data.bugdet = data.totals.income - data.totals.expense;
            //calcular a porcentagem
            if (data.totals.income > 0) {
                data.percentage = Math.round((data.totals.expense / data.totals.income) * 100);

            } else {
                data.porcentagem = -1;
            }
        },
        calculatePercentages: function() {
            data.allItems.expenses.forEach(function(current) {
                current.calcPercentage(data.totals.income);
            });
        },
        getPercentages: function() {
            var allPercentages = data.allItems.expenses.map(function(current) {
                return current.getPercentage();
            });

            return allPercentages;
        },
        getBudget: function() {
            return {
                budget: data.bugdet,
                totalIncome: data.totals.income,
                totalExpenses: data.totals.expense,
                percentage: data.percentage

            };
        }
    };

})();

var uiController = (function() {

    var DOMStrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expensesLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        container: '.container',
        expensesPercetageLabel : '.item__percentage',
        dateLabel : '.budget__title--month'

    };


    var formatNumber = function(num,type){
        var numSplit,integer,decimal,sign;
        /*+ ou - antes do numero
        2 casas decimais
        . para separar milhar
        */

        //valor absoluto sem sinal
        num = Math.abs(num);
        //adiciona 2 casas decimais
        num = num.toFixed(2);
        numSplit = num.split('.');

        integer = numSplit[0];
        if (integer.length > 3) {
            integer = integer.substr(0,integer.length-3) + '.' + integer.substr(integer.length-3,3);
        }

        decimal = numSplit[1];

        sign = type === 'exp' ? '-' : '+';

        return sign + ' ' + integer + ','+ decimal;
    };

    var nodeListForEach = function (list,callback) {
        for (var i = 0; i < list.length; i++) {
            callback(list[i],i);
        }
    };

    return {
        getInput: function() {
            return {
                type: document.querySelector(DOMStrings.inputType).value,
                description: document.querySelector(DOMStrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMStrings.inputValue).value),
            };
        },

        getDOMStrings: function() {
            return DOMStrings;
        },

        addListItem: function(obj, type) {
            var html, newHtml, element;
            //cria a String HTML com placeholder
            // valores em %
            if (type === 'inc') {
                element = DOMStrings.incomeContainer;
                html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div>' +
                    '<div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete">' +
                    '<button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';

            } else if (type === 'exp') {
                element = DOMStrings.expensesContainer;
                html = '<div class="item clearfix" id="exp-%id%">'+
                    '<div class="item__description">%description%</div>'+
                    '<div class="right clearfix">'+
                        '<div class="item__value">%value%</div>'+
                        '<div class="item__percentage"></div>'+
                        '<div class="item__delete">'+
                            '<button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>'+
                        '</div>'+
                    '</div>'+
                '</div>';

            }
            //substitui o placeholder como conteudo dinamico
            newHtml = html.replace('%id%', obj.id)
                .replace('%description%', obj.description)
                .replace('%value%', formatNumber(obj.value,type));

            //insere o HTML no DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },
        removeItemList: function(selectorID) {
            var element = document.getElementById(selectorID);
            element.parentNode.removeChild(element);
        },
        clearFields: function() {
            var fields, fieldsArray;
            //retorna uma lista
            fields = document.querySelectorAll(DOMStrings.inputDescription + ', ' + DOMStrings.inputValue);
            //converte a lista em array usando prototype e call
            // o metodo slice pertence apenas a arrays
            fieldsArray = Array.prototype.slice.call(fields);

            fieldsArray.forEach(function(current, index, array) {
                current.value = "";
            });

            fieldsArray[0].focus();

        },
        displayBudget: function(obj) {

            var type = obj.budget > 0 ? 'inc' : 'exp';

            document.querySelector(DOMStrings.budgetLabel).textContent = formatNumber(obj.budget,type);
            document.querySelector(DOMStrings.incomeLabel).textContent = formatNumber(obj.totalIncome,'inc');
            document.querySelector(DOMStrings.expensesLabel).textContent = formatNumber(obj.totalExpenses,'exp');

            if (obj.percentage > 0) {
                document.querySelector(DOMStrings.percentageLabel).textContent = obj.percentage +'%';

            } else {
                document.querySelector(DOMStrings.percentageLabel).textContent = '---';

            }

        },
        displayPercentages:function (percentages) {
            var fields = document.querySelectorAll(DOMStrings.expensesPercetageLabel);

            nodeListForEach(fields,function (current,index) {
                if (percentages[index] > 0) {
                    current.textContent = percentages[index] + '%';
                } else {
                    current.textContent = '---';
                }
            });

        },
        displayMonth: function () {
            var now = new Date();
            var months = ['Janeiro', 'Fevereiro','Março'+'Abril'+'Maio'+'Junho'+
                            'Julho'+'Agosto'+'Setembro'+ 'Outubro'+'Novembro'+'Dezembro'];
            var month = now.getMonth();
            var year = now.getFullYear();
            document.querySelector(DOMStrings.dateLabel).textContent = months[month]+'-'+year;

        },
        changeType : function () {
            var fields = document.querySelectorAll(
                DOMStrings.inputType+','+
                DOMStrings.inputDescription+','+
                DOMStrings.inputValue);

                nodeListForEach(fields,function (current) {
                    current.classList.toggle('red-focus');
                });

                document.querySelector(DOMStrings.inputBtn).classList.toggle('red');
        }

    };

}());

// controller global
var appController = (function(budgetCtrl, uiCtrl) {

    var setUpEventListeners = function() {
        var DOMStrings = uiCtrl.getDOMStrings();
        //adiciona o evento quando  o botao for clicado
        document.querySelector(DOMStrings.inputBtn).addEventListener('click', addNewItem);
        //adiciona um evento global para qualquer tecla pressionada
        //porem queremos escutar apenas a tecla addEventListener
        // que possui codigo 13
        // referencia maneira http://keycodes.atjayjo.com/
        document.addEventListener('keyPress', function(event) {
            var enterCode = 13;
            if (event.keyCode === enterCode || event.which === enterCode) {
                addNewItem();
            }

        });

        document.querySelector(DOMStrings.container).addEventListener('click', deleteItem);

        document.querySelector(DOMStrings.inputType).addEventListener('change',uiCtrl.changeType);
    };

    var addNewItem = function() {
        var input, newItem;
        //1- pega o valor digitado
        input = uiCtrl.getInput();
        if (input.description !== "" && !Number.isNaN(input.value) && input.value > 0) {
            //2-adicionar o item ao budgetController
            newItem = budgetCtrl.addItem(input.type, input.description, input.value);
            //3-adicionar o item a tela
            uiCtrl.addListItem(newItem, input.type);
            //4-limpar campos
            uiCtrl.clearFields();
            //5-calcular budget
            updateBudget();
            //6- calcular e atualizar porcentagens
            updatePercentages();
        }
    };

    var deleteItem = function(event) {
        var htmlElement, itemElement, type, id;
        //hardcoded - target mostra o elemento
        // parent node sobe na arvore de elementos
        htmlElement = event.target.parentNode.parentNode.parentNode.parentNode.id;
        if (htmlElement) {
            itemElement = htmlElement.split('-');
            type = itemElement[0];
            id = parseInt(itemElement[1]);
            // deletar o htmlElement da lista de dados
            budgetCtrl.deleteItem(type, id);
            //deletar o item da interface de usuario
            uiCtrl.removeItemList(htmlElement);
            //atualizar e exibir a lista de budget
            updateBudget();
            //calcular e atualizar porcentagens
            updatePercentages();
        }

    };

    var updateBudget = function() {
        //1-calcular o 'budget'
        budgetCtrl.calculateBudget();
        //2-retornar o budget
        var budget = budgetCtrl.getBudget();
        //3- exibir o 'budget' na tela
        uiCtrl.displayBudget(budget);
    };

    var updatePercentages = function() {
        // calcula as porcentagens
        budgetCtrl.calculatePercentages();
        //lê do budget uiController
        var percentages = budgetCtrl.getPercentages();
        //atualiza a tela com a nova porcentagem
        uiCtrl.displayPercentages(percentages);
        console.log(percentages);
    };

    return {
        initialize: function() {
            setUpEventListeners();
            uiCtrl.displayBudget({
                budget: 0,
                totalIncome: 0,
                totalExpenses: 0,
                percentage: 0
            });
            uiCtrl.displayMonth();
        }
    };

}(budgetController, uiController));

//inicia a aplicacao
appController.initialize();
