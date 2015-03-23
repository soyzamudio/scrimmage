angular.module('scrimmagr')
.controller('UsersRankingCtrl', ['$scope', '$state', '$ionicHistory', function($scope, $state, $ionicHistory) {
  $scope.user = Parse.User.current().attributes;

  var query = new Parse.Query(Parse.User);
  query.limit(10);
  query.descending('gPoints');
  query.find({
    success: function(users) {
      $scope.users = users;
    }
  });

  $scope.goBack = function() {
    $ionicHistory.goBack();
  };

  $scope.goToUser = function(userId) {
    $state.go('users.show', {userId: userId});
  };

}]);
