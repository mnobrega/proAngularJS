angular.module("cap17",["cap17.controllers","cap17.directives"]);

angular.module("cap17.controllers",[])
    .controller("cap17Ctrl1", function($scope) {
        $scope.dataSource = "controller";
    })
    .controller("cap17Ctrl2", function($scope) {
        $scope.products = [
            {name: "Apples", price: 1.20},
            {name: "Bananas", price: 2.42},
            {name: "Pears", price: 2.02}
        ];

        $scope.changeData = function() {
            $scope.products.push({name: "Cherries", price: 4.02});
            for(var i = 0; i < $scope.products.length; i++) {
                $scope.products[i].price++;
            }
        }
    });

angular.module("cap17.directives",[])
    .directive("cap17Panel", function() {
        return {
            link: function(scope, element, attrs) {
                scope.dataSource = "directive";
            },
            restruct : "E", /* element */
            scope: true, /* false to disconnect the directive from the controller */
            template: function() {
                return angular.element(
                    document.querySelector("#cap17transclusion")).html();
            },
            transclude: true  /* false to not transclude */
        }
    });