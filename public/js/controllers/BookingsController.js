// Paula Molinero (2016)
// Bookings controller.

'use strict';

angular.module('myApp.BookingsController', [])
    .controller(
        'BookingsController',
        ['$http', '$location', '$scope', function($http, $location, $scope) {

        var vm = this;

        vm.submitContact = submitContact;
        vm.resetForm = resetForm;
        vm.thankYouText = false;
        vm.bookingFormText = 'To book a table please complete the form below.';
        vm.user = { bookingDate : new Date() }; // Default to today

        function submitContact() {
            if ($scope.contact.$valid) {

                vm.user = {
                    name : $scope.contact['user.name'].$modelValue,
                    surname : $scope.contact['user.surname'].$modelValue,
                    bookingDate : $scope.contact['user.bookingDate'].$modelValue,
                    howMany : $scope.contact['user.howMany'].$modelValue,
                    email : $scope.contact['user.email'].$modelValue,
                    phone : $scope.contact['user.phone'].$modelValue
                };

                // Insert in MongoDB
                $http.post('/api/booking/create', vm.user)
                    .success(function(data) {
                        $scope.formData = {}; // clear the form so our user is ready to enter another
                        $scope.contacts = data;
                        console.log(data);
                    })
                    .error(function(data) {
                        console.log('Error: ' + data);
                    });

                resetForm(event);
                vm.thankYouText = true;
                vm.bookingFormText = 'Thank you, your booking request has been received.';
            }
        }

        function resetForm($event) {
            $event.preventDefault();
            $event.stopImmediatePropagation();

            vm.user = {
                name : '',
                surname : '',
                bookingDate : '',
                howMany : '',
                email : '',
                phone : ''
            };

            $scope.contact.$setPristine();
        }

        return vm;
    }]);
