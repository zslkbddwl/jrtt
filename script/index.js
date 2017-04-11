var width=window.screen.width;
var height=window.screen.height;
var app=angular.module('myApp',['ionic']);
app.config(['$stateProvider','$urlRouterProvider','$ionicConfigProvider',function($stateProvider,$urlRouterProvider,$ionicConfigProvider){
  $ionicConfigProvider.platform.ios.tabs.style('standard');
   $ionicConfigProvider.platform.ios.tabs.position('bottom');
   $ionicConfigProvider.platform.android.tabs.style('standard');
   $ionicConfigProvider.platform.android.tabs.position('standard');

   $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
   $ionicConfigProvider.platform.android.navBar.alignTitle('left');

   $ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-thin-left');
   $ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-android-arrow-back');

   $ionicConfigProvider.platform.ios.views.transition('ios');
   $ionicConfigProvider.platform.android.views.transition('android');
   $ionicConfigProvider.navBar.alignTitle('center'); // 标题位置
   $ionicConfigProvider.navBar.positionPrimaryButtons('left'); // 主要操作按钮位置
   $ionicConfigProvider.navBar.positionSecondaryButtons('right'); //次要操作按钮位置
     $stateProvider.state('tabs',{
       url:'/tabs',
       templateUrl:'view/tabs.html'
     }).state('tabs.shouye',{
       url:'/shouye',
       views : {
         'tab-shouye':{
           templateUrl:'view/shouye.html',
           controller:'shouye'
         }
       }
     }).state('tabs.shouye.huadong',{
       url:'/huadong',
       templateUrl:'view/templates/huadong.html',
       controller:'huadong'
     }).state('tabs.shouye.huadong.ziye',{
       url:'/ziye',
       views :{
         'huadong-page0' : {
            templateUrl:'view/templates/huadongmoban.html',
            controller:'page0'
         },
         'huadong-page1' : {
            templateUrl:'view/templates/huadongmoban.html',
            controller:'page1'
         },
         'huadong-page2' : {
            templateUrl:'view/templates/huadongmoban.html',
            controller:'page2'
         },
         'huadong-page3' : {
            templateUrl:'view/templates/huadongmoban.html',
            controller:'page3'
         },
         'huadong-page4' : {
            templateUrl:'view/templates/huadongmoban.html',
            controller:'page4'
         },
         'huadong-page5' : {
            templateUrl:'view/templates/huadongmoban.html',
            controller:'page5'
         },
         'huadong-page6' : {
            templateUrl:'view/templates/huadongmoban.html',
            controller:'page6'
         },
         'huadong-page7' : {
            templateUrl:'view/templates/huadongmoban.html',
            controller:'page7'
         },
         'huadong-page8' : {
            templateUrl:'view/templates/huadongmoban.html',
            controller:'page8'
         },
         'huadong-page9' : {
            templateUrl:'view/templates/huadongmoban.html',
            controller:'page9'
         }
       }
     }).state('tabs.shipin',{
       url:'/shipin',
       views : {
         'tab-shipin':{
           templateUrl:'view/shipin.html'
         }
       }
     }).state('tabs.guanzhu',{
       url:'/guanzhu',
       views : {
         'tab-guanzhu':{
           templateUrl:'view/guanzhu.html',
           controller:'guanzhu'
         }
       }
     }).state('tabs.weidenglu',{
       url:'/weidenglu',
       views : {
         'tab-weidenglu':{
           templateUrl:'view/weidenglu.html'
         }
       }
     });
     $urlRouterProvider.otherwise('/tabs/shouye/huadong/ziye')
}])

app.controller('myController',['$scope',function($scope) {
$scope.titles = ['头条','社会','国内','国际','娱乐','体育','军事','科技','财经','时尚'];
}])
app.controller('shouye',['$scope','$ionicSlideBoxDelegate',function($scope,$ionicSlideBoxDelegate){
$scope.navBtnClick=function(index){
  $ionicSlideBoxDelegate.slide(index)
}
}])
var k=2;
app.controller('huadong',['$scope','toububuttonfuwu','$timeout','$ionicScrollDelegate','$http','appShuju','$ionicLoading',function($scope,toububuttonfuwu,$timeout,$ionicScrollDelegate,$http,appShuju,$ionicLoading){
  $scope.arr=['top','shehui','guonei','guoji','yule','tiyu','junshi','keji','caijing','shishang']
$scope.nihao=function(type){
  var that=this;
  var page_no = 1;
  var page_total = 3;
  var j=0;
  var k=1;
  this.doRefresh=function(){
    var promise=appShuju.getShuju(type);
    promise.then(function(data){
      var arr=[];
      for (var i = 0; i < data.length/3; i++) {
         arr.push(data[i]);
      }

       that.contents=arr;
      page_no = 1;
      j=0;
      k=1;
    },function(errot){

    }).finally(function(value){
      console.log("111");
      that.$broadcast('scroll.refreshComplete');

    });
  }
    this.ifjiazai = function(){
      return page_no <= page_total;
    }
    this.hidejiazai = function(){
      if(page_no == 1)
        return true;
      else
        return false;
    }
   this.jiazai=function(){
       var promise=appShuju.getShuju(type);
       if(page_no == 1)
       $ionicLoading.show();
       promise.then(function(data){
         var arr=[];
         for( var i = j*(data.length/3)+1; i < k*(data.length/3); i++){
           arr.push(data[i]);
         }
         j++;k++;
         if(page_no==1){
           that.contents=arr;
           return;
         }else {
           that.contents=that.contents.concat(arr);
         }
       },function(errot){

       }).finally(function(value){
         if(page_no == 1) $ionicLoading.hide();
         page_no +=1;
         that.$broadcast('scroll.infiniteScrollComplete');
         that.$broadcast('scroll.refreshComplete');
       });
     }
}


  $timeout(function(){
    toububuttonfuwu.getfunction();
    var toububutton=fanhui.toububutton;
  })
$scope.slideHasChanged =function(index){
  for (var i = 0; i < toububutton.children.length;i++) {
    toububutton.children[i].style.color= "black";
  }
toububutton.children[index].style.color= "red";
if(index>=1){
   $ionicScrollDelegate.$getByHandle('navScroll').scrollTo((index-1)*fanhui.butwidth,0,true);
};
}
}])
app.factory('toububuttonfuwu',function(){
  return {
    fanhui:{
      toububutton:document.getElementById('toububutton'),
      butwidth:(width*(10/3))/10
    },
     getfunction:function(){
       toububutton.style.width=width*(10/3)+"px";
       document.getElementById("slide-box").style.height=height-44-30-49+"px"
       for (var i = 0; i <toububutton.children.length; i++) {
         toububutton.children[i].style.width=this.fanhui.butwidth+"px";
       }
       toububutton.children[0].style.color= "red";
      return fanhui=this.fanhui;
     }
  }
})
//请求服务
app.factory('appShuju',['$http','$q',function($http,$q){
  return{
    getShuju:function(type){
       var defer=$q.defer();
       $http.get('http://www.lgdwl.com/jinritoutiao.php?type='+type).success(function(data){
         defer.resolve(data.result.data)
         console.log(data);
       }).error(function(err){
         defer.reject(err)
       });
       return defer.promise;
    }
  };
}]);
app.constant('$ionicLoadingConfig', {
		template: '<ion-spinner icon="bubbles" class="spinner-energized"></ion-spinner>',
        noBackdrop : true,
});
app.controller('page0',['$scope',function($scope){
  $scope.nihao('top')
}])
app.controller('page1',['$scope',function($scope){
  $scope.nihao('shehui')
}])
app.controller('page2',['$scope',function($scope){
  $scope.nihao('guonei')
}])
app.controller('page3',['$scope',function($scope){
  $scope.nihao('guoji')
}])
app.controller('page4',['$scope',function($scope){
  $scope.nihao('yule')
}])
app.controller('page5',['$scope',function($scope){
  $scope.nihao('tiyu')
}])
app.controller('page6',['$scope',function($scope){
  $scope.nihao('junshi')
}])
app.controller('page7',['$scope',function($scope){
  $scope.nihao('caijing')
}])
app.controller('page8',['$scope',function($scope){
  $scope.nihao('shehui')
}])
app.controller('page9',['$scope',function($scope){
  $scope.nihao('shishang')
}])
app.controller('guanzhu',['$scope',function($scope){
  console.log(document.getElementById("guanzhudiv"));
document.getElementById("guanzhudiv").style.height=(height-44-81-49)+"px";
}])
