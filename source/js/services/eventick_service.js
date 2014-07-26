(function () {
   'use strict';

  SelfCheckin.Services.
    factory('eventick',['$http', '$q', function($http, $q) {
    var username = 'admin@eventick.com.bir';
    var password = 'br4z1ljs';
    var eventID = '5182'
    var attendeesUrl = 'https://eventick.com.br/api/v1/events/' + eventID + '/attendees.json';
    var checkinUrl = 'https://eventick.com.br/api/v1/events/' + eventID + '/attendees/';

    var userToken = 'hWJtNvpvTLAy3U63fDRb';

    // var attendees = null;

    function tokenAuth(token) {
      return {'Authorization': 'Basic ' + btoa(token + ':')};
    }

    function getToken() {
      $http({
        method: 'GET',
        url: 'https://www.eventick.com.br/api/v1/tokens.json',
        headers: {'Authorization': 'Basic ' + btoa(username + ':' + password)}
        }
      ).
      success(function(data) {
        userToken = data.token;
        console.log(userToken);
      }).error(function(data, status, headers, config) {
        console.log('error');
      });
    }

    function findByEmail(e, index, array, email){
      return e.email === email;
    }

    var eventick = {
      getAttendees: function(defer){
        // getToken();
        // if(attendees !== null){
        //   console.log('aqui');
        //   defer.resolve(attendees);
        // }else{
          $http({method: 'GET', url: attendeesUrl, headers: tokenAuth(userToken)}).
            success(function(data) {
              // attendees = data.attendees;
              defer.resolve(data.attendees);
            });
        // }
      },
      checkAttendee: function(defer, a){
        $http({method: 'PUT', data: { checked_at: a.checked_at} ,  url: checkinUrl + a.code + '.json', headers: tokenAuth(userToken)}).
          success(function(data) {
            defer.resolve(a);
          });
      }
    };

  return eventick;

  }]);
}());
