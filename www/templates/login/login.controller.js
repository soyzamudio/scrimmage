angular.module('scrimmagr')
.controller('LoginCtrl', ['$scope', '$state', function($scope, $state) {
  var fbLogged = new Parse.Promise();

  var fbLoginSuccess = function(response) {
    if (!response.authResponse){
      fbLoginError("Cannot find the authResponse");
      return;
    }
    var expDate = new Date(
      new Date().getTime() + response.authResponse.expiresIn * 1000
    ).toISOString();

    var authData = {
      id: String(response.authResponse.userID),
      access_token: response.authResponse.accessToken,
      expiration_date: expDate
    };

    fbLogged.resolve(authData);
    fbLoginSuccess = null;
  };

  var fbLoginError = function(error){
    fbLogged.reject(error);
  };

  $scope.login = function() {
    if (!window.cordova) {
      facebookConnectPlugin.browserInit('727860223998157');
    }

    facebookConnectPlugin.login(['public_profile', 'email'], fbLoginSuccess, fbLoginError);

    fbLogged.then( function(authData) {
      return Parse.FacebookUtils.logIn(authData);
    })
    .then( function(userObject) {
      var authData = userObject.get('authData');

      facebookConnectPlugin.api('/me', null,
        function(response) {
          userObject.set('profilePicture', 'https://graph.facebook.com/' + response.id + '/picture?type=large');
          userObject.set('name', response.name);
          userObject.set('facebook', response.id);
          userObject.setEmail(response.email);
          userObject.set('gPoints', 0);
          userObject.save();
        },
        function(error) {
        }
      );

      $state.go('games.list');
    }, function(error) {
    });
  };
}]);
