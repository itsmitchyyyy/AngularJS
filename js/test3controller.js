var app = angular.module('app', []);
app.controller('test', function($scope,$http){
    $scope.header = {
        school : 'School',
        delegates: 'Delegates',
        paids: 'Paid',
        amounts: 'Amount'
    }
    $scope.sort = {
        column: 'school',
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
    $scope.entries = [
        {'value':'10','label':'10'},
        {'value':'25','label':'25'},
        {'value':'50','label':'50'},
        {'value':'100','label':'100'}
    ]
    $scope.pageEntries = $scope.entries[0];
    $scope.$watch('pageEntries', function(e){
        $scope.pageSize = e.value;
    });
    $scope.currentPage = 0;
    $scope.data = [];
    $http.get('itkang-ce342-export.json')
    .then(function(response){
        $scope.data = Object.values(response.data.delegate);
        $scope.numberOfPage = function(e){
            return Math.ceil(Object.keys(e).length/$scope.pageSize);
        }

        $scope.schools = [];
        for(var i in $scope.data){
            var key = i;
            var val = $scope.data[i];
            for(var j in val){
                var sub_key = j;
                var sub_val = val[j];
                if(sub_key == 'school'){
                    $scope.schools.push(sub_val);
                }
            }
        }
        $scope.schoolList = function(){
            $scope.counts = [];
            for(var i = 0; i <= $scope.schools.length; i++){
                if($scope.counts[$scope.schools[i]] === undefined){
                    $scope.counts[$scope.schools[i]] = 1;
                }else{
                    $scope.counts[$scope.schools[i]] = 0;
                }
            }
            $scope.school_list = [];
            for(var j in $scope.counts){
                if(j !== 'undefined'){
                   $scope.school_list.push(j);
                }
            }
            return Object.values($scope.school_list);
        }
        $scope.totalStudents = function(e){
            var total = 0;
            for(var i = 0; i < $scope.data.length; i++){
                if(e == $scope.data[i].school){
                    total += 1;
                }
            }
            return total;
        }
        $scope.totalPaid = function(e){
            var total = 0;
            for(var i = 0; i < $scope.data.length; i++){
                if(e == $scope.data[i].school){
                    if($scope.data[i].paid == 1){
                    total += 1;
                    }
                }
            }
            return total;
        }
        $scope.totalAmount = function(e){
            var total = 0;
            var amount = 0;
            for(var i = 0; i < $scope.data.length; i++){
                if(e == $scope.data[i].school){
                    if($scope.data[i].paid == 1){
                        total += 1;
                    }
                    amount = total * 50;
                }
            }
            return amount;
        }
        $scope.subTotalAmount = function(e){
            var sum = 0;
            var total = 0;
            for(var i = 0; i < e.length; i++){
            total += $scope.totalAmount(e[i]);
            }
            return total;
        }
        $scope.subTotalPaid = function(e){
            var sum = 0;
            var total = 0;
            for(var i = 0; i < e.length; i++){
            total += $scope.totalPaid(e[i]);
            }
            return total;
        }
        $scope.subTotalStudents = function(e){
            var sum = 0;
            var total = 0;
            for(var i = 0; i < e.length; i++){
            total += $scope.totalStudents(e[i]);
            }
            return total;
        }
    });
}); 
app.filter('startFrom', function(){
    return function(input,start){
        if (!input || !input.length) { return; }
        start = +start;
        return input.slice(start);
    }
});
