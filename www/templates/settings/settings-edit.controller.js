angular.module('scrimmagr')
.controller('SettingsEditCtrl', ['$scope', '$state', '$ionicHistory', function($scope, $state, $ionicHistory) {
  $scope.user = Parse.User.current().attributes;
  console.log($scope.user);

  $scope.goBack = function() {
    $ionicHistory.goBack();
  };

  $scope.updateUser = function() {
    var userObject = Parse.User.current();
    userObject.set('name', $scope.user.name);
    userObject.setEmail($scope.user.email);
    userObject.save()
    .then(function() {
      $state.go('games.list');
    });
  };

}]);
