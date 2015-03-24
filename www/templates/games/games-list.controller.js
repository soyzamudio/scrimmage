angular.module('scrimmagr')
.controller('GamesListCtrl', ['$scope', '$state', function($scope, $state) {
  $scope.user = Parse.User.current().attributes;

  var Games = Parse.Object.extend("game");
  var query = new Parse.Query(Games);
  query.include('creator');
  query.find()
  .then(function(games) {
    $scope.games = games;
  });

  $scope.goToCreate = function() {
    $state.go('games.create');
  };

  $scope.ranking = function() {
    $state.go('users.ranking');
  };

  $scope.goToGame = function(gameId) {
    $state.go('games.show', {gameId: gameId});
  };

  $scope.settings = function() {
    $state.transitionTo('settings.account');
  };

}]);
