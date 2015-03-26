angular.module('scrimmagr')
.controller('GamesListCtrl', ['$scope', '$state', '$cordovaDialogs',
function($scope, $state, $cordovaDialogs) {

  var Games = Parse.Object.extend("game");
  var query = new Parse.Query(Games);
  query.include('creator');
  query.ascending('gameDay');
  query.ascending('distanceLocation');
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
    $state.go('settings.account');
  };

}]);
