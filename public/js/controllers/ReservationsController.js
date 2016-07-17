// Paula Molinero (2016)
// Reservations controller.

'use strict';

angular.module('myApp.ReservationsController', [])
    .controller(
        'ReservationsController',
        ['$http', '$scope', function($http, $scope) {

        var vm = this;

        vm.errorFound = false;
        vm.errorText = '';

        // Format date
        $scope.formatDate = function(date){
            return new Date(date);
        };

        // Update booking - checked-in status
        vm.toggleStatus = function(id) {
            $http.put('/api/booking/edit/' + id)
                .success(function (data) {
                    vm.checkedInStatus = (status!==true);
                })
                .error(function (data) {
                    console.log('Error: ', data);
                });
        };

        // Deleting booking
        vm.deleteBooking = function(id, key) {
            var bookingRow = angular.element( document.querySelector( '#booking' + key ) );
            bookingRow.empty();

            $http.delete('/api/booking/delete/' + id)
                .success(function (data) {
                    vm.checkedInStatus = (status!==true);
                })
                .error(function (data) {
                    console.log('Error: ', data);
                });
        };

        // Listing bookings
        $http.get('/api/booking/list')
            .success(function(data) {
                vm.reservations = data;
            })
            .error(function(data) {
                console.log('Error: ' + data);
                vm.errorFound = true;
                vm.errorText = 'Oops! Either there is no data saved or something went wrong, so sorry... (' + data + ')'
            });

        return vm;
    }]
);
