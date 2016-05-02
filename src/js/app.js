var angular = require('angular');

angular.module('flickrApp', [])
  .controller('flickrCtrl', ['$scope', function($scope){
    $scope.valid = false;

    $scope.searchFlickr = function(){
      if($scope.tag){
        $scope.valid = true;
      } else { 
        $scope.search.$setPristine();
        $scope.valid = false;
        return;
      }

      $scope.word = $scope.tag;
      $scope.tag = '';
    };
  }]);