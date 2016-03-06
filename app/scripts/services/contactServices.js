/**
 * Created by nijat on 3/5/16.
 */
tick.factory('contactServices', ['$q', 'endPointDefinitionService', '$resource',
  function($q, endPointDefinitionService, $resource){
  function getAll (){
    var deferred = $q.defer();

    var endPoint = endPointDefinitionService.getContactURL;
    var resource = $resource(endPoint);
    var promise = resource.query().$promise;

    promise.then(function (data) {
      //console.log(data);
      //var result = [];
      //if (data && Object.prototype.toString.call(data) === '[object Array]')
      //  for (var i = 0; i < data.length; i++) {
      //    result[i] = Model.Case.fromJson(data[i]);
      //  }
      deferred.resolve(data);
    }, function (err) {
      //$log.error('couldn"t reach server to get the Case');
      deferred.reject('couldn"t reach server to get the Contacts');
    });

    return deferred.promise;

  }

  function updateContent (params){
    var deferred = $q.defer();
    var endPoint = endPointDefinitionService.updateContactURL;

    if(params){
      var resource = $resource(endPoint, {id: params.id});
      var promise = resource.save(params).$promise;

      promise.then(function (data) {
        //console.log(data);
        deferred.resolve(data);
      }, function (err) {
        deferred.reject('missing parameters to Update the Content');
      });
    } else {
      deferred.reject('couldn"t reach server to Update the Content');
    }

    return deferred.promise;

  }

  function createContent (params){
    var deferred = $q.defer();
    var endPoint = endPointDefinitionService.createContactURL;
      var resource = $resource(endPoint);
      var promise = resource.save(params).$promise;

      promise.then(function (data) {
        //console.log(data);
        deferred.resolve(data);
      }, function (err) {
        deferred.reject('missing parameters to Create the Content');
      });

    //} else {
    //  deferred.reject('couldn"t reach server to Create the Content');
    //}

    return deferred.promise;

  }

  function deleteContent (id){
    var deferred = $q.defer();

    if(id) {
      var endPoint = endPointDefinitionService.deleteContentURL;
      var resource = $resource(endPoint, {id:id});
      var promise = resource.save().$promise;

      promise.then(function (data) {
        //console.log(data);
        deferred.resolve(data);
      }, function (err) {
        //$log.error('couldn"t reach server to get the Case');
        deferred.reject('couldn"t reach server to delete the Test');
      });

    } else {
      deferred.reject('missing Test id in deleteTest');
    }

    return deferred.promise;
  }


  return {
    getAll:getAll,
    deleteD:deleteContent,
    updateU:updateContent,
    createC:createContent
  }
}]);
