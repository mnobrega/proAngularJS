angular.module("inspinia")
    .constant("dataUrl","http://localhost:2403/products")
    .constant("orderUrl","http://localhost:2403/orders")
    .constant("productListActiveClass","btn-primary")
    .constant("productListInactiveClass","btn-default")
    .constant("productListPageCount",3)
    .controller("ProductsCtrl", function($scope, $http, $location, dataUrl, orderUrl, cart){

        $scope.data = {};

        $http.get(dataUrl)
            .success(function(data){
                $scope.data.products = data;
            })
            .error(function(error) {
                $scope.data.error = error;
            });

        $scope.sendOrder = function(shippingDetails) {
            var order = angular.copy(shippingDetails);
            order.products = cart.getProducts();
            $http.post(orderUrl,order)
                .success(function(data) {
                    $scope.data.orderId = data.id;
                    cart.getProducts().length = 0;
                })
                .error(function(error) {
                    $scope.data.ordererror =error;
                })
                .finally(function(){
                    $location.path("#/index/products/complete");
                });
        };
    })
    .controller("ProductsListCtrl", function($scope, $filter, productListActiveClass, productListInactiveClass, productListPageCount, cart) {
        var selectedCategory = null;

        $scope.selectedPage = 1;
        $scope.pageSize = productListPageCount;
        $scope.checkoutUrl = '#/index/products/checkout';

        $scope.selectCategory = function(newCategory){
            selectedCategory = newCategory;
            $scope.selectedPage =1;
        };

        $scope.selectPage = function(newPage) {
            $scope.selectedPage = newPage;
        }

        $scope.categoryFilterFn = function(product) {
            return selectedCategory == null || product.category == selectedCategory;
        };

        $scope.getCategoryClass = function(category) {
            return selectedCategory == category ? productListActiveClass : productListInactiveClass;
        }

        $scope.getPageClass = function(page) {
            return $scope.selectedPage == page? productListActiveClass:productListInactiveClass;
        }

        $scope.addProductToCart = function(product) {
            cart.addProduct(product.id, product.name, product.price);
        }
    })
    .controller("cartSummaryController", function($scope, cart) {
        $scope.cartData = cart.getProducts();
        $scope.total = function () {
            var total = 0;
            for (var i=0; i<$scope.cartData.length; i++) {
                total += ($scope.cartData[i].price*$scope.cartData[i].count)
            }
            return total;
        }

        $scope.remove = function (id) {
            cart.removeProduct(id);
        }
    });