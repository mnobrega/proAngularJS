angular.module("cap21",["cap21.controllers","cap21.services"]);

angular.module("cap21.controllers",[])
    .controller("cap211Ctrl", function($scope) {

        $scope.displayMode = "list";
        $scope.currentProduct = null;


        $scope.createProduct = function(product) {
            $scope.products.push(product);
            $scope.displayMode = "list";
        };

        $scope.readProducts = function () {
            $scope.products = [
                {id:0, name:"Dummy",category:"Test",price:1.25},
                {id:1, name:"Dummy2", category:"Test",price:2.45}
            ];
        };

        $scope.updateProduct = function(product) {
            for(var i= 0; i <$scope.products.length ; i++) {
                if ($scope.products[i].id == product.id){
                    $scope.products[i] = product;
                    break;
                }
            }
            $scope.displayMode = "list"
        };

        $scope.deleteProduct = function(product) {
            $scope.products.splice($scope.products.indexOf(product),1);
        };


        //views
        $scope.editOrCreateProduct = function(product) {
            $scope.currentProduct = product ? angular.copy(product) : {};
            $scope.displayMode = "edit";
        };

        $scope.saveEdit = function(product) {
            if (angular.isDefined(product.id)) {
                $scope.updateProduct(product);
            } else {
                $scope.createProduct(product);
            }
        };

        $scope.cancelEdit = function() {
            $scope.currentProduct = {};
            $scope.displayMode = "list";
        };

        $scope.readProducts();

    });

angular.module("cap21.services",[]);