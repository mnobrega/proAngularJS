angular.module("cap15",["cap15.controllers"]);

angular.module("cap15.controllers",[])
    .controller("cap15Ctrl1", function($scope){
        $scope.products = [
            {name:"Apples",category:"Fruit",price:1.20,expiry:10},
            {name:"Bananas",category:"Fruit",price:2.42, expiry:7},
            {name:"Pears",category:"Fruit",price:2.02, expiry:6}
        ];

        $scope.incrementPrices = function() {
            for (var i = 0; i < $scope.products.length; i++) {
                $scope.products[i].price++;
            }
        }
    });