// Paula Molinero (2015)

'use strict';

angular.module('myApp',
    ['ngSanitize',
     'ui.router',
     'myApp.ReservationsController',
     'myApp.BookingsController'
    ])

    // --- CONSTANTS ------------------------------------------------------- //

    // --- CONFIG ---------------------------------------------------------- //

    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('reservations', {
                url: '/reservations',
                templateUrl: 'views/reservations-page.html',
                controller: 'ReservationsController as rsvCtrl'
            });

        $stateProvider
            .state('booking', {
                url: '/bookings',
                templateUrl: 'views/bookings-form.html',
                controller: 'BookingsController as bkgCtrl'
            });

        $urlRouterProvider.otherwise('reservations');
    }])

    .run(['$rootScope', '$state', function($rootScope, $state){

        $rootScope.stateIsLoading = false;
        $rootScope.$on('$routeChangeStart', function() {
            $rootScope.stateIsLoading = true;
        });

        $rootScope.$on('$routeChangeSuccess', function() {
            $rootScope.stateIsLoading = false;
        });

        $rootScope.$on('$routeChangeError', function() {
            //catch error
        });

    }]);

