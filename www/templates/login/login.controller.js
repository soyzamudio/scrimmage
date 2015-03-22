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
    console.log(':22: fbloginsuccess', response);
  };

  var fbLoginError = function(error){
    fbLogged.reject(error);
  };

  $scope.login = function() {
    console.log('Login');
    if (!window.cordova) {
      facebookConnectPlugin.browserInit('727860223998157');
    }

    facebookConnectPlugin.login(['public_profile', 'email'], fbLoginSuccess, fbLoginError);

    fbLogged.then( function(authData) {
      console.log('Promised');
      return Parse.FacebookUtils.logIn(authData);
    })
    .then( function(userObject) {
      console.log(':42:', userObject);
      var authData = userObject.get('authData');

      facebookConnectPlugin.api('/me', null,
        function(response) {
          console.log(':47:', response);
          userObject.set('profilePicture', 'https://graph.facebook.com/' + response.id + '/picture?type=large');
          userObject.set('name', response.name);
          userObject.set('facebook', response.id);
          userObject.setEmail(response.email);
          userObject.save();
        },
        function(error) {
          console.log(error);
        }
      );

      $state.go('games.list');
    }, function(error) {
      console.log(':62: login error', error);
    });
  };
}]);
