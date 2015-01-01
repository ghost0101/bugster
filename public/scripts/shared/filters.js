angular.module('app.filters', []).filter('strLimit', ['$filter', function($filter) {
   return function(input, limit) {
      if (input.length <= limit) {
          return input;
      }

      return $filter('limitTo')(input, limit) + '...';
   };
}]);
