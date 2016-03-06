/**
 * Created by nijat on 3/5/16.
 */
tick.factory('contactServices', ['$q', 'endPointDefinitionService', '$resource',
  function ($q, endPointDefinitionService, $resource) {
    function getAll() {
      var deferred = $q.defer();

      var endPoint = endPointDefinitionService.getContactURL;
      var resource = $resource(endPoint);
      var promise = resource.query().$promise;

      promise.then(function (data) {
        deferred.resolve(data);
      }, function (err) {
        deferred.reject('couldn"t reach server to get the Contacts');
      });

      return deferred.promise;

    }

    function updateContent(params) {
      var deferred = $q.defer();
      var endPoint = endPointDefinitionService.updateContactURL;

      if (params) {
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

    function createContent(params) {
      var deferred = $q.defer();
      var endPoint = endPointDefinitionService.createContactURL;
      var resource = $resource(endPoint);
      var promise = resource.save(params).$promise;

      promise.then(function (data) {
        deferred.resolve(data);
      }, function (err) {
        deferred.reject('missing parameters to Create the Content');
      });

      return deferred.promise;

    }

    function deleteContent(id) {
      var deferred = $q.defer();

      if (id) {
        var endPoint = endPointDefinitionService.deleteContentURL;
        var resource = $resource(endPoint, {id: id});
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

    function getTags() {
      var deferred = $q.defer();

      var endPoint = endPointDefinitionService.tagsURL;
      var resource = $resource(endPoint);
      var promise = resource.query().$promise;

      promise.then(function (data) {
        var tmp = data[0].tags.split(', ');
        var arr = [];
        for(var i=0; i<tmp.length; i++){
          arr.push({"text":tmp[i]});
        }
        deferred.resolve(arr);
      }, function (err) {
        deferred.reject('couldn"t reach server to get the Tags');
      });

      return deferred.promise;

    }

    function postTags(params) {
      var str='';
      for(var i=0; i< params.length; i++){
        str+=params[i].text;
        if(i<params.length-1)str+=', ';
      }
      var send = {"id":1,"tags":str};
      console.log(send);
      var deferred = $q.defer();
      var endPoint = endPointDefinitionService.tagsURL;
      var resource = $resource(endPoint);
      var promise = resource.save(send).$promise;

      promise.then(function (data) {
        deferred.resolve(data);
      }, function (err) {
        deferred.reject('missing parameters to Update the Tags');
      });

      return deferred.promise;

    }


    return {
      getAll: getAll,
      deleteD: deleteContent,
      updateU: updateContent,
      createC: createContent,
      getTags: getTags,
      postTags: postTags
    }
  }]);
