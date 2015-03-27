angular.module('scrimmagr')
.controller('SettingsEditCtrl', ['$rootScope', '$scope', '$state', '$ionicHistory',
function($rootScope, $scope, $state, $ionicHistory) {
  console.log($rootScope.auth.$getAuth());

  $scope.goBack = function() {
    $ionicHistory.goBack();
  };
  //
  // $scope.updateUser = function() {
  //   var userObject = Parse.User.current();
  //   userObject.set('name', $scope.user.name);
  //   userObject.setEmail($scope.user.email);
  //   userObject.save()
  //   .then(function() {
  //     $state.go('games.list');
  //   });
  // };

}]);
