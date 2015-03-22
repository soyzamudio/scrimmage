angular.module('scrimmagr')
.controller('GamesListCtrl', ['$scope', '$state', function($scope, $state) {
  $scope.user = Parse.User.current().attributes;
  console.log($scope.user);
}]);
