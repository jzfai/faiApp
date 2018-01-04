/**
 * Created by fai on 2017/12/25.
 */

var app=angular.module('myApp',['ionic']);
//引入抖动处理服务
app.factory('$debounce', ['$rootScope', '$browser', '$q', '$exceptionHandler',
    function($rootScope, $browser, $q, $exceptionHandler) {
        var deferreds = {},
            methods = {},
            uuid = 0;

        function debounce(fn, delay, invokeApply) {
            var deferred = $q.defer(),
                promise = deferred.promise,
                skipApply = (angular.isDefined(invokeApply) && !invokeApply),
                timeoutId, cleanup,
                methodId, bouncing = false;

            // check we dont have this method already registered
            angular.forEach(methods, function(value, key) {
                if (angular.equals(methods[key].fn, fn)) {
                    bouncing = true;
                    methodId = key;
                }
            });

            // not bouncing, then register new instance
            if (!bouncing) {
                methodId = uuid++;
                methods[methodId] = { fn: fn };
            } else {
                // clear the old timeout
                deferreds[methods[methodId].timeoutId].reject('bounced');
                $browser.defer.cancel(methods[methodId].timeoutId);
            }

            var debounced = function() {
                // actually executing? clean method bank
                delete methods[methodId];

                try {
                    deferred.resolve(fn());
                } catch (e) {
                    deferred.reject(e);
                    $exceptionHandler(e);
                }

                if (!skipApply) $rootScope.$apply();
            };

            timeoutId = $browser.defer(debounced, delay);

            // track id with method
            methods[methodId].timeoutId = timeoutId;

            cleanup = function(reason) {
                delete deferreds[promise.$$timeoutId];
            };

            promise.$$timeoutId = timeoutId;
            deferreds[timeoutId] = deferred;
            promise.then(cleanup, cleanup);

            return promise;
        }


        // similar to angular's $timeout cancel
        debounce.cancel = function(promise) {
            if (promise && promise.$$timeoutId in deferreds) {
                deferreds[promise.$$timeoutId].reject('canceled');
                return $browser.defer.cancel(promise.$$timeoutId);
            }
            return false;
        };

        return debounce;
    }
]);
//定义路由
app.config(function($stateProvider,$urlRouterProvider,$ionicConfigProvider){
    $ionicConfigProvider.tabs.position('bottom');
    $stateProvider
        .state('main',{
            templateUrl:'tpl/Main.html',
            url:'/yyMain'
        })
        .state('index',{
            templateUrl:'tpl/index.html',
            url:'/yyIndex',
            controller:'indexCtrl'
        })
        .state('detail',{
            url:'/yyDetail/:id',
            templateUrl:'tpl/detail.html',
            controller:'detailCtrl'
        })
        .state('login',{
            url:'/yyLogin',
            templateUrl:'tpl/login.html',
            controller:'loginCtrl'
        })
        .state('register',{
            url:'/yyRegister',
            templateUrl:'tpl/register.html',
            controller:'registerCtrl'
        })
        .state('order',{
            url:'/yyOrder',
            templateUrl:'tpl/order.html',
            controller:'orderCtrl'
        })
        .state('cart',{
            url:'/yyCart',
            templateUrl:'tpl/cart.html',
            controller:'cartCtrl'
        })
        $urlRouterProvider.otherwise('/yyMain');
});

//定义一个总的跳转控制器
app.controller('jumpCtrl',['$scope','$state',function($scope,$state){
    $scope.jump=function(path,params){
        $state.go(path,params);
    }
}]);

//定义控制器
//index
app.controller('indexCtrl',['$scope','$state','$http','$debounce',
    function($scope,$state,$http,$debounce){
        //发送请求
        var start=1;
        $http
            .get('data/Id.php?start='+start)
            .success(function(data){
                $scope.iList=data;
            });
        //停止上啦刷新
        $scope.hasMore=true;
        $scope.toInfinite=function(){
            //上拉加载更多
            start+=start+5;
            $http
                .get('data/Id.php?start='+start)
                .success(function(data){
                    if(data.length>=5){
                        $scope.iList=$scope.iList.concat(data);
                    }
                    else{
                        $scope.hasMore=false;
                    }

                });
            $scope.$broadcast('scroll.infiniteScrollComplete');
        };

        //搜索模糊查询
        $scope.inputValue='';
        //监听的时ng-module绑定的数据
        $scope.$watch('inputValue',function(){
            //引进抖动处理
            $debounce(toSearch,800);
        });
        //有数据时发送请求
        toSearch=function(){
            if($scope.inputValue){
                $http
                    .get('data/search.php?title='+$scope.inputValue)
                    .success(function(data){
                        if(data.length>0){
                            $scope.iList=data;
                            console.log(data);
                        }
                    });
            }
        }
    }]
);
//detail
app.controller('detailCtrl',['$scope','$state','$http','$stateParams',
    function($scope,$state,$http,$stateParams){
        //获得传过来的id；
        var pId=$stateParams.id;
        //用ionic的http发送请求
        $http
            .get('data/detail.php?pId='+pId)
            .success(function(data){
                $scope.dList=data;
            });

        $scope.toCart=function(){
            //判断用户是否登录
            if(sessionStorage['uId']){
                var uId=sessionStorage['uId'];
                var count=1;
                $http
                    .get(`data/addCart.php?pId=${pId}&uId=${uId}&count=${count}`)
                    .success(function(data){
                        if(data.code===1){
                            alert('添加成功');
                        }
                        else if(data.code===-1){
                            alert('添加失败，请检查网络');
                        }
                    });
            }
            else{
                alert('您还没登录,请登录');
                location.href='#/yyLogin';
            }
        }
    }
]);
//login
app.controller('loginCtrl',['$scope','$state','$http','$httpParamSerializerJQLike','$ionicModal',
    function($scope,$state,$http,$httpParamSerializerJQLike,$ionicModal){
      $scope.log={
            name:'',
            pwd:''
        };
      $scope.toLogin=function(){
          var n=$httpParamSerializerJQLike($scope.log);
          //   用 zepto发送ajax请求
          $.ajax({
              method:'post',
              url:'data/login.php',
              data:$scope.log,
              success:function(data){
                  if(data.code>0){
                      alert('登陆成功');
                      sessionStorage['uId']=data.row.uId;
                      location.href='#/yyCart';
                  }
                  else if(data.code===-1){
                      alert('用户名或密码错误');
                  }
                  else{
                      alert('网络连接失败');
                  }
              }

          });
      };

      //自定义模态窗
      $ionicModal
          .fromTemplateUrl('tpl/modal.html',{
                    scope:$scope
                })
          .then(function(data){
                    $scope.modal=data;
                });
      $scope.hide=function(){
                $scope.modal.hide();
            };
      $scope.show=function(){
                console.log('hide func is called');
                $scope.modal.show();
            }

    }
]);
//register
app.controller('registerCtrl',['$scope','$state','$http','$httpParamSerializerJQLike',
    function($scope,$state,$http,$httpParamSerializerJQLike){
    //用户注册
        $scope.reg={
            pwd:'',
            name: '',
            sex: 1,
            email: '',
            phone: ''
        };
        $scope.toRegister=function(){
            var obj=$httpParamSerializerJQLike($scope.reg);
            $.ajax({
                method:'post',
                url:'data/register.php',
                data:obj,
                success:function(data){
                   if(data.code>0){
                       alert('注册成功');
                       location.href='#/yyLogin';
                   }
                   else{
                       alert('网络连接错误');
                   }
                }
            })
        }
    }
]);
//order
app.controller('orderCtrl',['$scope','$state','$http',
    function($scope,$state,$http){
        //  发送请求获取cart数据
        //    uId需要更换
        var uId= sessionStorage['uId'];
        $http
            .get('data/cart.php?uId='+uId)
            .success(function(data){
                $scope.oList=data;
            });
         setTimeout(function(){
             var price=sessionStorage['price'];
             $('#sumPrice').html(price)
         },0)
    }
]);
//cart
app.controller('cartCtrl',['$scope','$state','$http',
    function($scope,$state,$http){

            //删除整行
        $scope.delRow=function($event,$index){
                $($event.target).parent().parent().remove();
                //更新总价
                $scope.addSum();

                //发送ajax请求更新数据；
                $http
                    .get(`data/cDel.php?row=${$index}`)
                    .success(function(data){
                        if(data.code>0){
                            alert(data.msg);
                        }
                        else{
                            alert(data.msg);
                        }
                    });
            };

          //找到-元素更新单价
        $scope.decBtn=function($event,$index){
            var el=$($event.target).next();
            if(el.html()>1){
                el.html(parseInt(el.html())-1);
                var cur=$(this).parent().next().children('span');
                //通过传过来的index拿到单价
                var price=$scope.cList[$index].price;
                price=parseInt(price);
                //找到小计改变小计的值
                cur=$($event.target).parent().next().children('span');
                cur.html(el.html()*price);
                //更新cart中的count数量
                //$scope.updateCount();
                //更新总计
                $scope.addSum();
            }
        };
        //找到+元素更新单价
        $scope.incBtn=function($event,$index){
            var el=$($event.target).prev();
            el.html(parseInt(el.html())+1);
            //通过传过来的index拿到单价
            var price=$scope.cList[$index].price;
            price=parseInt(price);
            //找到小计改变小计的值
            var cur=$($event.target).parent().next().children('span');
            cur.html(el.html()*price);
             //更新cart中的count数量
            //$scope.updateCount();
             //更新总计
            $scope.addSum();
        };

        //定义更新总计的方法
        $scope.addSum=function(){
            var sum=0;
            var addAll=$('.addSum').siblings('.numb');
            for(var i=0; i<addAll.length;i++){
                var add=parseInt($(addAll[i]).children().last().children('span').html());
                sum+=add;
            }
            $('.addSum').children('span').html(sum);
        // 这里使用sessionStorage将数据存储起来
            sessionStorage['price']=sum;
        };

    //  定义更新数据库中cart pId 中数量的方法
        $scope.cur='';
        $scope.updateCount=function(pId){
            $http
                .get(`data/upCount.php?${cur}&pId=${pId}`)
                .success(function(data){
                if(data.code>0){
                    alert(code.msg);
                }
            });
        };

    //  发送请求获取cart数据
        $scope.uId= sessionStorage['uId'];
        $http
            .get('data/cart.php?uId='+$scope.uId)
            .success(function(data){
                $scope.cList=data;
                setTimeout(function(){
                    $scope.addSum()
                },10);
            });

        ////   获得count(暂未实现)
        //$http
        //    .get('data/getCount.php?uId='+$scope.uId)
        //    .success(function(data){
        //         console.log(data);
        //        $scope.count=data.count;
        //    })
     }



]);

app.controller('mainCtrl',['$scope','$http','$ionicModal',

]);











