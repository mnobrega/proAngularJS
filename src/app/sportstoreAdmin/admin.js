angular.module("inspinia")
    .constant("authUrl","http://localhost:2403/users/login")
    .constant("ordersUrl","http://localhost:2403/orders")
    .constant("productUrl","http://localhost:2403/products/")
    .config(function($httpProvider) {
        $httpProvider.defaults.withCredentials = true;
    })
    .controller("authCtrl", function($scope, $http, $location, authUrl) {

        $scope.authenticate = function(user, pass) {
            $http.post(authUrl, {
                username: user,
                password: pass
            },{
                withCredentials: true
            }).success(function() {
                $location.path("/index/main");
            }).error(function(error) {
                $scope.authenticationError=error;
            })
        }
    })
    .controller("ordersCtrl",function($scope,$http, ordersUrl) {

        $http.get(ordersUrl, {withCredentials:true})
            .success(function(data) {
                $scope.orders = data;
            })
            .error(function(error) {
                $scope.error = error;
            });

        $scope.selectedOrder = null;

        $scope.selectOrder = function(order) {
            $scope.selectedOrder = order;
        };

        $scope.calcTotal = function(order) {
            var total = 0;
            for ( var i = 0; i<order.products.length;i++) {
                total += order.products[i].count * order.products[i].price;
            }
            return total;
        }
    })
    .controller("productsCtrl",function($scope, $resource, productUrl) {

        $scope.productsResource = $resource(productUrl+":id",{id:"@id"});

        $scope.createProduct = function(product) {
            new $scope.productsResource(product).$save().then(function(newProduct) {
                $scope.products.push(newProduct);
                $scope.editProduct = null;
            });
        };

        $scope.listProducts = function() {
            $scope.products = $scope.productsResource.query();
        };

        $scope.updateProduct = function(product) {
            product.save();
            $scope.editProduct = null;
        };

        $scope.deleteProduct = function(product) {
            product.$delete().then(function() {
                $scope.products.splice($scope.products.indexOf(product),1);
            });
        };

        $scope.startEdit = function(product) {

        };

        $scope.cancelEdit = function() {

        };

        $scope.listProducts();

    });
