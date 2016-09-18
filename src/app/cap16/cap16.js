angular.module("cap16",["cap16.controllers","cap16.directives"]);

angular.module("cap16.controllers",[])
    .controller("cap16Ctrl1", function($scope) {
        $scope.products = [
            {name:"Apples",category:"Fruit",price:1.20,expiry:10},
            {name:"Bananas",category:"Fruit",price:2.42, expiry:7},
            {name:"Pears",category:"Fruit",price:2.02, expiry:6}
        ];
    });

angular.module("cap16.directives",[]);
