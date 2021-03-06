var fileUpload=angular.module("fileUpload",[])

fileUpload.directive('fileModel', ['$parse','$rootScope', function ($parse,$rootScope) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs, ngModel) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            element.bind('change', function(event){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
                //附件预览
                
                var file = (event.srcElement || event.target).files[0];
                scope.file = file;
                if($rootScope.files===undefined){
                    $rootScope.files = [];
                }
                $rootScope.files.push(file)
                scope.getFile();
                console.log($rootScope.files);
            });
        }
    };
}]);
fileUpload.factory('fileReader', ["$q", "$log","$rootScope", function($q, $log){
    var onLoad = function(reader, deferred, scope) {
        return function () {
            scope.$apply(function () {
                deferred.resolve(reader.result);
            });
        };
    };
    var onError = function (reader, deferred, scope) {
        return function () {
            scope.$apply(function () {
                deferred.reject(reader.result);
            });
        };
    };
    var getReader = function(deferred, scope) {
        var reader = new FileReader();
        reader.onload = onLoad(reader, deferred, scope);
        reader.onerror = onError(reader, deferred, scope);
        return reader;
    };
    var readAsDataURL = function (file, scope,rootScope) {
        var deferred = $q.defer();
        var reader = getReader(deferred, scope);         
        var f = reader.readAsDataURL(file);

        return deferred.promise;
    };
    return {
        readAsDataUrl: readAsDataURL  
    };
}])

fileUpload.service('fileUpload', ['$http', function ($http) {
    this.uploadFileToUrl = function(file, uploadUrl,callback){
        var fd = new FormData();
        fd.append('file', file);
        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
        .success(function(response){
            console.log(response)
            callback(response);
        })
        .error(function(){
        });
    }
}]);
fileUpload.controller('fileUploadCtrl', function($scope,$rootScope,fileReader,fileUpload){
    
   //  $scope.getFile = function () {
   //      fileReader.readAsDataUrl($scope.file, $scope)
   //      .then(function(result) {
   //          $scope.imageSrc = result;
   //      });
   //  };

})
