'use strict';

/**
 * @ngdoc function
 * @name tickFinderUiApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the tickFinderUiApp
 */
tick.controller('loginCtrl', ['$scope', '$rootScope', '$state', '$timeout', 'focus',
  function ($scope, $rootScope, $state, $timeout, focus) {
    $scope.user = '';
    $scope.password = '';
    $scope.loginError = false;
    $scope.logingIn = false;
    $scope.save = false;
    $scope.errorMessage = 'Error While logging in Please try again';
    focus('focusLogin');

    $scope.doLogin = function () {
      $scope.loginError = false;
      $scope.errorMessage = 'Error While logging in Please try again';
      $scope.logingIn = true;
      $('form').fadeOut(500);
      //$(".submit").delay(500).queue(function(){
      //  $(this).addClass("success").dequeue();
      //});
      $timeout(function () {
        $(".submit").addClass("success").dequeue();
        authenticate();
      }, 500);
    };

    var authenticate = function () {

      //Delay to mock Login
      $timeout(function () {
        $(".submit").addClass("success").dequeue();
        $scope.logingIn = false;
        $state.go('main');
      }, 2500);

      //errorDisplay("(404): Couldn't Reach the Server");
    };

    var errorDisplay = function (err) {
      $scope.errorMessage = err;
      $scope.loginError = true;
      $scope.logingIn = false;
      $('form').fadeIn(500);
      $('.submit').removeClass('success');
    };

    //$("#login-button").click(function (event) {
    //  event.preventDefault();
    //  //$('.wrapper').addClass('form-success');
    //});
  }
]);
