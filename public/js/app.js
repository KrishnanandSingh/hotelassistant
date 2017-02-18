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
            .when("/registeredService", {
                controller: "RegisteredServiceList",
                templateUrl: "registeredServiceList.html"
            })
            .when("/registeredService/complete", {
                controller: "CompleteRegisteredService",
                templateUrl: "completeRegisteredService.html"
            })
            .when("/booking", {
                controller: "BookingList",
                templateUrl: "bookingList.html"
            })
            .when("/booking/complete", {
                controller: "CompleteBooking",
                templateUrl: "CompleteBooking.html"
            })
            .otherwise({
                redirectTo: "/"
            })
    })
    .service("RegisteredService", function($http) {
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
    .service("Booking", function($http) {
        this.getBookings = function() {
            return $http.get("api/booking").
                then(function(response) {
                    return response;
                }, function(response) {
                    alert("Error finding bookings.");
                });
        }
        this.markBookingComplete = function( booking) {
            var url = "api/booking/complete";
            return $http.post(url,booking).
                then(function(response) {
                    return response;
                }, function(response) {
                    alert("Error");
                    console.log(response);
                });
        }
    })
    .controller("RegisteredServiceList", function( $scope, RegisteredService) {
        RegisteredService.getRegisteredServices().then(function(doc) {
            $scope.headers = ["Service","Comment","Room", "Actions"];
            $scope.registeredServices = doc.data;
        }, function(response) {
            alert(response);
        });
    })
    .controller("CompleteRegisteredService", function($scope, $location, RegisteredService) {
        $scope.header="Mark RegisteredServices as Complete ";
        $scope.back = function() {
            $location.path("#/");
        }
        $scope.markComplete = function(registeredService) {
            RegisteredService.markRegisteredServiceComplete(registeredService).then(function() {
                $location.path("#/registeredService");
            }, function(response) {
                alert(response);
            });
        }
    })
    .controller("BookingList", function( $scope, Booking) {
        Booking.getBookings().then(function(doc) {
            $scope.headers = ["Service", "Time", "Comment", "Customer", "Actions"];
            $scope.bookings = doc.data;
        }, function(response) {
            alert(response);
        });
    })
    .controller("CompleteBooking", function($scope, $location, Booking) {
        $scope.header="Mark Booking as Complete ";
        $scope.back = function() {
            $location.path("#/");
        }
        $scope.markComplete = function(booking) {
            Booking.markBookingComplete(booking).then(function() {
                $location.path("#/booking");
            }, function(response) {
                alert(response);
            });
        }
    })
