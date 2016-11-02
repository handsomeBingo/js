## ng-app
- 启动angular ng开头的为angular的内部指令 会调用我们写好的模块
## ng-model
- 实现双向数据绑定 应用在表单元素中
## {{}}
- 取值表达式 只能写简单表达式，三元运算符 简单判断 简单运算
## module
- 创建一个模块 三个参数 模块名字，模块的依赖，默认为[]，配置，一切从模块开始，模块化
## ng-controller 
- 将数据通过控制器放置到指定的视图中，防止污染$rootScope,声明一个控制器就送一个$scope我们将数和挂载在$scope，防止压缩用数组的方式，app.controller("myCtrl",\["$scope",function(){}\]);
## $scope,$rootScope
- 作用域和根作用域