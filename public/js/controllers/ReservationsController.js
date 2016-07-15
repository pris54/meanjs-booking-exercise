// Paula Molinero (2016)
// Reservations controller.

'use strict';

angular.module('myApp.ReservationsController', [])
    .controller(
        'ReservationsController',
        ['$http', '$location', '$scope', function($http, $filter, $scope) {

        var vm = this;

        vm.errorFound = false;
        vm.errorText = '';
        vm.checkedInStatus = '?';

        // Format date
        $scope.formatDate = function(date){
            return new Date(date);
        };

        vm.toggleStatus = function(id) {
            $http.put('/api/booking/edit/' + id)
                .success(function (data) {
                    console.log('DATA!', data);
                    console.log('CheckedIn', data.checkedIn);
                    vm.checkedInStatus = (status!==true);
                    return 'oh';
                })
                .error(function (data) {
                    console.log('ERROR', data);
                });
        };

        // List bookings
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
