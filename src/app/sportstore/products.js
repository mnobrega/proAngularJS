angular.module("inspinia")
    .controller("ProductsCtrl", function($scope){
        $scope.data = {
            products: [
                {name:"Product #1",description:"A Product", category:"Category #1", price:210},
                {name:"Product #2",description:"A Product", category:"Category #1", price:220},
                {name:"Product #3",description:"A Product", category:"Category #3", price:230},
                {name:"Product #4",description:"A Product", category:"Category #2", price:250}
            ]
        }
    });