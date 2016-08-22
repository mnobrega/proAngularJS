angular.module("cap13",["cap13.controllers"]);

angular.module("cap13.controllers",["cap13.services"])
    .controller("topLevelCtrl", function($scope) {

        $scope.data = {
            dataValue: "Hello, Adam"
        };

        $scope.reverseText = function() {
            $scope.data.dataValue = $scope.data.dataValue.split("").reverse().join("");
        };

        $scope.changeCase = function() {
            var result = [];
            angular.forEach($scope.data.dataValue.split(""),function(char, index) {
                result.push(index % 2 == 1
                    ? char.toString().toUpperCase() : char.toString().toLowerCase());
            });
            $scope.data.dataValue = result.join("");
        };
    })
    .controller("firstChildCtrl", function($scope) {
        $scope.changeCase = function() {
            $scope.data.dataValue = $scope.data.dataValue.toUpperCase();
        };
    })
    .controller("secondChildCtrl", function($scope) {
        $scope.changeCase = function() {
            $scope.data.dataValue = $scope.data.dataValue.toLowerCase();
        };

        $scope.shiftFour = function () {
            var result = [];
            angular.forEach($scope.data.dataValue.split(""), function(char, index) {
                result.push(index < 4 ? char.toUpperCase():char);
            });
            $scope.data.dataValue = result.join("");
        };
    })
    .controller("simpleCtrl", function($scope){
        $scope.cities = ["London","New York","Paris"];

        $scope.city = "London";

        $scope.getCountry = function(city) {
            switch(city){
                case "London":
                    return "UK";
                case "New York":
                    return "USA";
            }
        };
    })
    .controller("secondCtrl", function($scope) {
        $scope.addresses = {};

        $scope.setAddress = function (type, zip) {
            console.log("Type: " + type + " " + zip);
            $scope.addresses[type] = zip;
        };

        $scope.copyAddress = function() {
            $scope.shippingZip = $scope.billingZip;
        };
    })
    .controller("reusedController", function($scope, ZipCodes) {
        $scope.$on("zipCodeUpdated", function(event, args) {
            $scope[args.type] = args.zipCode;
            console.log(args);
            console.log($scope[args.type]);
        });

        $scope.setAddress = function (type, zip) {
            console.log("Type: " + type + " " + zip);
            ZipCodes.setZipCode(type,zip);
        };

        $scope.copyAddress = function() {
            console.log($scope.billingZip2);
            $scope.shippingZip2 = $scope.billingZip2;
        };
    });

angular.module("cap13.services",[])
    .service("ZipCodes", function($rootScope) {
        return {
            setZipCode: function(type, zip) {
                this[type] = zip;
                $rootScope.$broadcast("zipCodeUpdated", {
                    type: type, zipCode: zip
                })
            }
        }
    });