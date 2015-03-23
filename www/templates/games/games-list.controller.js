angular.module('scrimmagr')
.controller('GamesListCtrl', ['$scope', '$state', function($scope, $state) {
  $scope.user = Parse.User.current().attributes;
  console.log($scope.user);

  // $scope.logout = function() {
  //   Parse.User.logOut();
  //   $state.go('login');
  // };

  $scope.goToCreate = function() {
    $state.go('games.create');
  };

  $scope.settings = function() {
    $state.transitionTo('settings.account');
  };

}]);
