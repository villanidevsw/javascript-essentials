// implementar o module pattern em javascript
//IIFE + closures
var budgetController = (function(){
    //dados privados
    var number = 23;

    var add = function(aValue){
        return number + aValue;
    };
    //dados publicos que serao acessados
    return {
        publicTest: function(value){
            var result = add(value);
            return result;
        }
    };

})();

var uiController = (function() {


}());

var appController = (function(budgetCtrl,uiContrl) {

    sum = budgetCtrl.publicTest(5);

    return{
        anotherPublic:function(){
            console.log(sum);
        }
    };

}(budgetController,uiController));
