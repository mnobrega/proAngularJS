angular.module("cap11",["cap11.controllers","cap11.directives"]);

angular.module("cap11.controllers",[])
    .controller("getCap11BaseCtrl", function($scope) {
        $scope.todos = [
            {action: "Get groceries", complete: false},
            {action: "Call plumber", complete:false},
            {action: "Buy running shoes", complete:true},
            {action: "Buy flowers",complete:false},
            {action: "Call family",complete:false}
        ];

        $scope.buttonNames = ["Red","Green","Blue"];

        $scope.settings = {
            Rows: "Red",
            Columns: "Green"
        };

        $scope.data = {
            rowColor: "Blue",
            columnColor: "Green"
        };

        $scope.handleEvent = function(e) {
            //console.log("Event type: " + e.type);
            $scope.data.columnColor = (e.type == "mouseenter"?"Green":"Blue");
            //console.log($scope.data.columnColor);
        }

        $scope.message = "Tap me!";

        $scope.dataValue = false;
        $scope.dataText = "";
    });

angular.module("cap11.directives",[])
    .directive("tap",function() {
        return function(scope, elem, attrs) {
            console.log(elem);
            elem.on("touchstart touchend", function() {
                console.log(hello);
                scope.$apply(attrs["tap"]);
            })
        }
    });