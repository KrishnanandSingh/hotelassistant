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
            .when("/registeredService/:id", {
                controller: "CompleteRegisteredService",
                templateUrl: "completeRegisteredService.html"
            })
            .when("/booking", {
                controller: "BookingList",
                templateUrl: "bookingList.html"
            })
            .when("/booking/:id", {
                controller: "CompleteBooking",
                templateUrl: "completeBooking.html"
            })
            .otherwise({
                redirectTo: "/registeredService"
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
        this.getRegisteredService = function(registeredServiceId) {
            return $http.get("api/registeredService/"+registeredServiceId).
                then(function(response) {
                    return response;
                }, function(response) {
                    alert("Error finding service");
                });
        }
        this.markRegisteredServiceComplete = function(registeredService) {
            var url = "api/registeredService/"+registeredService._id+"/complete";
            return $http.put(url,registeredService).
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
        this.getBooking = function(bookingId) {
            return $http.get("api/booking/"+bookingId).
                then(function(response) {
                    return response;
                }, function(response) {
                    alert("Error finding booking");
                });
        }
        this.markBookingComplete = function( booking) {
            var url = "api/booking/"+booking._id+"/complete";
            return $http.put(url,booking).
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
    .controller("CompleteRegisteredService", function($scope, $location,$routeParams, RegisteredService) {
        RegisteredService.getRegisteredService($routeParams.id).then(function(doc) {
          $scope.header="Mark RegisteredServices as Complete";
          $scope.registeredService = doc.data;
        });

        $scope.back = function() {
            $location.path("#/registeredService");
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
    .controller("CompleteBooking", function($scope, $location,$routeParams, Booking) {
        Booking.getBooking($routeParams.id).then(function(doc) {
          $scope.booking = doc.data;
          $scope.header="Mark Booking as Complete";
        });

        $scope.back = function() {
            $location.path("booking");
        }

        $scope.markComplete = function(booking) {
            Booking.markBookingComplete(booking).then(function() {
                $location.path("booking");
            }, function(response) {
                alert(response);
            });
        }
    })
