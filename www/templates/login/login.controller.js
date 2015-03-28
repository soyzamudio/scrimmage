angular.module('scrimmagr')
.controller('LoginCtrl', ['$scope', '$state', '$cordovaProgress', function($scope, $state, $cordovaProgress) {

  $scope.fbLogin = function() {
    var ref = new Firebase("https://glaring-torch-7897.firebaseio.com");
    ref.authWithOAuthPopup("facebook", function(error, authData) {});

    ref.onAuth(function(authData) {
      if (authData) {
        ref.child('users').child(authData.uid).set({
          provider: authData.provider,
          name: getName(authData),
          email: authData.facebook.email,
          picture: 'https://graph.facebook.com/' + authData.facebook.id + '/picture?type=large'
        });
        $state.go('games.list');
      }
    });

    function getName(authData) {
      switch(authData.provider) {
        case 'facebook':
          return authData.facebook.displayName;
      }
    }

  };
}]);
