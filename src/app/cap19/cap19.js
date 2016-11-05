angular.module("cap19",["cap19.controllers"]);

angular.module("cap19.controllers",[])
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