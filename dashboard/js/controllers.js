;
angular.module('SeanApp').controller('BBPFactoryController', [
  '$rootScope',
  '$scope',
  '$http',
  '$timeout',
  '$window',
  function ($rootScope, $scope, $http, $timeout, $window) {
    var widgetHeight;
    $scope.charts = new Array();
    $scope.$on('ngRepeatFinished', function (repeatFinishedEvent) {
    });
    $scope.$on('$viewContentLoaded', function () {
      angular.element('.fullscreen').bind('click', function () {
        initializeChartSize();
      });
      $('.portlet .fa-download').bind('click', function () {
        var id = $(this).parents('.portlet').find('.ops-chart').attr('id');
        // console.log(id);
        var img = $scope.charts[id].getDataURL({
            type: 'png',
            pixelRatio: 2,
            backgroundColor: '#fff'
          });
        $(this).attr('href', img);  // $scope.charts[id].dispatchAction({type:'saveAsImage'});
      });
      initWidgetHeight();
      getfilterList();
    });
    var initWidgetHeight = function () {
      var height = $(window).height() - 63.99 - 77.78 - 18.89 - 50;
      $('.page-content').css('min-height', height);
      widgetHeight = (height - 77.8 - 60) / 2 - 20;
      $('.yfops-widget').css('min-height', widgetHeight);
    };
    //单轴
    var trendOption1 = {
        tooltip: { trigger: 'axis' },
        legend: { bottom: 48 },
        grid: {
          show: false,
          x: 40,
          y: 10,
          x2: 30,
          y2: 98
        },
        xAxis: [{
            type: 'category',
            axisLabel: {
              interval: 0,
              rotate: 45,
              margin: 6
            }
          }],
        yAxis: [{
            type: 'value',
            name: '',
            axisLabel: {
              formatter: function (value) {
                return value;
              }
            },
            splitLine: { show: false }
          }],
        series: [],
        dataZoom: [{
            start: 0,
            end: 100,
            handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
            handleSize: '60%',
            handleStyle: {
              color: '#fff',
              shadowBlur: 3,
              shadowColor: 'rgba(0, 0, 0, 0.6)',
              shadowOffsetX: 2,
              shadowOffsetY: 2
            },
            textStyle: { color: '#fff' }
          }]
      };
    //双轴
    var trendOption2 = {
        tooltip: { trigger: 'axis' },
        legend: { bottom: 48 },
        grid: {
          show: false,
          x: 40,
          y: 10,
          x2: 30,
          y2: 148
        },
        xAxis: [{
            type: 'category',
            axisLabel: {
              interval: 0,
              rotate: 45,
              margin: 6
            }
          }],
        yAxis: [{
            type: 'value',
            name: '',
            axisLabel: { formatter: '{value}' },
            splitLine: { show: false }
          }],
        series: [],
        dataZoom: [{
            start: 0,
            end: 100,
            handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
            handleSize: '60%',
            handleStyle: {
              color: '#fff',
              shadowBlur: 3,
              shadowColor: 'rgba(0, 0, 0, 0.6)',
              shadowOffsetX: 2,
              shadowOffsetY: 2
            },
            textStyle: { color: '#fff' }
          }]
      };
    var ageOption = {
        tooltip: { trigger: 'axis' },
        legend: { bottom: 48 },
        grid: {
          show: false,
          x: 38,
          y: 10,
          x2: 20,
          y2: 128
        },
        xAxis: [{
            type: 'category',
            axisLabel: {
              interval: 0,
              rotate: 45,
              margin: 6
            }
          }],
        yAxis: [{
            type: 'value',
            name: '',
            interval: 20,
            axisLabel: { formatter: '{value}' }
          }],
        series: [],
        dataZoom: [{
            start: 0,
            end: 100,
            handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
            handleSize: '60%',
            handleStyle: {
              color: '#fff',
              shadowBlur: 3,
              shadowColor: 'rgba(0, 0, 0, 0.6)',
              shadowOffsetX: 2,
              shadowOffsetY: 2
            },
            textStyle: { color: '#fff' }
          }]
      };
    var initEchart = function (data) {
      if (!data || data == undefined) {
        return;
      }
      $scope.title1 = data.ciSaving[0].lable;
      getBarLineChartExtra(data.ciSaving, 'chart1', trendOption2);
      $scope.title2 = data.conversionCostDivideEQU[0].lable;
      getBarLineChart(data.conversionCostDivideEQU, 'chart2', trendOption2);
    };
    var initializeChartSize = function () {
      $timeout.cancel($scope.layout);
      $scope.layout = $timeout(function () {
        initEchart($scope.overviewData);
      }, 80);
    };
    var getfilterListSuccess = function (list) {
      $scope.filterList = new Array();
      for (var i = 0; i < list.length; i++) {
        $scope.filterList.push(list[i].businessCat3);
      }
      $scope.setFilter($scope.filterList[0]);
    };
    var getfilterList = function () {
      ///////真数据
      $http.get($rootScope.settings.api + '/bbp/queryFilter').success(function (json) {
        $scope.filterListObject = json.filterList;
        getfilterListSuccess($scope.filterListObject);
      }).error(function () {
        ///////假数据
        $scope.filterListObject = bbpQueryFilter.filterList;
        getfilterListSuccess($scope.filterListObject);
      });
    };
    $scope.setFilter = function (filter) {
      console.log(filter);
      $scope.currentFilter = filter;
      getOverviewData($rootScope.buCodeShortName || 'BU1', $scope.currentFilter);
    };
    $scope.$on('onSelectedPBU', function (buShortName) {
      $rootScope.buCodeShortName = buShortName;
      getOverviewData(buShortName || 'BU1', $scope.currentFilter);
    });
    var getOverviewData = function (entityName, costType) {
      var param = {
          'entityName': entityName,
          'costType': costType
        };
      $http.post($rootScope.settings.api + '/bbp/queryFactoryData', param).success(function (json) {
        $scope.overviewData = json;
        initEchart($scope.overviewData);
      }).error(function () {
        ////假数据
        $scope.overviewData = bbpQueryFactoryData;
        initEchart($scope.overviewData);
      });
    };
    var getBarLineChartExtra = function (data, chart, option) {
      //x
      var xAxisObject = new Object();
      var typeObject = new Object();
      for (var i = 0; i < data.length; i++) {
        var item = data[i];
        if (xAxisObject[item.xAxisValue] == undefined) {
          xAxisObject[item.xAxisValue] = new Object();
          typeObject[item.xAxisValue] = new Object();
        }
        xAxisObject[item.xAxisValue][item.yAxisLabel] = data[i].yAxisValue;
        typeObject[item.xAxisValue][item.yAxisLabel] = data[i].axisNo;  //TODO
      }
      console.log(xAxisObject);
      var xAxisData = Object.getOwnPropertyNames(xAxisObject);
      var series = new Array();
      var legend = Object.getOwnPropertyNames(xAxisObject[xAxisData[0]]);
      //顺序问题 
      // var legend = ['CI-Saving-Actual','CI-Saving-T1','CI-Saving-T2','CI-Saving-T3']//Object.getOwnPropertyNames(xAxisObject[xAxisData[0]]);
      for (var i = 0; i < xAxisData.length; i++) {
        for (var j = 0; j < legend.length; j++) {
          if (series[j] == undefined) {
            series[j] = new Object();
            series[j].name = legend[j];
            series[j].type = 'bar';
            // series[j].stack = stack;
            series[j].data = new Array();
            if (typeObject[xAxisData[i]][legend[j]] == 1) {
              series[j].type = 'line';
            } else if (typeObject[xAxisData[i]][legend[j]] == 0) {
              series[j].type = 'bar';
            }
          }
          series[j].data.push(xAxisObject[xAxisData[i]][legend[j]] || 0);
        }
      }
      //set chart option
      var _option = angular.copy(option);
      _option.legend.data = legend;
      //默认勾选T2 ACTUAL
      _option.legend.selected = new Object();
      for (var i = 0; i < legend.length; i++) {
        _option.legend.selected[legend[i]] = false;
        if (legend[i].indexOf('T2') != -1 || legend[i].indexOf('Actual') != -1 || legend[i].indexOf('Benchmark') != -1) {
          console.log(legend[i]);
          _option.legend.selected[legend[i]] = true;
        }
      }
      _option.xAxis[0].data = xAxisData;
      _option.series = series;
      console.log('_option:');
      console.log(_option);
      $scope.charts[chart] = echarts.init(document.getElementById(chart), theme);
      $scope.charts[chart].setOption(_option);
    };
    var getBarLineChart = function (data, chart, option) {
      //x
      var xAxisObject = new Object();
      for (var i = 0; i < data.length; i++) {
        var item = data[i];
        if (xAxisObject[item.xAxisValue] == undefined) {
          xAxisObject[item.xAxisValue] = new Object();
        }
        xAxisObject[item.xAxisValue][item.yAxisLabel] = data[i].yAxisValue;
      }
      var xAxisData = Object.getOwnPropertyNames(xAxisObject);
      var series = new Array();
      var legend = Object.getOwnPropertyNames(xAxisObject[xAxisData[0]]);
      for (var i = 0; i < xAxisData.length; i++) {
        for (var j = 0; j < legend.length; j++) {
          if (series[j] == undefined) {
            series[j] = new Object();
            series[j].name = legend[j];
            series[j].type = 'line';
            // series[j].stack = stack;
            series[j].data = new Array();
            if (legend[j].indexOf('Actual') > -1) {
              series[j].type = 'bar';  // series[j].yAxisIndex = 0;
            } else {
              series[j].type = 'line';  // series[j].yAxisIndex = 1;
            }
          }
          series[j].data.push(xAxisObject[xAxisData[i]][legend[j]] || 0);
        }
      }
      //set chart option
      var _option = angular.copy(option);
      _option.legend.data = legend;
      //默认勾选T2 ACTUAL
      _option.legend.selected = new Object();
      for (var i = 0; i < legend.length; i++) {
        _option.legend.selected[legend[i]] = false;
        if (legend[i].indexOf('T2') != -1 || legend[i].indexOf('Actual') != -1 || legend[i].indexOf('Benchmark') != -1) {
          console.log(legend[i]);
          _option.legend.selected[legend[i]] = true;
        }
      }
      _option.xAxis[0].data = xAxisData;
      _option.series = series;
      console.log('_option:');
      console.log(_option);
      $scope.charts[chart] = echarts.init(document.getElementById(chart), theme);
      $scope.charts[chart].setOption(_option);
    };
    var getMixBarChart = function (data, chart, option) {
      //x
      var xAxisObject = new Object();
      for (var i = 0; i < data.length; i++) {
        var item = data[i];
        if (xAxisObject[item.xAxisValue] == undefined) {
          xAxisObject[item.xAxisValue] = new Object();
        }
        xAxisObject[item.xAxisValue][item.yAxisLabel] = data[i].yAxisValue * 100;  //todo
      }
      var xAxisData = Object.getOwnPropertyNames(xAxisObject);
      //y
      var stack = data[0].lable;
      var series = new Array();
      var legend = Object.getOwnPropertyNames(xAxisObject[xAxisData[0]]);
      //顺序问题
      // var legend = ['x<=1','1<x<=7','7<x<=30','x>30'];
      for (var i = 0; i < xAxisData.length; i++) {
        for (var j = 0; j < legend.length; j++) {
          if (series[j] == undefined) {
            series[j] = new Object();
            series[j].name = legend[j];
            series[j].type = 'bar';
            series[j].stack = stack;
            series[j].data = new Array();
          }
          series[j].data.push(xAxisObject[xAxisData[i]][legend[j]] || 0);
        }
      }
      //set chart option
      var _option = angular.copy(option);
      _option.legend.data = legend;
      //默认勾选T2 ACTUAL
      _option.legend.selected = new Object();
      for (var i = 0; i < legend.length; i++) {
        _option.legend.selected[legend[i]] = false;
        if (legend[i].indexOf('T2') != -1 || legend[i].indexOf('Actual') != -1 || legend[i].indexOf('Benchmark') != -1) {
          console.log(legend[i]);
          _option.legend.selected[legend[i]] = true;
        }
      }
      _option.xAxis[0].data = xAxisData;
      _option.series = series;
      $scope.charts[chart] = echarts.init(document.getElementById(chart), theme);
      $scope.charts[chart].setOption(_option);
    };
    // set sidebar closed and body solid layout mode
    $rootScope.settings.layout.pageContentWhite = true;
    $rootScope.settings.layout.pageBodySolid = false;
    $rootScope.settings.layout.pageSidebarClosed = false;
  }
]);
;
angular.module('SeanApp').controller('BBPOverviewController', [
  '$rootScope',
  '$scope',
  '$http',
  '$timeout',
  '$window',
  '$state',
  function ($rootScope, $scope, $http, $timeout, $window, $state) {
    var widgetHeight;
    $scope.charts = new Array();
    $scope.$on('ngRepeatFinished', function (repeatFinishedEvent) {
    });
    $scope.$on('$viewContentLoaded', function () {
      angular.element('.fullscreen').bind('click', function () {
        initializeChartSize();
      });
      $('.portlet .fa-download').bind('click', function () {
        var id = $(this).parents('.portlet').find('.ops-chart').attr('id');
        // console.log(id);
        var img = $scope.charts[id].getDataURL({
            type: 'png',
            pixelRatio: 2,
            backgroundColor: '#fff'
          });
        $(this).attr('href', img);  // $scope.charts[id].dispatchAction({type:'saveAsImage'});
      });
      initWidgetHeight();
      getfilterList();
      getBuList('JIT PBU');
    });
    //单轴
    var trendOption1 = {
        tooltip: { trigger: 'axis' },
        legend: {
          bottom: 48,
          data: []
        },
        grid: {
          show: false,
          x: 40,
          y: 10,
          x2: 30,
          y2: 98
        },
        xAxis: [{
            type: 'category',
            data: []
          }],
        yAxis: [{
            type: 'value',
            name: '',
            axisLabel: {
              formatter: function (value) {
                var val = value;
                if (value >= 10000000) {
                  val = value / 100000000 + '\u4ebf';
                } else if (value >= 1000) {
                  val = value / 10000 + '\u4e07';
                }
                return val;
              }
            },
            splitLine: { show: false }
          }],
        series: [],
        dataZoom: [{
            start: 50,
            end: 100,
            handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
            handleSize: '60%',
            handleStyle: {
              color: '#fff',
              shadowBlur: 3,
              shadowColor: 'rgba(0, 0, 0, 0.6)',
              shadowOffsetX: 2,
              shadowOffsetY: 2
            },
            textStyle: { color: '#fff' }
          }]
      };
    //双轴 亿
    var trendOption2 = {
        tooltip: { trigger: 'axis' },
        legend: {
          bottom: 48,
          data: []
        },
        grid: {
          show: false,
          x: 46,
          y: 10,
          x2: 46,
          y2: 158
        },
        xAxis: [{
            type: 'category',
            axisLabel: {
              interval: 0,
              rotate: 45,
              margin: 6
            },
            data: []
          }],
        yAxis: [
          {
            type: 'value',
            name: '',
            axisLabel: {
              formatter: function (value) {
                var val = value;
                if (value >= 10000000) {
                  val = value / 100000000 + '\u4ebf';
                } else if (value >= 1000) {
                  val = value / 10000 + '\u4e07';
                }
                return val;
              }
            },
            splitLine: { show: false }
          },
          {
            type: 'value',
            name: '',
            axisLabel: {
              formatter: function (value) {
                var val = value;
                if (value >= 10000000) {
                  val = value / 100000000 + '\u4ebf';
                } else if (value >= 1000) {
                  val = value / 10000 + '\u4e07';
                }
                return val;
              }
            },
            splitLine: { show: false }
          }
        ],
        series: [],
        dataZoom: [{
            start: 50,
            end: 100,
            handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
            handleSize: '60%',
            handleStyle: {
              color: '#fff',
              shadowBlur: 3,
              shadowColor: 'rgba(0, 0, 0, 0.6)',
              shadowOffsetX: 2,
              shadowOffsetY: 2
            },
            textStyle: { color: '#fff' }
          }]
      };
    //双轴 常规
    var trendOptionNormal = {
        tooltip: { trigger: 'axis' },
        legend: {
          bottom: 48,
          data: []
        },
        grid: {
          show: false,
          x: 50,
          y: 10,
          x2: 30,
          y2: 158
        },
        xAxis: [{
            type: 'category',
            axisLabel: {
              interval: 0,
              rotate: 45,
              margin: 6
            },
            data: []
          }],
        yAxis: [{
            type: 'value',
            name: '',
            axisLabel: {
              formatter: function (value) {
                var val = value;
                if (value >= 10000000) {
                  val = value / 100000000 + '\u4ebf';
                } else if (value >= 1000) {
                  val = value / 10000 + '\u4e07';
                }
                return val;
              }
            },
            splitLine: { show: false }
          }],
        series: [],
        dataZoom: [{
            start: 50,
            end: 100,
            handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
            handleSize: '60%',
            handleStyle: {
              color: '#fff',
              shadowBlur: 3,
              shadowColor: 'rgba(0, 0, 0, 0.6)',
              shadowOffsetX: 2,
              shadowOffsetY: 2
            },
            textStyle: { color: '#fff' }
          }]
      };
    var ageOption = {
        tooltip: { trigger: 'axis' },
        legend: { bottom: 48 },
        grid: {
          show: false,
          x: 38,
          y: 10,
          x2: 20,
          y2: 128
        },
        xAxis: [{
            type: 'category',
            axisLabel: {
              interval: 0,
              rotate: 45,
              margin: 6
            }
          }],
        yAxis: [{
            type: 'value',
            name: '',
            min: 0,
            max: 6000,
            interval: 1000,
            axisLabel: { formatter: '{value}' }
          }],
        series: [],
        dataZoom: [{
            start: 0,
            end: 100,
            handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
            handleSize: '60%',
            handleStyle: {
              color: '#fff',
              shadowBlur: 3,
              shadowColor: 'rgba(0, 0, 0, 0.6)',
              shadowOffsetX: 2,
              shadowOffsetY: 2
            },
            textStyle: { color: '#fff' }
          }]
      };
    var initWidgetHeight = function () {
      var height = $(window).height() - 63.99 - 77.78 - 18.89 - 50;
      $('.page-content').css('min-height', height);
      widgetHeight = (height - 77.8 - 60) / 2;
      $('.yfops-widget').css('min-height', widgetHeight);
      $('.yfops-map').css('min-height', widgetHeight - 4);
    };
    var initEchart = function (data) {
      if (!data || data == undefined) {
        return;
      }
      console.log(data);
      var valueArray = [
          data.conversionCost,
          data.equ,
          data.conversionCostDivideEQU,
          data.ciSaving
        ];
      $scope.values = new Array();
      for (var i = 0; i < valueArray.length; i++) {
        if (valueArray[i].length == 0)
          continue;
        console.log(valueArray[i]);
        $scope.values[i] = new Object();
        if (valueArray[i][0].axisValue > valueArray[i][1].axisValue) {
          $scope.values[i].state = 'up';
        } else if (valueArray[i][0].axisValue < valueArray[i][1].axisValue) {
          $scope.values[i].state = 'down';
        } else {
          $scope.values[i].state = 'equals';
        }
        $scope.values[i].axisValue = valueArray[i][0].axisValue;
        $scope.values[i].percent = valueArray[i][0].axisValue / valueArray[i][1].axisValue * 100;
        $scope.values[i].lable = valueArray[i][0].lable;
        $scope.values[i].axis = valueArray[i][0].axis;
        $scope.values[i].unit = valueArray[i][0].unit;
      }
      $scope.title1 = data.conversionCostDivideEQUTrendMonth[0].lable;
      getBarLineChartDefault(data.conversionCostDivideEQUTrendMonth, 'chart1', trendOption2);
      $scope.title2 = data.conversionCostDivideEQUTrendYear[0].lable;
      getBarLineChartDefault(data.conversionCostDivideEQUTrendYear, 'chart2', trendOption2);
      $scope.title3 = data.conversionCostDivideEQUClassMonth[0].lable;
      getLineMixBarChart(data.conversionCostDivideEQUClassMonth, 'chart3', trendOptionNormal);
      $scope.title4 = data.conversionCostDivideEQUClassYear[0].lable;
      getLineMixBarChart(data.conversionCostDivideEQUClassYear, 'chart4', trendOptionNormal);
      $scope.title5 = data.ciSavingTrendMonth[0].lable;
      getBarLineChart(data.ciSavingTrendMonth, 'chart5', trendOption1);
      $scope.title6 = data.ciSavingTrendYear[0].lable;
      getBarLineChart(data.ciSavingTrendYear, 'chart6', trendOption1);
    };
    var initializeChartSize = function () {
      $timeout.cancel($scope.layout);
      $scope.layout = $timeout(function () {
        initEchart($scope.overviewData);
      }, 80);
    };
    var getfilterList = function () {
      ///////真数据
      $http.get($rootScope.settings.api + '/bbp/queryFilter').success(function (json) {
        $scope.filterListObject = json.filterList;
        getfilterListSuccess($scope.filterListObject);
      }).error(function () {
        ///////假数据
        $scope.filterListObject = bbpQueryFilter.filterList;
        getfilterListSuccess($scope.filterListObject);
      });
    };
    var getfilterListSuccess = function (list) {
      $scope.filterList = new Array();
      for (var i = 0; i < list.length; i++) {
        $scope.filterList.push(list[i].businessCat3);
      }
      $scope.setFilter($scope.filterList[0]);
    };
    $scope.setFilter = function (filter) {
      console.log(filter);
      $scope.currentFilter = filter;
      getOverviewData($rootScope.entityShortName || 'BU1', $scope.currentFilter);
    };
    var getBuListSuccess = function (buList) {
      $rootScope.BuList = new Object();
      $rootScope.ALLBuList = new Array();
      for (var i = 0; i < buList.length; i++) {
        var shortName = buList[i].buCodeShortName;
        if (shortName == null)
          continue;
        if ($rootScope.BuList[shortName] == undefined) {
          $rootScope.BuList[shortName] = new Array();
        }
        $rootScope.BuList[shortName].push(buList[i]);
        $rootScope.ALLBuList.push(buList[i]);
      }
      //bu列表
      $rootScope.BuNameList = Object.getOwnPropertyNames($rootScope.BuList);
      $rootScope.BuNameList = $rootScope.BuNameList.sort();
      // $rootScope.pubCodeShortName = buList[0].pubCodeShortName;
      // $rootScope.buCodeShortName = $rootScope.BuList[$rootScope.BuNameList[0]][0].buCodeShortName;
      $rootScope.entityShortName = $state.params['id'] || buList[0].pubCodeShortName || 'JIT PBU';
      console.log('shortName:' + $rootScope.entityShortName);
    };
    var getBuList = function (pubCodeShortName) {
      $rootScope.pubCodeShortName = pubCodeShortName;
      $.get($rootScope.settings.api + '/finance/queryBuList').success(function (json) {
        ///////真数据
        $scope.BuListObject = json.BuList;
        getBuListSuccess($scope.BuListObject);
        getOverviewData($rootScope.entityShortName, $scope.currentFilter);
        refreshChinaMap($rootScope.entityShortName);
      }).error(function () {
        console.log('\u8bf7\u6c42error,\u53d6\u5047\u6570\u636e');
        $scope.BuListObject = queryBuList.BuList;
        getBuListSuccess($scope.BuListObject);
        getOverviewData($rootScope.entityShortName, $scope.currentFilter);
        refreshChinaMap($rootScope.entityShortName);
      });
    };
    $scope.$on('onSelectedPBU', function (scope, buShortName) {
      $rootScope.buCodeShortName = buShortName;
      $rootScope.entityShortName = buShortName;
      getOverviewData($rootScope.entityShortName, $scope.currentFilter);
      refreshChinaMap($rootScope.entityShortName);
      $('.yfops-sparkline li.active').removeClass('active');
    });
    $scope.selectBU = function (buShortName, $event) {
      $rootScope.buCodeShortName = buShortName;
      $rootScope.entityShortName = buShortName;
      $('.yfops-sparkline li.active').removeClass('active');
      $($event.currentTarget).addClass('active');
      getOverviewData($rootScope.entityShortName, $scope.currentFilter);
      refreshChinaMap(buShortName);
    };
    var refreshChinaMap = function (buShortName) {
      var locations = new Array();
      var keys;
      if (buShortName != 'JIT PBU' && $rootScope.BuList[buShortName] != undefined) {
        keys = $rootScope.BuList[buShortName];
      } else {
        keys = $rootScope.ALLBuList;
      }
      console.log(buShortName);
      for (var i = 0; i < keys.length; i++) {
        var entity = {
            'action': 'tooltip',
            'id': keys[i].entityCode,
            'title': keys[i].entityShortName,
            'description': keys[i].entityShortName,
            'link': '#/bbp/' + keys[i].entityShortName,
            'x': keys[i].axisX || 0,
            'y': keys[i].axisY || 0
          };
        locations.push(entity);
      }
      var option = angular.copy(mapOption);
      option.levels[0].locations = locations;
      initChinaMap(option);
    };
    var initChinaMap = function (option) {
      if ($('#mapplic').size() === 0) {
        return;
      }
      $('#mapplic').html('').data('mapplic', null);
      var h = widgetHeight - 2;
      $('#mapplic').mapplic({
        source: option,
        height: h,
        animate: true,
        sidebar: false,
        minimap: false,
        locations: false,
        deeplinking: false,
        fullscreen: false,
        hovertip: true,
        zoombuttons: true,
        clearbutton: true,
        developer: false,
        maxscale: 5,
        skin: 'mapplic-dark',
        zoom: true
      });
    };
    $scope.$on('onSelectedPBU', function (scope, buShortName) {
      $rootScope.buCodeShortName = buShortName;
      $rootScope.entityShortName = buShortName;
      getOverviewData($rootScope.entityShortName, $scope.currentFilter);
    });
    var getOverviewData = function (entityName, costType) {
      var param = {
          'entityName': entityName || 'BU1',
          'costType': costType
        };
      $http.post($rootScope.settings.api + '/bbp/queryOverviewData', param).success(function (json) {
        $scope.overviewData = json;
        initEchart($scope.overviewData);
      }).error(function () {
        ////假数据
        $scope.overviewData = bbpQueryOverviewData;
        initEchart($scope.overviewData);
      });
    };
    var getBarLineChartDefault = function (data, chart, option) {
      //x
      var xAxisObject = new Object();
      var typeObject = new Object();
      for (var i = 0; i < data.length; i++) {
        var item = data[i];
        if (xAxisObject[item.xAxisValue] == undefined) {
          xAxisObject[item.xAxisValue] = new Object();
          typeObject[item.xAxisValue] = new Object();
        }
        xAxisObject[item.xAxisValue][item.yAxisLabel] = data[i].yAxisValue;
        typeObject[item.xAxisValue][item.yAxisLabel] = data[i].axisNo;  //TODO
      }
      var xAxisData = Object.getOwnPropertyNames(xAxisObject);
      var series = new Array();
      var legend = Object.getOwnPropertyNames(xAxisObject[xAxisData[0]]);
      for (var i = 0; i < xAxisData.length; i++) {
        for (var j = 0; j < legend.length; j++) {
          if (series[j] == undefined) {
            series[j] = new Object();
            series[j].name = legend[j];
            series[j].type = 'line';
            // series[j].stack = stack;
            series[j].data = new Array();
            // if(xAxisObject[xAxisData[i]][legend[j]]> 100) {
            //     series[j].type = 'bar';
            //     series[j].yAxisIndex = 1;
            // }else{
            //     series[j].type = 'line';
            //     series[j].yAxisIndex = 0;
            // }
            if (typeObject[xAxisData[i]][legend[j]] == 1) {
              series[j].type = 'line';
              series[j].yAxisIndex = 1;
            } else if (typeObject[xAxisData[i]][legend[j]] == 0) {
              series[j].type = 'bar';
              series[j].yAxisIndex = 0;
            }
          }
          series[j].data.push(xAxisObject[xAxisData[i]][legend[j]] || 0);
        }
      }
      //set chart option
      var _option = angular.copy(option);
      _option.legend.data = legend;
      //默认勾选T2 ACTUAL
      _option.legend.selected = new Object();
      for (var i = 0; i < legend.length; i++) {
        _option.legend.selected[legend[i]] = false;
        if (legend[i].indexOf('T2') != -1 || legend[i].indexOf('Actual') != -1 || legend[i].indexOf('Benchmark') != -1) {
          console.log(legend[i]);
          _option.legend.selected[legend[i]] = true;
        }
      }
      _option.xAxis[0].data = xAxisData;
      _option.series = series;
      $scope.charts[chart] = echarts.init(document.getElementById(chart), theme);
      $scope.charts[chart].setOption(_option);
    };
    var getBarLineChart = function (data, chart, option) {
      //x
      var xAxisObject = new Object();
      var typeObject = new Object();
      for (var i = 0; i < data.length; i++) {
        var item = data[i];
        if (xAxisObject[item.xAxisValue] == undefined) {
          xAxisObject[item.xAxisValue] = new Object();
          typeObject[item.xAxisValue] = new Object();
        }
        xAxisObject[item.xAxisValue][item.yAxisLabel] = data[i].yAxisValue;
        typeObject[item.xAxisValue][item.yAxisLabel] = data[i].axisNo;  //TODO
      }
      var xAxisData = Object.getOwnPropertyNames(xAxisObject);
      var series = new Array();
      var legend = Object.getOwnPropertyNames(xAxisObject[xAxisData[0]]);
      for (var i = 0; i < xAxisData.length; i++) {
        for (var j = 0; j < legend.length; j++) {
          if (series[j] == undefined) {
            series[j] = new Object();
            series[j].name = legend[j];
            series[j].type = 'line';
            // series[j].stack = stack;
            series[j].data = new Array();  // if(legend[j].indexOf('T1') != -1 || legend[j].indexOf('T2') != -1 || legend[j].indexOf('T3') != -1) {
                                           //     series[j].type = 'line';
                                           //     series[j].yAxisIndex = 1;
                                           // }else{
                                           //     series[j].type = 'bar';
                                           //     series[j].yAxisIndex = 0;
                                           // }
          }
          if (typeObject[xAxisData[i]][legend[j]] == 1) {
            series[j].type = 'line';
          } else if (typeObject[xAxisData[i]][legend[j]] == 0) {
            series[j].type = 'bar';
          }
          series[j].data.push(xAxisObject[xAxisData[i]][legend[j]] || 0);
        }
      }
      //set chart option
      var _option = angular.copy(option);
      _option.legend.data = legend;
      //默认勾选T2 ACTUAL
      _option.legend.selected = new Object();
      for (var i = 0; i < legend.length; i++) {
        _option.legend.selected[legend[i]] = false;
        if (legend[i].indexOf('T2') != -1 || legend[i].indexOf('Actual') != -1 || legend[i].indexOf('Benchmark') != -1) {
          console.log(legend[i]);
          _option.legend.selected[legend[i]] = true;
        }
      }
      _option.xAxis[0].data = xAxisData;
      _option.series = series;
      $scope.charts[chart] = echarts.init(document.getElementById(chart), theme);
      $scope.charts[chart].setOption(_option);
    };
    var getMixBarChart = function (data, chart, option) {
      //x
      var xAxisObject = new Object();
      for (var i = 0; i < data.length; i++) {
        var item = data[i];
        if (xAxisObject[item.xAxisValue] == undefined) {
          xAxisObject[item.xAxisValue] = new Object();
        }
        xAxisObject[item.xAxisValue][item.yAxisLabel] = data[i].yAxisValue;  //TODO
      }
      var xAxisData = Object.getOwnPropertyNames(xAxisObject);
      //y
      var stack = data[0].lable;
      var series = new Array();
      var legend = Object.getOwnPropertyNames(xAxisObject[xAxisData[0]]);
      //顺序问题
      // var legend = ['x<=1','1<x<=7','7<x<=30','x>30'];
      for (var i = 0; i < xAxisData.length; i++) {
        for (var j = 0; j < legend.length; j++) {
          if (series[j] == undefined) {
            series[j] = new Object();
            series[j].name = legend[j];
            series[j].type = 'bar';
            series[j].stack = stack;
            series[j].data = new Array();
          }
          series[j].data.push(xAxisObject[xAxisData[i]][legend[j]] || 0);
        }
      }
      //set chart option
      var _option = angular.copy(option);
      _option.legend.data = legend;
      _option.xAxis[0].data = xAxisData;
      _option.series = series;
      $scope.charts[chart] = echarts.init(document.getElementById(chart), theme);
      $scope.charts[chart].setOption(_option);
    };
    var getLineMixBarChart = function (data, chart, option) {
      //x
      var xAxisObject = new Object();
      var typeObject = new Object();
      for (var i = 0; i < data.length; i++) {
        var item = data[i];
        if (xAxisObject[item.xAxisValue] == undefined) {
          xAxisObject[item.xAxisValue] = new Object();
          typeObject[item.xAxisValue] = new Object();
        }
        xAxisObject[item.xAxisValue][item.yAxisLabel] = data[i].yAxisValue;
        //TODO
        typeObject[item.xAxisValue][item.yAxisLabel] = data[i].axisNo;  //TODO
      }
      var xAxisData = Object.getOwnPropertyNames(xAxisObject);
      //y
      var stack = data[0].lable;
      var series = new Array();
      var legend = Object.getOwnPropertyNames(xAxisObject[xAxisData[0]]);
      //顺序问题
      // var legend = ['x<=1','1<x<=7','7<x<=30','x>30'];
      for (var i = 0; i < xAxisData.length; i++) {
        for (var j = 0; j < legend.length; j++) {
          if (series[j] == undefined) {
            series[j] = new Object();
            series[j].name = legend[j];
            series[j].type = 'bar';
            series[j].data = new Array();
            if (typeObject[xAxisData[i]][legend[j]] == 1) {
              series[j].type = 'line';
            } else if (typeObject[xAxisData[i]][legend[j]] == 0) {
              series[j].type = 'bar';
              series[j].stack = stack;
            }
          }
          series[j].data.push(xAxisObject[xAxisData[i]][legend[j]] || 0);
        }
      }
      //set chart option
      var _option = angular.copy(option);
      _option.legend.data = legend;
      _option.xAxis[0].data = xAxisData;
      _option.series = series;
      $scope.charts[chart] = echarts.init(document.getElementById(chart), theme);
      $scope.charts[chart].setOption(_option);
    };
    // set sidebar closed and body solid layout mode
    $rootScope.settings.layout.pageContentWhite = true;
    $rootScope.settings.layout.pageBodySolid = false;
    $rootScope.settings.layout.pageSidebarClosed = false;
    $rootScope.entityShortName = $state.params['id'] || 'JIT PBU';
    console.log('shortName:' + $rootScope.entityShortName);
  }
]);
Array.prototype.unique = function () {
  this.sort();
  //先排序
  var res = [this[0]];
  for (var i = 1; i < this.length; i++) {
    if (this[i] !== res[res.length - 1]) {
      res.push(this[i]);
    }
  }
  return res;
};
;
angular.module('SeanApp').controller('DashboardController', [
  '$rootScope',
  '$scope',
  '$http',
  '$timeout',
  '$window',
  '$state',
  function ($rootScope, $scope, $http, $timeout, $window, $state) {
    //亿元 单轴
    var trendOption1 = {
        tooltip: { trigger: 'axis' },
        legend: { bottom: 48 },
        grid: {
          show: false,
          x: 46,
          y: 10,
          x2: 46,
          y2: 118
        },
        xAxis: [{
            type: 'category',
            axisLabel: {
              interval: 0,
              rotate: 45,
              margin: 6
            }
          }],
        yAxis: [{
            type: 'value',
            name: '',
            axisLabel: {
              formatter: function (value) {
                var val = value;
                if (value >= 10000000) {
                  val = value / 100000000 + '\u4ebf';
                } else if (value >= 1000) {
                  val = value / 10000 + '\u4e07';
                }
                return val;
              }
            },
            splitLine: { show: false }
          }],
        series: [],
        dataZoom: [{
            start: 0,
            end: 100,
            handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
            handleSize: '60%',
            handleStyle: {
              color: '#fff',
              shadowBlur: 3,
              shadowColor: 'rgba(0, 0, 0, 0.6)',
              shadowOffsetX: 2,
              shadowOffsetY: 2
            },
            textStyle: { color: '#fff' }
          }]
      };
    //亿元 天数 双轴
    var trendOption2 = {
        tooltip: { trigger: 'axis' },
        legend: {
          width: 500,
          left: 'center',
          bottom: 48
        },
        grid: {
          show: false,
          x: 46,
          y: 10,
          x2: 46,
          y2: 138
        },
        xAxis: [{
            type: 'category',
            axisLabel: {
              interval: 0,
              rotate: 45,
              margin: 6
            }
          }],
        yAxis: [
          {
            type: 'value',
            name: '',
            axisLabel: {
              formatter: function (value) {
                var val = value;
                if (value > 10000000) {
                  val = value / 100000000 + '\u4ebf';
                } else if (value > 10000) {
                  val = value / 10000 + '\u4e07';
                }
                return val;
              }
            },
            splitLine: { show: false }
          },
          {
            type: 'value',
            name: '',
            axisLabel: { formatter: '{value}\u5929' },
            splitLine: { show: false }
          }
        ],
        series: [],
        dataZoom: [{
            start: 0,
            end: 100,
            handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
            handleSize: '60%',
            handleStyle: {
              color: '#fff',
              shadowBlur: 3,
              shadowColor: 'rgba(0, 0, 0, 0.6)',
              shadowOffsetX: 2,
              shadowOffsetY: 2
            },
            textStyle: { color: '#fff' }
          }]
      };
    //叠柱
    var ageOption = {
        tooltip: { trigger: 'axis' },
        legend: { bottom: 48 },
        grid: {
          show: false,
          x: 46,
          y: 10,
          x2: 46,
          y2: 108
        },
        xAxis: [{
            type: 'category',
            axisLabel: {
              interval: 0,
              rotate: 45,
              margin: 6
            }
          }],
        yAxis: [{
            type: 'value',
            name: '',
            min: 0,
            max: 100,
            interval: 20,
            axisLabel: { formatter: '{value}%' },
            splitLine: { show: false }
          }],
        series: [],
        dataZoom: [{
            start: 0,
            end: 100,
            handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
            handleSize: '60%',
            handleStyle: {
              color: '#fff',
              shadowBlur: 3,
              shadowColor: 'rgba(0, 0, 0, 0.6)',
              shadowOffsetX: 2,
              shadowOffsetY: 2
            },
            textStyle: { color: '#fff' }
          }]
      };
    var widgetHeight;
    $scope.$on('ngRepeatFinished', function (repeatFinishedEvent) {
    });
    $scope.$on('$viewContentLoaded', function () {
      angular.element('.fullscreen').bind('click', function () {
        initializeChartSize();
      });
      $('.portlet .fa-download').bind('click', function () {
        var id = $(this).parents('.portlet').find('.ops-chart').attr('id');
        // console.log(id);
        var img = $scope.charts[id].getDataURL({
            type: 'png',
            pixelRatio: 2,
            backgroundColor: '#fff'
          });
        $(this).attr('href', img);  // $scope.charts[id].dispatchAction({type:'saveAsImage'});
      });
      initWidgetHeight();
      getBuList('JIT PBU');
    });
    var initWidgetHeight = function () {
      var height = $(window).height() - 63.99 - 77.78 - 18.89 - 50;
      $('.page-content').css('min-height', height);
      widgetHeight = (height - 77.8 - 60) / 2;
      $('.yfops-widget').css('min-height', widgetHeight);
      $('.yfops-map').css('min-height', widgetHeight - 4);
    };
    var initChinaMap = function (option) {
      if ($('#mapplic').size() === 0) {
        return;
      }
      $('#mapplic').html('').data('mapplic', null);
      var h = widgetHeight - 2;
      $('#mapplic').mapplic({
        source: option,
        height: h,
        animate: true,
        sidebar: false,
        minimap: false,
        locations: false,
        deeplinking: false,
        fullscreen: false,
        hovertip: true,
        zoombuttons: true,
        clearbutton: true,
        developer: false,
        maxscale: 5,
        skin: 'mapplic-dark',
        zoom: true
      });
    };
    var initEchart = function (data) {
      if (!data || data == undefined) {
        return;
      }
      var valueArray = [
          data.overviewStockAmount,
          data.overviewTurnoverDays,
          data.overviewTurnoverRate,
          data.overviewUnbilledSell
        ];
      $scope.values = new Array();
      for (var i = 0; i < valueArray.length; i++) {
        if (valueArray[i].length == 0)
          continue;
        $scope.values[i] = new Object();
        if (valueArray[i][0].axisValue > valueArray[i][1].axisValue) {
          $scope.values[i].state = 'up';
        } else if (valueArray[i][0].axisValue < valueArray[i][1].axisValue) {
          $scope.values[i].state = 'down';
        } else {
          $scope.values[i].state = 'equals';
        }
        $scope.values[i].axisValue = valueArray[i][0].axisValue;
        $scope.values[i].percent = valueArray[i][0].axisValue / valueArray[i][1].axisValue * 100;
        $scope.values[i].lable = valueArray[i][0].lable;
        $scope.values[i].axis = valueArray[i][0].axis;
        $scope.values[i].unit = valueArray[i][0].unit;
      }
      $scope.title1 = data.overviewTurnoverDaysMonth[0].lable;
      getBarLineChart(data.overviewTurnoverDaysMonth, 'chart1', trendOption2);
      $scope.title2 = data.overviewTurnoverDaysYear[0].lable;
      getBarLineChart(data.overviewTurnoverDaysYear, 'chart2', trendOption2);
      $scope.title3 = data.overviewStockageMonth[0].lable;
      getMixBarChart(data.overviewStockageMonth, 'chart3', ageOption);
      $scope.title4 = data.overviewStockageYear[0].lable;
      getMixBarChart(data.overviewStockageYear, 'chart4', ageOption);
      $scope.title5 = data.overviewUnbilledSellTrendMonth[0].lable;
      getBarLineChartDefault(data.overviewUnbilledSellTrendMonth, 'chart5', trendOption1);
      $scope.title6 = data.overviewUnbilledSellTrendYear[0].lable;
      getBarLineChartDefault(data.overviewUnbilledSellTrendYear, 'chart6', trendOption1);
    };
    var initializeChartSize = function () {
      $timeout.cancel($scope.layout);
      $scope.layout = $timeout(function () {
        initEchart($scope.overviewData);
      }, 80);
    };
    var getBuListSuccess = function (buList) {
      $rootScope.BuList = new Object();
      $rootScope.ALLBuList = new Array();
      for (var i = 0; i < buList.length; i++) {
        var shortName = buList[i].buCodeShortName;
        if (shortName == null)
          continue;
        if ($rootScope.BuList[shortName] == undefined) {
          $rootScope.BuList[shortName] = new Array();
        }
        $rootScope.BuList[shortName].push(buList[i]);
        $rootScope.ALLBuList.push(buList[i]);
      }
      //bu列表
      $rootScope.BuNameList = Object.getOwnPropertyNames($rootScope.BuList);
      $rootScope.BuNameList = $rootScope.BuNameList.sort();
      $rootScope.entityShortName = $state.params['id'] || buList[0].pubCodeShortName || 'JIT PBU';
      console.log('shortName:' + $rootScope.entityShortName);
    };
    var getBuList = function (pubCodeShortName) {
      $rootScope.pubCodeShortName = pubCodeShortName;
      $.get($rootScope.settings.api + '/finance/queryBuList').success(function (json) {
        ///////真数据
        $scope.BuListObject = json.BuList;
        getBuListSuccess($scope.BuListObject);
        getOverviewData($rootScope.entityShortName);
        refreshChinaMap($rootScope.entityShortName);
      }).error(function () {
        console.log('\u8bf7\u6c42error,\u53d6\u5047\u6570\u636e');
        $scope.BuListObject = queryBuList.BuList;
        getBuListSuccess($scope.BuListObject);
        getOverviewData($rootScope.entityShortName);
        refreshChinaMap($rootScope.entityShortName);
      });
    };
    $scope.$on('onSelectedPBU', function (scope, buShortName) {
      $rootScope.buCodeShortName = buShortName;
      $rootScope.entityShortName = buShortName;
      getOverviewData($rootScope.entityShortName);
      refreshChinaMap($rootScope.entityShortName);
      $('.yfops-sparkline li.active').removeClass('active');
    });
    $scope.selectBU = function (buShortName, $event) {
      $rootScope.buCodeShortName = buShortName;
      $rootScope.entityShortName = buShortName;
      $('.yfops-sparkline li.active').removeClass('active');
      $($event.currentTarget).addClass('active');
      getOverviewData(buShortName);
      refreshChinaMap(buShortName);
    };
    var refreshChinaMap = function (buShortName) {
      var locations = new Array();
      var keys;
      if (buShortName != 'JIT PBU' && $rootScope.BuList[buShortName] != undefined) {
        keys = $rootScope.BuList[buShortName];
      } else {
        keys = $rootScope.ALLBuList;
      }
      console.log(buShortName);
      for (var i = 0; i < keys.length; i++) {
        var entity = {
            'action': 'tooltip',
            'id': keys[i].entityCode,
            'title': keys[i].entityShortName,
            'description': keys[i].entityShortName,
            'link': '#/finance/' + keys[i].entityShortName,
            'x': keys[i].axisX || 0,
            'y': keys[i].axisY || 0
          };
        locations.push(entity);
      }
      var option = angular.copy(mapOption);
      option.levels[0].locations = locations;
      initChinaMap(option);
    };
    var getOverviewData = function (buShortName) {
      var param = { 'entityName': buShortName || 'JIT PBU' };
      $http.post($rootScope.settings.api + '/finance/overviewData', param).success(function (json) {
        ////真数据
        $scope.overviewData = json;
        initEchart($scope.overviewData);
      }).error(function () {
        console.log('\u8bf7\u6c42error,\u53d6\u5047\u6570\u636e');
        $scope.overviewData = overviewData;
        initEchart($scope.overviewData);
      });
    };
    $scope.charts = new Array();
    //库龄分析
    var getMixBarChart = function (data, chart, option) {
      //x
      var xAxisObject = new Object();
      var typeObject = new Object();
      for (var i = 0; i < data.length; i++) {
        var item = data[i];
        if (xAxisObject[item.xAxisValue] == undefined) {
          xAxisObject[item.xAxisValue] = new Object();
          typeObject[item.xAxisValue] = new Object();
        }
        xAxisObject[item.xAxisValue][item.yAxisLabel] = data[i].yAxisValue * 100;
        typeObject[item.xAxisValue][item.yAxisLabel] = data[i].axisNo;  //TODO
      }
      var xAxisData = Object.getOwnPropertyNames(xAxisObject);
      //y
      var stack = data[0].lable;
      var series = new Array();
      // var legend = Object.getOwnPropertyNames(xAxisObject[xAxisData[0]]);  //顺序问题
      var legend = [
          'x<=1',
          '1<x<=7',
          '7<x<=30',
          'x>30'
        ];
      for (var i = 0; i < xAxisData.length; i++) {
        for (var j = 0; j < legend.length; j++) {
          if (series[j] == undefined) {
            series[j] = new Object();
            series[j].name = legend[j];
            series[j].type = 'bar';
            series[j].stack = stack;
            // series[j].formatter = '{value}%';
            series[j].data = new Array();
          }
          if (typeObject[xAxisData[i]][legend[j]] == 1) {
            series[j].type = 'line';
          } else if (typeObject[xAxisData[i]][legend[j]] == 0) {
            series[j].type = 'bar';
            series[j].stack = stack;
          }
          series[j].data.push(xAxisObject[xAxisData[i]][legend[j]] || 0);
        }
      }
      //set chart option
      var _option = angular.copy(option);
      _option.legend.data = legend;
      //默认勾选T2 ACTUAL
      // _option.legend.selected = new Object();
      // for(var i=0;i<legend.length;i++){
      //     _option.legend.selected[legend[i]] = false;
      //     if(legend[i].indexOf('T2') != -1 || legend[i].indexOf('Actual')!= -1 || legend[i].indexOf('Benchmark')!= -1){
      //         console.log(legend[i]);
      //         _option.legend.selected[legend[i]] = true;
      //     }
      // }
      _option.xAxis[0].data = xAxisData;
      _option.series = series;
      $scope.charts[chart] = echarts.init(document.getElementById(chart), theme);
      $scope.charts[chart].setOption(_option);
    };
    //双轴
    var getBarLineChart = function (data, chart, option) {
      //x 
      var xAxisObject = new Object();
      var typeObject = new Object();
      for (var i = 0; i < data.length; i++) {
        var item = data[i];
        if (xAxisObject[item.xAxisValue] == undefined) {
          xAxisObject[item.xAxisValue] = new Object();
          typeObject[item.xAxisValue] = new Object();
        }
        xAxisObject[item.xAxisValue][item.yAxisLabel] = data[i].yAxisValue;
        typeObject[item.xAxisValue][item.yAxisLabel] = data[i].axisNo;  //TODO
      }
      var xAxisData = Object.getOwnPropertyNames(xAxisObject);
      var series = new Array();
      var legend = Object.getOwnPropertyNames(xAxisObject[xAxisData[0]]);
      for (var i = 0; i < xAxisData.length; i++) {
        for (var j = 0; j < legend.length; j++) {
          if (series[j] == undefined) {
            series[j] = new Object();
            series[j].name = legend[j];
            series[j].type = 'line';
            series[j].data = new Array();  // if(typeObject[xAxisData[i]][legend[j]] ==1){
                                           //     series[j].type = 'line';
                                           //     series[j].yAxisIndex = 1;
                                           // }else if(typeObject[xAxisData[i]][legend[j]] ==0){
                                           //     series[j].type = 'bar';
                                           //     // series[j].stack = stack;
                                           //     series[j].yAxisIndex = 0;
                                           // }
                                           // if(xAxisObject[xAxisData[i]][legend[j]]> 100) {
                                           //     series[j].type = 'bar';
                                           //     // series[j].yAxisIndex = 0;
                                           //     if(series[j].name.indexOf('T1') != -1 || series[j].name.indexOf('T2') != -1 || series[j].name.indexOf('T3') != -1){
                                           //         // series[j].stack = 'TIT2T3';
                                           //         series[j].type = 'line';
                                           //     }
                                           // }else{
                                           //     series[j].type = 'line';
                                           //     // series[j].yAxisIndex = 1;
                                           // }
          }
          if (typeObject[xAxisData[i]][legend[j]] == 1) {
            series[j].type = 'line';
            series[j].yAxisIndex = 1;
          } else if (typeObject[xAxisData[i]][legend[j]] == 0) {
            series[j].type = 'bar';
            series[j].yAxisIndex = 0;
          }
          series[j].data.push(xAxisObject[xAxisData[i]][legend[j]] || 0);
        }
      }
      //set chart option
      var _option = angular.copy(option);
      _option.legend.data = legend;
      //默认勾选T2 ACTUAL
      _option.legend.selected = new Object();
      for (var i = 0; i < legend.length; i++) {
        _option.legend.selected[legend[i]] = false;
        if (legend[i].indexOf('T2') != -1 || legend[i].indexOf('Actual') != -1 || legend[i].indexOf('Benchmark') != -1) {
          console.log(legend[i]);
          _option.legend.selected[legend[i]] = true;
        }
      }
      _option.xAxis[0].data = xAxisData;
      _option.series = series;
      console.log(_option);
      $scope.charts[chart] = echarts.init(document.getElementById(chart), theme);
      $scope.charts[chart].setOption(_option);  // var img = chart.getDataURL({
                                                //     type:"png",
                                                //     pixelRatio: 2,
                                                //     backgroundColor: '#fff'
                                                // });
    };
    //双轴
    var getBarLineChartDefault = function (data, chart, option) {
      //x 
      var xAxisObject = new Object();
      var typeObject = new Object();
      for (var i = 0; i < data.length; i++) {
        var item = data[i];
        if (xAxisObject[item.xAxisValue] == undefined) {
          xAxisObject[item.xAxisValue] = new Object();
          typeObject[item.xAxisValue] = new Object();
        }
        xAxisObject[item.xAxisValue][item.yAxisLabel] = data[i].yAxisValue;
        typeObject[item.xAxisValue][item.yAxisLabel] = data[i].axisNo;  //TODO
      }
      var xAxisData = Object.getOwnPropertyNames(xAxisObject);
      var series = new Array();
      var legend = Object.getOwnPropertyNames(xAxisObject[xAxisData[0]]);
      for (var i = 0; i < xAxisData.length; i++) {
        for (var j = 0; j < legend.length; j++) {
          if (series[j] == undefined) {
            series[j] = new Object();
            series[j].name = legend[j];
            series[j].type = 'line';
            series[j].data = new Array();
          }
          if (typeObject[xAxisData[i]][legend[j]] == 1) {
            series[j].type = 'line';
          } else if (typeObject[xAxisData[i]][legend[j]] == 0) {
            series[j].type = 'bar';
          }
          series[j].data.push(xAxisObject[xAxisData[i]][legend[j]] || 0);
        }
      }
      //set chart option
      var _option = angular.copy(option);
      _option.legend.data = legend;
      //默认勾选T2 ACTUAL
      _option.legend.selected = new Object();
      for (var i = 0; i < legend.length; i++) {
        _option.legend.selected[legend[i]] = false;
        if (legend[i].indexOf('T2') != -1 || legend[i].indexOf('Actual') != -1) {
          console.log(legend[i]);
          _option.legend.selected[legend[i]] = true;
        }
      }
      _option.xAxis[0].data = xAxisData;
      _option.series = series;
      console.log(_option);
      $scope.charts[chart] = echarts.init(document.getElementById(chart), theme);
      $scope.charts[chart].setOption(_option);  // var img = chart.getDataURL({
                                                //     type:"png",
                                                //     pixelRatio: 2,
                                                //     backgroundColor: '#fff'
                                                // });
    };
    // set sidebar closed and body solid layout mode
    $rootScope.settings.layout.pageContentWhite = true;
    $rootScope.settings.layout.pageBodySolid = false;
    $rootScope.settings.layout.pageSidebarClosed = false;
  }
]);
;
angular.module('SeanApp').controller('FactoryController', [
  '$rootScope',
  '$scope',
  '$http',
  '$timeout',
  '$window',
  function ($rootScope, $scope, $http, $timeout, $window) {
    var widgetHeight;
    $scope.charts = new Array();
    $scope.$on('ngRepeatFinished', function (repeatFinishedEvent) {
    });
    $scope.$on('$viewContentLoaded', function () {
      angular.element('.fullscreen').bind('click', function () {
        initializeChartSize();
      });
      $('.portlet .fa-download').bind('click', function () {
        var id = $(this).parents('.portlet').find('.ops-chart').attr('id');
        // console.log(id);
        var img = $scope.charts[id].getDataURL({
            type: 'png',
            pixelRatio: 2,
            backgroundColor: '#fff'
          });
        $(this).attr('href', img);  // $scope.charts[id].dispatchAction({type:'saveAsImage'});
      });
      $(window).resize(function () {
        initializeChartSize();
      });
      getOverviewData($rootScope.buShortName);
    });
    var initWidgetHeight = function () {
      var height = $(window).height() - 63.99 - 77.78 - 18.89 - 50;
      $('.page-content').css('min-height', height);
      widgetHeight = (height - 77.8 - 60) / 2 - 20;
      $('.yfops-widget').css('min-height', widgetHeight);
    };
    //万元 天数 双轴
    var trendOption1 = {
        tooltip: { trigger: 'axis' },
        legend: { bottom: 48 },
        grid: {
          show: false,
          x: 40,
          y: 10,
          x2: 40,
          y2: 128
        },
        xAxis: [{
            type: 'category',
            axisLabel: {
              interval: 0,
              rotate: 45,
              margin: 6
            }
          }],
        yAxis: [
          {
            type: 'value',
            name: '',
            axisLabel: {
              formatter: function (value) {
                var val = value;
                if (value > 10000000) {
                  val = value / 100000000 + '\u4ebf';
                } else if (value > 10000) {
                  val = value / 10000 + '\u4e07';
                }
                return val;
              }
            },
            splitLine: { show: false }
          },
          {
            type: 'value',
            name: '',
            axisLabel: {
              formatter: function (value) {
                return value + '\u5929';
              }
            },
            splitLine: { show: false }
          }
        ],
        series: [],
        dataZoom: [{
            start: 0,
            end: 100,
            handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
            handleSize: '60%',
            handleStyle: {
              color: '#fff',
              shadowBlur: 3,
              shadowColor: 'rgba(0, 0, 0, 0.6)',
              shadowOffsetX: 2,
              shadowOffsetY: 2
            },
            textStyle: { color: '#fff' }
          }]
      };
    //天数 天数 双轴 ? 单轴
    var trendOption2 = {
        tooltip: { trigger: 'axis' },
        legend: {
          bottom: 48,
          data: [
            'Inventory',
            'OBP Inventory',
            'Actual days',
            'T3 days'
          ]
        },
        grid: {
          show: false,
          x: 40,
          y: 10,
          x2: 40,
          y2: 128
        },
        xAxis: [{
            type: 'category',
            axisLabel: {
              interval: 0,
              rotate: 45,
              margin: 6
            }
          }],
        yAxis: [{
            type: 'value',
            name: '',
            axisLabel: { formatter: '{value}\u5929' },
            splitLine: { show: false }
          }],
        series: [],
        dataZoom: [{
            start: 50,
            end: 100,
            handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
            handleSize: '60%',
            handleStyle: {
              color: '#fff',
              shadowBlur: 3,
              shadowColor: 'rgba(0, 0, 0, 0.6)',
              shadowOffsetX: 2,
              shadowOffsetY: 2
            },
            textStyle: { color: '#fff' }
          }]
      };
    //万元 单轴
    var trendOption3 = {
        tooltip: { trigger: 'axis' },
        legend: { bottom: 48 },
        grid: {
          show: false,
          x: 40,
          y: 10,
          x2: 40,
          y2: 128
        },
        xAxis: [{
            type: 'category',
            axisLabel: {
              interval: 0,
              rotate: 45,
              margin: 6
            }
          }],
        yAxis: [{
            type: 'value',
            name: '',
            axisLabel: {
              formatter: function (value) {
                var val = value;
                if (value > 10000000) {
                  val = value / 100000000 + '\u4ebf';
                } else if (value > 10000) {
                  val = value / 10000 + '\u4e07';
                }
                return val;
              }
            },
            splitLine: { show: false }
          }],
        series: [],
        dataZoom: [{
            start: 0,
            end: 100,
            handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
            handleSize: '60%',
            handleStyle: {
              color: '#fff',
              shadowBlur: 3,
              shadowColor: 'rgba(0, 0, 0, 0.6)',
              shadowOffsetX: 2,
              shadowOffsetY: 2
            },
            textStyle: { color: '#fff' }
          }]
      };
    var ageOption = {
        tooltip: { trigger: 'axis' },
        legend: { bottom: 48 },
        grid: {
          show: false,
          x: 38,
          y: 10,
          x2: 20,
          y2: 98
        },
        xAxis: [{
            type: 'category',
            axisLabel: {
              interval: 0,
              rotate: 45,
              margin: 6
            }
          }],
        yAxis: [{
            type: 'value',
            name: '',
            min: 0,
            max: 100,
            interval: 20,
            axisLabel: { formatter: '{value}%' },
            splitLine: { show: false }
          }],
        series: [],
        dataZoom: [{
            start: 0,
            end: 100,
            handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
            handleSize: '60%',
            handleStyle: {
              color: '#fff',
              shadowBlur: 3,
              shadowColor: 'rgba(0, 0, 0, 0.6)',
              shadowOffsetX: 2,
              shadowOffsetY: 2
            },
            textStyle: { color: '#fff' }
          }]
      };
    var initEchart = function (data) {
      if (!data || data == undefined) {
        return;
      }
      $scope.title1 = data.stockTurnoverDays[0].lable;
      getBarLineChartDouble(data.stockTurnoverDays, 'chart1', trendOption1);
      $scope.title2 = data.stockStockage[0].lable;
      getBarLineChart(data.stockStockage, 'chart2', trendOption3);
      $scope.title3 = data.stockUnbilledAmount[0].lable;
      getBarLineChart(data.stockUnbilledAmount, 'chart3', trendOption3);
    };
    var initializeChartSize = function () {
      $timeout.cancel($scope.layout);
      $scope.layout = $timeout(function () {
        initEchart($scope.buData);
      }, 80);
    };
    $scope.$on('onSelectedPBU', function (buShortName) {
      $rootScope.buCodeShortName = buShortName;
      getOverviewData(buShortName);
    });
    var getOverviewData = function (buShortName) {
      console.log('factory buShortName :' + buShortName);
      var param = { 'entityName': buShortName };
      $http.post($rootScope.settings.api + '/finance/buData', param).success(function (json) {
        $scope.buData = json;
        initEchart($scope.buData);
      }).error(function () {
        console.log('\u8bf7\u6c42error,\u53d6\u5047\u6570\u636e');
        $scope.buData = buData;
        initEchart($scope.buData);
      });
    };
    //库龄分析
    var getMixBarChart = function (data, chart, option) {
      //x
      var xAxisObject = new Object();
      var typeObject = new Object();
      for (var i = 0; i < data.length; i++) {
        var item = data[i];
        if (xAxisObject[item.xAxisValue] == undefined) {
          xAxisObject[item.xAxisValue] = new Object();
          typeObject[item.xAxisValue] = new Object();
        }
        xAxisObject[item.xAxisValue][item.yAxisLabel] = data[i].yAxisValue * 100;
        typeObject[item.xAxisValue][item.yAxisLabel] = data[i].axisNo;  //TODO
      }
      var xAxisData = Object.getOwnPropertyNames(xAxisObject);
      // console.log(data);
      //y
      var stack = data[0].lable;
      var series = new Array();
      // var legend = Object.getOwnPropertyNames(xAxisObject[xAxisData[0]]);  //顺序问题
      var legend = [
          'x<=1',
          '1<x<=7',
          '7<x<=30',
          'x>30'
        ];
      for (var i = 0; i < xAxisData.length; i++) {
        for (var j = 0; j < legend.length; j++) {
          if (series[j] == undefined) {
            series[j] = new Object();
            series[j].name = legend[j];
            series[j].type = 'bar';
            series[j].stack = stack;
            series[j].data = new Array();
          }
          if (typeObject[xAxisData[i]][legend[j]] == 1) {
            series[j].type = 'line';
          } else if (typeObject[xAxisData[i]][legend[j]] == 0) {
            series[j].type = 'bar';
          }
          series[j].data.push(xAxisObject[xAxisData[i]][legend[j]] || 0);
        }
      }
      //set chart option
      var stockageMonthOption = angular.copy(option);
      stockageMonthOption.legend.data = legend;
      //默认勾选T2 ACTUAL
      _option.legend.selected = new Object();
      for (var i = 0; i < legend.length; i++) {
        _option.legend.selected[legend[i]] = false;
        if (legend[i].indexOf('T2') != -1 || legend[i].indexOf('Actual') != -1 || legend[i].indexOf('Benchmark') != -1) {
          console.log(legend[i]);
          _option.legend.selected[legend[i]] = true;
        }
      }
      stockageMonthOption.xAxis[0].data = xAxisData;
      stockageMonthOption.series = series;
      $scope.charts[chart] = echarts.init(document.getElementById(chart), theme);
      $scope.charts[chart].setOption(stockageMonthOption);
    };
    //双轴
    var getBarLineChartDouble = function (data, chart, option) {
      //x
      var xAxisObject = new Object();
      var typeObject = new Object();
      for (var i = 0; i < data.length; i++) {
        var item = data[i];
        if (xAxisObject[item.xAxisValue] == undefined) {
          xAxisObject[item.xAxisValue] = new Object();
          typeObject[item.xAxisValue] = new Object();
        }
        xAxisObject[item.xAxisValue][item.yAxisLabel] = data[i].yAxisValue;
        typeObject[item.xAxisValue][item.yAxisLabel] = data[i].axisNo;  //TODO
      }
      var xAxisData = Object.getOwnPropertyNames(xAxisObject);
      var series = new Array();
      var legend = Object.getOwnPropertyNames(xAxisObject[xAxisData[0]]);
      console.log(legend);
      for (var i = 0; i < xAxisData.length; i++) {
        for (var j = 0; j < legend.length; j++) {
          if (series[j] == undefined) {
            series[j] = new Object();
            series[j].name = legend[j];
            series[j].type = 'line';
            // series[j].stack = stack;
            series[j].data = new Array();  // if(xAxisObject[xAxisData[i]][legend[j]]> 100) {
                                           //     series[j].type = 'bar';
                                           //     series[j].yAxisIndex = 0;
                                           // }else{
                                           //     series[j].type = 'line';
                                           //     series[j].yAxisIndex = 1;
                                           // }
          }
          if (typeObject[xAxisData[i]][legend[j]] == 1) {
            series[j].type = 'line';
            series[j].yAxisIndex = 1;
          } else if (typeObject[xAxisData[i]][legend[j]] == 0) {
            series[j].type = 'bar';
            series[j].yAxisIndex = 0;
          }
          series[j].data.push(xAxisObject[xAxisData[i]][legend[j]] || 0);
        }
      }
      //set chart option
      var _option = angular.copy(option);
      _option.legend.data = legend;
      //默认勾选T2 ACTUAL
      _option.legend.selected = new Object();
      for (var i = 0; i < legend.length; i++) {
        _option.legend.selected[legend[i]] = false;
        if (legend[i].indexOf('T2') != -1 || legend[i].indexOf('Actual') != -1) {
          console.log(legend[i]);
          _option.legend.selected[legend[i]] = true;
        }
      }
      _option.xAxis[0].data = xAxisData;
      _option.series = series;
      $scope.charts[chart] = echarts.init(document.getElementById(chart), theme);
      $scope.charts[chart].setOption(_option);
    };
    //单轴
    var getBarLineChart = function (data, chart, option) {
      //x
      var xAxisObject = new Object();
      var typeObject = new Object();
      for (var i = 0; i < data.length; i++) {
        var item = data[i];
        if (xAxisObject[item.xAxisValue] == undefined) {
          xAxisObject[item.xAxisValue] = new Object();
          typeObject[item.xAxisValue] = new Object();
        }
        xAxisObject[item.xAxisValue][item.yAxisLabel] = data[i].yAxisValue;
        typeObject[item.xAxisValue][item.yAxisLabel] = data[i].axisNo;  //TODO
      }
      var xAxisData = Object.getOwnPropertyNames(xAxisObject);
      var series = new Array();
      var legend = Object.getOwnPropertyNames(xAxisObject[xAxisData[0]]);
      for (var i = 0; i < xAxisData.length; i++) {
        for (var j = 0; j < legend.length; j++) {
          if (series[j] == undefined) {
            series[j] = new Object();
            series[j].name = legend[j];
            series[j].type = 'bar';
            // series[j].stack = stack;
            series[j].data = new Array();  // if(legend[j].indexOf('T1') != -1){
                                           //     series[j].type = 'line';
                                           // }else if(legend[j].indexOf('T2') != -1){
                                           //     series[j].type = 'line';
                                           // }else if(legend[j].indexOf('T3') != -1){
                                           //     series[j].type = 'line';
                                           // }else if(legend[j].indexOf('Actual') != -1){
                                           //     series[j].type = 'bar';
                                           // }
          }
          if (typeObject[xAxisData[i]][legend[j]] == 1) {
            series[j].type = 'line';
          } else if (typeObject[xAxisData[i]][legend[j]] == 0) {
            series[j].type = 'bar';
          }
          series[j].data.push(xAxisObject[xAxisData[i]][legend[j]] || 0);
        }
      }
      //set chart option
      var _option = angular.copy(option);
      _option.legend.data = legend;
      //默认勾选T2 ACTUAL
      _option.legend.selected = new Object();
      for (var i = 0; i < legend.length; i++) {
        _option.legend.selected[legend[i]] = false;
        if (legend[i].indexOf('T2') != -1 || legend[i].indexOf('Actual') != -1) {
          console.log(legend[i]);
          _option.legend.selected[legend[i]] = true;
        }
      }
      _option.xAxis[0].data = xAxisData;
      _option.series = series;
      $scope.charts[chart] = echarts.init(document.getElementById(chart), theme);
      $scope.charts[chart].setOption(_option);
    };
    // set sidebar closed and body solid layout mode
    $rootScope.settings.layout.pageContentWhite = true;
    $rootScope.settings.layout.pageBodySolid = false;
    $rootScope.settings.layout.pageSidebarClosed = false;
  }
]);
;
angular.module('SeanApp').controller('HRFactoryController', [
  '$rootScope',
  '$scope',
  '$http',
  '$timeout',
  '$window',
  function ($rootScope, $scope, $http, $timeout, $window) {
    var widgetHeight;
    $scope.charts = new Array();
    $scope.$on('ngRepeatFinished', function (repeatFinishedEvent) {
    });
    $scope.$on('$viewContentLoaded', function () {
      angular.element('.fullscreen').bind('click', function () {
        initializeChartSize();
      });
      $('.portlet .fa-download').bind('click', function () {
        var id = $(this).parents('.portlet').find('.ops-chart').attr('id');
        // console.log(id);
        var img = $scope.charts[id].getDataURL({
            type: 'png',
            pixelRatio: 2,
            backgroundColor: '#fff'
          });
        $(this).attr('href', img);  // $scope.charts[id].dispatchAction({type:'saveAsImage'});
      });
      initWidgetHeight();
      getfilterList();
    });
    var initWidgetHeight = function () {
      var height = $(window).height() - 63.99 - 77.78 - 18.89 - 50;
      $('.page-content').css('min-height', height);
      widgetHeight = (height - 77.8 - 60) / 2 - 20;
      $('.yfops-widget').css('min-height', widgetHeight);
    };
    //单轴
    var trendOption1 = {
        tooltip: { trigger: 'axis' },
        legend: { bottom: 48 },
        grid: {
          show: false,
          x: 40,
          y: 10,
          x2: 30,
          y2: 98
        },
        xAxis: [{ type: 'category' }],
        yAxis: [{
            type: 'value',
            name: '',
            axisLabel: {
              formatter: function (value) {
                return value;
              }
            }
          }],
        series: [],
        dataZoom: [{
            start: 50,
            end: 100,
            handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
            handleSize: '60%',
            handleStyle: {
              color: '#fff',
              shadowBlur: 3,
              shadowColor: 'rgba(0, 0, 0, 0.6)',
              shadowOffsetX: 2,
              shadowOffsetY: 2
            },
            textStyle: { color: '#fff' }
          }]
      };
    //双轴
    var trendOption2 = {
        tooltip: { trigger: 'axis' },
        legend: { bottom: 48 },
        grid: {
          show: false,
          x: 40,
          y: 10,
          x2: 30,
          y2: 148
        },
        xAxis: [{
            type: 'category',
            axisLabel: {
              interval: 0,
              rotate: 45,
              margin: 6
            }
          }],
        yAxis: [{
            type: 'value',
            name: '',
            axisLabel: {
              formatter: function (value) {
                return value;
              }
            }
          }],
        series: [],
        dataZoom: [{
            start: 0,
            end: 100,
            handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
            handleSize: '60%',
            handleStyle: {
              color: '#fff',
              shadowBlur: 3,
              shadowColor: 'rgba(0, 0, 0, 0.6)',
              shadowOffsetX: 2,
              shadowOffsetY: 2
            },
            textStyle: { color: '#fff' }
          }]
      };
    var ageOption = {
        tooltip: { trigger: 'axis' },
        legend: { bottom: 48 },
        grid: {
          show: false,
          x: 38,
          y: 10,
          x2: 20,
          y2: 128
        },
        xAxis: [{ type: 'category' }],
        yAxis: [{
            type: 'value',
            name: '',
            interval: 20,
            axisLabel: { formatter: '{value}' }
          }],
        series: [],
        dataZoom: [{
            start: 0,
            end: 100,
            handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
            handleSize: '60%',
            handleStyle: {
              color: '#fff',
              shadowBlur: 3,
              shadowColor: 'rgba(0, 0, 0, 0.6)',
              shadowOffsetX: 2,
              shadowOffsetY: 2
            },
            textStyle: { color: '#fff' }
          }]
      };
    var initEchart = function (data) {
      if (!data || data == undefined) {
        return;
      }
      $scope.title1 = data.totalLaborHoursDivideEQU[0].lable;
      getBarLineChart(data.totalLaborHoursDivideEQU, 'chart1', trendOption2);
    };
    var initializeChartSize = function () {
      $timeout.cancel($scope.layout);
      $scope.layout = $timeout(function () {
        initEchart($scope.overviewData);
      }, 80);
    };
    var getfilterList = function () {
      ///////真数据
      $http.get($rootScope.settings.api + '/hr/queryFilter').success(function (json) {
        $scope.filterListObject = json.filterList;
        getfilterListSuccess($scope.filterListObject);
      }).error(function () {
        ///////假数据
        $scope.filterListObject = hrQueryFilter.filterList;
        getfilterListSuccess($scope.filterListObject);
      });
    };
    var getfilterListSuccess = function (list) {
      $scope.filterList = new Array();
      for (var i = 0; i < list.length; i++) {
        $scope.filterList.push(list[i].businessCat3);
      }
      $scope.setFilter($scope.filterList[0]);
    };
    $scope.setFilter = function (filter) {
      console.log(filter);
      $scope.currentFilter = filter;
      getOverviewData($rootScope.buCodeShortName || 'BU1', $scope.currentFilter);
    };
    $scope.$on('onSelectedPBU', function (buShortName) {
      $rootScope.buCodeShortName = buShortName;
      getOverviewData(buShortName || 'JIT PBU', $scope.currentFilter);
    });
    var getOverviewData = function (entityName, costType) {
      var param = {
          'entityName': entityName,
          'costType': costType
        };
      $http.post($rootScope.settings.api + '/hr/queryFactoryData', param).success(function (json) {
        $scope.overviewData = json;
        initEchart($scope.overviewData);
      }).error(function () {
        ////假数据
        $scope.overviewData = hrQueryFactoryData;
        initEchart($scope.overviewData);
      });
    };
    var getBarLineChart = function (data, chart, option) {
      //x
      var xAxisObject = new Object();
      var typeObject = new Object();
      for (var i = 0; i < data.length; i++) {
        var item = data[i];
        if (xAxisObject[item.xAxisValue] == undefined) {
          xAxisObject[item.xAxisValue] = new Object();
          typeObject[item.xAxisValue] = new Object();
        }
        xAxisObject[item.xAxisValue][item.yAxisLabel] = data[i].yAxisValue;
        typeObject[item.xAxisValue][item.yAxisLabel] = data[i].axisNo;  //TODO
      }
      var xAxisData = Object.getOwnPropertyNames(xAxisObject);
      var series = new Array();
      var legend = Object.getOwnPropertyNames(xAxisObject[xAxisData[0]]);
      for (var i = 0; i < xAxisData.length; i++) {
        for (var j = 0; j < legend.length; j++) {
          if (series[j] == undefined) {
            series[j] = new Object();
            series[j].name = legend[j];
            series[j].type = 'line';
            // series[j].stack = stack;
            series[j].data = new Array();
          }
          // if(legend[j].indexOf('Actual') != -1) {
          //     series[j].type = 'bar';
          // }else{
          //     series[j].type = 'line';
          // }
          if (typeObject[xAxisData[i]][legend[j]] == 1) {
            series[j].type = 'line';
          } else if (typeObject[xAxisData[i]][legend[j]] == 0) {
            series[j].type = 'bar';
          }
          series[j].data.push(xAxisObject[xAxisData[i]][legend[j]] || 0);
        }
      }
      //set chart option
      var turnoverDaysOption = angular.copy(option);
      turnoverDaysOption.legend.data = legend;
      //默认勾选T2 ACTUAL
      turnoverDaysOption.legend.selected = new Object();
      for (var i = 0; i < legend.length; i++) {
        turnoverDaysOption.legend.selected[legend[i]] = false;
        if (legend[i].indexOf('T2') != -1 || legend[i].indexOf('Actual') != -1 || legend[i].indexOf('Benchmark') != -1) {
          console.log(legend[i]);
          turnoverDaysOption.legend.selected[legend[i]] = true;
        }
      }
      turnoverDaysOption.xAxis[0].data = xAxisData;
      turnoverDaysOption.series = series;
      $scope.charts[chart] = echarts.init(document.getElementById(chart), theme);
      $scope.charts[chart].setOption(turnoverDaysOption);
    };
    var getMixBarChart = function (data, chart, option) {
      //x
      var xAxisObject = new Object();
      var typeObject = new Object();
      for (var i = 0; i < data.length; i++) {
        var item = data[i];
        if (xAxisObject[item.xAxisValue] == undefined) {
          xAxisObject[item.xAxisValue] = new Object();
          typeObject[item.xAxisValue] = new Object();
        }
        xAxisObject[item.xAxisValue][item.yAxisLabel] = data[i].yAxisValue * 100;
        typeObject[item.xAxisValue][item.yAxisLabel] = data[i].axisNo;
        //TODO
        console.log(data[i].yAxisValue);
      }
      var xAxisData = Object.getOwnPropertyNames(xAxisObject);
      console.log(xAxisObject);
      //y
      var stack = data[0].lable;
      var series = new Array();
      var legend = Object.getOwnPropertyNames(xAxisObject[xAxisData[0]]);
      //顺序问题
      // var legend = ['x<=1','1<x<=7','7<x<=30','x>30'];
      for (var i = 0; i < xAxisData.length; i++) {
        for (var j = 0; j < legend.length; j++) {
          if (series[j] == undefined) {
            series[j] = new Object();
            series[j].name = legend[j];
            series[j].type = 'bar';
            series[j].stack = stack;
            series[j].data = new Array();
          }
          if (typeObject[xAxisData[i]][legend[j]] == 1) {
            series[j].type = 'line';
          } else if (typeObject[xAxisData[i]][legend[j]] == 0) {
            series[j].type = 'bar';
          }
          series[j].data.push(xAxisObject[xAxisData[i]][legend[j]] || 0);
        }
      }
      //set chart option
      var stockageMonthOption = angular.copy(option);
      stockageMonthOption.legend.data = legend;
      //默认勾选T2 ACTUAL
      turnoverDaysOption.legend.selected = new Object();
      for (var i = 0; i < legend.length; i++) {
        turnoverDaysOption.legend.selected[legend[i]] = false;
        if (legend[i].indexOf('T2') != -1 || legend[i].indexOf('Actual') != -1 || legend[i].indexOf('Benchmark') != -1) {
          console.log(legend[i]);
          turnoverDaysOption.legend.selected[legend[i]] = true;
        }
      }
      stockageMonthOption.xAxis[0].data = xAxisData;
      stockageMonthOption.series = series;
      $scope.charts[chart] = echarts.init(document.getElementById(chart), theme);
      $scope.charts[chart].setOption(stockageMonthOption);
    };
    // set sidebar closed and body solid layout mode
    $rootScope.settings.layout.pageContentWhite = true;
    $rootScope.settings.layout.pageBodySolid = false;
    $rootScope.settings.layout.pageSidebarClosed = false;
  }
]);
;
angular.module('SeanApp').controller('HROverviewController', [
  '$rootScope',
  '$scope',
  '$http',
  '$timeout',
  '$window',
  '$state',
  function ($rootScope, $scope, $http, $timeout, $window, $state) {
    var widgetHeight;
    $scope.charts = new Array();
    $scope.$on('ngRepeatFinished', function (repeatFinishedEvent) {
    });
    $scope.$on('$viewContentLoaded', function () {
      angular.element('.fullscreen').bind('click', function () {
        initializeChartSize();
      });
      $('.portlet .fa-download').bind('click', function () {
        var id = $(this).parents('.portlet').find('.ops-chart').attr('id');
        // console.log(id);
        var img = $scope.charts[id].getDataURL({
            type: 'png',
            pixelRatio: 2,
            backgroundColor: '#fff'
          });
        $(this).attr('href', img);  // $scope.charts[id].dispatchAction({type:'saveAsImage'});
      });
      initWidgetHeight();
      getfilterList();
      getBuList($rootScope.entityShortName);
    });
    //单轴
    var trendOption1 = {
        tooltip: { trigger: 'axis' },
        legend: { bottom: 48 },
        grid: {
          show: false,
          x: 40,
          y: 10,
          x2: 30,
          y2: 138
        },
        xAxis: [{
            type: 'category',
            axisLabel: {
              interval: 0,
              rotate: 45,
              margin: 6
            }
          }],
        yAxis: [{
            type: 'value',
            name: '',
            axisLabel: {
              formatter: function (value) {
                var val = value;
                if (value > 10000000) {
                  val = value / 100000000 + '\u4ebf';
                } else if (value > 10000) {
                  val = value / 10000 + '\u4e07';
                }
                return val;
              }
            },
            splitLine: { show: false }
          }],
        series: [],
        dataZoom: [{
            start: 50,
            end: 100,
            handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
            handleSize: '60%',
            handleStyle: {
              color: '#fff',
              shadowBlur: 3,
              shadowColor: 'rgba(0, 0, 0, 0.6)',
              shadowOffsetX: 2,
              shadowOffsetY: 2
            },
            textStyle: { color: '#fff' }
          }]
      };
    //双轴
    var trendOption2 = {
        tooltip: { trigger: 'axis' },
        legend: { bottom: 48 },
        grid: {
          show: false,
          x: 30,
          y: 10,
          x2: 50,
          y2: 138
        },
        xAxis: [{
            type: 'category',
            axisLabel: {
              interval: 0,
              rotate: 45,
              margin: 6
            }
          }],
        yAxis: [
          {
            type: 'value',
            name: '',
            axisLabel: { formatter: '{value}' },
            splitLine: { show: false }
          },
          {
            type: 'value',
            name: '',
            axisLabel: {
              formatter: function (value) {
                var val = value;
                if (value > 10000000) {
                  val = value / 100000000 + '\u4ebf';
                } else if (value > 10000) {
                  val = value / 10000 + '\u4e07';
                }
                return val;
              }
            },
            splitLine: { show: false }
          }
        ],
        series: [],
        dataZoom: [{
            start: 50,
            end: 100,
            handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
            handleSize: '60%',
            handleStyle: {
              color: '#fff',
              shadowBlur: 3,
              shadowColor: 'rgba(0, 0, 0, 0.6)',
              shadowOffsetX: 2,
              shadowOffsetY: 2
            },
            textStyle: { color: '#fff' }
          }]
      };
    //叠柱
    var ageOption = {
        tooltip: { trigger: 'axis' },
        legend: {
          width: 640,
          left: 'center',
          bottom: 48
        },
        grid: {
          show: false,
          x: 40,
          y: 10,
          x2: 20,
          y2: 138
        },
        xAxis: [{
            type: 'category',
            axisLabel: {
              interval: 0,
              rotate: 45,
              margin: 6
            }
          }],
        yAxis: [{
            type: 'value',
            name: '',
            axisLabel: {
              formatter: function (value) {
                var val = value;
                if (value > 10000000) {
                  val = value / 100000000 + '\u4ebf';
                } else if (value > 10000) {
                  val = value / 10000 + '\u4e07';
                }
                return val;
              }
            },
            splitLine: { show: false }
          }],
        series: [],
        dataZoom: [{
            start: 0,
            end: 100,
            handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
            handleSize: '60%',
            handleStyle: {
              color: '#fff',
              shadowBlur: 3,
              shadowColor: 'rgba(0, 0, 0, 0.6)',
              shadowOffsetX: 2,
              shadowOffsetY: 2
            },
            textStyle: { color: '#fff' }
          }]
      };
    var initWidgetHeight = function () {
      var height = $(window).height() - 63.99 - 77.78 - 18.89 - 50;
      $('.page-content').css('min-height', height);
      widgetHeight = (height - 77.8 - 60) / 2;
      $('.yfops-widget').css('min-height', widgetHeight);
      $('.yfops-map').css('min-height', widgetHeight - 4);
    };
    var initEchart = function (data) {
      if (!data || data == undefined) {
        return;
      }
      var valueArray = [
          data.totalLaborhours,
          data.equ,
          data.totalLaborhoursDivideEQU
        ];
      $scope.values = new Array();
      for (var i = 0; i < valueArray.length; i++) {
        if (valueArray[i].length == 0)
          continue;
        $scope.values[i] = new Object();
        if (valueArray[i][0].axisValue > valueArray[i][1].axisValue) {
          $scope.values[i].state = 'up';
        } else if (valueArray[i][0].axisValue < valueArray[i][1].axisValue) {
          $scope.values[i].state = 'down';
        } else {
          $scope.values[i].state = 'equals';
        }
        $scope.values[i].axisValue = valueArray[i][0].axisValue;
        $scope.values[i].percent = valueArray[i][0].axisValue / valueArray[i][1].axisValue * 100;
        $scope.values[i].lable = valueArray[i][0].lable;
        $scope.values[i].axis = valueArray[i][0].axis;
        $scope.values[i].unit = valueArray[i][0].unit;
      }
      console.log(111111);
      $scope.title1 = data.totalLaborhoursDivideEQUTrendMonth[0].lable;
      getBarLineChart(data.totalLaborhoursDivideEQUTrendMonth, 'chart1', trendOption2);
      $scope.title2 = data.totalLaborhoursDivideEQUTrendYear[0].lable;
      getBarLineChart(data.totalLaborhoursDivideEQUTrendYear, 'chart2', trendOption2);
      $scope.title3 = data.totalLaborhoursDivideEQUClassMonth[0].lable;
      getLineMixBarChart(data.totalLaborhoursDivideEQUClassMonth, 'chart3', ageOption);
      $scope.title4 = data.totalLaborhoursDivideEQUClassYear[0].lable;
      getLineMixBarChart(data.totalLaborhoursDivideEQUClassYear, 'chart4', ageOption);
    };
    var initializeChartSize = function () {
      $timeout.cancel($scope.layout);
      $scope.layout = $timeout(function () {
        initEchart($scope.overviewData);
      }, 80);
    };
    var getfilterList = function () {
      ///////真数据
      $http.get($rootScope.settings.api + '/hr/queryFilter').success(function (json) {
        $scope.filterListObject = json.filterList;
        getfilterListSuccess($scope.filterListObject);
      }).error(function () {
        ///////假数据
        $scope.filterListObject = hrQueryFilter.filterList;
        getfilterListSuccess($scope.filterListObject);
      });
    };
    var getfilterListSuccess = function (list) {
      $scope.filterList = new Array();
      for (var i = 0; i < list.length; i++) {
        $scope.filterList.push(list[i].businessCat3);
      }
      $scope.setFilter($scope.filterList[0]);
    };
    $scope.setFilter = function (filter) {
      console.log(filter);
      $scope.currentFilter = filter;
      getOverviewData($rootScope.entityShortName, $scope.currentFilter);
    };
    var getBuListSuccess = function (buList) {
      $rootScope.BuList = new Object();
      $rootScope.ALLBuList = new Array();
      for (var i = 0; i < buList.length; i++) {
        var shortName = buList[i].buCodeShortName;
        if (shortName == null)
          continue;
        if ($rootScope.BuList[shortName] == undefined) {
          $rootScope.BuList[shortName] = new Array();
        }
        $rootScope.BuList[shortName].push(buList[i]);
        $rootScope.ALLBuList.push(buList[i]);
      }
      //bu列表
      $rootScope.BuNameList = Object.getOwnPropertyNames($rootScope.BuList);
      $rootScope.BuNameList = $rootScope.BuNameList.sort();
      // $rootScope.pubCodeShortName = buList[0].pubCodeShortName;
      // $rootScope.buCodeShortName = $rootScope.BuList[$rootScope.BuNameList[0]][0].buCodeShortName;
      $rootScope.entityShortName = $state.params['id'] || buList[0].pubCodeShortName || 'JIT PBU';
      console.log('shortName:' + $rootScope.entityShortName);
    };
    var getBuList = function (pubCodeShortName) {
      $rootScope.pubCodeShortName = pubCodeShortName;
      $.get($rootScope.settings.api + '/finance/queryBuList').success(function (json) {
        ///////真数据
        $scope.BuListObject = json.BuList;
        getBuListSuccess($scope.BuListObject);
        getOverviewData($rootScope.entityShortName, $scope.currentFilter);
        refreshChinaMap($rootScope.entityShortName);
      }).error(function () {
        console.log('\u8bf7\u6c42error,\u53d6\u5047\u6570\u636e');
        $scope.BuListObject = queryBuList.BuList;
        getBuListSuccess($scope.BuListObject);
        getOverviewData($rootScope.entityShortName, $scope.currentFilter);
        refreshChinaMap($rootScope.entityShortName);
      });
    };
    $scope.$on('onSelectedPBU', function (scope, buShortName) {
      $rootScope.buCodeShortName = buShortName;
      $rootScope.entityShortName = buShortName;
      getOverviewData($rootScope.entityShortName, $scope.currentFilter);
      refreshChinaMap($rootScope.entityShortName);
      $('.yfops-sparkline li.active').removeClass('active');
    });
    $scope.selectBU = function (buShortName, $event) {
      $rootScope.buCodeShortName = buShortName;
      $rootScope.entityShortName = buShortName;
      $('.yfops-sparkline li.active').removeClass('active');
      $($event.currentTarget).addClass('active');
      getOverviewData($rootScope.entityShortName, $scope.currentFilter);
      refreshChinaMap(buShortName);
    };
    var refreshChinaMap = function (buShortName) {
      var locations = new Array();
      var keys;
      if (buShortName != 'JIT PBU' && $rootScope.BuList[buShortName] != undefined) {
        keys = $rootScope.BuList[buShortName];
      } else {
        keys = $rootScope.ALLBuList;
      }
      console.log(buShortName);
      for (var i = 0; i < keys.length; i++) {
        var entity = {
            'action': 'tooltip',
            'id': keys[i].entityCode,
            'title': keys[i].entityShortName,
            'description': keys[i].entityShortName,
            'link': '#/hr/' + keys[i].entityShortName,
            'x': keys[i].axisX || 0,
            'y': keys[i].axisY || 0
          };
        locations.push(entity);
      }
      var option = angular.copy(mapOption);
      option.levels[0].locations = locations;
      initChinaMap(option);
    };
    var initChinaMap = function (option) {
      if ($('#mapplic').size() === 0) {
        return;
      }
      $('#mapplic').html('').data('mapplic', null);
      var h = widgetHeight - 2;
      $('#mapplic').mapplic({
        source: option,
        height: h,
        animate: true,
        sidebar: false,
        minimap: false,
        locations: false,
        deeplinking: false,
        fullscreen: false,
        hovertip: true,
        zoombuttons: true,
        clearbutton: true,
        developer: false,
        maxscale: 5,
        skin: 'mapplic-dark',
        zoom: true
      });
    };
    var getOverviewData = function (entityName, costType) {
      var param = {
          'entityName': entityName || 'JIT PBU',
          'costType': costType
        };
      $http.post($rootScope.settings.api + '/hr/queryHRData', param).success(function (json) {
        $scope.overviewData = json;
        initEchart($scope.overviewData);
      }).error(function () {
        ////假数据
        $scope.overviewData = hrQueryOverviewData;
        initEchart($scope.overviewData);
      });
    };
    var getBarLineChart = function (data, chart, option) {
      //x
      var xAxisObject = new Object();
      var typeObject = new Object();
      for (var i = 0; i < data.length; i++) {
        var item = data[i];
        if (xAxisObject[item.xAxisValue] == undefined) {
          xAxisObject[item.xAxisValue] = new Object();
          typeObject[item.xAxisValue] = new Object();
        }
        xAxisObject[item.xAxisValue][item.yAxisLabel] = data[i].yAxisValue;
        //TODO
        typeObject[item.xAxisValue][item.yAxisLabel] = data[i].axisNo;  //TODO
      }
      var xAxisData = Object.getOwnPropertyNames(xAxisObject);
      var stack = data[0].lable;
      var series = new Array();
      var legend = Object.getOwnPropertyNames(xAxisObject[xAxisData[0]]);
      for (var i = 0; i < xAxisData.length; i++) {
        for (var j = 0; j < legend.length; j++) {
          if (series[j] == undefined) {
            series[j] = new Object();
            series[j].name = legend[j];
            series[j].type = 'bar';
            series[j].data = new Array();
          }
          if (typeObject[xAxisData[i]][legend[j]] == 1) {
            //数据0和1搞错了
            series[j].type = 'line';
            series[j].yAxisIndex = 1;
          } else if (typeObject[xAxisData[i]][legend[j]] == 0) {
            series[j].type = 'bar';
            // series[j].stack = stack;
            series[j].yAxisIndex = 0;
          }
          series[j].data.push(xAxisObject[xAxisData[i]][legend[j]] || 0);
        }
      }
      //set chart option
      var _option = angular.copy(option);
      _option.legend.data = legend;
      //默认勾选T2 ACTUAL
      _option.legend.selected = new Object();
      for (var i = 0; i < legend.length; i++) {
        _option.legend.selected[legend[i]] = false;
        if (legend[i].indexOf('T2') != -1 || legend[i].indexOf('Actual') != -1 || legend[i].indexOf('Benchmark') != -1) {
          console.log(legend[i]);
          _option.legend.selected[legend[i]] = true;
        }
      }
      _option.xAxis[0].data = xAxisData;
      _option.series = series;
      $scope.charts[chart] = echarts.init(document.getElementById(chart), theme);
      $scope.charts[chart].setOption(_option);
    };
    var getMixBarChart = function (data, chart, option) {
      //x
      var xAxisObject = new Object();
      var typeObject = new Object();
      for (var i = 0; i < data.length; i++) {
        var item = data[i];
        if (xAxisObject[item.xAxisValue] == undefined) {
          xAxisObject[item.xAxisValue] = new Object();
          typeObject[item.xAxisValue] = new Object();
        }
        xAxisObject[item.xAxisValue][item.yAxisLabel] = data[i].yAxisValue;
        //TODO
        typeObject[item.xAxisValue][item.yAxisLabel] = data[i].axisNo;  //TODO
      }
      var xAxisData = Object.getOwnPropertyNames(xAxisObject);
      //y
      var stack = data[0].lable;
      var series = new Array();
      var legend = Object.getOwnPropertyNames(xAxisObject[xAxisData[0]]);
      //顺序问题
      // var legend = ['x<=1','1<x<=7','7<x<=30','x>30'];
      for (var i = 0; i < xAxisData.length; i++) {
        for (var j = 0; j < legend.length; j++) {
          if (series[j] == undefined) {
            series[j] = new Object();
            series[j].name = legend[j];
            series[j].type = 'bar';
            series[j].data = new Array();
          }
          if (typeObject[xAxisData[i]][legend[j]] == 1) {
            series[j].type = 'line';
          } else if (typeObject[xAxisData[i]][legend[j]] == 0) {
            series[j].type = 'bar';
            series[j].stack = stack;
          }
          series[j].data.push(xAxisObject[xAxisData[i]][legend[j]] || 0);
        }
      }
      //set chart option
      var _option = angular.copy(option);
      _option.legend.data = legend;
      //默认勾选T2 ACTUAL
      _option.legend.selected = new Object();
      for (var i = 0; i < legend.length; i++) {
        _option.legend.selected[legend[i]] = false;
        if (legend[i].indexOf('T2') != -1 || legend[i].indexOf('Actual') != -1 || legend[i].indexOf('Benchmark') != -1) {
          console.log(legend[i]);
          _option.legend.selected[legend[i]] = true;
        }
      }
      _option.xAxis[0].data = xAxisData;
      _option.series = series;
      $scope.charts[chart] = echarts.init(document.getElementById(chart), theme);
      $scope.charts[chart].setOption(_option);
    };
    var getLineMixBarChart = function (data, chart, option) {
      //x
      var xAxisObject = new Object();
      var typeObject = new Object();
      for (var i = 0; i < data.length; i++) {
        var item = data[i];
        if (xAxisObject[item.xAxisValue] == undefined) {
          xAxisObject[item.xAxisValue] = new Object();
          typeObject[item.xAxisValue] = new Object();
        }
        xAxisObject[item.xAxisValue][item.yAxisLabel] = data[i].yAxisValue;
        //TODO
        typeObject[item.xAxisValue][item.yAxisLabel] = data[i].axisNo;  //TODO
      }
      console.log('typeObject');
      console.log(typeObject);
      var xAxisData = Object.getOwnPropertyNames(xAxisObject);
      console.log('xAxisData');
      console.log(xAxisData);
      //y
      var stack = data[0].lable;
      var series = new Array();
      // var legend = Object.getOwnPropertyNames(xAxisObject[xAxisData[0]]);  //顺序问题
      var legend = [
          'Direct Labor Hours-Actual',
          'Indirect Labor Hours-Actual',
          'Outsourcing Labor hours-Actual',
          'Salary Labor Hours-Actual',
          'Total Labor hours-Actual'
        ];
      for (var i = 0; i < xAxisData.length; i++) {
        for (var j = 0; j < legend.length; j++) {
          if (series[j] == undefined) {
            series[j] = new Object();
            series[j].name = legend[j];
            series[j].type = 'bar';
            series[j].data = new Array();
          }
          if (typeObject[xAxisData[i]][legend[j]] == 1) {
            series[j].type = 'line';
          } else if (typeObject[xAxisData[i]][legend[j]] == 0) {
            series[j].type = 'bar';
            series[j].stack = stack;
          }
          series[j].data.push(xAxisObject[xAxisData[i]][legend[j]] || 0);
        }
      }
      //set chart option
      var _option = angular.copy(option);
      _option.legend.data = legend;
      //默认勾选T2 ACTUAL
      _option.legend.selected = new Object();
      for (var i = 0; i < legend.length; i++) {
        _option.legend.selected[legend[i]] = false;
        if (legend[i].indexOf('T2') != -1 || legend[i].indexOf('Actual') != -1 || legend[i].indexOf('Benchmark') != -1) {
          console.log(legend[i]);
          _option.legend.selected[legend[i]] = true;
        }
      }
      _option.xAxis[0].data = xAxisData;
      _option.series = series;
      $scope.charts[chart] = echarts.init(document.getElementById(chart), theme);
      $scope.charts[chart].setOption(_option);
    };
    // set sidebar closed and body solid layout mode
    $rootScope.settings.layout.pageContentWhite = true;
    $rootScope.settings.layout.pageBodySolid = false;
    $rootScope.settings.layout.pageSidebarClosed = false;
    $rootScope.entityShortName = $state.params['id'] || 'JIT PBU';
    console.log('shortName:' + $rootScope.entityShortName);
  }
]);
;
angular.module('SeanApp').controller('LoginController', [
  '$rootScope',
  '$scope',
  '$http',
  '$state',
  '$window',
  function ($rootScope, $scope, $http, $state, $window) {
    var widgetHeight;
    $scope.$on('$viewContentLoaded', function () {
      $.backstretch(['css/p8.jpg'], {
        fade: 0,
        duration: 10000
      });
    });
    $scope.request = {};
    $scope.login = function () {
      //TODO: static login
      $state.go('dashboard');
      $http.post($rootScope.settings.api + '/user/login', $scope.request, function (json) {
        console.log(json);
      });
    };
    // set sidebar closed and body solid layout mode
    $rootScope.settings.layout.pageContentWhite = true;
    $rootScope.settings.layout.pageBodySolid = false;
    $rootScope.settings.layout.pageSidebarClosed = false;
  }
]);
;
angular.module('SeanApp').controller('OtherFactoryController', [
  '$rootScope',
  '$scope',
  '$http',
  '$timeout',
  '$window',
  function ($rootScope, $scope, $http, $timeout, $window) {
    var widgetHeight;
    $scope.charts = new Array();
    $scope.$on('ngRepeatFinished', function (repeatFinishedEvent) {
    });
    $scope.$on('$viewContentLoaded', function () {
      angular.element('.fullscreen').bind('click', function () {
        initializeChartSize();
      });
      $('.portlet .fa-download').bind('click', function () {
        var id = $(this).parents('.portlet').find('.ops-chart').attr('id');
        // console.log(id);
        var img = $scope.charts[id].getDataURL({
            type: 'png',
            pixelRatio: 2,
            backgroundColor: '#fff'
          });
        $(this).attr('href', img);  // $scope.charts[id].dispatchAction({type:'saveAsImage'});
      });
      initWidgetHeight();
      // getfilterList();
      getOverviewData($rootScope.entityName);
    });
    var initWidgetHeight = function () {
      var height = $(window).height() - 63.99 - 77.78 - 18.89 - 50;
      $('.page-content').css('min-height', height);
      widgetHeight = (height - 77.8 - 60) / 2 - 20;
      $('.yfops-widget').css('min-height', widgetHeight);
    };
    //单轴
    var trendOption1 = {
        tooltip: { trigger: 'axis' },
        legend: { bottom: 48 },
        grid: {
          show: false,
          x: 40,
          y: 10,
          x2: 30,
          y2: 98
        },
        xAxis: [{ type: 'category' }],
        yAxis: [{
            type: 'value',
            name: '',
            axisLabel: {
              formatter: function (value) {
                return value;
              }
            }
          }],
        series: [],
        dataZoom: [{
            start: 50,
            end: 100,
            handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
            handleSize: '60%',
            handleStyle: {
              color: '#fff',
              shadowBlur: 3,
              shadowColor: 'rgba(0, 0, 0, 0.6)',
              shadowOffsetX: 2,
              shadowOffsetY: 2
            },
            textStyle: { color: '#fff' }
          }]
      };
    //双轴
    var trendOption2 = {
        tooltip: { trigger: 'axis' },
        legend: { bottom: 48 },
        grid: {
          show: false,
          x: 40,
          y: 10,
          x2: 30,
          y2: 148
        },
        xAxis: [{
            type: 'category',
            axisLabel: {
              interval: 0,
              rotate: 45,
              margin: 6
            }
          }],
        yAxis: [{
            type: 'value',
            name: '',
            axisLabel: {
              formatter: function (value) {
                return value;
              }
            },
            splitLine: { show: false }
          }],
        series: [],
        dataZoom: [{
            start: 0,
            end: 100,
            handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
            handleSize: '60%',
            handleStyle: {
              color: '#fff',
              shadowBlur: 3,
              shadowColor: 'rgba(0, 0, 0, 0.6)',
              shadowOffsetX: 2,
              shadowOffsetY: 2
            },
            textStyle: { color: '#fff' }
          }]
      };
    var ageOption = {
        tooltip: { trigger: 'axis' },
        legend: { bottom: 48 },
        grid: {
          show: false,
          x: 38,
          y: 10,
          x2: 20,
          y2: 128
        },
        xAxis: [{
            type: 'category',
            axisLabel: {
              interval: 0,
              rotate: 45,
              margin: 6
            }
          }],
        yAxis: [{
            type: 'value',
            name: '',
            interval: 20,
            axisLabel: { formatter: '{value}' },
            splitLine: { show: false }
          }],
        series: [],
        dataZoom: [{
            start: 0,
            end: 100,
            handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
            handleSize: '60%',
            handleStyle: {
              color: '#fff',
              shadowBlur: 3,
              shadowColor: 'rgba(0, 0, 0, 0.6)',
              shadowOffsetX: 2,
              shadowOffsetY: 2
            },
            textStyle: { color: '#fff' }
          }]
      };
    var initEchart = function (data) {
      if (!data || data == undefined) {
        return;
      }
      console.log(data);
      $scope.title1 = data.activeDimissionRate[0].lable;
      getBarLineChart(data.activeDimissionRate, 'chart1', trendOption2);
      $scope.title2 = data.mu[0].lable;
      getBarLineChartExtra(data.mu, 'chart2', trendOption2);
      $scope.title3 = data.personnelExpensesWithBU[0].lable;
      getBarLineChart(data.personnelExpensesWithBU, 'chart3', trendOption2);
      $scope.title4 = data.personnelExpensesWithCompany[0].lable;
      getBarLineChart(data.personnelExpensesWithCompany, 'chart4', trendOption2);
    };
    var initializeChartSize = function () {
      $timeout.cancel($scope.layout);
      $scope.layout = $timeout(function () {
        initEchart($scope.overviewData);
      }, 80);
    };
    $scope.$on('onSelectedPBU', function (buShortName) {
      $rootScope.buCodeShortName = buShortName;
      getOverviewData(buShortName);
    });
    var getOverviewData = function (entityName) {
      var param = { 'entityName': entityName || 'JIT PBU' };
      $http.post($rootScope.settings.api + '/other/queryFactoryData', param).success(function (json) {
        $scope.overviewData = json;
        initEchart($scope.overviewData);
      }).error(function () {
        ////假数据
        $scope.overviewData = otherQueryFactoryData;
        initEchart($scope.overviewData);
      });
    };
    var getBarLineChartExtra = function (data, chart, option) {
      //x
      var xAxisObject = new Object();
      var typeObject = new Object();
      for (var i = 0; i < data.length; i++) {
        var item = data[i];
        if (xAxisObject[item.xAxisValue] == undefined) {
          xAxisObject[item.xAxisValue] = new Object();
          typeObject[item.xAxisValue] = new Object();
        }
        xAxisObject[item.xAxisValue][item.yAxisLabel] = data[i].yAxisValue;
        typeObject[item.xAxisValue][item.yAxisLabel] = data[i].axisNo;  //TODO
      }
      var xAxisData = Object.getOwnPropertyNames(xAxisObject);
      var series = new Array();
      var legend = [
          'MU-Actual',
          'MU-Benchmark'
        ];
      //Object.getOwnPropertyNames(xAxisObject[xAxisData[0]]);
      for (var i = 0; i < xAxisData.length; i++) {
        for (var j = 0; j < legend.length; j++) {
          if (series[j] == undefined) {
            series[j] = new Object();
            series[j].name = legend[j];
            series[j].type = 'line';
            // series[j].stack = stack;
            series[j].data = new Array();  // if(legend[j].indexOf('T1') != -1 ||legend[j].indexOf('T2') != -1　|| legend[j].indexOf('T3') != -1 || legend[j].indexOf('Benchmark') != -1) {
                                           //     series[j].type = 'line';
                                           //     // series[j].yAxisIndex = 0;
                                           // }else if(legend[j].indexOf('Actual') != -1){
                                           //     series[j].type = 'bar';
                                           //     // series[j].yAxisIndex = 0;
                                           // }else{
                                           //     series[j].type = 'bar';
                                           //     // series[j].yAxisIndex = 0;
                                           // }
          }
          if (typeObject[xAxisData[i]][legend[j]] == 1) {
            series[j].type = 'line';
          } else if (typeObject[xAxisData[i]][legend[j]] == 0) {
            series[j].type = 'bar';
          }
          series[j].data.push(xAxisObject[xAxisData[i]][legend[j]] || 0);
        }
      }
      //set chart option
      var _option = angular.copy(option);
      _option.legend.data = legend;
      //默认勾选T2 ACTUAL
      _option.legend.selected = new Object();
      for (var i = 0; i < legend.length; i++) {
        _option.legend.selected[legend[i]] = false;
        if (legend[i].indexOf('T2') != -1 || legend[i].indexOf('Actual') != -1 || legend[i].indexOf('Benchmark') != -1) {
          console.log(legend[i]);
          _option.legend.selected[legend[i]] = true;
        }
      }
      _option.xAxis[0].data = xAxisData;
      _option.series = series;
      $scope.charts[chart] = echarts.init(document.getElementById(chart), theme);
      $scope.charts[chart].setOption(_option);
    };
    var getBarLineChart = function (data, chart, option) {
      //x
      var xAxisObject = new Object();
      var typeObject = new Object();
      for (var i = 0; i < data.length; i++) {
        var item = data[i];
        if (xAxisObject[item.xAxisValue] == undefined) {
          xAxisObject[item.xAxisValue] = new Object();
          typeObject[item.xAxisValue] = new Object();
        }
        xAxisObject[item.xAxisValue][item.yAxisLabel] = data[i].yAxisValue;
        typeObject[item.xAxisValue][item.yAxisLabel] = data[i].axisNo;  //TODO
      }
      var xAxisData = Object.getOwnPropertyNames(xAxisObject);
      var series = new Array();
      var legend = Object.getOwnPropertyNames(xAxisObject[xAxisData[0]]);
      for (var i = 0; i < xAxisData.length; i++) {
        for (var j = 0; j < legend.length; j++) {
          if (series[j] == undefined) {
            series[j] = new Object();
            series[j].name = legend[j];
            series[j].type = 'line';
            // series[j].stack = stack;
            series[j].data = new Array();  // if(legend[j].indexOf('T1') != -1 ||legend[j].indexOf('T2') != -1　|| legend[j].indexOf('T3') != -1 || legend[j].indexOf('Benchmark') != -1) {
                                           //     series[j].type = 'line';
                                           //     // series[j].yAxisIndex = 1;
                                           // }else if(legend[j].indexOf('Actual') != -1){
                                           //     series[j].type = 'bar';
                                           //     // series[j].yAxisIndex = 0;
                                           // }else{
                                           //     series[j].type = 'bar';
                                           //     // series[j].yAxisIndex = 0;
                                           // }
          }
          if (typeObject[xAxisData[i]][legend[j]] == 1) {
            series[j].type = 'line';
          } else if (typeObject[xAxisData[i]][legend[j]] == 0) {
            series[j].type = 'bar';
          }
          series[j].data.push(xAxisObject[xAxisData[i]][legend[j]] || 0);
        }
      }
      //set chart option
      var _option = angular.copy(option);
      _option.legend.data = legend;
      //默认勾选T2 ACTUAL
      _option.legend.selected = new Object();
      for (var i = 0; i < legend.length; i++) {
        _option.legend.selected[legend[i]] = false;
        if (legend[i].indexOf('T2') != -1 || legend[i].indexOf('Actual') != -1 || legend[i].indexOf('Benchmark') != -1) {
          console.log(legend[i]);
          _option.legend.selected[legend[i]] = true;
        }
      }
      _option.xAxis[0].data = xAxisData;
      _option.series = series;
      $scope.charts[chart] = echarts.init(document.getElementById(chart), theme);
      $scope.charts[chart].setOption(_option);
    };
    var getMixBarChart = function (data, chart, option) {
      //x
      var xAxisObject = new Object();
      var typeObject = new Object();
      for (var i = 0; i < data.length; i++) {
        var item = data[i];
        if (xAxisObject[item.xAxisValue] == undefined) {
          xAxisObject[item.xAxisValue] = new Object();
          typeObject[item.xAxisValue] = new Object();
        }
        xAxisObject[item.xAxisValue][item.yAxisLabel] = data[i].yAxisValue * 100;
        typeObject[item.xAxisValue][item.yAxisLabel] = data[i].axisNo;  //TODO
      }
      var xAxisData = Object.getOwnPropertyNames(xAxisObject);
      //y
      var stack = data[0].lable;
      var series = new Array();
      var legend = Object.getOwnPropertyNames(xAxisObject[xAxisData[0]]);
      //顺序问题
      // var legend = ['x<=1','1<x<=7','7<x<=30','x>30'];
      for (var i = 0; i < xAxisData.length; i++) {
        for (var j = 0; j < legend.length; j++) {
          if (series[j] == undefined) {
            series[j] = new Object();
            series[j].name = legend[j];
            series[j].type = 'bar';
            series[j].stack = stack;
            series[j].data = new Array();
          }
          if (typeObject[xAxisData[i]][legend[j]] == 1) {
            series[j].type = 'line';
          } else if (typeObject[xAxisData[i]][legend[j]] == 0) {
            series[j].type = 'bar';
          }
          series[j].data.push(xAxisObject[xAxisData[i]][legend[j]] || 0);
        }
      }
      //set chart option
      var _option = angular.copy(option);
      _option.legend.data = legend;
      //默认勾选T2 ACTUAL
      _option.legend.selected = new Object();
      for (var i = 0; i < legend.length; i++) {
        _option.legend.selected[legend[i]] = false;
        if (legend[i].indexOf('T2') != -1 || legend[i].indexOf('Actual') != -1 || legend[i].indexOf('Benchmark') != -1) {
          console.log(legend[i]);
          _option.legend.selected[legend[i]] = true;
        }
      }
      _option.xAxis[0].data = xAxisData;
      _option.series = series;
      $scope.charts[chart] = echarts.init(document.getElementById(chart), theme);
      $scope.charts[chart].setOption(_option);
    };
    // set sidebar closed and body solid layout mode
    $rootScope.settings.layout.pageContentWhite = true;
    $rootScope.settings.layout.pageBodySolid = false;
    $rootScope.settings.layout.pageSidebarClosed = false;
  }
]);
;
angular.module('SeanApp').controller('OtherOverviewController', [
  '$rootScope',
  '$scope',
  '$http',
  '$timeout',
  '$window',
  '$state',
  function ($rootScope, $scope, $http, $timeout, $window, $state) {
    var widgetHeight;
    $scope.charts = new Array();
    $scope.$on('ngRepeatFinished', function (repeatFinishedEvent) {
    });
    $scope.$on('$viewContentLoaded', function () {
      angular.element('.fullscreen').bind('click', function () {
        initializeChartSize();
      });
      $('.portlet .fa-download').bind('click', function () {
        var id = $(this).parents('.portlet').find('.ops-chart').attr('id');
        // console.log(id);
        var img = $scope.charts[id].getDataURL({
            type: 'png',
            pixelRatio: 2,
            backgroundColor: '#fff'
          });
        $(this).attr('href', img);  // $scope.charts[id].dispatchAction({type:'saveAsImage'});
      });
      initWidgetHeight();
      // getfilterList();
      getBuList($rootScope.entityShortName);
      getOverviewData($rootScope.entityShortName);
    });
    //单轴
    var trendOption1 = {
        tooltip: { trigger: 'axis' },
        legend: { bottom: 48 },
        grid: {
          show: false,
          x: 40,
          y: 10,
          x2: 30,
          y2: 98
        },
        xAxis: [{
            type: 'category',
            axisLabel: {
              interval: 0,
              rotate: 45,
              margin: 6
            }
          }],
        yAxis: [{
            type: 'value',
            name: '',
            axisLabel: {
              formatter: function (value) {
                return value;
              }
            },
            splitLine: { show: false }
          }],
        series: [],
        dataZoom: [{
            start: 0,
            end: 100,
            handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
            handleSize: '60%',
            handleStyle: {
              color: '#fff',
              shadowBlur: 3,
              shadowColor: 'rgba(0, 0, 0, 0.6)',
              shadowOffsetX: 2,
              shadowOffsetY: 2
            },
            textStyle: { color: '#fff' }
          }]
      };
    //双轴
    var trendOption2 = {
        tooltip: { trigger: 'axis' },
        legend: { bottom: 48 },
        grid: {
          show: false,
          x: 40,
          y: 10,
          x2: 30,
          y2: 138
        },
        xAxis: [{
            type: 'category',
            axisLabel: {
              interval: 0,
              rotate: 45,
              margin: 6
            }
          }],
        yAxis: [{
            type: 'value',
            name: '',
            axisLabel: {
              formatter: function (value) {
                return value;
              }
            },
            splitLine: { show: false }
          }],
        series: [],
        dataZoom: [{
            start: 0,
            end: 100,
            handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
            handleSize: '60%',
            handleStyle: {
              color: '#fff',
              shadowBlur: 3,
              shadowColor: 'rgba(0, 0, 0, 0.6)',
              shadowOffsetX: 2,
              shadowOffsetY: 2
            },
            textStyle: { color: '#fff' }
          }]
      };
    //叠柱
    var ageOption = {
        tooltip: { trigger: 'axis' },
        legend: {
          width: 640,
          left: 'center',
          bottom: 48
        },
        grid: {
          show: false,
          x: 40,
          y: 10,
          x2: 20,
          y2: 128
        },
        xAxis: [{
            type: 'category',
            axisLabel: {
              interval: 0,
              rotate: 45,
              margin: 6
            }
          }],
        yAxis: [{
            type: 'value',
            name: '',
            axisLabel: { formatter: '{value}' },
            splitLine: { show: false }
          }],
        series: [],
        dataZoom: [{
            start: 0,
            end: 100,
            handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
            handleSize: '60%',
            handleStyle: {
              color: '#fff',
              shadowBlur: 3,
              shadowColor: 'rgba(0, 0, 0, 0.6)',
              shadowOffsetX: 2,
              shadowOffsetY: 2
            },
            textStyle: { color: '#fff' }
          }]
      };
    var initWidgetHeight = function () {
      var height = $(window).height() - 63.99 - 77.78 - 18.89 - 50;
      $('.page-content').css('min-height', height);
      widgetHeight = (height - 77.8 - 60) / 2;
      $('.yfops-widget').css('min-height', widgetHeight);
      $('.yfops-map').css('min-height', widgetHeight - 4);
    };
    var initEchart = function (data) {
      if (!data || data == undefined) {
        return;
      }
      var valueArray = [
          data.mu,
          data.activeDimissionRate,
          data.personnelExpensesWithBU,
          data.personnelExpensesWithCompany
        ];
      $scope.values = new Array();
      for (var i = 0; i < valueArray.length; i++) {
        if (valueArray[i].length == 0)
          continue;
        $scope.values[i] = new Object();
        if (valueArray[i][0].axisValue > valueArray[i][1].axisValue) {
          $scope.values[i].state = 'up';
        } else if (valueArray[i][0].axisValue < valueArray[i][1].axisValue) {
          $scope.values[i].state = 'down';
        } else {
          $scope.values[i].state = 'equals';
        }
        $scope.values[i].axisValue = valueArray[i][0].axisValue;
        $scope.values[i].percent = valueArray[i][0].axisValue / valueArray[i][1].axisValue * 100;
        $scope.values[i].lable = valueArray[i][0].lable;
        $scope.values[i].axis = valueArray[i][0].axis;
        $scope.values[i].unit = valueArray[i][0].unit;
      }
      $scope.title1 = data.muTrendMonth[0].lable;
      getBarLineChartMU(data.muTrendMonth, 'chart1', trendOption2);
      $scope.title2 = data.muTrendYear[0].lable;
      getBarLineChartMU(data.muTrendYear, 'chart2', trendOption2);
      $scope.title3 = data.personnelExpensesTrendWithBUByMonth[0].lable;
      getBarLineChart(data.personnelExpensesTrendWithBUByMonth, 'chart3', trendOption2);
      $scope.title4 = data.personnelExpensesTrendWithBUByYear[0].lable;
      getBarLineChart(data.personnelExpensesTrendWithBUByYear, 'chart4', trendOption2);
      $scope.title5 = data.personnelExpensesTrendWithCompanyByMonth[0].lable;
      getBarLineChart(data.personnelExpensesTrendWithCompanyByMonth, 'chart5', trendOption2);
      $scope.title6 = data.personnelExpensesTrendWithCompanyByYear[0].lable;
      getBarLineChart(data.personnelExpensesTrendWithCompanyByYear, 'chart6', trendOption2);
      $scope.title7 = data.activeDimissionRateTrendMonth[0].lable;
      getBarLineChart(data.activeDimissionRateTrendMonth, 'chart7', trendOption2);
      $scope.title8 = data.activeDimissionRateTrendYear[0].lable;
      getBarLineChart(data.activeDimissionRateTrendYear, 'chart8', trendOption2);
    };
    var initializeChartSize = function () {
      $timeout.cancel($scope.layout);
      $scope.layout = $timeout(function () {
        initEchart($scope.overviewData);
      }, 80);
    };
    var getBuListSuccess = function (buList) {
      $rootScope.BuList = new Object();
      $rootScope.ALLBuList = new Array();
      for (var i = 0; i < buList.length; i++) {
        var shortName = buList[i].buCodeShortName;
        if (shortName == null)
          continue;
        if ($rootScope.BuList[shortName] == undefined) {
          $rootScope.BuList[shortName] = new Array();
        }
        $rootScope.BuList[shortName].push(buList[i]);
        $rootScope.ALLBuList.push(buList[i]);
      }
      //bu列表
      $rootScope.BuNameList = Object.getOwnPropertyNames($rootScope.BuList);
      $rootScope.BuNameList = $rootScope.BuNameList.sort();
      $rootScope.entityShortName = $state.params['id'] || buList[0].pubCodeShortName || 'JIT PBU';
      console.log('shortName:' + $rootScope.entityShortName);
    };
    var getBuList = function (pubCodeShortName) {
      $rootScope.pubCodeShortName = pubCodeShortName;
      $.get($rootScope.settings.api + '/finance/queryBuList').success(function (json) {
        ///////真数据
        $scope.BuListObject = json.BuList;
        getBuListSuccess($scope.BuListObject);
        getOverviewData($rootScope.entityShortName);
        refreshChinaMap($rootScope.entityShortName);
      }).error(function () {
        console.log('\u8bf7\u6c42error,\u53d6\u5047\u6570\u636e');
        $scope.BuListObject = queryBuList.BuList;
        getBuListSuccess($scope.BuListObject);
        getOverviewData($rootScope.entityShortName);
        refreshChinaMap($rootScope.entityShortName);
      });
    };
    $scope.$on('onSelectedPBU', function (scope, buShortName) {
      $rootScope.buCodeShortName = buShortName;
      $rootScope.entityShortName = buShortName;
      getOverviewData($rootScope.entityShortName);
      refreshChinaMap($rootScope.entityShortName);
      $('.yfops-sparkline li.active').removeClass('active');
    });
    $scope.selectBU = function (buShortName, $event) {
      $rootScope.buCodeShortName = buShortName;
      $rootScope.entityShortName = buShortName;
      $('.yfops-sparkline li.active').removeClass('active');
      $($event.currentTarget).addClass('active');
      getOverviewData(buShortName);
      refreshChinaMap(buShortName);
    };
    var refreshChinaMap = function (buShortName) {
      var locations = new Array();
      var keys;
      if (buShortName != 'JIT PBU' && $rootScope.BuList[buShortName] != undefined) {
        keys = $rootScope.BuList[buShortName];
      } else {
        keys = $rootScope.ALLBuList;
      }
      console.log(buShortName);
      for (var i = 0; i < keys.length; i++) {
        var entity = {
            'action': 'tooltip',
            'id': keys[i].entityCode,
            'title': keys[i].entityShortName,
            'description': keys[i].entityShortName,
            'link': '#/other/' + keys[i].entityShortName,
            'x': keys[i].axisX || 0,
            'y': keys[i].axisY || 0
          };
        locations.push(entity);
      }
      var option = angular.copy(mapOption);
      option.levels[0].locations = locations;
      initChinaMap(option);
    };
    var initChinaMap = function (option) {
      if ($('#mapplic').size() === 0) {
        return;
      }
      $('#mapplic').html('').data('mapplic', null);
      var h = widgetHeight - 2;
      $('#mapplic').mapplic({
        source: option,
        height: h,
        animate: true,
        sidebar: false,
        minimap: false,
        locations: false,
        deeplinking: false,
        fullscreen: false,
        hovertip: true,
        zoombuttons: true,
        clearbutton: true,
        developer: false,
        maxscale: 5,
        skin: 'mapplic-dark',
        zoom: true
      });
    };
    $scope.$on('onSelectedPBU', function (scope, buShortName) {
      $rootScope.buCodeShortName = buShortName;
      $rootScope.entityShortName = buShortName;
      getOverviewData($rootScope.entityShortName);
    });
    var getOverviewData = function (entityName) {
      var param = { 'entityName': entityName || 'JIT PBU' };
      $http.post($rootScope.settings.api + '/other/queryOverviewData', param).success(function (json) {
        $scope.overviewData = json;
        initEchart($scope.overviewData);
      }).error(function () {
        ////假数据
        $scope.overviewData = otherQueryOverviewData;
        initEchart($scope.overviewData);
      });
    };
    var getBarLineChartMU = function (data, chart, option) {
      //x
      var xAxisObject = new Object();
      var typeObject = new Object();
      for (var i = 0; i < data.length; i++) {
        var item = data[i];
        if (xAxisObject[item.xAxisValue] == undefined) {
          xAxisObject[item.xAxisValue] = new Object();
          typeObject[item.xAxisValue] = new Object();
        }
        xAxisObject[item.xAxisValue][item.yAxisLabel] = data[i].yAxisValue;
        typeObject[item.xAxisValue][item.yAxisLabel] = data[i].axisNo;  //TODO
      }
      var xAxisData = Object.getOwnPropertyNames(xAxisObject);
      var series = new Array();
      // var legend = Object.getOwnPropertyNames(xAxisObject[xAxisData[0]]);
      var legend = [
          'MU-Actual',
          'MU-Benchmark'
        ];
      for (var i = 0; i < xAxisData.length; i++) {
        for (var j = 0; j < legend.length; j++) {
          if (series[j] == undefined) {
            series[j] = new Object();
            series[j].name = legend[j];
            series[j].type = 'line';
            // series[j].stack = stack;
            series[j].data = new Array();
            //sql里 T1 T2 T3的type是 0
            // if(legend[j].indexOf('T1')!= -1 || legend[j].indexOf('T2')!= -1 || legend[j].indexOf('T3')!= -1 || legend[j].indexOf('Benchmark')!= -1){
            //     series[j].type = 'line';
            //     // series[j].yAxisIndex = 1;
            // }else{
            //     series[j].type = 'bar';
            //     // series[j].yAxisIndex = 0;
            // }
            if (typeObject[xAxisData[i]][legend[j]] == 1) {
              series[j].type = 'line';
            } else if (typeObject[xAxisData[i]][legend[j]] == 0) {
              series[j].type = 'bar';
            }
          }
          series[j].data.push(xAxisObject[xAxisData[i]][legend[j]] || 0);
        }
      }
      //set chart option
      var _option = angular.copy(option);
      _option.legend.data = legend;
      //默认勾选T2 ACTUAL
      _option.legend.selected = new Object();
      for (var i = 0; i < legend.length; i++) {
        _option.legend.selected[legend[i]] = false;
        if (legend[i].indexOf('T2') != -1 || legend[i].indexOf('Actual') != -1 || legend[i].indexOf('Benchmark') != -1) {
          console.log(legend[i]);
          _option.legend.selected[legend[i]] = true;
        }
      }
      _option.xAxis[0].data = xAxisData;
      _option.series = series;
      $scope.charts[chart] = echarts.init(document.getElementById(chart), theme);
      $scope.charts[chart].setOption(_option);
    };
    var getBarLineChart = function (data, chart, option) {
      //x
      var xAxisObject = new Object();
      var typeObject = new Object();
      for (var i = 0; i < data.length; i++) {
        var item = data[i];
        if (xAxisObject[item.xAxisValue] == undefined) {
          xAxisObject[item.xAxisValue] = new Object();
          typeObject[item.xAxisValue] = new Object();
        }
        xAxisObject[item.xAxisValue][item.yAxisLabel] = data[i].yAxisValue;
        typeObject[item.xAxisValue][item.yAxisLabel] = data[i].axisNo;  //TODO
      }
      var xAxisData = Object.getOwnPropertyNames(xAxisObject);
      var series = new Array();
      var legend = Object.getOwnPropertyNames(xAxisObject[xAxisData[0]]);
      for (var i = 0; i < xAxisData.length; i++) {
        for (var j = 0; j < legend.length; j++) {
          if (series[j] == undefined) {
            series[j] = new Object();
            series[j].name = legend[j];
            series[j].type = 'line';
            // series[j].stack = stack;
            series[j].data = new Array();
            //sql里 T1 T2 T3的type是 0
            if (legend[j].indexOf('T1') != -1 || legend[j].indexOf('T2') != -1 || legend[j].indexOf('T3') != -1 || legend[j].indexOf('Benchmark') != -1) {
              series[j].type = 'line';  // series[j].yAxisIndex = 1;
            } else {
              series[j].type = 'bar';  // series[j].yAxisIndex = 0;
            }  // if(typeObject[xAxisData[i]][legend[j]] ==1){
               //     series[j].type = 'line';
               // }else if(typeObject[xAxisData[i]][legend[j]] ==0){
               //     series[j].type = 'bar';
               // }
          }
          series[j].data.push(xAxisObject[xAxisData[i]][legend[j]] || 0);
        }
      }
      //set chart option
      var _option = angular.copy(option);
      _option.legend.data = legend;
      //默认勾选T2 ACTUAL
      _option.legend.selected = new Object();
      for (var i = 0; i < legend.length; i++) {
        _option.legend.selected[legend[i]] = false;
        if (legend[i].indexOf('T2') != -1 || legend[i].indexOf('Actual') != -1 || legend[i].indexOf('Benchmark') != -1) {
          console.log(legend[i]);
          _option.legend.selected[legend[i]] = true;
        }
      }
      _option.xAxis[0].data = xAxisData;
      _option.series = series;
      $scope.charts[chart] = echarts.init(document.getElementById(chart), theme);
      $scope.charts[chart].setOption(_option);
    };
    var getMixBarChart = function (data, chart, option) {
      //x
      var xAxisObject = new Object();
      var typeObject = new Object();
      for (var i = 0; i < data.length; i++) {
        var item = data[i];
        if (xAxisObject[item.xAxisValue] == undefined) {
          xAxisObject[item.xAxisValue] = new Object();
          typeObject[item.xAxisValue] = new Object();
        }
        xAxisObject[item.xAxisValue][item.yAxisLabel] = data[i].yAxisValue;
        typeObject[item.xAxisValue][item.yAxisLabel] = data[i].axisNo;  //TODO
      }
      var xAxisData = Object.getOwnPropertyNames(xAxisObject);
      //y
      var stack = data[0].lable;
      var series = new Array();
      var legend = Object.getOwnPropertyNames(xAxisObject[xAxisData[0]]);
      //顺序问题
      // var legend = ['x<=1','1<x<=7','7<x<=30','x>30'];
      for (var i = 0; i < xAxisData.length; i++) {
        for (var j = 0; j < legend.length; j++) {
          if (series[j] == undefined) {
            series[j] = new Object();
            series[j].name = legend[j];
            series[j].type = 'bar';
            series[j].stack = stack;
            series[j].data = new Array();
          }
          if (typeObject[xAxisData[i]][legend[j]] == 1) {
            series[j].type = 'line';
          } else if (typeObject[xAxisData[i]][legend[j]] == 0) {
            series[j].type = 'bar';
          }
          series[j].data.push(xAxisObject[xAxisData[i]][legend[j]] || 0);
        }
      }
      //set chart option
      var _option = angular.copy(option);
      _option.legend.data = legend;
      //默认勾选T2 ACTUAL
      _option.legend.selected = new Object();
      for (var i = 0; i < legend.length; i++) {
        _option.legend.selected[legend[i]] = false;
        if (legend[i].indexOf('T2') != -1 || legend[i].indexOf('Actual') != -1 || legend[i].indexOf('Benchmark') != -1) {
          console.log(legend[i]);
          _option.legend.selected[legend[i]] = true;
        }
      }
      _option.xAxis[0].data = xAxisData;
      _option.series = series;
      $scope.charts[chart] = echarts.init(document.getElementById(chart), theme);
      $scope.charts[chart].setOption(_option);
    };
    // set sidebar closed and body solid layout mode
    $rootScope.settings.layout.pageContentWhite = true;
    $rootScope.settings.layout.pageBodySolid = false;
    $rootScope.settings.layout.pageSidebarClosed = false;
    $rootScope.entityShortName = $state.params['id'] || 'JIT PBU';
    console.log('shortName:' + $rootScope.entityShortName);
  }
]);