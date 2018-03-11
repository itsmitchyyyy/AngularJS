var app = angular.module('app', []);
app.controller('test', function($scope,$http){
    $scope.header = {
        name: 'Name',
        course_year: 'Course and Year',
        school: 'School',
        paid: 'Paid'   
    }
    $scope.entries = [
        {'value':'10','label':'10'},
        {'value':'25','label':'25'},
        {'value':'50','label':'50'},
        {'value':'100','label':'100'},
    ]
    $scope.sort = {
        column: 'name',
        descending: false
    }
    $scope.selectedCls = function(column){
        return column == $scope.sort.column && 'sort-' + $scope.sort.descending;
    }
    $scope.changeSort = function(column){
        var sort = $scope.sort;
        if(sort.column == column){
            sort.descending = !sort.descending;
        }else{
            sort.column = column;
            sort.descending = false;
        }
    }
    $scope.pageEntries = $scope.entries[0];
    $scope.$watch('pageEntries', function(e){
        $scope.pageSize = e.value;
    });
    $scope.currentPage = 0;
  
    $scope.data = [];
    $http.get('itkang-ce342-export.json')
    .then(function(response){
        $scope.data = Object.values(response.data.delegate);
        $scope.numberOfPage = function(){
            return Math.ceil($scope.data.length/$scope.pageSize);
        }
    });
});
app.filter('startFrom', function(){
    return function(input,start){
        start = +start;
        return input.slice(start);
    }
});