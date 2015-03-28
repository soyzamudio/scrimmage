angular.module('scrimmagr')
.controller('GamesListCtrl', ['$rootScope', '$scope', '$state', '$cordovaDialogs', 'moment', '$firebaseObject',
function($rootScope, $scope, $state, $cordovaDialogs, moment, $firebaseArray) {

  var ref = new Firebase("https://glaring-torch-7897.firebaseio.com/").child('games');
  var games = $firebaseArray(ref);
  games.$loaded(function(list) {
    $scope.games = list;
    console.log(list);
  });
  // ref.on("value", function(games) {
  //   $scope.games = games.val();
  //   console.log(games);
  //   // $scope.urls = games.V.path.o[1];
  //   // $scope.game.id = game.V.path.o[1];
  //   // $scope.game.formattedDay = moment.unix(game.val().day).format('dddd, MMM Do @ h:mmA');
  //   // $scope.games.push($scope.game);
  // });

  $scope.goToCreate = function() {
    $state.go('games.create');
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

}])
.filter('formatTime', function() {
  return function(input) {
    if(!input) return;
    return moment.unix(input).format('dddd, MMM Do @ h:mmA');
  };
});
