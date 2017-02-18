angular.module("hotelApp", ['ngRoute'])
    .filter('ageFilter', function () {
      function calculateAge (dateOfBirth) {
        var date = new Date(dateOfBirth);
        var diff = Date.now() - date.getTime();
        var ageDate = new Date(diff);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
      }
      return function (dateOfBirth) {
        return calculateAge(dateOfBirth);
      };
    })
    .config(function($routeProvider) {
        $routeProvider
            .when("/", {
                controller: "ListController",
                templateUrl: "list.html"
            })
            .when("/complete", {
                controller: "CompleteRegisteredService",
                templateUrl: "complete.html"
            })
            .otherwise({
                redirectTo: "/"
            })
    })
    .service("RegisteredServices", function($http) {
        this.getRegisteredServices = function() {
            return $http.get("api/registeredService").
                then(function(response) {
                    return response;
                }, function(response) {
                    alert("Error finding services.");
                });
        }
        this.markRegisteredServiceComplete = function( registeredService) {
            var url = "api/registeredService/complete";
            return $http.post(url,registeredService).
                then(function(response) {
                    return response;
                }, function(response) {
                    alert("Error");
                    console.log(response);
                });
        }
    })
    .controller("ListController", function( $scope, RegisteredServices) {
        RegisteredServices.getRegisteredServices().then(function(doc) {
            $scope.headers = ["Time", "Type", "Room", "Service", "Customer", "Actions"];
            $scope.registeredServices = doc.data;
        }, function(response) {
            alert(response);
        });
    })
    .controller("CompleteRegisteredService", function($scope, $location, RegisteredServices) {
        $scope.header="Mark RegisteredServices as Complete ";

        $scope.back = function() {
            $location.path("#/");
        }

        $scope.markComplete = function(registeredService) {
            RegisteredServices.markRegisteredServiceComplete(registeredService).then(function() {
                $location.path("#/");
            }, function(response) {
                alert(response);
            });
        }
    })
