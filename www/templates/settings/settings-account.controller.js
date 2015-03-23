angular.module('scrimmagr')
.controller('SettingsAccountCtrl', ['$scope', '$state', '$ionicHistory', function($scope, $state, $ionicHistory) {
  $scope.user = Parse.User.current().attributes;
  console.log($scope.user);

  $scope.editProfile = function() {
    $state.go('settings.edit');
  };

  $scope.goBack = function() {
    $ionicHistory.goBack();
  };

}]);
