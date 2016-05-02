var angular = require('angular');

angular.module('flickrApp', [])
  .config(function($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
  })
  .controller('flickrCtrl', ['$scope', '$http', function($scope, $http){
    $scope.valid = false;
    $scope.error = false;

    //Gets photos from Flickr API and updates the view
    //with results or any error messages.
    function getPhotos(){
      var url = 'https://api.flickr.com/services/rest';
      var params = {
        method: 'flickr.photos.search',
        api_key: '530a7056fd1d44589661f5c0dfb8fb21',
        tags: $scope.word,
        format: 'json',
        nojsoncallback: 1
      };

      $http({
        method: 'GET',
        url: url,
        params: params
      })
      .then(function(response) {
        $scope.results = response.data.photos;
        $scope.error = false;
      },
      function(response) {
        $scope.error = true;
      });
    }

    //Sets the tag provided by the user and calls 
    //function to start api search.
    $scope.searchFlickr = function(word){
      if(word){
        $scope.valid = true;
      } else { 
        $scope.valid = false;
        return;
      }

      $scope.word = word;
      $scope.tag = '';
      $scope.results = '';
      getPhotos();
    };
  }]);