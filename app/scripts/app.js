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
    'angularSpinner'
  ])
  .config(function ($urlRouterProvider, $stateProvider) {
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
