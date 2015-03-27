angular.module('scrimmagr')
.controller('SettingsAccountCtrl', ['$rootScope', '$scope', '$state', '$ionicHistory',
function($rootScope, $scope, $state, $ionicHistory) {

  $scope.logout = function() {
    $rootScope.auth.$unauth();
    $state.go('login');
  };

  $scope.editProfile = function() {
    $state.go('settings.edit');
  };

  $scope.goBack = function() {
    $ionicHistory.goBack();
  };

}]);
