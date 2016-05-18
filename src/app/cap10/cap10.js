angular.module("cap10",["cap10.controllers"]);

angular.module("cap10.controllers",[])
     .controller("defaultCtrl", function($scope) {

         $scope.showList = false;
         $scope.data = {};

         $scope.radioOptions = ['None','Table','List'];

         $scope.todos = [
             {action: "Get groceries", complete: false},
             {action: "Call plumber", complete:false},
             {action: "Buy running shoes", complete:true},
             {action: "Buy flowers",complete:false},
             {action: "Call family",complete:false}
         ];

         $scope.viewFile = function() {
             return $scope.showList ? "app/cap10/cap10.todosList.tpl.html":"app/cap10/cap10.todosListV2.tpl.html";
         }

         $scope.reportChange = function() {
             console.log("Displayed content: "+$scope.viewFile());
         }
    });