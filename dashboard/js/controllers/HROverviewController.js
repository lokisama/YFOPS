;angular.module('SeanApp')
.controller('HROverviewController',['$rootScope', '$scope','$http', '$timeout','$window','$state', function($rootScope, $scope, $http, $timeout,$window,$state) {

    var widgetHeight;
    $scope.charts = new Array();
    $scope.$on('ngRepeatFinished', function(repeatFinishedEvent) {
         
    });
    
    $scope.$on('$viewContentLoaded', function() {
        
        angular.element('.fullscreen').bind('click', function() {
            initializeChartSize();
        })

        $('.portlet .fa-download').bind('click',function(){
            var id = $(this).parents('.portlet').find('.ops-chart').attr('id');
            // console.log(id);
            var img = $scope.charts[id].getDataURL({
                type:"png",
                pixelRatio: 2,
                backgroundColor: '#fff'
            });
            $(this).attr('href',img); 
             // $scope.charts[id].dispatchAction({type:'saveAsImage'});

        });

        initWidgetHeight();
        getfilterList();
        getBuList($rootScope.entityShortName);

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
            y2:138
        },
        xAxis: [
            {
                type: 'category',
                axisLabel: {
                    interval:0,
                    rotate:45,
                    margin:6,
                },
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
                        var val = value;
                        if(value>10000000){
                            val = (value/100000000)+"亿";
                        }else if(value>10000){
                            val = (value/10000)+"万";
                        }
                        return val;
                    }
                },
                splitLine: {show: false}
            }
        ],
        series: [
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
            x:30,
            y:10,
            x2:50,
            y2:138
        },
        xAxis: [
            {
                type: 'category',
                axisLabel: {
                    interval:0,
                    rotate:45,
                    margin:6,
                },
                // data: ['2016-1','2016-2','2016-3','2016-4','2016-5','2016-6','2016-7','2016-8','2016-9','2016-10','2016-11','2016-12']
            }
        ],
        yAxis: [


            {
                type: 'value',
                name: '',
                axisLabel: {
                    formatter: '{value}'
                },
                splitLine: {show: false}
            },
            {
                type: 'value',
                name: '',
                axisLabel: {
                    formatter: function(value){
                        var val = value;
                        if(value>10000000){
                            val = (value/100000000)+"亿";
                        }else if(value>10000){
                            val = (value/10000)+"万";
                        }
                        return val;
                    }
                },
                splitLine: {show: false}
            }
        ],
        series: [
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
            y2:138
        },
        xAxis: [
            {
                type: 'category',
                axisLabel: {
                    interval:0,
                    rotate:45,
                    margin:6,
                },
                // data: ['2016-1','2016-2','2016-3','2016-4','2016-5','2016-6','2016-7','2016-8','2016-9','2016-10','2016-11','2016-12']
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: '',
                axisLabel: {
                    
                    formatter: function(value){
                        var val = value;
                        if(value>10000000){
                            val = (value/100000000)+"亿";
                        }else if(value>10000){
                            val = (value/10000)+"万";
                        }
                        return val;
                    }
                },
                splitLine: {show: false}
            }
        ],
        series: [
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

        var valueArray = [data.totalLaborhours,data.equ,data.totalLaborhoursDivideEQU];
        $scope.values = new Array();
        for(var i=0;i<valueArray.length;i++){
            if(valueArray[i].length == 0) continue;

            $scope.values[i] = new Object();
            if(valueArray[i][0].axisValue > valueArray[i][1].axisValue ){
                $scope.values[i].state = 'up';
            }else if(valueArray[i][0].axisValue < valueArray[i][1].axisValue){
                $scope.values[i].state = 'down';
            }else{
                $scope.values[i].state = 'equals';
            }
            $scope.values[i].axisValue = valueArray[i][0].axisValue;
            $scope.values[i].percent = (valueArray[i][0].axisValue / valueArray[i][1].axisValue)*100;
            $scope.values[i].lable = valueArray[i][0].lable;
            $scope.values[i].axis = valueArray[i][0].axis;
            $scope.values[i].unit = valueArray[i][0].unit;
        }
        
        console.log(111111);

        $scope.title1 = data.totalLaborhoursDivideEQUTrendMonth[0].lable;
        getBarLineChart(data.totalLaborhoursDivideEQUTrendMonth, 'chart1',trendOption2);

        $scope.title2 = data.totalLaborhoursDivideEQUTrendYear[0].lable;
        getBarLineChart(data.totalLaborhoursDivideEQUTrendYear, 'chart2',trendOption2);

        $scope.title3 = data.totalLaborhoursDivideEQUClassMonth[0].lable;
        getLineMixBarChart(data.totalLaborhoursDivideEQUClassMonth, 'chart3',ageOption);

        $scope.title4 = data.totalLaborhoursDivideEQUClassYear[0].lable;
        getLineMixBarChart(data.totalLaborhoursDivideEQUClassYear, 'chart4',ageOption);
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
        getOverviewData($rootScope.entityShortName, $scope.currentFilter);
    };

    var getBuListSuccess = function(buList){
        $rootScope.BuList = new Object();
        $rootScope.ALLBuList = new Array();
        for(var i=0;i<buList.length;i++){
            var shortName = buList[i].buCodeShortName;
            if(shortName == null) continue;

            if( $rootScope.BuList[shortName] == undefined){
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
    }

    var getBuList = function(pubCodeShortName){
        $rootScope.pubCodeShortName = pubCodeShortName;
        $.get($rootScope.settings.api + '/finance/queryBuList').success(function(json){
            ///////真数据
            $scope.BuListObject = json.BuList;
            getBuListSuccess($scope.BuListObject);
            getOverviewData($rootScope.entityShortName, $scope.currentFilter);
            refreshChinaMap($rootScope.entityShortName);

        }).error(function(){

            console.log('请求error,取假数据');
            $scope.BuListObject = queryBuList.BuList;
            getBuListSuccess($scope.BuListObject);
            
            getOverviewData($rootScope.entityShortName, $scope.currentFilter);
            refreshChinaMap($rootScope.entityShortName);
        });  
    }

    $scope.$on('onSelectedPBU', function(scope,buShortName){
        $rootScope.buCodeShortName = buShortName;
        $rootScope.entityShortName = buShortName;
        getOverviewData($rootScope.entityShortName, $scope.currentFilter);
        refreshChinaMap($rootScope.entityShortName);
        $('.yfops-sparkline li.active').removeClass('active');
    });

    $scope.selectBU = function(buShortName,$event){
        
        $rootScope.buCodeShortName = buShortName;
        $rootScope.entityShortName = buShortName;

        $('.yfops-sparkline li.active').removeClass('active');
        $($event.currentTarget).addClass('active');

        getOverviewData($rootScope.entityShortName, $scope.currentFilter);
        refreshChinaMap(buShortName);
    }

    var refreshChinaMap = function(buShortName){
        var locations = new Array();
        var keys;
        if( buShortName != 'JIT PBU' && $rootScope.BuList[buShortName] != undefined )
        {
            keys = $rootScope.BuList[buShortName];

        }else{
            keys = $rootScope.ALLBuList;
        }

        console.log(buShortName);

        for(var i=0;i<keys.length;i++){
            var entity = {
                "action":"tooltip",
                "id": keys[i].entityCode,
                "title": keys[i].entityShortName,
                "description": keys[i].entityShortName,
                "link":"#/hr/"+keys[i].entityShortName,
                // "pin": "circular",
                "x": keys[i].axisX || 0,
                "y": keys[i].axisY || 0
            }
            locations.push(entity);
        }

        var option = angular.copy(mapOption);
        option.levels[0].locations = locations;
        initChinaMap(option);
    }

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

    

    var getOverviewData = function(entityName,costType){

        var param = {
           "entityName":entityName  || 'JIT PBU',
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
        var typeObject = new Object();
        for(var i=0; i < data.length; i++){
            var item = data[i];
            if(xAxisObject[item.xAxisValue] == undefined){
                xAxisObject[item.xAxisValue] = new Object();
                typeObject[item.xAxisValue] = new Object();
            }

            xAxisObject[item.xAxisValue][item.yAxisLabel] = data[i].yAxisValue; //TODO
            typeObject[item.xAxisValue][item.yAxisLabel] = data[i].axisNo; //TODO
        }

        var xAxisData = Object.getOwnPropertyNames(xAxisObject);

        var stack = data[0].lable;
        var series = new Array();
        var legend = Object.getOwnPropertyNames(xAxisObject[xAxisData[0]]);

        for(var i=0; i < xAxisData.length; i++){

            for(var j=0; j<legend.length; j++){
                
                if( series[j] == undefined){
                    series[j] = new Object();
                    series[j].name = legend[j];
                    series[j].type = 'bar';
                    series[j].data = new Array();
                }

                if(typeObject[xAxisData[i]][legend[j]] ==1){ //数据0和1搞错了

                    series[j].type = 'line';
                    series[j].yAxisIndex = 1;

                }else if(typeObject[xAxisData[i]][legend[j]] ==0){
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
        for(var i=0;i<legend.length;i++){
            _option.legend.selected[legend[i]] = false;
            if(legend[i].indexOf('T2') != -1 || legend[i].indexOf('Actual')!= -1 || legend[i].indexOf('Benchmark')!= -1){
                console.log(legend[i]);
                _option.legend.selected[legend[i]] = true;
            }
        }

        _option.xAxis[0].data = xAxisData;
        _option.series = series;

        $scope.charts[chart] = echarts.init(document.getElementById(chart),theme);
        $scope.charts[chart].setOption(_option);
    }

    var getMixBarChart = function(data,chart,option){

        //x
        var xAxisObject = new Object();
        var typeObject = new Object();
        for(var i=0; i < data.length; i++){
            var item = data[i];
            if(xAxisObject[item.xAxisValue] == undefined){
                xAxisObject[item.xAxisValue] = new Object();
                typeObject[item.xAxisValue] = new Object();
            }

            xAxisObject[item.xAxisValue][item.yAxisLabel] = data[i].yAxisValue; //TODO
            typeObject[item.xAxisValue][item.yAxisLabel] = data[i].axisNo; //TODO
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
                    series[j].data = new Array();
                }

                if(typeObject[xAxisData[i]][legend[j]] ==1){
                    series[j].type = 'line';
                }else if(typeObject[xAxisData[i]][legend[j]] ==0){
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
        for(var i=0;i<legend.length;i++){
            _option.legend.selected[legend[i]] = false;
            if(legend[i].indexOf('T2') != -1 || legend[i].indexOf('Actual')!= -1 || legend[i].indexOf('Benchmark')!= -1){
                console.log(legend[i]);
                _option.legend.selected[legend[i]] = true;
            }
        }
        _option.xAxis[0].data = xAxisData;
        _option.series = series;

        $scope.charts[chart] = echarts.init(document.getElementById(chart),theme);
        $scope.charts[chart].setOption(_option);
    }

    var getLineMixBarChart = function(data,chart,option){

        //x
        var xAxisObject = new Object();
        var typeObject = new Object();
        for(var i=0; i < data.length; i++){
            var item = data[i];
            if(xAxisObject[item.xAxisValue] == undefined){
                xAxisObject[item.xAxisValue] = new Object();
                typeObject[item.xAxisValue] = new Object();
            }

            xAxisObject[item.xAxisValue][item.yAxisLabel] = data[i].yAxisValue; //TODO
            typeObject[item.xAxisValue][item.yAxisLabel] = data[i].axisNo; //TODO
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
        var legend = ['Direct Labor Hours-Actual','Indirect Labor Hours-Actual','Outsourcing Labor hours-Actual','Salary Labor Hours-Actual','Total Labor hours-Actual'];

        for(var i=0; i < xAxisData.length; i++){

            for(var j=0; j<legend.length; j++){
                
                if( series[j] == undefined){
                    series[j] = new Object();
                    series[j].name = legend[j];
                    series[j].type = 'bar';
                    series[j].data = new Array();
                }

                if(typeObject[xAxisData[i]][legend[j]] ==1){
                    series[j].type = 'line';
                }else if(typeObject[xAxisData[i]][legend[j]] ==0){
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
        for(var i=0;i<legend.length;i++){
            _option.legend.selected[legend[i]] = false;
            if(legend[i].indexOf('T2') != -1 || legend[i].indexOf('Actual')!= -1 || legend[i].indexOf('Benchmark')!= -1){
                console.log(legend[i]);
                _option.legend.selected[legend[i]] = true;
            }
        }
        _option.xAxis[0].data = xAxisData;
        _option.series = series;

        $scope.charts[chart] = echarts.init(document.getElementById(chart),theme);
        $scope.charts[chart].setOption(_option);
    };


    // set sidebar closed and body solid layout mode
    $rootScope.settings.layout.pageContentWhite = true;
    $rootScope.settings.layout.pageBodySolid = false;
    $rootScope.settings.layout.pageSidebarClosed = false;

    $rootScope.entityShortName = $state.params['id'] || "JIT PBU";
    console.log('shortName:' + $rootScope.entityShortName);

}]);