angular.module("cap19",["cap19.controllers"]);

angular.module("cap19.controllers",[])
    .controller("cap19Ctrl4", function($scope, $location) {
        $scope.$on("$locationChangeSuccess", function(event, newUrl) {
            $scope.url = newUrl;
        });

        $scope.setUrl = function(component) {
            switch (component) {
                case "reset":
                    $location.hash("");
                    $location.search("");
                    break;
                case "path":
                    $location.path("/index/cap18");
                    break;
                case "hash":
                    $location.hash("north");
                    break;
                case "search":
                    $location.search("select","hotels");
                    break;
                case "url":
                    $location.url("/index/cap19?select=hotels#north");
                    break;
            }
        }
    })
    .controller("cap19Ctrl3", function($scope, $interval) {
        $interval(function() {
            $scope.time = new Date().toTimeString();
        },2000);
    })
    .controller("cap19Ctrl2", function($scope, $window, $document) {
        $document.find("button#cap19Ctrl2Button").on("click", function(event) {
            $window.alert("cap19Ctrl2 msg: " + event.target.innerText);
        });
    })
    .controller("cap19Ctrl1", function($scope, $window) {
        $scope.displayAlert = function(msg) {
            $window.alert("cap19Ctrl1 msg: " + msg);
        };
    });