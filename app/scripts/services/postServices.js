/**
 * Created by nijat on 3/5/16.
 */
tick.factory('postServices', ['$q', 'endPointDefinitionService', '$resource',
  function ($q, endPointDefinitionService, $resource) {
    function getAll() {
      var deferred = $q.defer();

      var endPoint = endPointDefinitionService.getPostURL;
      var resource = $resource(endPoint);
      var promise = resource.query().$promise;

      promise.then(function (data) {
        console.log(data);
        //var result = [];
        //if (data && Object.prototype.toString.call(data) === '[object Array]')
        //  for (var i = 0; i < data.length; i++) {
        //    result[i] = Model.Case.fromJson(data[i]);
        //  }
        deferred.resolve(data);
      }, function (err) {
        //$log.error('couldn"t reach server to get the Case');
        deferred.reject('couldn"t reach server to get the Posts');
      });

      return deferred.promise;
    };

    function deletePost(id) {
      var deferred = $q.defer();

      if (id) {
        var endPoint = endPointDefinitionService.deletePostURL;

        var resource = $resource(endPoint, {id:id});

        var promise = resource.save().$promise;

        promise.then(function (data) {
          console.log(data);
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
      getAll: getAll,
      delete: deletePost
    }
  }]);
