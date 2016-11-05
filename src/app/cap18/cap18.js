var baseLogger = function() {
    this.messageCount = 0;
    this.log = function(msg) {
        console.log(this.msgType + ": " + (this.messageCount++) + " " + msg);
    }
};

var debugLogger = function() {};
debugLogger.prototype = new baseLogger();
debugLogger.prototype.msgType = "Debug";

var errorLogger = function() {};
errorLogger.prototype = new baseLogger();
errorLogger.prototype.msgType = "Error";

angular.module("cap18",["cap18.controllers","cap18.directives","cap18.services"])

angular.module("cap18.controllers",[])
    .controller("cap18Ctrl1", function ($scope, errorLogService) {
        $scope.data = {
            cities: ["London","New York","Paris","Lisbon"],
            totalClicks: 0
        };
        $scope.$watch('data.totalClicks', function (newVal) {
            errorLogService.log("Total click count: " + newVal);
        });
    });

angular.module("cap18.directives",[])
    .directive ("multiButtonFactory", function(logService) {
        return {
            scope: {counter:"=counter"},
            link: function(scope, element, attrs) {
                element.on("click", function(event) {
                    logService.log("Factory Button Click: " + event.target.innerText);
                    scope.$apply(function(){
                        scope.counter++;
                    })
                })
            }
        }
    })
    .directive ("multiButtonProvider", function(logServiceProvider) {
       return {
           scope: { counter: "=counter"},
           link: function(scope, element, attrs) {
               element.on("click", function(event) {
                   logServiceProvider.log("Button click: " + event.target.innerText);
                   scope.$apply(function() {
                       scope.counter++;
                   })
               })
           }
       }
    });

angular.module("cap18.services",[])
    //PROVIDER method
    .provider("logServiceProvider", function() {
        var counter = true;
        var debug = true;
        return {
            $get: function() {
                return {
                    messageCount : 0,
                    log: function(msg){
                        if (debug) {
                            console.log("(Provider LOG"
                                + (counter ? " + " + this.messageCount++ + ") " : ") ")
                                + msg);
                        }
                    }
                };
            },
            messageCounterEnabled: function(setting) {
                if (angular.isDefined(setting)) {
                    counter = setting;
                    return this;
                } else {
                    return counter;
                }
            },
            debugEnabled: function (setting) {
                if (angular.isDefined(setting)) {
                    debug = setting;
                    return this;
                } else {
                    return debug;
                }
            }
        }
    })

    //SERVICE method
    .service("debugLogService",debugLogger)
    .service("errorLogService",errorLogger)

    //FACTORY method
    .factory("logService", function() {
       var messageCount = 0;
        return {
            log: function (msg) {
                console.log("(LOG +" + messageCount++ +") " + msg);
            }
        }
    });