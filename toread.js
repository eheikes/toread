var module = angular.module('toRead', ['ngResource', 'checklist-model']);

module.config(function($locationProvider) {
  $locationProvider.html5Mode(true);
});

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

module.directive('list', function($location, $window, $timeout, toreadService) {
  return {
    restrict: 'E',
    templateUrl: 'toread.html',
    link: function(scope, element, attrs) {
      // Returns the current value from the URL parameters,
      //   or the default value if not set yet.
      var getParamOrDefault = function(name, defaultVal, convertToInt) {
        var params = $location.search();
        if (typeof params[name] === 'undefined') {
          return defaultVal;
        }
        if (convertToInt) {
          return parseInt(params[name], 10);
        }
        return params[name];
      };

      scope.moment = moment;
      scope.tags = [];
      scope.entries = [];
      scope.info = {};
      scope.selectedItems = [];
      scope.actionInProgress = false;
      scope.offset = getParamOrDefault('offset', 0, true);
      scope.limit = getParamOrDefault('limit', 20, true);
      scope.tagFilter = getParamOrDefault('tag', null, true);
      scope.q = getParamOrDefault('q', ''); // search query
      scope.highlighted = getParamOrDefault('highlighted', null);

      var random = function(lo, hi) {
        return Math.floor(Math.random() * (hi - lo + 1)) + lo;
      };

      var pushState = function() {
        var params = {
          highlighted: scope.highlighted,
          limit: scope.limit,
          offset: scope.offset,
          q: scope.q,
          tag: scope.tagFilter
        }
        $location.search(params);
      };

      // Highlight the nth item in the list (starting at 0)
      //   and scroll the screen to its position.
      var highlightOffset = function(n) {
        scope.entries[n].highlighted = true;
        $timeout(function() {
          $('html,body').animate({
            scrollTop: $('ul.entries li').eq(n).offset().top
          }, 500);
        });
      };

      scope.chooseRandom = function() {
        var chosenIndex = random(0, scope.info.total - 1);
        var remainder = chosenIndex % scope.limit;

        scope.offset = parseInt(chosenIndex / scope.limit, 10) * scope.limit;
        scope.showList().then(function() {
          scope.highlighted = remainder;
          pushState();
          highlightOffset(remainder);
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
          pushState();
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

      scope.clearSearch = function(event) {
        scope.q = '';
        scope.showList();
        angular.element(event.target).parents('.search').find('input[name="q"]').focus();
      };

      scope.$on('refreshList', scope.showList);

      scope.showList().then(function() {
        if (scope.highlighted) {
          highlightOffset(scope.highlighted);
        }
      });
    }
  }
});

module.directive('controls', function() {
  return {
    restrict: 'E',
    scope: {
      hasSearchAccess: '=searchAccess'
    },
    templateUrl: 'toreadcontrols.html',
    link: function(scope, element, attrs) {}
  };
});
