'use strict';

/**
 * @ngdoc function
 * @name tickFinderUiApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the tickFinderUiApp
 */
tick.controller('MainCtrl', ['$scope', 'loadIcon', '$q', 'postServices', 'contactServices', '$uibModal', 'toastr', '$window', 'focus',
  function ($scope, loadIcon, $q, postServices, contactServices, $uibModal, toastr, $window, focus) {
    $scope.posts = [];
    $scope.postsOnView = [];
    $scope.contacts = [];
    $scope.tags=[];
    $scope.searchVal = '';
    $scope.emailTo = null;
    $scope.levelFilter= null;

    var emailContent = '';
    var modalInstance = null, modalInstance2 = null;

    $scope.ok = function () {
      modalInstance.close();
    };
    $scope.ok2 = function () {
      modalInstance2.close();
    };

    $scope.sendEmail = function (obj) {
      modalInstance2.close();
      $window.location = 'mailto:'+ $scope.emailTo +'?subject=Check This Out&body='+emailContent;
      emailContent='';
      obj.emailsent=true;
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

    $scope.emailOpen = function (size, obj) {
      if(emailContent!=='') emailContent='';
      emailContent = obj.source;

      modalInstance2 = $uibModal.open({
        animation: $scope.animationsEnabled,
        templateUrl: '../../views/modal/email.html',
        controller: 'ModalCtrl',
        size: size
      });

      modalInstance2.result.then(function (selectedItem) {
        $scope.emailTo = selectedItem;
        $scope.sendEmail(obj);
      }, function () {
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
        $scope.postsOnView=angular.copy(data);
      }, function (err) {
        loadIcon.hide();
        //d.reject(err);
      });

      //return d.promise;
    };

    $scope.DeletePosts = function (obj) {
      loadIcon.show();
      //for(var i = 50; i < 494; i++){
      postServices.delete(obj.id).then(function () {
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
      //loadIcon.show();
      contactServices.updateU($scope.contacts[index]).then(function () {
        //loadIcon.hide();
        toastr.success('Saved', {
          closeButton: true
        });
      }, function (err) {
        console.log(err);
        //loadIcon.hide();
      });

    };


    ////Tags


    $scope.getTags = function () {
      loadIcon.show();
      contactServices.getTags().then(function (data) {
        loadIcon.hide();
        $scope.tags=data;
        //d.resolve(data);
      }, function (err) {
        loadIcon.hide();
      });

    };

    $scope.updateTags = function () {
      //loadIcon.show();
      contactServices.postTags($scope.tags).then(function (data) {
        toastr.success('Saved', {
          closeButton: true
        });
        //loadIcon.hide();
        //d.resolve(data);
      }, function (err) {
        //loadIcon.hide();
      });

    };







    var monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    $scope.timeParser = function (time){
      if(time && time !=='') {
        var d = new Date(time);
        var str = monthNames[d.getMonth()] + '/' + d.getDate() + '/' + d.getFullYear();
        return str;
      } else return 'time not available';
    };

    $scope.image = function (link){
      if(link === ""){
        return '../images/facebook_stdby.png'
      } else {
        return link;
      }
    };

    $scope.searchFunc = function(){
      if($scope.searchVal==='')$scope.search=false;
    };

    $scope.openSearch = function(){
      if($scope.searchVal===''){
        focus('search');
        if($scope.search)$scope.search=false;
        else $scope.search=true;
      }
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



    ////Filter////
    $scope.red = function(){
      if ($scope.levelFilter=== -1){
        $scope.levelFilter= null;
        $scope.filter();
      }
      else {
        $scope.levelFilter= -1;
        $scope.filter();
      }
    };
    $scope.yellow = function(){
      if ($scope.levelFilter=== 0){
        $scope.levelFilter= null;
        $scope.filter();
      }
      else {
        $scope.levelFilter= 0;
        $scope.filter();
      }
    };
    $scope.green = function(){
      if ($scope.levelFilter=== 1){
        $scope.levelFilter= null;
        $scope.filter();
      }
      else {
        $scope.levelFilter= 1;
        $scope.filter();
      }
    };


    $scope.redCount = function (){
      var c = 0;
      for (var i = 0; i<$scope.posts.length; i++){
        if($scope.posts[i].polarity === -1)c++;
      }
      return c;
    };

    $scope.yellowCount = function (){
      var c = 0;
      for (var i = 0; i<$scope.posts.length; i++){
        if($scope.posts[i].polarity === 0)c++;
      }
      return c;
    };

    $scope.greenCount = function (){
      var c = 0;
      for (var i = 0; i<$scope.posts.length; i++){
        if($scope.posts[i].polarity === 1)c++;
      }
      return c;
    };

    $scope.count = function(){
      return $scope.postsOnView.length;
    };




    $scope.filterComparator = function (post){
      if($scope.levelFilter !== null) return post;
      else return null;
    };


    $scope.filter = function(){
      $scope.postsOnView = $scope.posts.filter(checker);
    };

    var checker = function (obj) {
      if($scope.levelFilter!==null){
        if($scope.levelFilter===obj.polarity){
          if($scope.searchVal!==''){
            return obj.id.toString() == $scope.searchVal || obj.user.indexOf($scope.searchVal) > -1 || obj.content.indexOf($scope.searchVal) > -1
          } else return true;
        } else {
          return false
        }
      } else {
        return obj.id.toString()==$scope.searchVal || obj.user.indexOf($scope.searchVal)>-1 || obj.content.indexOf($scope.searchVal)>-1
      }
    };


    //Init
    $scope.getPosts();
    $scope.GetContacts();
    $scope.getTags();
  }])


.controller('ModalCtrl', function($scope, $uibModalInstance){
  $scope.email = '';
  $scope.send = function () {
    $uibModalInstance.close($scope.email);
  };
  $scope.close = function () {
    $uibModalInstance.dismiss();
  };
});

