(function () {
   'use strict';

  SelfCheckin.Controllers.
    controller('CheckinCtrl',['$scope', function($scope) {
    $scope.$emit('bodyClass', 'user-standby');

    $scope.onSuccess = function(data) {
      console.log('onSuccess');
      console.log(data);
    };

    $scope.onError = function(data) {
      console.log('Fu');
      console.log(data);
    };
  }]);

}());
