;angular.module('SeanApp')
.controller('HROverviewController',['$rootScope', '$scope','$http', '$timeout','$window', function($rootScope, $scope, $http, $timeout,$window) {

    var widgetHeight;
    $scope.$on('ngRepeatFinished', function(repeatFinishedEvent) {
         
        initSparkline();

        var v = $(".widget_sparkline_bar").eq(0);
        v.sparkline(v.data('array').split(','), {
            type: 'bar',
            width: '100',
            barWidth: 10,
            height: '34',
            barColor: '#5b9bd1',
            negBarColor: '#5b9bd1'
        }); 
    });
    
    $scope.$on('$viewContentLoaded', function() {
        
        angular.element('.fullscreen').bind('click', function() {
            initializeChartSize();
        })

        initWidgetHeight();
        getfilterList();
        getBuList('JIT PBU');

    });

    //单轴
    var trendOption1 = {
        tooltip: {
            trigger: 'axis'
        },

        legend: {
            bottom:48,
            // data:['Inventory','OBP Inventory','Actual days','T3 days']
        },
        grid:{
            show:false,
            x:40,
            y:10,
            x2:30,
            y2:98
        },
        xAxis: [
            {
                type: 'category',
                // data: ['2016-1','2016-2','2016-3','2016-4','2016-5','2016-6','2016-7','2016-8','2016-9','2016-10','2016-11','2016-12']
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: '',
                // min: 0,
                // max: 250,
                // interval: 50,
                axisLabel: {
                    formatter: function(value){
                        return value;
                    }
                }
            }
        ],
        series: [
            // {
            //     name:'Inventory',
            //     type:'bar',
            //     data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
            // },
            // {
            //     name:'OBP Inventory',
            //     type:'bar',
            //     data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
            // },
            // {
            //     name:'Actual days',
            //     type:'line',
            //     yAxisIndex: 1,
            //     data:[2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
            // },
            // {
            //     name:'T3 days',
            //     type:'line',
            //     yAxisIndex: 1,
            //     data:[4.0, 4.2, 4.3, 4.5, 4.3, 4.2, 4.3, 4.4, 4.0, 4.5, 4.0, 2.2]
            // }
        ],
        dataZoom:[
            {
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
                textStyle:{
                    color:'#fff'
                }
            }
        ]
    };

    //双轴
    var trendOption2 = {
        tooltip: {
            trigger: 'axis'
        },

        legend: {
            bottom:48,
            // data:['Inventory','OBP Inventory','Actual days','T3 days']
        },
        grid:{
            show:false,
            x:40,
            y:10,
            x2:30,
            y2:128
        },
        xAxis: [
            {
                type: 'category',
                // data: ['2016-1','2016-2','2016-3','2016-4','2016-5','2016-6','2016-7','2016-8','2016-9','2016-10','2016-11','2016-12']
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: '',
                // min: 0,
                // max: 250,
                // interval: 50,
                axisLabel: {
                    formatter: function(value){
                        return value;
                    }
                }
            },
            {
                type: 'value',
                name: '',
                // min: 0,
                // max: 25,
                // interval: 5,
                axisLabel: {
                    formatter: '{value}'
                }
            }
        ],
        series: [
            // {
            //     name:'Inventory',
            //     type:'bar',
            //     data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
            // },
            // {
            //     name:'OBP Inventory',
            //     type:'bar',
            //     data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
            // },
            // {
            //     name:'Actual days',
            //     type:'line',
            //     yAxisIndex: 1,
            //     data:[2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
            // },
            // {
            //     name:'T3 days',
            //     type:'line',
            //     yAxisIndex: 1,
            //     data:[4.0, 4.2, 4.3, 4.5, 4.3, 4.2, 4.3, 4.4, 4.0, 4.5, 4.0, 2.2]
            // }
        ],
        dataZoom:[
            {
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
                textStyle:{
                    color:'#fff'
                }
            }
        ]
    };

    //叠柱
    var ageOption = {
        tooltip: {
            trigger: 'axis'
        },

        legend: {
            width:640,
            left:'center',
            bottom:48,
            // data:['x<=1','1<x<=7','7<x<=30','x>30']
        },
        grid:{
            show:false,
            x:40,
            y:10,
            x2:20,
            y2:128
        },
        xAxis: [
            {
                type: 'category',
                // data: ['2016-1','2016-2','2016-3','2016-4','2016-5','2016-6','2016-7','2016-8','2016-9','2016-10','2016-11','2016-12']
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: '',
                axisLabel: {
                    formatter: '{value}'
                }
            }
        ],
        series: [
            // {
            //     name:'x<=1',
            //     type:'bar',
            //     stack:'库龄',
            //     data:[30, 10, 20, 30, 30, 10, 20, 30,30, 10,30, 10]
            // },
            // {
            //     name:'1<x<=7',
            //     type:'bar',
            //     stack:'库龄',
            //     data:[20,30, 40, 10, 20, 30, 40, 10, 20, 30, 20, 30]
            // },
            // {
            //     name:'7<x<=30',
            //     type:'bar',
            //     stack:'库龄',
            //     data:[40, 50, 10, 10, 40, 50, 10, 10,40, 50,40, 50]
            // },
            // {
            //     name:'x>30',
            //     type:'bar',
            //     stack:'库龄',
            //     data:[10, 10, 30, 50, 10, 10, 30, 50,10, 10,10, 10]
            // }
        ],
        
        dataZoom:[
            {
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
                textStyle:{
                    color:'#fff'
                }
            }
        ]
    };


    var initSparkline = function(){

        $(".widget_sparkline_bar").each(function(i,v){
            
            var color = '#a6a6a6';

            $(v).sparkline($(v).data('array').split(','), {
                type: 'bar',
                width: '100',
                barWidth: 10,
                height: '34',
                barColor: color,
                negBarColor: color
            });
        })
    };

    var initWidgetHeight = function(){
        var height = $(window).height() - 63.99 - 77.78 -18.89-50;
        $('.page-content').css('min-height',height);

        widgetHeight = (height -77.8 -60) / 2 ;
        $('.yfops-widget').css('min-height',widgetHeight);
        $('.yfops-map').css('min-height',widgetHeight -4);
    };

    var initEchart = function(data){

        if(!data || data == undefined){
            return;
        }

        console.log(data);
        
        $scope.title1 = data.totalLaborhoursDivideEQUTrendMonth[0].lable;
        getBarLineChart(data.totalLaborhoursDivideEQUTrendMonth, 'chart1',trendOption2);
        
        $scope.title2 = data.totalLaborhoursDivideEQUClassMonth[0].lable;
        getMixBarChart(data.totalLaborhoursDivideEQUClassMonth, 'chart2',ageOption);

        $scope.title3 = data.totalLaborhoursDivideEQUTrendYear[0].lable;
        getMixBarChart(data.totalLaborhoursDivideEQUTrendYear, 'chart3',ageOption);

        $scope.title4 = data.totalLaborhoursDivideEQUClassYear[0].lable;
        getMixBarChart(data.totalLaborhoursDivideEQUClassYear, 'chart4',ageOption);
    };

    var initializeChartSize = function() {
        $timeout.cancel($scope.layout);
        $scope.layout = $timeout(function(){
            initEchart($scope.overviewData);
        },80);
    };

    var getfilterList = function(){

        ///////真数据
        $http.get($rootScope.settings.api + '/hr/queryFilter').success(function(json){
            
            $scope.filterListObject = json.filterList;
            getfilterListSuccess($scope.filterListObject);

        }).error(function(){
            ///////假数据
            $scope.filterListObject = hrQueryFilter.filterList;
            getfilterListSuccess($scope.filterListObject);
        });
    };

    var getfilterListSuccess = function(list){

        $scope.filterList = new Array();
        for(var i=0;i<list.length;i++){
            
            $scope.filterList.push(list[i].businessCat3);
        }

        $scope.setFilter($scope.filterList[0]);
    };

    $scope.setFilter = function(filter){
        console.log(filter);
        $scope.currentFilter = filter;
        getOverviewData($rootScope.buCodeShortName || 'BU1', $scope.currentFilter);
    };

    var getBuList = function(pubCodeShortName){
        
        $.get($rootScope.settings.api + '/finance/queryBuList').success(function(json){
            ///////真数据
            $scope.BuListObject = json.BuList;
            getBuListSuccess($scope.BuListObject);
            // getOverviewData($rootScope.buCodeShortName || 'BU1', $scope.currentFilter);
            refreshChinaMap($rootScope.buCodeShortName);

        }).error(function(){

            console.log('请求error,取假数据');
            $scope.BuListObject = queryBuList.BuList;
            getBuListSuccess($scope.BuListObject);
            // getOverviewData($rootScope.buCodeShortName || 'BU1', $scope.currentFilter);
            refreshChinaMap($rootScope.buCodeShortName);
        });
    };

    var getBuListSuccess = function(buList){

        $rootScope.BuList = new Object();
        for(var i=0;i<buList.length;i++){
            var shortName = buList[i].buCodeShortName;
            if(shortName == null) continue;

            if( $rootScope.BuList[shortName] == undefined){
                $rootScope.BuList[shortName] = new Array();
            }else{
                $rootScope.BuList[shortName].push(buList[i]);
            }
        }

        //bu列表
        $rootScope.BuNameList = Object.getOwnPropertyNames($rootScope.BuList);
        $rootScope.BuNameList = $rootScope.BuNameList.sort();
        $rootScope.pubCodeShortName = buList[0].pubCodeShortName;
        $rootScope.buCodeShortName = $rootScope.BuList[$rootScope.BuNameList[0]][0].buCodeShortName;
    };

    $scope.selectBU = function(buShortName,$event){
        
        $rootScope.buCodeShortName = buShortName;
        initSparkline();

        $('.yfops-sparkline li.active').removeClass('active');
        $($event.currentTarget).addClass('active');

        var v = $($event.currentTarget).find('.widget_sparkline_bar');
        $(v).sparkline([8,7,9,8.5,8,8.2], {
            type: 'bar',
            width: '100',
            barWidth: 10,
            height: '34',
            barColor: '#5b9bd1',
            negBarColor: '#5b9bd1'
        });

        // var buShortName = $($event.currentTarget).find('.yfops-sparkline-title').html();
        getOverviewData(buShortName);
        refreshChinaMap(buShortName);
    };

    var refreshChinaMap = function(buShortName){

        var locations = new Array();
        var keys = $rootScope.BuList[buShortName];
        console.log(keys);

        for(var i=0;i<keys.length;i++){
            var entity = {
                "id": keys[i].entityCode,
                "title": keys[i].entityShortName,
                "description": keys[i].entityShortName,
                // "pin": "circular",
                "x": keys[i].axisX || 0.9024 + Math.random()*0.018,
                "y": keys[i].axisY || 0.4076 - Math.random()*0.018
            }
            locations.push(entity);
        }

        var option = angular.copy(mapOption);
        option.levels[0].locations = locations;
        initChinaMap(option);
    };

    var initChinaMap = function(option) {

        if ($('#mapplic').size() === 0) {
            return;
        }

        $('#mapplic').html('').data('mapplic', null);

        var h = widgetHeight-2;
        $('#mapplic').mapplic({
            source: option,
            height: h,
            animate: true,
            sidebar: false,
            minimap: false,
            locations: true,
            deeplinking: true,
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

    $scope.$on('onSelectedPBU', function(scope,buShortName){
        $rootScope.buCodeShortName = buShortName;
        getOverviewData(buShortName || 'BU1', $scope.currentFilter);
    });

    var getOverviewData = function(entityName,costType){

        var param = {
           "entityName":entityName,
           "costType":costType
        };

        $http.post($rootScope.settings.api + '/hr/queryHRData' , param).success(function(json){
            
            $scope.overviewData = json;
            initEchart($scope.overviewData);

        }).error(function(){
             ////假数据
            $scope.overviewData = hrQueryOverviewData;
            initEchart($scope.overviewData);
        });
    };

    var getBarLineChart = function(data, chart,option){
        //x
        var xAxisObject = new Object();
        for(var i=0; i < data.length; i++){
            var item = data[i];
            if(xAxisObject[item.xAxisValue] == undefined){
                xAxisObject[item.xAxisValue] = new Object();
            }

            xAxisObject[item.xAxisValue][item.yAxisLabel] = data[i].yAxisValue;
        }

        var xAxisData = Object.getOwnPropertyNames(xAxisObject);

        var series = new Array();
        var legend = Object.getOwnPropertyNames(xAxisObject[xAxisData[0]]);

        for(var i=0; i < xAxisData.length; i++){

            for(var j=0; j<legend.length; j++){
                
                if( series[j] == undefined){
                    series[j] = new Object();
                    series[j].name = legend[j];
                    series[j].type = 'line';
                    // series[j].stack = stack;
                    series[j].data = new Array();

                    if(xAxisObject[xAxisData[i]][legend[j]]> 100) {
                        series[j].type = 'bar';
                        series[j].yAxisIndex = 0;
                    }else{
                        series[j].type = 'line';
                        series[j].yAxisIndex = 1;
                    }
                }

                series[j].data.push(xAxisObject[xAxisData[i]][legend[j]] || 0);
            }
        }

        //set chart option
        var turnoverDaysOption = angular.copy(option);
        turnoverDaysOption.legend.data = legend;
        turnoverDaysOption.xAxis[0].data = xAxisData;
        turnoverDaysOption.series = series;

        var chart = echarts.init(document.getElementById(chart),theme);
        chart.setOption(turnoverDaysOption);
    }

    var getMixBarChart = function(data,chart,option){

        //x
        var xAxisObject = new Object();
        for(var i=0; i < data.length; i++){
            var item = data[i];
            if(xAxisObject[item.xAxisValue] == undefined){
                xAxisObject[item.xAxisValue] = new Object();
            }

            xAxisObject[item.xAxisValue][item.yAxisLabel] = data[i].yAxisValue;
        }

        var xAxisData = Object.getOwnPropertyNames(xAxisObject);

        //y
        var stack = data[0].lable;
        var series = new Array();
        var legend = Object.getOwnPropertyNames(xAxisObject[xAxisData[0]]);  //顺序问题
        // var legend = ['x<=1','1<x<=7','7<x<=30','x>30'];

        for(var i=0; i < xAxisData.length; i++){

            for(var j=0; j<legend.length; j++){
                
                if( series[j] == undefined){
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
        var stockageMonthOption = angular.copy(option);
        stockageMonthOption.legend.data = legend;
        stockageMonthOption.xAxis[0].data = xAxisData;
        stockageMonthOption.series = series;

        var chart = echarts.init(document.getElementById(chart),theme);
        chart.setOption(stockageMonthOption);
    }


    // set sidebar closed and body solid layout mode
    $rootScope.settings.layout.pageContentWhite = true;
    $rootScope.settings.layout.pageBodySolid = false;
    $rootScope.settings.layout.pageSidebarClosed = false;

}]);