angular.module("cap10",["cap10.controllers"]);

angular.module("cap10.controllers",[])
     .controller("defaultCtrl", function($scope) {
         $scope.todos = [
             {action: "Get groceries", complete: false},
             {action: "Call plumber", complete:false},
             {action: "Buy running shoes", complete:true},
             {action: "Buy flowers",complete:false},
             {action: "Call family",complete:false}
         ];
    });