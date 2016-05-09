angular.module("inspinia")
    .filter ("dayName", function(){
        var dayNames = ["Sunday","Monday","Tuesday","Wednesday","Thrusday","Friday","Saturday"];
        return function(input){
            return angular.isNumber(input)?dayNames[input]:input;
        }
    });