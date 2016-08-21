angular.module("cap12",["cap12.controllers"]);

angular.module("cap12.controllers",[])
    .controller("controller1", function($scope){
        $scope.todos = [
            {action: "Get groceries", complete: false},
            {action: "Call plumber", complete:false},
            {action: "Buy running shoes", complete:true},
            {action: "Buy flowers",complete:false},
            {action: "Call family",complete:false}
        ];

        $scope.selectOptions = [
            {id:100, action:"Get Groceries", complete:false},
            {id:200, action:"Call plumber", complete:false},
            {id:300, action:"Buy running shoes",complete:true}
        ];

        $scope.selectOptions2 = [
            {id:100, place:"Store",action:"Get groceries",complete:false},
            {id:200, place:"Home",action:"Call plumber",complete:false},
            {id:300, place:"Store",action:"Buy running shoes",complete:true}
        ];

        $scope.addNewItem = function(newItem) {
            if (angular.isDefined(newItem) && angular.isDefined(newItem.action)
                    && angular.isDefined(newItem.location)) {
                $scope.todos.push({
                    action : newItem.action + " ("+newItem.location+")",
                    complete : false
                });
            }
        };

        $scope.addUser = function(userDetails) {
            $scope.message = userDetails.name + " ("+userDetails.email+") ("+userDetails.agreed+")";
        };

        $scope.addUserWithValidation = function(userDetails) {
            if ($scope.chap12Form2.$valid) {
                $scope.message = userDetails.name + " ("+userDetails.email+") ("+userDetails.agreed+")";
            } else {
                $scope.showValidation = true;
            }
        }

        $scope.message = "Ready";

        $scope.getError = function (error) {
            if (angular.isDefined(error)) {
                if (error.required) {
                    return "Please enter a value";
                } else if (error.email) {
                    return "Please enter a valid email address";
                }
            }
        }

        $scope.requireValue = true;
        $scope.matchPattern = new RegExp("^[a-z]");
    });