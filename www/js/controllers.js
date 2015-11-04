angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});


})

.controller('artigosCtrl', function($scope, $http) {
  $scope.artigos = [];
  $http.get('http://grenal.dev.adrianopulz.com.br/app/artigos').success(function(data) {
    $scope.artigos = data;
  });
})

.controller('artigoCtrl', function($scope, $http, $stateParams) {
  $scope.artigo = [];
  $http.get("http://grenal.dev.adrianopulz.com.br/app/artigo/" + $stateParams.artigoId).success(function(data) {
    $scope.artigo = data[0];
  });
});
