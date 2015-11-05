angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $http) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Main Menu Itens
  $scope.menu = [];
  $http({
    method: 'GET',
    url: "http://grenal.dev.adrianopulz.com.br/app/competicoes"
  }).then(function successCallback(response) {
    $scope.menu = response.data;
  });
})

.controller('artigosCtrl', function($scope, $http, $stateParams) {
  var time = ($stateParams.time == 'gremio') ? 'Grêmio' : 'Internacional';
  $scope.title = ($stateParams.time == 'all') ? 'Últimas notícias' : 'Notícias do ' + time;
  $scope.class = $stateParams.time;
  $scope.artigos = [];
  $scope.message = '';

  $http({
    method: 'GET',
    url: "http://grenal.dev.adrianopulz.com.br/app/artigos/" + $stateParams.time + "/" + $stateParams.competicao
  }).then(function successCallback(response) {
    $scope.artigos = response.data;
    if (!response.data.length) {
      $scope.message = 'Oops! Não encontramos noticias relacionadas ao seu filtro. Tente uma categoria diferente. =)';
    }
  }, function errorCallback(response) {
    $scope.message = 'Oops! Ocorreu um erro ao buscar os dados no WebService.';
  });
})

.controller('artigoCtrl', function($scope, $http, $stateParams, $sce) {
  $scope.message = '';
  $scope.class = '';

  $http({
    method: 'GET',
    url: "http://grenal.dev.adrianopulz.com.br/app/artigo/" + $stateParams.artigoId
  }).then(function successCallback(response) {
    var artigo = response.data[0];
    if (!response.data.length) {
      $scope.message = 'Oops! Não encontramos noticias relacionadas ao seu filtro. Tente uma categoria diferente. =)';
    }
    else {
      $scope.title = $sce.trustAsHtml(artigo.title);
      $scope.competicao = artigo.field_competicao;
      $scope.body = $sce.trustAsHtml(artigo.body);
      $scope.tags = artigo.field_tags;
      $scope.image = artigo.uri;
      $scope.time = artigo.field_time;
      $scope.class = (artigo.field_time == 'Internacional') ? 'inter' : 'gremio';
    }
  }, function errorCallback(response) {
    $scope.message = 'Oops! Ocorreu um erro ao buscar os dados no WebService.';
  });
});
