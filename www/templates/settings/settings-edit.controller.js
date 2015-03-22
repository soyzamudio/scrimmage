angular.module('scrimmagr')
.controller('SettingsEditCtrl', ['$scope', '$state', function($scope, $state) {
  $scope.user = Parse.User.current().attributes;
  console.log($scope.user);
}]);
