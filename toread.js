var module = angular.module('toRead', ['ngResource', 'checklist-model']);

module.factory('toreadFactory', function($resource) {
  return $resource('toreadapi.php');
});

module.factory('toreadService', function(toreadFactory) {
  function get(opts) {
    return toreadFactory.get(opts).$promise;
  }

  function add(data) {
    return toreadFactory.save(data).$promise;
  }

  function remove(idsArray) {
    return toreadFactory.remove({ 'id[]': idsArray }).$promise;
  }

  return {
    get: get,
    add: add,
    remove: remove
  };
});

module.filter('dasherize', function() {
  return function(str) {
    return str.replace(/\s+/g, '-');
  };
});

module.controller('addController', function($scope, toreadService) {
  $scope.data = {};
  $scope.isSaving = false;
  $scope.submit = function() {
    $scope.isSaving = true;
    toreadService.add($scope.data).then(function() {
      $scope.data = {};
      $scope.$emit('refreshList');
    }).finally(function() {
      $scope.isSaving = false;
    });
  }
});

module.directive('list', function($timeout, toreadService) {
  return {
    restrict: 'E',
    templateUrl: 'toread.html',
    link: function(scope, element, attrs) {
      scope.moment = moment;
      scope.tags = [];
      scope.entries = [];
      scope.info = {};
      scope.selectedItems = [];
      scope.actionInProgress = false;
      scope.offset = 0;
      scope.limit = 20;
      scope.tagFilter = null;
      scope.q = ''; // search query

      var random = function(lo, hi) {
        return Math.floor(Math.random() * (hi - lo + 1)) + lo;
      };

      scope.chooseRandom = function() {
        var chosenIndex = random(0, scope.info.total - 1);
        var remainder = chosenIndex % scope.limit;

        scope.offset = parseInt(chosenIndex / scope.limit, 10) * scope.limit;
        scope.showList().then(function() {
          scope.entries[remainder].highlighted = true;
          $timeout(function() {
            $('html,body').animate({
              scrollTop: $('ul.entries li').eq(remainder).offset().top
            }, 500);
          });
        });
      };

      scope.toggleTag = function(tagId) {
        scope.tagFilter = (scope.tagFilter === tagId ? null : tagId);
        scope.offset = 0;
        scope.showList();
      };

      scope.showList = function() {
        return toreadService.get({
          q: scope.q,
          tag: scope.tagFilter,
          offset: scope.offset,
          count: scope.limit
        }).then(function(response) {
          scope.tags       = response.tags;
          scope.entries    = response.links;
          scope.info       = response.stats;
          scope.info.total = response.total;
        });
      };

      scope.changePage = function(pageOffset) {
        scope.offset = scope.offset + (scope.limit * pageOffset);
        if (scope.offset < 0 || scope.offset >= scope.info.total) {
          scope.offset = 0;
        }
        scope.showList();
      };

      scope.deleteSelected = function() {
        scope.actionInProgress = true;
        toreadService.remove(scope.selectedItems).then(function() {
          scope.selectedItems = [];
          scope.showList();
        }).finally(function() {
          scope.actionInProgress = false;
        });
      };

      scope.clearSearch = function() {
        scope.q = '';
        scope.showList();
      };

      scope.$on('refreshList', scope.showList);

      scope.showList();
    }
  }
});
