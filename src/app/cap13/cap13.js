angular.module("cap13",["cap13.controllers"]);

angular.module("cap13.controllers",["cap13.services"])
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
            console.log($scope.shippingZip);
            $scope.shippingZip = $scope.billingZip;
            console.log($scope.shippingZip);
        };
    })
    .controller("reusedController", function($scope, $rootScope) {
        $scope.$on("zipCodeUpdated", function(event, args) {
            $scope[args.type] = args.zipCode;
        });

        $scope.setAddress = function (type, zip) {
            ZipCodes.setZipCode(type,zip);
            console.log("Type: " + type + " " + zip);
        };

        $scope.copyAddress = function() {
            $scope.zip = $scope.billingZip;
            console.log($scope.shippingZip);
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