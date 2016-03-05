/**
 * Created by nijat on 8/25/15.
 * directive that adds loading class when spinner gets activated
 * loading class will block off the background to prevent user interaction
 */
tick.directive('loader', function () {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        key: '@'
      },
      link: function (scope, element, attributes) {

        scope.$on('us-spinner:spin', function (event, key) {
          if (key === scope.key) {
            element.addClass('loading');
          }
        });

        scope.$on('us-spinner:stop', function (event, key) {
          if (key === scope.key) {
            element.removeClass('loading');
          }
        });

      },
      template: '<div class="us-spinner-wrapper"><div us-spinner spinner-key="{{key}}"></div></div>'
    };
  });
