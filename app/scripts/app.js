'use strict';

/**
 * @ngdoc overview
 * @name tickFinderUiApp
 * @description
 * # tickFinderUiApp
 *
 * Main module of the application.
 */
var tick = angular
  .module('tickFinderUiApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.router',
    'ui.bootstrap',
    'ui.bootstrap.fontawesome',
    'angularSpinner',
    'toastr',
    'ngTagsInput'
  ])
  .config(function ($urlRouterProvider, $stateProvider, toastrConfig) {

    angular.extend(toastrConfig, {
      autoDismiss: true,
      containerId: 'toast-container',
      maxOpened: 0,
      newestOnTop: true,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      preventOpenDuplicates: true,
      extendedTimeOut: 500,
      tapToDismiss: true,
      target: 'body'
    });

    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise('/login');

    $stateProvider
      .state('login', {
        url:'/login',
        templateUrl: 'views/login.html',
        controller: 'loginCtrl'
      })
      .state('main', {
        url:'/',
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      });
  });
