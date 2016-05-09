angular.module("inspinia")
    .controller("dayCtrl", function ($scope) {
        var dayNames = ["Sunday","Monday","Tuesday","Wednesday","Thrusday","Friday","Saturday"];
        $scope.day = dayNames[new Date().getDay()];
    })
    .controller("tomorrowCtrl", function($scope) {
        var dayNames = ["Sunday","Monday","Tuesday","Wednesday","Thrusday","Friday","Saturday"];
        $scope.day = dayNames[(new Date().getDay()+1)%7];
    });