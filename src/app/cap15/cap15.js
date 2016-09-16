angular.module("cap15",["cap15.controllers","cap15.directives"]);

angular.module("cap15.directives",[])
    .directive('demoDirectiveChap152', function() {
        return function(scope, element, attrs) {
            var listElem = angular.element("<ol>");
            element.append(listElem);
            for (var i = 0; i < scope.names.length; i++) {
                listElem.append(angular.element("<li>")
                    .append(angular.element("<span>").text(scope.names[i])));
            }

            var buttons = element.find("button");
            buttons.on("click",function(e) {
               element.find("li").toggleClass("chap15Bold");
            });
        };
    })
    .directive('demoDirectiveChap15', function(){
        return function (scope, element, attrs) {
            var items = element.find("li");

            items.css("color","red");

            for (var i=0; i<items.length;i++){
                if (items.eq(i).text() == "Oranges") {
                    items.eq(i).css("font-weight","bold");
                } else {
                    items.eq(i).css("font-weight","normal");
                }
            }

            console.log("Element count:" + items.length);
            console.log("Font: " + items.css("font-weight"));
        };
    });

angular.module("cap15.controllers",[])
    .controller("cap15Ctrl2", function($scope) {
        $scope.names = ["Apples","Bananas","Oranges"];
    })
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