angular.module('scrimmagr')
.controller('GamesListCtrl', ['$rootScope', '$scope', '$state', '$cordovaDialogs', 'moment',
function($rootScope, $scope, $state, $cordovaDialogs, moment) {

  $scope.games = [];

  var ref = new Firebase("https://glaring-torch-7897.firebaseio.com/games");
  ref.on("child_added", function(game) {
    $scope.game = game.val();
    $scope.game.formattedDay = moment.unix(game.val().day).format('dddd, MMM Do @ h:mmA');
    $scope.games.push($scope.game);
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

  $scope.filterDistance = function (game) {
    return game.distance <= 160934;
  };

}]);
