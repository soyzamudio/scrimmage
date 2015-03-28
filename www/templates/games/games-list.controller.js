angular.module('scrimmagr')
.controller('GamesListCtrl', ['$rootScope', '$scope', '$state', '$cordovaDialogs', 'moment', '$firebaseObject',
function($rootScope, $scope, $state, $cordovaDialogs, moment, $firebaseObject) {

  $scope.games = [];

  var ref = new Firebase("https://glaring-torch-7897.firebaseio.com/games");
  ref.on("value", function(games) {
    $scope.games = games.val();
    console.log($scope.games);
    // $scope.game.id = game.V.path.o[1];
    // $scope.game.formattedDay = moment.unix(game.val().day).format('dddd, MMM Do @ h:mmA');
    // $scope.games.push($scope.game);
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
