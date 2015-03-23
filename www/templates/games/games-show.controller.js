angular.module('scrimmagr')
.controller('GamesShowCtrl', ['$scope', '$state', '$ionicHistory', function($scope, $state, $ionicHistory) {
  $scope.user = Parse.User.current().attributes;
  console.log($scope.user);

  $scope.goBack = function() {
    $ionicHistory.goBack();
  };

  var Games = Parse.Object.extend("game");
  var query = new Parse.Query(Games);
  query.equalTo('objectId', $state.params.gameId);
  query.first({
    success: function(game) {
      $scope.game = game;
    }
  });
}]);
