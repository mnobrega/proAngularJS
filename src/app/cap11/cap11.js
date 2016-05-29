angular.module("cap11",["cap11.controllers"]);

angular.module("cap11.controllers",[])
    .controller("getCap11BaseCtrl", function($scope) {
        $scope.todos = [
            {action: "Get groceries", complete: false},
            {action: "Call plumber", complete:false},
            {action: "Buy running shoes", complete:true},
            {action: "Buy flowers",complete:false},
            {action: "Call family",complete:false}
        ];

        console.log($scope.todos);
    });