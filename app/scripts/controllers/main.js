'use strict';

/**
 * @ngdoc function
 * @name tickFinderUiApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the tickFinderUiApp
 */
tick.controller('MainCtrl', ['$scope', 'loadIcon', '$q', 'postServices', 'contactServices', '$uibModal', '$log',
  function ($scope, loadIcon, $q, postServices, contactServices, $uibModal, $log) {
  $scope.posts = [];


  $scope.items = ['item1', 'item2', 'item3'];

  $scope.animationsEnabled = true;

  $scope.open = function (size) {

    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: '../../views/modal/admin.html',
      controller: 'AdminCtrl',
      size: size,
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

  $scope.toggleAnimation = function () {
    $scope.animationsEnabled = !$scope.animationsEnabled;
  };




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
    //for(var i = 50; i < 494; i++){
    postServices.delete().then(function () {
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
