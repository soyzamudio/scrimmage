angular.module('scrimmagr')
.controller('GamesListCtrl', ['$scope', '$state', function($scope, $state) {
  $scope.user = Parse.User.current().attributes;
  console.log($scope.user);

  $scope.goToCreate = function() {
    $state.go('games.create');
  };

  $scope.ranking = function() {
    
    $state.go('users.ranking');
  };

  $scope.settings = function() {
    $state.transitionTo('settings.account');
  };

}]);
