angular.module('scrimmagr')
.controller('UsersShowCtrl', ['$scope', '$state', '$ionicHistory', function($scope, $state, $ionicHistory) {

  $scope.goBack = function() {
    $ionicHistory.goBack();
  };

  var query = new Parse.Query(Parse.User);
  query.equalTo('objectId', $state.params.userId);
  query.first({
    success: function(user) {
      $scope.showUser = user;
    }
  });

}]);
