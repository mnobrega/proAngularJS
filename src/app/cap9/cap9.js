var now = new Date();

angular.module("cap9",["cap9.controllers","cap9.services"])
    .constant("startTime",new Date().toLocaleTimeString())
    .config(function(startTime) {
        console.log("Main module config: "+startTime)
    })
    .run(function(startTime) {
        console.log("Main module run: "+startTime)
    });


angular.module("cap9.controllers",[])
    .controller("dayCtrl", function ($scope, days) {
        $scope.day = days.today;
    })
    .controller("tomorrowCtrl", function($scope, days) {
        $scope.day = days.tomorrow;
    });

angular.module("cap9.services",[])
    .value("nowValue",now)
    .service("days",function(nowValue) {
        this.today = nowValue.getDay();
        this.tomorrow = this.today + 1;
    });