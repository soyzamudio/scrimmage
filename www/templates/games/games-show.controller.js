angular.module('scrimmagr')
.controller('GamesShowCtrl', ['$scope', '$state', '$ionicHistory', function($scope, $state, $ionicHistory) {
  $scope.goBack = function() {
    $ionicHistory.goBack();
  };

  $scope.goToUser = function(userId) {
    $state.go('users.show', {userId: userId});
  };

  var Games = Parse.Object.extend("game");
  var query = new Parse.Query(Games);
  query.equalTo('objectId', $state.params.gameId);
  query.include("attendees.pointer");
  query.first({
    success: function(game) {
      $scope.game = game;
    }
  });
}]);
