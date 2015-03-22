angular.module('scrimmagr')
.controller('SettingsAccountCtrl', ['$scope', '$state', function($scope, $state) {
  $scope.user = Parse.User.current().attributes;
  console.log($scope.user);
}]);
