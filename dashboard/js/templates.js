(function(module) {
try {
  module = angular.module('SeanApp');
} catch (e) {
  module = angular.module('SeanApp', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('tpl/footer.html',
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('SeanApp');
} catch (e) {
  module = angular.module('SeanApp', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('tpl/header.html',
    '<header class="page-header"><nav class="navbar mega-menu"role="navigation"><div class="container-fluid"style="position:relative"><div class="clearfix navbar-fixed-top"><ul class="yfops-nav"><li ng-class="{\'dashboard\':\'active\',\'factory\':\'active\',\'financeSearch\':\'active\'}[$parent.$state.current.name]"><a ui-sref="dashboard">Material</a><ul class="yfops-nav2"><li ng-class="{\'dashboard\':\'active\',\'financeSearch\':\'active\'}[$parent.$state.current.name]"><a ui-sref="dashboard"><i class="icon-bar-chart"></i> 总览</a></li><li ng-class="{\'factory\':\'active\'}[$parent.$state.current.name]"><a ui-sref="factory"><i class="icon-bulb"></i> 对标</a></li></ul></li><li ng-class="{\'BBPOverview\':\'active\',\'BBPFactory\':\'active\',\'BBPSearch\':\'active\'}[$parent.$state.current.name]"><a ui-sref="BBPOverview">BBP-CC</a><ul class="yfops-nav2"><li ng-class="{\'BBPOverview\':\'active\',\'BBPSearch\':\'active\'}[$parent.$state.current.name]"><a ui-sref="BBPOverview"><i class="icon-bar-chart"></i> 总览</a></li><li ng-class="{\'BBPFactory\':\'active\'}[$parent.$state.current.name]"><a ui-sref="BBPFactory"><i class="icon-bulb"></i> 对标</a></li></ul></li><li ng-class="{\'HROverview\':\'active\',\'HRFactory\':\'active\',\'HRSearch\':\'active\'}[$parent.$state.current.name]"><a ui-sref="HROverview">BBP-LH</a><ul class="yfops-nav2"><li ng-class="{\'HROverview\':\'active\',\'HRSearch\':\'active\'}[$parent.$state.current.name]"><a ui-sref="HROverview"><i class="icon-bar-chart"></i> 总览</a></li><li ng-class="{\'HRFactory\':\'active\'}[$parent.$state.current.name]"><a ui-sref="HRFactory"><i class="icon-bulb"></i> 对标</a></li></ul></li><li ng-class="{\'OtherOverview\':\'active\',\'OtherFactory\':\'active\', \'OtherSearch\':\'active\'}[$parent.$state.current.name]"><a ui-sref="OtherOverview">Other</a><ul class="yfops-nav2"><li ng-class="{\'OtherOverview\':\'active\',\'OtherSearch\':\'active\'}[$parent.$state.current.name]"><a ui-sref="OtherOverview"><i class="icon-bar-chart"></i> 总览</a></li><li ng-class="{\'OtherFactory\':\'active\'}[$parent.$state.current.name]"><a ui-sref="OtherFactory"><i class="icon-bulb"></i> 对标</a></li></ul></li></ul><div class="nav-collapse collapse navbar-collapse navbar-responsive-collapse"><ul class="nav navbar-nav"><li class="dropdown dropdown-fw"ng-class="{\'dashboard\':\'active open selected\',\'factory\':\'active open selected\',\'financeSearch\':\'active open selected\'}[$parent.$state.current.name]"><a href="javascript:;"ui-sref="dashboard"><i class="icon-home"></i> Material</a><ul class="dropdown-menu dropdown-menu-fw"><li ng-class="{\'dashboard\':\'active\',\'financeSearch\':\'active\'}[$parent.$state.current.name]"><a ui-sref="dashboard"><i class="icon-bar-chart"></i> 总览</a></li><li ng-class="{\'factory\':\'active\'}[$parent.$state.current.name]"><a ui-sref="factory"><i class="icon-bulb"></i> 对标</a></li></ul></li><li class="dropdown dropdown-fw"ng-class="{\'BBPOverview\':\'active open selected\',\'BBPFactory\':\'active open selected\',\'BBPSearch\':\'active open selected\'}[$parent.$state.current.name]"><a href="javascript:;"ui-sref="BBPOverview"><i class="icon-puzzle"></i> BBP-CC</a><ul class="dropdown-menu dropdown-menu-fw"><li ng-class="{\'BBPOverview\':\'active\',\'BBPSearch\':\'active\'}[$parent.$state.current.name]"><a ui-sref="BBPOverview"><i class="icon-bar-chart"></i> 总览</a></li><li ng-class="{\'BBPFactory\':\'active\'}[$parent.$state.current.name]"><a ui-sref="BBPFactory"><i class="icon-bulb"></i> 对标</a></li></ul></li><li class="dropdown dropdown-fw"ng-class="{\'HROverview\':\'active open selected\',\'HRFactory\':\'active open selected\',\'HRSearch\':\'active open selected\'}[$parent.$state.current.name]"><a href="javascript:;"ui-sref="HROverview"><i class="icon-user"></i> BBP-LH</a><ul class="dropdown-menu dropdown-menu-fw"><li ng-class="{\'HROverview\':\'active\',\'HRSearch\':\'active\'}[$parent.$state.current.name]"><a ui-sref="HROverview"><i class="icon-bar-chart"></i> 总览</a></li><li ng-class="{\'HRFactory\':\'active\'}[$parent.$state.current.name]"><a ui-sref="HRFactory"><i class="icon-bulb"></i> 对标</a></li></ul></li><li class="dropdown dropdown-fw"ng-class="{\'OtherOverview\':\'active open selected\',\'OtherFactory\':\'active open selected\', \'OtherSearch\':\'active open selected\'}[$parent.$state.current.name]"><a href="javascript:;"ui-sref="OtherOverview"><i class="fa fa-paper-plane"></i> Other</a><ul class="dropdown-menu dropdown-menu-fw"><li ng-class="{\'OtherOverview\':\'active\',\'OtherSearch\':\'active\'}[$parent.$state.current.name]"><a ui-sref="OtherOverview"><i class="icon-bar-chart"></i> 总览</a></li><li ng-class="{\'OtherFactory\':\'active\'}[$parent.$state.current.name]"><a ui-sref="OtherFactory"><i class="icon-bulb"></i> 对标</a></li></ul></li></ul><div class="topbar-actions"><div class="btn-group-img btn-group"><button type="button"class="yfops-top-btn btn btn-sm md-skip dropdown-toggle"data-toggle="dropdown"data-hover="dropdown"data-close-others="true"><span ng-click="selectPBU(\'JIT PBU\',$event)">JIT PBU</span></button></div></div></div></div></div></nav></header>');
}]);
})();

(function(module) {
try {
  module = angular.module('SeanApp');
} catch (e) {
  module = angular.module('SeanApp', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('tpl/sidebar.html',
    '<div class="page-sidebar-wrapper"><div class="page-sidebar navbar-collapse collapse"><ul class="page-sidebar-menu page-header-fixed"data-keep-expanded="false"data-auto-scroll="true"data-slide-speed="200"style="padding-top: 20px"><li class="nav-item"ng-repeat="item in menu"><a href="javascript:;"class="nav-link nav-toggle"><i class="fa {{item.resourceType}}"></i> <span class="title">{{item.resourceName}}</span> <span class="arrow"ng-if="item.child"></span></a><ul class="sub-menu"ng-if="item.child"><li class="nav-item"ng-repeat="i in item.child"><a href="{{i.url}}"target="_blank"class="nav-link nav-toggle"><span class="title">{{i.resourceName}}</span> <span class="arrow"ng-if="i.child"></span></a><ul class="sub-menu"ng-if="i.child"><li class="nav-item"ng-repeat="j in i.child"><a class="nav-link nav-toggle"><span class="title"ng-click="open(j.url,$event)">{{j.resourceName}}</span> <span class="arrow"ng-if="j.child"></span></a><ul class="sub-menu"ng-if="j.child"><li class="nav-item"ng-repeat="k in j.child"><a href="{{k.url}}"target="_blank"class="nav-link">{{k.resourceName}}</a></li></ul></li></ul></li></ul></li></ul></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('SeanApp');
} catch (e) {
  module = angular.module('SeanApp', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('views/BBPFactory.html',
    '<div class="yfops-entity"><h4 ng-bind="date">2016年10月</h4></div><div class="navbar-actions"ng-class="{\'BBPOverview\':\'active\',\'BBPFactory\':\'active\'}[$parent.$state.current.name]"><div class="btn-group-img btn-group"><button type="button"class="yfops-top-btn btn md-skip dropdown-toggle"data-toggle="dropdown"data-hover="dropdown"data-close-others="true"><span ng-bind="currentFilter">CC/EQU</span> <i class="fa fa-caret-down font-white"></i></button><ul class="dropdown-menu"role="menu"><li ng-repeat="filter in filterList"ng-click="setFilter(filter)"><a href="#"><i class="icon-calendar"></i> <span ng-bind="filter">11</span></a></li></ul></div></div><div class="row"><div class="col-lg-12 col-md-12 col-sm-12"><div class="portlet light bordered yfops-widget"><div class="portlet-title"><div class="caption"><i class="icon-bar-chart font-dark hide"></i> <span class="caption-subject font-dark bold"ng-bind="title1">月度</span></div><div class="actions"><a class="btn btn-circle fa fa-download btn-default"></a> <a class="btn btn-circle fa fa-search-plus btn-default"></a></div></div><div class="portlet-body"><div id="chart1"class="ops-chart"></div></div></div></div><div class="col-lg-12 col-md-12 col-sm-12"><div class="portlet light bordered yfops-widget"><div class="portlet-title"><div class="caption"><i class="icon-share font-red-sunglo hide"></i> <span class="caption-subject font-dark bold"ng-bind="title2">月度</span></div><div class="actions"><a class="btn btn-circle fa fa-download btn-default"></a> <a class="btn btn-circle fa fa-search-plus btn-default"></a></div></div><div class="portlet-body"><div id="chart2"class="ops-chart"></div></div></div></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('SeanApp');
} catch (e) {
  module = angular.module('SeanApp', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('views/BBPOverview.html',
    '<div class="yfops-entity"><h4 ng-bind="entityShortName">title</h4><h4 ng-bind="date">2016年10月</h4></div><div class="navbar-actions"ng-class="{\'BBPOverview\':\'active\',\'BBPFactory\':\'active\',\'BBPSearch\':\'active\'}[$parent.$state.current.name]"><div class="btn-group-img btn-group"><button type="button"class="yfops-top-btn btn md-skip dropdown-toggle"data-toggle="dropdown"data-hover="dropdown"data-close-others="true"><span ng-bind="currentFilter">CC/EQU</span> <i class="fa fa-caret-down font-white"></i></button><ul class="dropdown-menu dropdown-menu-right"role="menu"><li ng-repeat="filter in filterList"ng-click="setFilter(filter)"><a href="#"><i class="icon-calendar"></i> {{filter}}</a></li></ul></div></div><div class="row"><div class="col-md-6 col-sm-6"><div class=""><div class="portlet-body yfops-widget yfops-widget-border"><div class="widget-map yfops-map"><div id="mapplic"class="widget-map-mapplic"></div></div><div class="yfops-map-list"><ul class="yfops-sparkline"><li ng-repeat="bu in BuNameList"on-repeat-finished ng-click="selectBU(bu,$event)"><div class="yfops-sparkline-title"ng-bind="bu">BU1</div><div class="yfops-sparkline-chart widget_sparkline_bar"data-array="8,7,9,8.5,8,8.2"></div><div class="clearfix"></div></li></ul></div></div></div></div><div class="col-md-6 col-sm-6 yfops-widget"><div class="row"><div class="col-lg-6 col-md-6 col-sm-6 col-xs-12"ng-repeat="value in values"><div class="dashboard-stat2 bordered"><div class="display"><div class="number"><h3 class="font-blue-sharp ellipsis"><span data-counter="counterup"data-value="7800"ng-bind="value.axisValue | number">0</span> <span class="yfops-unit"ng-bind="value.unit">元</span></h3><small ng-bind="value.lable"class="ellipsis">库存金额</small></div></div><div class="progress-info"><div class="progress"><span ng-style="{\'width\': \'{{value.percent | number:1}}%\'}"class="progress-bar progress-bar-success blue-sharp"><span class="sr-only">{{value.percent | number:1}}% progress</span></span></div><div class="status"><div class="status-title"ng-bind="value.axis">progress</div><div class="status-number">{{value.percent | number:1}}%</div></div></div></div></div></div></div><div class="col-lg-6 col-md-12 col-sm-12"><div class="portlet light bordered yfops-widget"><div class="portlet-title"><div class="caption"><i class="icon-bar-chart font-dark hide"></i> <span class="caption-subject font-dark bold"ng-bind="title1">月度</span></div><div class="actions"><a class="btn btn-circle fa fa-download btn-default"></a> <a class="btn btn-circle fa fa-search-plus btn-default"></a></div></div><div class="portlet-body"><div id="chart1"class="ops-chart"></div></div></div></div><div class="col-lg-6 col-md-12 col-sm-12"><div class="portlet light bordered yfops-widget"><div class="portlet-title"><div class="caption"><i class="icon-share font-red-sunglo hide"></i> <span class="caption-subject font-dark bold"ng-bind="title2">月度</span></div><div class="actions"><a class="btn btn-circle fa fa-download btn-default"></a> <a class="btn btn-circle fa fa-search-plus btn-default"></a></div></div><div class="portlet-body"><div id="chart2"class="ops-chart"></div></div></div></div><div class="col-lg-6 col-md-12 col-sm-12"><div class="portlet light bordered yfops-widget"><div class="portlet-title"><div class="caption"><i class="icon-share font-red-sunglo hide"></i> <span class="caption-subject font-dark bold"ng-bind="title3">月度</span></div><div class="actions"><a class="btn btn-circle fa fa-download btn-default"></a> <a class="btn btn-circle fa fa-search-plus btn-default"></a></div></div><div class="portlet-body"><div id="chart3"class="ops-chart"style="height:400px"></div></div></div></div><div class="col-lg-6 col-md-12 col-sm-12"><div class="portlet light bordered yfops-widget"><div class="portlet-title"><div class="caption"><i class="icon-share font-red-sunglo hide"></i> <span class="caption-subject font-dark bold"ng-bind="title4">月度</span></div><div class="actions"><a class="btn btn-circle fa fa-download btn-default"></a> <a class="btn btn-circle fa fa-search-plus btn-default"></a></div></div><div class="portlet-body"><div id="chart4"class="ops-chart"style="height:400px"></div></div></div></div><div class="col-lg-6 col-md-12 col-sm-12"><div class="portlet light bordered yfops-widget"><div class="portlet-title"><div class="caption"><i class="icon-share font-red-sunglo hide"></i> <span class="caption-subject font-dark bold"ng-bind="title5">月度</span></div><div class="actions"><a class="btn btn-circle fa fa-download btn-default"></a> <a class="btn btn-circle fa fa-search-plus btn-default"></a></div></div><div class="portlet-body"><div id="chart5"class="ops-chart"style="height:400px"></div></div></div></div><div class="col-lg-6 col-md-12 col-sm-12"><div class="portlet light bordered yfops-widget"><div class="portlet-title"><div class="caption"><i class="icon-share font-red-sunglo hide"></i> <span class="caption-subject font-dark bold"ng-bind="title6">月度</span></div><div class="actions"><a class="btn btn-circle fa fa-download btn-default"></a> <a class="btn btn-circle fa fa-search-plus btn-default"></a></div></div><div class="portlet-body"><div id="chart6"class="ops-chart"style="height:400px"></div></div></div></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('SeanApp');
} catch (e) {
  module = angular.module('SeanApp', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('views/chart.html',
    '<div class="wrapper"><div class="container-fluid"><div class="portlet light bordered yfops-widget"style="margin-bottom:0px!important"><div class="portlet-body"><div id="chart"class="ops-chart"></div></div></div></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('SeanApp');
} catch (e) {
  module = angular.module('SeanApp', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('views/dashboard.html',
    '<div class="yfops-entity"><h4 ng-bind="entityShortName">title</h4><h4 ng-bind="date">2016年10月</h4></div><div class="row"><div class="col-md-6 col-sm-6"><div class=""><div class="portlet-body yfops-widget yfops-widget-border"><div class="widget-map yfops-map"><div id="mapplic"class="widget-map-mapplic"></div></div><div class="yfops-map-list"><ul class="yfops-sparkline"><li ng-repeat="bu in BuNameList"on-repeat-finished ng-click="selectBU(bu,$event)"><div class="yfops-sparkline-title"ng-bind="bu">BU1</div><div class="yfops-sparkline-chart widget_sparkline_bar"data-array="8,7,9,8.5,8,8.2"></div><div class="clearfix"></div></li></ul></div></div></div></div><div class="col-md-6 col-sm-6 yfops-widget"><div class="row"><div class="col-lg-6 col-md-6 col-sm-6 col-xs-12"ng-repeat="value in values"><div class="dashboard-stat2 bordered"><div class="display"><div class="number"><h3 class="font-blue-sharp ellipsis"><span data-counter="counterup"data-value="7800"ng-bind="value.axisValue | number">0</span> <span class="yfops-unit"ng-bind="value.unit">元</span></h3><small ng-bind="value.lable"class="ellipsis">库存金额</small></div></div><div class="progress-info"ng-if="value"><div class="progress"><span ng-style="{\'width\': \'{{value.percent | number:1}}%\'}"class="progress-bar progress-bar-success blue-sharp"><span class="sr-only">{{value.percent | number:1}}% progress</span></span></div><div class="status"><div class="status-title"ng-bind="value.axis">progress</div><div class="status-number">{{value.percent | number:1}}%</div></div></div></div></div></div></div><div class="col-md-6 col-sm-6"><div class="portlet light bordered yfops-widget"><div class="portlet-title"><div class="caption"><i class="icon-bar-chart font-dark hide"></i> <span class="caption-subject font-dark bold"ng-bind="title1">月度</span></div><div class="actions"><a class="btn btn-circle fa fa-download btn-default"></a> <a class="btn btn-circle fa fa-search-plus btn-default"></a></div></div><div class="portlet-body"><div id="chart1"class="ops-chart"></div></div></div></div><div class="col-md-6 col-sm-6"><div class="portlet light bordered yfops-widget"><div class="portlet-title"><div class="caption"><i class="icon-share font-red-sunglo hide"></i> <span class="caption-subject font-dark bold"ng-bind="title2">月度</span></div><div class="actions"><a class="btn btn-circle fa fa-download btn-default"></a> <a class="btn btn-circle fa fa-search-plus btn-default"></a></div></div><div class="portlet-body"><div id="chart2"class="ops-chart"></div></div></div></div><div class="col-md-6 col-sm-6"><div class="portlet light bordered yfops-widget"><div class="portlet-title"><div class="caption"><i class="icon-bar-chart font-dark hide"></i> <span class="caption-subject font-dark bold"ng-bind="title5">年度</span></div><div class="actions"><a class="btn btn-circle fa fa-download btn-default"></a> <a class="btn btn-circle fa fa-search-plus btn-default"></a></div></div><div class="portlet-body"><div id="chart5"class="ops-chart"></div></div></div></div><div class="col-md-6 col-sm-6"><div class="portlet light bordered yfops-widget"><div class="portlet-title"><div class="caption"><i class="icon-share font-red-sunglo hide"></i> <span class="caption-subject font-dark bold"ng-bind="title6">年度</span></div><div class="actions"><a class="btn btn-circle fa fa-download btn-default"></a> <a class="btn btn-circle fa fa-search-plus btn-default"></a></div></div><div class="portlet-body"><div id="chart6"class="ops-chart"></div></div></div></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('SeanApp');
} catch (e) {
  module = angular.module('SeanApp', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('views/factory.html',
    '<div class="yfops-entity"><h4 ng-bind="date">2016年10月</h4></div><div class="row"><div class="col-md-12 col-sm-12"><div class="portlet light bordered yfops-widget"><div class="portlet-title"><div class="caption"><i class="icon-bar-chart font-dark hide"></i> <span class="caption-subject font-dark bold"ng-bind="title1">月度</span></div><div class="actions"><a class="btn btn-circle fa fa-download btn-default"></a> <a class="btn btn-circle fa fa-search-plus btn-default"></a></div></div><div class="portlet-body"><div id="chart1"class="ops-chart"></div></div></div></div><div class="col-md-12 col-sm-12"><div class="portlet light bordered yfops-widget"><div class="portlet-title"><div class="caption"><i class="icon-share font-red-sunglo hide"></i> <span class="caption-subject font-dark bold"ng-bind="title2">月度</span></div><div class="actions"><a class="btn btn-circle fa fa-download btn-default"></a> <a class="btn btn-circle fa fa-search-plus btn-default"></a></div></div><div class="portlet-body"><div id="chart2"class="ops-chart"></div></div></div></div><div class="col-md-12 col-sm-12"><div class="portlet light bordered yfops-widget"><div class="portlet-title"><div class="caption"><i class="icon-share font-red-sunglo hide"></i> <span class="caption-subject font-dark bold"ng-bind="title3">月度</span></div><div class="actions"><a class="btn btn-circle fa fa-download btn-default"></a> <a class="btn btn-circle fa fa-search-plus btn-default"></a></div></div><div class="portlet-body"><div id="chart3"class="ops-chart"></div></div></div></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('SeanApp');
} catch (e) {
  module = angular.module('SeanApp', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('views/HRFactory.html',
    '<div class="yfops-entity"><h4 ng-bind="date">2016年10月</h4></div><div class="navbar-actions"ng-class="{\'HROverview\':\'active\',\'HRFactory\':\'active\'}[$parent.$state.current.name]"><div class="btn-group-img btn-group"><button type="button"class="yfops-top-btn btn md-skip dropdown-toggle"data-toggle="dropdown"data-hover="dropdown"data-close-others="true"><span ng-bind="currentFilter">CC/EQU</span> <i class="fa fa-caret-down font-white"></i></button><ul class="dropdown-menu"role="menu"><li ng-repeat="filter in filterList"ng-click="setFilter(filter)"><a href="#"><i class="icon-calendar"></i> <span ng-bind="filter">11</span></a></li></ul></div></div><div class="row"><div class="col-lg-12 col-md-12 col-sm-12"><div class="portlet light bordered yfops-widget"><div class="portlet-title"><div class="caption"><i class="icon-bar-chart font-dark hide"></i> <span class="caption-subject font-dark bold"ng-bind="title1">月度</span></div><div class="actions"><a class="btn btn-circle fa fa-download btn-default"></a> <a class="btn btn-circle fa fa-search-plus btn-default"></a></div></div><div class="portlet-body"><div id="chart1"class="ops-chart"></div></div></div></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('SeanApp');
} catch (e) {
  module = angular.module('SeanApp', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('views/HROverview.html',
    '<div class="yfops-entity"><h4 ng-bind="entityShortName">title</h4><h4 ng-bind="date">2016年10月</h4></div><div class="navbar-actions"ng-class="{\'HROverview\':\'active\',\'HRFactory\':\'active\',\'HRSearch\':\'active\'}[$parent.$state.current.name]"><div class="btn-group-img btn-group"><button type="button"class="yfops-top-btn btn md-skip dropdown-toggle"data-toggle="dropdown"data-hover="dropdown"data-close-others="true"><span ng-bind="currentFilter">CC/EQU</span> <i class="fa fa-caret-down font-white"></i></button><ul class="dropdown-menu"role="menu"><li ng-repeat="filter in filterList"ng-click="setFilter(filter)"><a href="#"><i class="icon-calendar"></i> <span ng-bind="filter">11</span></a></li></ul></div></div><div class="row"><div class="col-md-6 col-sm-6"><div class=""><div class="portlet-body yfops-widget yfops-widget-border"><div class="widget-map yfops-map"><div id="mapplic"class="widget-map-mapplic"></div></div><div class="yfops-map-list"><ul class="yfops-sparkline"><li ng-repeat="bu in BuNameList"on-repeat-finished ng-click="selectBU(bu,$event)"><div class="yfops-sparkline-title"ng-bind="bu">BU1</div><div class="yfops-sparkline-chart widget_sparkline_bar"data-array="8,7,9,8.5,8,8.2"></div><div class="clearfix"></div></li></ul></div></div></div></div><div class="col-md-6 col-sm-6 yfops-widget"><div class="row"><div class="col-lg-6 col-md-6 col-sm-6 col-xs-12"ng-repeat="value in values"><div class="dashboard-stat2 bordered"><div class="display"><div class="number"><h3 class="font-blue-sharp ellipsis"><span data-counter="counterup"data-value="7800"ng-bind="value.axisValue | number">0</span> <span class="yfops-unit"ng-bind="value.unit">元</span></h3><small ng-bind="value.lable"class="ellipsis">库存金额</small></div></div><div class="progress-info"><div class="progress"><span ng-style="{\'width\': \'{{value.percent | number:1}}%\'}"class="progress-bar progress-bar-success blue-sharp"><span class="sr-only">{{value.percent | number:1}}% progress</span></span></div><div class="status"><div class="status-title"ng-bind="value.axis">progress</div><div class="status-number">{{value.percent | number:1}}%</div></div></div></div></div></div></div><div class="col-lg-6 col-md-12 col-sm-12"><div class="portlet light bordered yfops-widget"><div class="portlet-title"><div class="caption"><i class="icon-bar-chart font-dark hide"></i> <span class="caption-subject font-dark bold"ng-bind="title1">月度</span></div><div class="actions"><a class="btn btn-circle fa fa-download btn-default"></a> <a class="btn btn-circle fa fa-search-plus btn-default"></a></div></div><div class="portlet-body"><div id="chart1"class="ops-chart"></div></div></div></div><div class="col-lg-6 col-md-12 col-sm-12"><div class="portlet light bordered yfops-widget"><div class="portlet-title"><div class="caption"><i class="icon-share font-red-sunglo hide"></i> <span class="caption-subject font-dark bold"ng-bind="title2">月度</span></div><div class="actions"><a class="btn btn-circle fa fa-download btn-default"></a> <a class="btn btn-circle fa fa-search-plus btn-default"></a></div></div><div class="portlet-body"><div id="chart2"class="ops-chart"></div></div></div></div><div class="col-lg-6 col-md-12 col-sm-12"><div class="portlet light bordered yfops-widget"><div class="portlet-title"><div class="caption"><i class="icon-share font-red-sunglo hide"></i> <span class="caption-subject font-dark bold"ng-bind="title3">月度</span></div><div class="actions"><a class="btn btn-circle fa fa-download btn-default"></a> <a class="btn btn-circle fa fa-search-plus btn-default"></a></div></div><div class="portlet-body"><div id="chart3"class="ops-chart"style="height:400px"></div></div></div></div><div class="col-lg-6 col-md-12 col-sm-12"><div class="portlet light bordered yfops-widget"><div class="portlet-title"><div class="caption"><i class="icon-share font-red-sunglo hide"></i> <span class="caption-subject font-dark bold"ng-bind="title4">月度</span></div><div class="actions"><a class="btn btn-circle fa fa-download btn-default"></a> <a class="btn btn-circle fa fa-search-plus btn-default"></a></div></div><div class="portlet-body"><div id="chart4"class="ops-chart"style="height:400px"></div></div></div></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('SeanApp');
} catch (e) {
  module = angular.module('SeanApp', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('views/login.html',
    '<div class="logo"></div><div class="content"><form class="login-form"method="post"name="loginForm"ng-submit="login(loginForm)"ng-validate="validationOptions"><h3 class="form-title">Login</h3><div class="form-group"><label class="control-label visible-ie8 visible-ie9">Username</label><div class="input-icon"><i class="fa fa-user"></i> <input class="form-control placeholder-no-fix"type="text"autocomplete="off"placeholder="Username"name="username"ng-model="request.userName"></div></div><div class="form-group"><label class="control-label visible-ie8 visible-ie9">Password</label><div class="input-icon"><i class="fa fa-lock"></i> <input class="form-control placeholder-no-fix"type="password"autocomplete="off"placeholder="Password"name="password"ng-model="request.password"></div></div><div class="form-actions"><label class="control-label"></label><div class="btn-group pull-right"><button type="submit"class="btn green">Login</button></div></div></form></div><div class="copyright">Powered by App Dataflow 2016 (WSW Australia)</div>');
}]);
})();

(function(module) {
try {
  module = angular.module('SeanApp');
} catch (e) {
  module = angular.module('SeanApp', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('views/OtherFactory.html',
    '<div class="yfops-entity"><h4 ng-bind="date">2016年10月</h4></div><div class="navbar-actions"ng-class="{\'HROverview\':\'active\',\'HRFactory\':\'active\'}[$parent.$state.current.name]"><div class="btn-group-img btn-group"><button type="button"class="yfops-top-btn btn btn-sm md-skip dropdown-toggle"data-toggle="dropdown"data-hover="dropdown"data-close-others="true"><span>CC/EQU</span> <i class="fa fa-caret-down font-white"></i></button><ul class="dropdown-menu"role="menu"><li ng-repeat="filter in filterList"ng-click="setFilter(filter)"><a href="#"><i class="icon-calendar"></i> <span ng-bind="filter">11</span></a></li></ul></div></div><div class="row"><div class="col-lg-12 col-md-12 col-sm-12"><div class="portlet light bordered yfops-widget"><div class="portlet-title"><div class="caption"><i class="icon-bar-chart font-dark hide"></i> <span class="caption-subject font-dark bold"ng-bind="title1">月度</span></div><div class="actions"><a class="btn btn-circle fa fa-download btn-default"></a> <a class="btn btn-circle fa fa-search-plus btn-default"></a></div></div><div class="portlet-body"><div id="chart1"class="ops-chart"></div></div></div></div><div class="col-lg-12 col-md-12 col-sm-12"><div class="portlet light bordered yfops-widget"><div class="portlet-title"><div class="caption"><i class="icon-bar-chart font-dark hide"></i> <span class="caption-subject font-dark bold"ng-bind="title2">月度</span></div><div class="actions"><a class="btn btn-circle fa fa-download btn-default"></a> <a class="btn btn-circle fa fa-search-plus btn-default"></a></div></div><div class="portlet-body"><div id="chart2"class="ops-chart"></div></div></div></div><div class="col-lg-12 col-md-12 col-sm-12"><div class="portlet light bordered yfops-widget"><div class="portlet-title"><div class="caption"><i class="icon-bar-chart font-dark hide"></i> <span class="caption-subject font-dark bold"ng-bind="title3">月度</span></div><div class="actions"><a class="btn btn-circle fa fa-download btn-default"></a> <a class="btn btn-circle fa fa-search-plus btn-default"></a></div></div><div class="portlet-body"><div id="chart3"class="ops-chart"></div></div></div></div><div class="col-lg-12 col-md-12 col-sm-12"><div class="portlet light bordered yfops-widget"><div class="portlet-title"><div class="caption"><i class="icon-bar-chart font-dark hide"></i> <span class="caption-subject font-dark bold"ng-bind="title4">月度</span></div><div class="actions"><a class="btn btn-circle fa fa-download btn-default"></a> <a class="btn btn-circle fa fa-search-plus btn-default"></a></div></div><div class="portlet-body"><div id="chart4"class="ops-chart"></div></div></div></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('SeanApp');
} catch (e) {
  module = angular.module('SeanApp', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('views/OtherOverview.html',
    '<div class="yfops-entity"><h4 ng-bind="entityShortName">title</h4><h4 ng-bind="date">2016年10月</h4></div><div class="row"><div class="col-md-6 col-sm-6"><div class=""><div class="portlet-body yfops-widget yfops-widget-border"><div class="widget-map yfops-map"><div id="mapplic"class="widget-map-mapplic"></div></div><div class="yfops-map-list"><ul class="yfops-sparkline"><li ng-repeat="bu in BuNameList"on-repeat-finished ng-click="selectBU(bu,$event)"><div class="yfops-sparkline-title"ng-bind="bu">BU1</div><div class="yfops-sparkline-chart widget_sparkline_bar"data-array="8,7,9,8.5,8,8.2"></div><div class="clearfix"></div></li></ul></div></div></div></div><div class="col-md-6 col-sm-6 yfops-widget"><div class="row"><div class="col-lg-6 col-md-6 col-sm-6 col-xs-12"ng-repeat="value in values"><div class="dashboard-stat2 bordered"><div class="display"><div class="number"><h3 class="font-blue-sharp ellipsis"><span data-counter="counterup"data-value="7800"ng-bind="value.axisValue | number">0</span> <span class="yfops-unit"ng-bind="value.unit">元</span></h3><small ng-bind="value.lable"class="ellipsis">库存金额</small></div></div><div class="progress-info"><div class="progress"><span ng-style="{\'width\': \'{{value.percent | number:1}}%\'}"class="progress-bar progress-bar-success blue-sharp"><span class="sr-only">{{value.percent | number:1}}% progress</span></span></div><div class="status"><div class="status-title"ng-bind="value.axis">progress</div><div class="status-number">{{value.percent | number:1}}%</div></div></div></div></div></div></div><div class="col-lg-6 col-md-12 col-sm-12"><div class="portlet light bordered yfops-widget"><div class="portlet-title"><div class="caption"><i class="icon-bar-chart font-dark hide"></i> <span class="caption-subject font-dark bold"ng-bind="title1">月度</span></div><div class="actions"><a class="btn btn-circle fa fa-download btn-default"></a> <a class="btn btn-circle fa fa-search-plus btn-default"></a></div></div><div class="portlet-body"><div id="chart1"class="ops-chart"></div></div></div></div><div class="col-lg-6 col-md-12 col-sm-12"><div class="portlet light bordered yfops-widget"><div class="portlet-title"><div class="caption"><i class="icon-share font-red-sunglo hide"></i> <span class="caption-subject font-dark bold"ng-bind="title2">月度</span></div><div class="actions"><a class="btn btn-circle fa fa-download btn-default"></a> <a class="btn btn-circle fa fa-search-plus btn-default"></a></div></div><div class="portlet-body"><div id="chart2"class="ops-chart"></div></div></div></div><div class="col-lg-6 col-md-12 col-sm-12"><div class="portlet light bordered yfops-widget"><div class="portlet-title"><div class="caption"><i class="icon-share font-red-sunglo hide"></i> <span class="caption-subject font-dark bold"ng-bind="title3">月度</span></div><div class="actions"><a class="btn btn-circle fa fa-download btn-default"></a> <a class="btn btn-circle fa fa-search-plus btn-default"></a></div></div><div class="portlet-body"><div id="chart3"class="ops-chart"style="height:400px"></div></div></div></div><div class="col-lg-6 col-md-12 col-sm-12"><div class="portlet light bordered yfops-widget"><div class="portlet-title"><div class="caption"><i class="icon-share font-red-sunglo hide"></i> <span class="caption-subject font-dark bold"ng-bind="title4">月度</span></div><div class="actions"><a class="btn btn-circle fa fa-download btn-default"></a> <a class="btn btn-circle fa fa-search-plus btn-default"></a></div></div><div class="portlet-body"><div id="chart4"class="ops-chart"style="height:400px"></div></div></div></div><div class="col-lg-6 col-md-12 col-sm-12"><div class="portlet light bordered yfops-widget"><div class="portlet-title"><div class="caption"><i class="icon-share font-red-sunglo hide"></i> <span class="caption-subject font-dark bold"ng-bind="title5">月度</span></div><div class="actions"><a class="btn btn-circle fa fa-download btn-default"></a> <a class="btn btn-circle fa fa-search-plus btn-default"></a></div></div><div class="portlet-body"><div id="chart5"class="ops-chart"style="height:400px"></div></div></div></div><div class="col-lg-6 col-md-12 col-sm-12"><div class="portlet light bordered yfops-widget"><div class="portlet-title"><div class="caption"><i class="icon-share font-red-sunglo hide"></i> <span class="caption-subject font-dark bold"ng-bind="title6">月度</span></div><div class="actions"><a class="btn btn-circle fa fa-download btn-default"></a> <a class="btn btn-circle fa fa-search-plus btn-default"></a></div></div><div class="portlet-body"><div id="chart6"class="ops-chart"style="height:400px"></div></div></div></div><div class="col-lg-6 col-md-12 col-sm-12"><div class="portlet light bordered yfops-widget"><div class="portlet-title"><div class="caption"><i class="icon-share font-red-sunglo hide"></i> <span class="caption-subject font-dark bold"ng-bind="title7">月度</span></div><div class="actions"><a class="btn btn-circle fa fa-download btn-default"></a> <a class="btn btn-circle fa fa-search-plus btn-default"></a></div></div><div class="portlet-body"><div id="chart7"class="ops-chart"style="height:400px"></div></div></div></div><div class="col-lg-6 col-md-12 col-sm-12"><div class="portlet light bordered yfops-widget"><div class="portlet-title"><div class="caption"><i class="icon-share font-red-sunglo hide"></i> <span class="caption-subject font-dark bold"ng-bind="title8">月度</span></div><div class="actions"><a class="btn btn-circle fa fa-download btn-default"></a> <a class="btn btn-circle fa fa-search-plus btn-default"></a></div></div><div class="portlet-body"><div id="chart8"class="ops-chart"style="height:400px"></div></div></div></div></div>');
}]);
})();
