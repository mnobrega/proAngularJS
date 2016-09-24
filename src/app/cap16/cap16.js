angular.module("cap16",["cap16.controllers","cap16.directives"]);

angular.module("cap16.controllers",[])
    .controller("cap16Ctrl5", function($scope) {
        $scope.data = {name:"Marcio"};
    })
    .controller("cap16Ctrl4", function($scope) {
        $scope.data = {name: "Adam"};
        $scope.city = "London";
    })
    .controller("cap16Ctrl2", function($scope) {
        //do nothing
    })
    .controller("cap16Ctrl3", function($scope) {
        //do hothing
    })
    .controller("cap16Ctrl1", function($scope) {
        $scope.products = [
            {name:"Apples",category:"Fruit",price:1.20,expiry:10},
            {name:"Bananas",category:"Fruit",price:2.42, expiry:7},
            {name:"Pears",category:"Fruit",price:2.02, expiry:6}
        ];
    });

angular.module("cap16.directives",[])
    .directive("scopeDemo2IsolatedTwoWay", function() {
        return {
            template: function() {
                return angular.element(document.querySelector("scopeTemplate2WayBinding")).html();
            },
            scope: {
                local: "=nameprop"
            }
        }
    })
    .directive("scopeDemo2IsolatedBinding", function() {
        return {
            template: function() {
                return angular.element(document.querySelector("#scopeTemplateBinding")).html();
            },
            scope : {
                local: "@nameprop"
            }
        }
    })
    .directive("scopeDemo2Isolated", function() {
        return {
            template: function() {
                return angular.element(document.querySelector("#scopeTemplate")).html();
            },
            scope: {}
        }
    })
    .directive("scopeDemo2", function() {
        return {
            template : function() {
                return angular.element(document.querySelector("#scopeTemplate")).html();
            },
            scope: true
        }
    })
    .directive("scopeDemoWithScope", function() {
        return {
            template: "<div class='panel-body'>NameWithScope: <input ng-model=name /></div>",
            scope: true
        }
    })
    .directive("scopeDemo", function() {
        return {
            template: "<div class='panel-body'>Name: <input ng-model=name /></div>"
        }
    });
