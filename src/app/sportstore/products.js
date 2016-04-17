angular.module("inspinia")
    .constant("dataUrl","http://localhost:2403/products")
    .constant("productListActiveClass","btn-primary")
    .constant("productListInactiveClass","btn-default")
    .constant("productListPageCount",3)
    .controller("ProductsCtrl", function($scope, $http, dataUrl){
        //$scope.data = {
        //    products: [
        //        {name:"Product #1",description:"A Product", category:"Category #1", price:210},
        //        {name:"Product #2",description:"A Product", category:"Category #1", price:220},
        //        {name:"Product #3",description:"A Product", category:"Category #3", price:230},
        //        {name:"Product #4",description:"A Product", category:"Category #2", price:250}
        //    ]
        //}

        $scope.data = {};

        $http.get(dataUrl)
            .success(function(data){
                $scope.data.products = data;
            })
            .error(function(error) {
                $scope.data.error = error;
            });
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