'use strict';

/**
 * @ngdoc function
 * @name tickFinderUiApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the tickFinderUiApp
 */
tick.controller('MainCtrl', ['$scope', 'loadIcon', '$q', 'postServices', 'contactServices', '$uibModal',
  function ($scope, loadIcon, $q, postServices, contactServices, $uibModal) {
    $scope.posts = [];
    $scope.contacts = [];
    $scope.searchVal = '';
    var modalInstance = null, modalInstance2 = null;

    $scope.ok = function () {
      modalInstance.close();
    };

    $scope.cancel = function () {
      modalInstance.close();
    };

    $scope.animationsEnabled = true;

    $scope.open = function (size) {

      modalInstance = $uibModal.open({
        animation: $scope.animationsEnabled,
        templateUrl: '../../views/modal/admin.html',
        size: size,
        scope:$scope
      });
    };

    $scope.emailOpen = function (size, index) {

      modalInstance2 = $uibModal.open({
        animation: $scope.animationsEnabled,
        templateUrl: '../../views/modal/email.html',
        size: size,
        scope:$scope
      });
    };

    $scope.toggleAnimation = function () {
      $scope.animationsEnabled = !$scope.animationsEnabled;
    };


    $scope.getPosts = function () {
      //var d = $q.defer();

      loadIcon.show();
      postServices.getAll().then(function (data) {
        loadIcon.hide();
        //d.resolve(data);
        $scope.posts = data;
      }, function (err) {
        loadIcon.hide();
        //d.reject(err);
      });

      //return d.promise;
    };

    $scope.DeletePosts = function (index) {
      loadIcon.show();
      //for(var i = 50; i < 494; i++){
      postServices.delete($scope.posts[index].id).then(function () {
        $scope.getPosts();
        loadIcon.hide();
      }, function (err) {
        loadIcon.hide();
      });
    };






    //Contents
    $scope.GetContacts = function () {
      loadIcon.show();
      contactServices.getAll().then(function (data) {
        loadIcon.hide();
        $scope.contacts = data;
      }, function (err) {
        loadIcon.hide();
      });
    };

    $scope.DeleteContacts = function (index) {
      loadIcon.show();
      contactServices.deleteD($scope.contacts[index].id).then(function () {
        loadIcon.hide();
        $scope.GetContacts();
      }, function (err) {
        loadIcon.hide();
      });

    };


    $scope.UpdateContacts1 = function (index) {
      console.log($scope.contacts[index]);
      //loadIcon.show();
      contactServices.updateU($scope.contacts[index]).then(function () {
        //loadIcon.hide();
      }, function (err) {
        console.log(err);
        //loadIcon.hide();
      });

    };


    $scope.CreateContacts = function () {
      loadIcon.show();
      contactServices.createC().then(function (data) {
        loadIcon.hide();
        $scope.contacts.push(data);
      }, function (err) {
        loadIcon.hide();
      });
    };

    $scope.getPosts();
    $scope.GetContacts();

    //$scope.open('lg');
  }]);
