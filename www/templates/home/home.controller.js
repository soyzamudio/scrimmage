angular.module('scrimmagr')
.controller('HomeCtrl', ['$scope', '$state', function($scope, $state) {
  $scope.logout = function() {
    console.log('Logout');
    Parse.User.logOut();
    $state.go('login');
  };

}]);
