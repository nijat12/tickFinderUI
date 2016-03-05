'use strict';

/**
 * @ngdoc function
 * @name tickFinderUiApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the tickFinderUiApp
 */
tick.controller('MainCtrl', ['$scope', 'loadIcon', '$q', 'postServices', 'contactServices', function ($scope, loadIcon, $q, postServices, contactServices) {
  $scope.posts = [];



  $scope.getPosts = function (){
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

  $scope.DeletePosts = function () {
    //get id from which one to delete $index
    loadIcon.show();
    postServices.delete(496).then(function () {
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
    contactServices.deleteD(17).then(function () {
      loadIcon.hide();
    }, function (err) {
      loadIcon.hide();
    });

  };




  $scope.UpdateContacts1 = function (){
    loadIcon.show();
    contactServices.updateU({id:11, name:'Nijat11',email:'nijTestm',phone:'0005550'}).then(function () {
      loadIcon.hide();
    }, function (err) {
      loadIcon.hide();
    });

  };

  $scope.create2 = function (){
    loadIcon.show();
    contactServices.createC().then(function () {
      loadIcon.hide();
    }, function (err) {
      loadIcon.hide();
    });

  };

  $scope.CreateContacts = function (){
    loadIcon.show();
    contactServices.createC({name:'Nijat11',email:'nijTestm',phone:'0005550'}).then(function () {
      loadIcon.hide();
    }, function (err) {
      loadIcon.hide();
    });
  };

  $scope.getPosts();
}]);
