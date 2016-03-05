/**
 * Created by nijat on 7/23/15.
 */

'use strict';

tick
  .directive('focusOn', function () {
    return function(scope, elem, attr) {
      scope.$on('focusOn', function(e, name) {
        if (name === attr.focusOn) {
          elem[0].focus();
        }
      });
    };
  })

  //Service to accept which param to focus on
  .factory('focus', function ($rootScope, $timeout) {
    return function(name) {
      $timeout(function (){
        $rootScope.$broadcast('focusOn', name);
      });
    };
  })

  .directive('schrollBottom', function () {
    return {
      scope: {
        schrollBottom: "="
      },
      link: function (scope, element) {
        scope.$watchCollection('schrollBottom', function (newValue) {
          if (newValue)
          {
            $(element).scrollTop($(element)[0].scrollHeight);
          }
        });
      }
    }
  });
