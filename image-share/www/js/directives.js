angular.module('com.htmlxprs.imageShare.directives',[]).directive('browseFile',['$rootScope','USER',function($rootScope,USER){
    return {
        scope:{

        },
        replace:true,
        restrict:'AE',
        link:function(scope,elem,attrs){

            scope.browseFile=function(){
                document.getElementById('browseBtn').click();
            }

            angular.element(document.getElementById('browseBtn')).on('change',function(e){

               var file=e.target.files[0];
               var track = file.name;

               angular.element(document.getElementById('browseBtn')).val('');

               var fileReader=new FileReader();

               fileReader.onload=function(event){
                    console.log("data is loaded");
                   $rootScope.$broadcast('event:file:selected',{audio:event.target.result, trackName:track, sender:USER.name});
               }

               fileReader.readAsDataURL(file);
            });

        },
        templateUrl:'views/browse-file.html'
    }
}]).directive('chatList',['$rootScope','$sce', 'SOCKET_URL',function($rootScope,$sce, SOCKET_URL){
    return{
        replace:true,
        restrict:'AE',
        scope:{

        },
        link:function(scope,elem,attrs){

            scope.trustSrc = function(src) {
                return $sce.trustAsResourceUrl(src);
            }

            var socket=io(SOCKET_URL);

            scope.messages=[];

            $rootScope.$on('event:file:selected',function(event,data){

                socket.emit('event:new:audio',data);
                console.log("my data");
                console.log(data);
                scope.$apply(function(){
                    scope.messages.unshift(data);
                    console.log(scope.messages);
                });

            });

            socket.on('event:incoming:audio',function(data){
                console.log("received");
                console.log(data);
                
                scope.$apply(function(){
                    scope.messages.unshift(data);
                    console.log(scope.messages);
                });

            });

        },
        templateUrl:'views/chat-list.html'
    }
}]);