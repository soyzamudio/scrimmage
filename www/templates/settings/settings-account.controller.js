angular.module('scrimmagr')
.controller('SettingsAccountCtrl', ['$scope', '$state', '$ionicHistory', function($scope, $state, $ionicHistory) {
  $scope.user = Parse.User.current().attributes;
  console.log($scope.user);

  $scope.logout = function() {
    logout();
    Parse.User.logOut();
  };

  $scope.editProfile = function() {
    $state.go('settings.edit');
  };

  $scope.goBack = function() {
    $ionicHistory.goBack();
  };

  function logout() {
    openFB.logout(
      function() {
        $state.go('login');
      }, errorHandler);
  }

  function errorHandler(error) {
    alert(error.message);
  }

}]);
