angular.module('scrimmagr')
.controller('GamesCreateCtrl', ['$scope', '$state', '$ionicHistory', function($scope, $state, $ionicHistory) {
  $scope.user = Parse.User.current().attributes;
  console.log($scope.user);

  $scope.logout = function() {
    Parse.User.logOut();
    $state.go('login');
  };

  $scope.goBack = function() {
    $ionicHistory.goBack();
  };

  $scope.settings = function() {
    $state.transitionTo('settings.account');
  };

}]);
