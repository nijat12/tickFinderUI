'use strict';

/**
 * @ngdoc function
 * @name tickFinderUiApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the tickFinderUiApp
 */
tick.controller('MainCtrl', ['$scope', 'loadIcon', '$q', 'postServices', 'contactServices', function ($scope, loadIcon, $q, postServices, contactServices) {
  $scope.getPosts = function (){

    //var d = $q.defer();

      loadIcon.show();
    postServices.getAll().then(function (data) {
        loadIcon.hide();
        //d.resolve(data);
      }, function (err) {
        loadIcon.hide();
        //d.reject(err);
      });

    //return d.promise;
  };

  $scope.DeletePosts = function () {
    //get id from which one to delete $index
    loadIcon.show();
    postServices.delete(498).then(function () {
      loadIcon.hide();
    }, function (err) {
      loadIcon.hide();
    });
  };





  $scope.GetContacts = function (){
    loadIcon.show();
    contactServices.getAll().then(function () {
      loadIcon.hide();
    }, function (err) {
      loadIcon.hide();
    });
  };

  $scope.DeleteContacts = function (){
    loadIcon.show();
    contactServices.delete(10).then(function () {
      loadIcon.hide();
    }, function (err) {
      loadIcon.hide();
    });

  };



  $scope.UpdateContacts1 = function (){
    loadIcon.show();
    contactServices.post().then(function () {
      loadIcon.hide();
    }, function (err) {
      loadIcon.hide();
    });

  };
  $scope.UpdateContacts2 = function (){
    loadIcon.show();
    contactServices.post().then(function () {
      loadIcon.hide();
    }, function (err) {
      loadIcon.hide();
    });

  };
  $scope.CreateContacts = function (){
    loadIcon.show();
    contactServices.post().then(function () {
      loadIcon.hide();
    }, function (err) {
      loadIcon.hide();
    });

  }
}]);
