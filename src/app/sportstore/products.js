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
    })
    .constant("productListActiveClass","btn-primary")
    .constant("productListInactiveClass","btn-default")
    .constant("productListPageCount",3)
    .controller("ProductsListCtrl", function($scope, $filter, productListActiveClass, productListInactiveClass, productListPageCount) {
        var selectedCategory = null;

        $scope.selectedPage = 1;
        $scope.pageSize = productListPageCount;

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
    });