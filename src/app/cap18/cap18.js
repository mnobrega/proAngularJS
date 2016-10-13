angular.module("cap18",["cap18.controllers","cap18.directives"]);

angular.module("cap18.controllers",[])
    .controller("cap18Ctrl1", function ($scope) {
        $scope.data = {
            cities: ["London","New York","Paris"],
            totalClicks: 0
        };

        $scope.$watch('data.totalClicks', function (newVal) {
            console.log("Total click count: " + newVal);
        });
    });

angular.module("cap18.directives",[])
    .directive ("triButton", function() {
       return {
           scope: { counter: "=counter"},
           link: function(scope, element, attrs) {
               element.on("click", function(event) {
                   console.log("Button click: " + event.target.innerText);
                   scope.$apply(function() {
                       scope.counter++;
                   })
               })
           }
       }
    });