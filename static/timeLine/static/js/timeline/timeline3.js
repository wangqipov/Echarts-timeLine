var app = new Vue({

    el: '#app',
    data: {
        //专病库变量
        dataSetId:'',//专病库
        timeTagList:[],//标签列表
        //专病库变量结束
//时间轴变量
        resourceType:1,//1表示内部调用，0表示外部调用（电子病历）
        hulitizhengyangli:'',//护理key拼接的头
        titleFontSize:12,//子轴名字体大小
        sonTitleColor:'#0D0D0D',//子轴标题颜色
        valueshow:true,//中心事件值型输入框
        dateshow:false,//中心事件日期型输入框
        search_input:'',//筛选框查询input的内容
        resdata:null,//查询出的数据
        jiuzhenXiala:true,//是否展示就诊下拉表
        shoushuXiala:false,//是否展示手术下拉表
        waiting:true,
        crowdId:'',
        pid:'',
        department:'',
        id:'',
        name:'',
        sex:'',
        age:'',
        firstAge:'',
        firstTime:'',
        lastTime:'',
        visitnum:'',//总就诊次
        nowDays:'',
        jiuzhenci:'',
        hospital:'',
        hospitalizedname:'入院时间: ',//时间名
        hospitalizedTime:'',//入院时间
       
     
       
        pntModal_Chart: null,
     
       
        centralEventsIn:'',//具体中心事件
        detailCenterCache:null,//具体中心事件缓存，点击圆点时存储，点击确定时转存到centralEventsIn中，
        deleteCenterCache:null,//要删除的中心事件缓存
        centralEvents_ShowList:[],//展示的多个中心事件
        pntModal_data: {
            markPoint: [],//图表顶部可设置的特殊标记
            jiuzhen: [],//第一个轴线的数据
            obj:{}   //第二个到最后一个轴线的数据
        },
        pntModal_option: null,
        pntModal_activeName: '1',
        pntModal_handleClickNum2:0,
        pntModal_handleClickNum3:0,
        tooltip_activeName:'1',
        pntModal_baseLength: 20,//一个y轴刻度的px长度
        ZXSJpopovervisible:false,//中心事件选择框开关
        ZXSJpopoverlist:[],//
        ZXSJpopovermodel:'',
        ZXSJpopoverResult:[{'field':'','exp':'','values':'','centerEvent_input2list':[],'name':'','valueshow':true,'dateshow':false,'ZXSJpopovervisible':false}],//{"field":"检验_检验细项","exp":"等于","values":"红细胞"}
    
        centerQuickVisible:false,//中心事件快捷弹窗是否显示
        centerDeleteVisible:false,//删除框是否显示
        jianchaFilterVisible:false,//检查筛选框开关
        dialogkind:'',//筛选类别
        showItem_jianchaAxis:[],//自动换行后的轴名
        showItem_jianyanAxis:[],//自动换行后的轴名
        showItem_medicineAxis:[],//自动换行后的轴名
        showItem_zhiliaoAxis:[],//自动换行后的轴名
        showItem_huliAxis:[],//自动换行后的轴名

        dialogItem:[],//dialog可选项
        dialogshowItem:[],//dialog勾选项

       

        showItem_jiuzhen: '1',//就诊显示1全部，2门急诊，3住院
        
        showItem_shoushu: 1,//显示的手术切换，1手术，2首页手术
        

        itemShowNum:5,//默认展示条数


        firstAxiosSite:0,//firstAxiosSite为第一个就诊轴y坐标
        colorlist:['#3590E9','#F0C75C','#17BDAE'],//折线颜色
        jianju:3,//直线图的每个x轴线间的间距
        jianjuZ:3,//折线图的每个x轴线间的间距
        paddingtop:20,
        zoomTopMargin:50,//滚动条上边距
        zoomHeight:15,// zoom高度
//时间轴变量end
		//标签
		dialogVisible: false,
		tagDomainVals:[],
        //患者视图
        showZLSJZ:true,//诊疗时间轴
        showHZHX:true,//患者画像
        showQJST:true,//患者全景视图
        isSmoke: "否",
        isDrink: "否",
        drinkTime:'',
        smokeTime:'',
        basicInfo:{
            name:'',
            sex:'',
            address:'',
            age:'',
            firstAge:'暂无信息',
            bloodType:'暂无信息',
        },
        diagnosis:{
            diseaseActivity:'',
            visitTime:'',
            diseaseRegion:'',
            diagnosis:'',
            firstTime:'',
        },
        nation:'',
        situation:[],
        NUDT:'',
        hTable_height:null,
        hTable_heights:'',
        basicInfoShow:true,
        XHK_show:true,
        clickTitle:'',
        diagnosisShow:false,
        basicShow:false,
        tableShow:false,
        portraitLoad:true,
        tableIsShow:false,
        operation:[],
        operateJson:{},//权限
    },
    computed:{
        isBio:function () {
            if(this.resdata){
                return this.resdata.isBio;
            }else{
                return '';
            }
            
        },
        isOpera:function () {
            if(this.resdata){
                return this.resdata.isOpera;
            }else{
                return '';
            }
        },
        status:function () {
            var s='';
            if(this.resdata){
                if(this.resdata.status==='active'){
                    s='活跃患者'
                }else if(this.resdata.status==='mediumActive'){
                    s='中等活跃患者'
                }else if(this.resdata.status==='lost'){
                    s='失访患者'
                }else if(this.resdata.status==='sevenDay'){
                    s='七天随访患者'
                }else if(this.resdata.status==='twelveMonth'){
                    s='十二月随访患者'
                }else if(this.resdata.status==='sixMonth'){
                    s='六月随访患者'
                }else if(this.resdata.status==='threeMonth'){
                    s='三月随访患者'
                }
               
            }
            return s;
        },
        selectsite:function () {//就诊下拉表位置
            return 50 + this.paddingtop + this.zoomTopMargin + this.zoomHeight
            // return 20+ this.pntModal_baseLength* this.firstAxiosSite + this.paddingtop;
        },
        zeroSite:function () {//纵坐标0在图中的位置
            return this.selectsite - 20;
           
        },
        jiuzhenname:function() {
            var name='';
            if(app.showItem_jiuzhen==='1'){
                name= '全部就诊 ∨';
            }else if(app.showItem_jiuzhen==='2'){
                name= '门/急诊  ∨';
            }else if(app.showItem_jiuzhen==='3'){
                name= '住院     ∨';
            }


            return name;
        },
 





       

    },
    watch: {
        jianchaFilterVisible:{
            handler: function (newob, oldob) {
                app.search_input=''
            }
        },


    },
    methods: {
        theLatestAxios:function(){
            //整个图表y轴的格子数量
            var res=app.firstAxiosSite;
            var e=app.resdata.sort;
            for(var i=0;i<e.length;i++){
               
                //累加本变量大类上方的统计图格子数
                for(var j =0; j<e[i].showItem.length;j++){
                    if(e[i].showItem[j].chart==='折线图'){
                        res+=app.jianjuZ;
                    }else if (e[i].showItem[j].chart==='直线图'){
                        res+=app.jianju;
                    }
                    
                }
                res+=2;//最后子轴和下一个大类的距离
                
            }
            
            return res + 10;
            
        },
        iconMorenClick(key){
            app.basicInfoShow = false;
            if(key == 'basicInfo'){
                app.clickTitle = "基本信息";
                app.basicShow = true;
                 app.diagnosisShow = false;
                 app.tableShow = false;
            }else if(key == 'diagnosis'){
                app.clickTitle = "诊断信息";
                app.diagnosisShow = true;
                app.basicShow = false;
                app.tableShow = false;
            }else if(key == 'tableshow'){
                app.clickTitle = "诊疗信息";
                app.tableShow = true;
                app.diagnosisShow = false;
                app.basicShow = false;
                app.tableIsShow = false;
            }
            
        },
        iconZhanClick(){
            app.basicInfoShow = true;
            app.tableIsShow = true;
            app.tableShow = false;
        },
        getTableHeight(){
            app.hTable_height = $("#rightTable").height() - 150;
        },
        getPatientsPortrait(){
            app.portraitLoad = true;
            var dataJson = {
		        pid : this.pid,
				deptname : app.department,
				type:app.resourceType //1表示内部调用，0表示外部调用（电子病历）
            }
            $.ajax({
				url: baseURL+'cd/getPatientsPortrait',
				contentType: 'application/json',
				type: 'POST',
                headers: {
                    "token":sessionStorage.getItem("token"),
                },
				data:JSON.stringify(dataJson),
				success: function (data) {
                    app.portraitLoad = false;
					if(data.status == "success"&&JSON.stringify(data.result)!='{}'){
                        app.pntModal_handleClickNum3++;
                        app.getTableHeight()
                        app.tableIsShow = true;
                        app.basicInfo = data.result.basicInfo;
                        app.diagnosis = data.result.diagnosis;
                        app.situation = data.result.treat.situation;
                        app.NUDT = data.result.treat.NUDT15 == null?'':data.result.treat.NUDT15;
                        app.operation = data.result.treat.operation;
                        let width = parseFloat(100/app.operation.length).toFixed(0) + "%";
                        setTimeout(function(){
                          
                            $(".opera").width(width)
                        },100)
                        //app.nation = data.result.body.nation;
                        //app.isDrink = data.result.body.isDrink;
                        //app.drinkTime = data.result.body.drinkTime;
                        //app.isSmoke = data.result.body.isSmoke;
                        //app.smokeTime = data.result.body.smokeTime;
                        
                    }

				},
				error: function (jqXHR, textStatus, errorThrown) {
                    app.portraitLoad = false;
                    app.open("暂无数据",'warning');
					console.log(this);

				}
			})
        },
        getAxiosSite:function(varName){//主轴的位置
            var res=app.firstAxiosSite+2;
            var e=app.resdata.sort;
            for(var i=0;i<e.length;i++){
                if(e[i].name===varName){
                    
                    break;
                }else{
                    //累加本变量大类上方的统计图格子数
                    for(var j =0; j<e[i].showItem.length;j++){
                        if(e[i].showItem[j].chart==='折线图'){
                            res+=app.jianjuZ;
                        }else if (e[i].showItem[j].chart==='直线图'){
                            res+=app.jianju;
                        }
                        
                    }
                    res+=1;//最后子轴和下一个大类的距离
                }
            }
           
            return res;
        },
        getAxiosEnd:function(varName){

            var res=app.firstAxiosSite;
            var e=app.resdata.sort;
            for(var i=0;i<e.length;i++){
              
                //累加本变量大类上方的统计图格子数
                for(var j =0; j<e[i].sort.length;j++){
                    if(e[i].sort[j].chart==='折线图'){
                        res+=app.jianjuZ;
                    }else if (e[i].sort[j].chart==='直线图'){
                        res+=app.jianju;
                    }
                    
                }
                res+=2;//最后子轴和下一个大类的距离
                
            }
            return res;
        },
		handleClose:function(done) {
			done();
		},
		labelBtnFunction:function(){
			var tagMap = {}
            $.each(app.timeTagList,function(i,item){
				tagMap[item.showName] = app.tagDomainVals[i];
            })
		    var dataJson = {
		        pid : this.pid,
				tagMap : tagMap,
				tdsId:sessionStorage.getItem("dataSetId")
            }
            // console.log(dataJson)
			$.ajax({
				url: 'applyTag',
				contentType: 'application/json',
				type: 'POST',
                headers: {
                    "token":sessionStorage.getItem("token"),
                },
				data:JSON.stringify(dataJson),
				success: function (data) {
					if(data.state == 0){
						app.open("标签应用专病库失败",'warning');
					}
					if(data.state == 1) {
						app.open("标签应用专病库成功",'success');
						app.dialogVisible = false;
					}

				},
				error: function (jqXHR, textStatus, errorThrown) {

					console.log(this);

				}
			})
        },
        setChartSize:function (e) {
            if(e==1){
                if(app.pntModal_baseLength<100) {
                    app.pntModal_baseLength += 5;
                    // if(app.pntModal_baseLength<11){
                    //     app.titleFontSize=10;
                    // }else{
                    //     app.titleFontSize=12;
                    // }
                    app.afterFilter();
                }
            }else{
                if(app.pntModal_baseLength>10){
                    app.pntModal_baseLength-=5;
                    // if(app.pntModal_baseLength<11){
                    //     app.titleFontSize=10;
                    // }else{
                    //     app.titleFontSize=12;
                    // }
                    app.afterFilter();
                }
            }
        },
        offTheLine:function (i,j) {
            //删除一个折线图
        
            app.resdata.sort[i].chartTitle.splice(j,1);
            app.resdata.sort[i].showItem.splice(j,1);
                 
         
            setTimeout(function () {
                app.afterFilter();
            },1);
        },

  
    

        addCentralEvents:function(){
            var alreadyHas=false;
            for(var i=0;i<app.centralEvents_ShowList.length;i++){
               if(JSON.stringify(app.centralEvents_ShowList[i])==JSON.stringify(app.detailCenterCache)){
                   alreadyHas=true;
                   break;
               }
            }
            if(alreadyHas){
                app.open("已设置相同中心事件",'warning');
            }else{
                app.centralEvents_ShowList.push(app.detailCenterCache);

                if(app.pntModal_Chart!=null){
                    app.pntModal_Chart.dispose();
                }
                app.pntModal_option = app.getOption();
                app.initvariable();
                app.setChartData();
                app.initDiv();
                app.pntModal_Chart = echarts.init(document.getElementById('pntModal_chart'));
                app.pntModal_Chart.setOption(app.pntModal_option);
                app.pntModal_Chart.resize();
                app.setClickEvent();
                app.waiting=false;
            }

        },
        deleteCentralEvents:function () {

            for(var o in app.centralEvents_ShowList){
                if(JSON.stringify(app.deleteCenterCache)==JSON.stringify(app.centralEvents_ShowList[o])){
                    app.centralEvents_ShowList.splice(o,1);
                }

            }


            if(app.pntModal_Chart!=null){
                app.pntModal_Chart.dispose();
            }
            app.pntModal_option = app.getOption();
            app.initvariable();
            app.setChartData();
            app.initDiv();
            app.pntModal_Chart = echarts.init(document.getElementById('pntModal_chart'));
            app.pntModal_Chart.setOption(app.pntModal_option);
            app.pntModal_Chart.resize();
            app.setClickEvent();
            app.waiting=false;
        },
        setCenterEventPoint:function(){
            
            if(app.centralEvents_ShowList.length>0){
                for(var i=0; i<app.pntModal_option.series.length;i++){//清空图中的中心事件
                    if(app.pntModal_option.series[i].name=='centerEvent'){
                        app.pntModal_option.series.splice(i,1);
                    }
                }
                for(var o in app.centralEvents_ShowList){

                      
                  

                        app.pntModal_option.series.push({//点
                            symbol:'triangle',
                            name:'centerEvent',
                            type: 'scatter',
                            showSymbol: true,
                            symbolSize: 15,
                            zlevel:2,
                            data:[[app.centralEvents_ShowList[o].time,-0.5,app.centralEvents_ShowList[o]]],
                            lineStyle: {
                                normal: {
                                    width: 0,
                                }

                            },
                            itemStyle: {
                                normal: {
                                    borderColor:'white',
                                    color: '#3590EB',
                                }
                            },
                        });
                        app.pntModal_option.series.push({//线

                            name:'centerEvent',
                            type: 'scatter',
                            markLine : {
                                silent:true,
                                symbol:'',
                                label:{
                                    show:false,
                                },
                                lineStyle: {
                                    normal: {
                                        type: 'dashed'
                                    }
                                },
                                data : [
                                    {type : 'max', name: '中心事件'},
                                    { xAxis: app.centralEvents_ShowList[o].time,y:app.centralEvents_ShowList[o] }
                                ]
                            },
                        });


                }
            }
        },
        handleCommand:function(p){
            //就诊下拉表
            app.showItem_jiuzhen=p;
            app.waiting=true;
            setTimeout(function (){
                //格式化就诊数据
                if(app.resdata.time.length>0){
                    app.formatejiuzhendata(app.resdata);
                }
                if(app.pntModal_Chart!=null){
                    app.pntModal_Chart.dispose();
                }

                app.pntModal_option=app.getOption();
                app.initvariable();
                app.setChartData();
                app.initDiv();
                app.pntModal_Chart = echarts.init(document.getElementById('pntModal_chart'));
                app.pntModal_Chart.setOption(app.pntModal_option);
                app.pntModal_Chart.resize();
                app.setClickEvent();
                app.waiting=false;
            },1)

        },

        searchinput:function(){
            if(""!=app.search_input) {
                for (var i = 0; i < app.dialogItem.length; i++) {
                    if (app.dialogItem[i].indexOf(app.search_input) != -1) {
                        var x = app.dialogItem[i];
                        app.dialogItem.splice(i, 1);
                        app.dialogItem.unshift(x);
                    }
                }
                $('#shaixuanxiang').animate({scrollTop: '0px'}, 800);
            }
        },
        setdialog: function(e) {
            app.jianchaFilterVisible=true;
            app.dialogkind=e;
            app.dialogItem=[];
            app.dialogshowItem=[];

            for(var i in app.resdata.sort){
                if(app.resdata.sort[i].name===e){
                    for(var o in app.resdata.sort[i]['sort']){
                        app.dialogItem.push(app.resdata.sort[i]['sort'][o].name);
                    }
                    for(var o in app.resdata.sort[i]['showItem']){
                         app.dialogshowItem.push(app.resdata.sort[i]['showItem'][o].name);
                    }
        
                }
            }
               
          
        },
        dialogconfirm: function(){
            //筛选时间轴确定
            
            
                for(var q in app.resdata.sort){
                    if(app.resdata.sort[q].name===app.dialogkind){
                        app.resdata.sort[q]['showItem']=[];
                        for(var p in app.resdata.sort[q]['sort']){
                            for(var o in app.dialogshowItem){
                               if(app.resdata.sort[q]['sort'][p].name===app.dialogshowItem[o]){
                                    app.resdata.sort[q]['showItem'].push(app.resdata.sort[q]['sort'][p]);
                                } 
                            }
                        }
                        break;
                    }
                   
                }
           
            app.waiting=true;
            setTimeout(function () {
                app.afterFilter();
                app.jianchaFilterVisible=false;//关闭弹窗
                app.waiting = false;
            },1);
        },
        uncheckit:function(o,showItem){
            //复选框取消o的选中状态
            for(var i=0;i<showItem.length;i++){
                if(o==showItem[i]){
                    showItem.splice(i,1)
                }
            }
        },
        afterFilter: function() {//筛选展示数据后
            if(null!=app.pntModal_Chart){


                if(app.pntModal_Chart!=null){
                    app.pntModal_Chart.dispose();
                }
                app.pntModal_option = app.getOption();
                app.initvariable();
                app.setChartData();
                app.initDiv();
                app.pntModal_Chart = echarts.init(document.getElementById('pntModal_chart'));
                app.pntModal_Chart.setOption(app.pntModal_option);
                app.pntModal_Chart.resize();
                app.setClickEvent();

            }
        },
        setClickEvent:function(){//点击设置中心事件
            app.pntModal_Chart.off('click');
            app.pntModal_Chart.on('click', function (params) {
                // console.log(params)
                if(params.data[2]!=undefined){
                    if('centerEvent'!=params.seriesName){
                        app.detailCenterCache=params.data[2];
                        app.centerQuickVisible=true;
                    }
                    else{
                        app.deleteCenterCache=params.data[2];
                        app.centerDeleteVisible=true;
                    }
                }
                
            });
        },
        initalldata:function(){
            app.pntModal_data={
                markPoint: app.resdata.markPoint||[],
                // [
                // {time:'2019-05-10 00:00:00',name:'顶部焦点',father:'顶部焦点'},{time:'2019-06-10 00:00:00',name:'顶部焦点',father:'顶部焦点'},{time:'2019-07-10 00:00:00',name:'顶部焦点',father:'顶部焦点'}
                // ],
                jiuzhen: [],
                obj:{}   
            };

         


        },

        resizeChart: function(){
            //重置图表
            app.pntModal_Chart.setOption(app.pntModal_option);
            app.pntModal_Chart.resize();

        },
        pntModal_handleClick: function () {
            if(app.pntModal_activeName==='2'&&app.pntModal_handleClickNum2<1){//未查询过时执行查询
                app.initsearch();
                
            }else if(app.pntModal_activeName==='3'&&app.pntModal_handleClickNum3<1) {
                app.getPatientsPortrait();
                
            }
            // else if(app.pntModal_activeName==='1'){
            //     setTimeout(function() {
            //         $($('.sideMenu .slide-title')[0]).click();
            //     },200)
            // }

        },
        creatChart: function (data,ifinitshowdata) {
            if(app.pntModal_Chart!=null){//释放图表资源
                app.pntModal_Chart.dispose();
            }
            //创建 诊疗时间轴 图表
            app.pntModal_option=app.getOption();

            //格式化数据
            app.formatData(data);
            //初始化图表配置
            if(ifinitshowdata){
                app.initshowData();
            }
            app.initvariable();
            //添加数据
            app.setChartData();
            //初始化chart载体
            app.initDiv();
            //创建图表
          
            app.pntModal_Chart = echarts.init(document.getElementById('pntModal_chart'));
            app.pntModal_Chart.setOption(app.pntModal_option);
            app.setClickEvent();
            app.waiting=false;

        },

        formatejiuzhendata: function (data) {
            app.pntModal_data.jiuzhen=[];//清空
            //格式化就诊数据
           
            if(app.showItem_jiuzhen==='1'){ //全部
                app.pntModal_data.jiuzhen=data.time || [];
            }
            else if(app.showItem_jiuzhen==='2'){//门诊
                for(var i=0;i<data.time.length;i++){

                    if(data.time[i].flag==='门诊'){
                        app.pntModal_data.jiuzhen.push(data.time[i]);
                    }
                }
            }
            else if(app.showItem_jiuzhen==='3'){//住院
                for(var i=0;i<data.time.length;i++){

                    if(data.time[i].flag==='住院'){
                        app.pntModal_data.jiuzhen.push(data.time[i]);
                    }
                }
            }

            for(var i=0;i<app.pntModal_data.jiuzhen.length;i++){
                app.pntModal_data.jiuzhen[i].father='诊断';
            }
            
        },

        formateOtherdata: function (data) {
            app.pntModal_data.obj={};//清空
            var arr=[];//缓存
            var obj={};//缓存
            var sortKname='';//app.resdata.sort索引为k的对象的name值
            var sortOname='';//app.resdata.sort[k].sort索引为o的对象的name值
            for(var k in app.resdata.sort){

                sortKname=app.resdata.sort[k].name;//缓存
                app.pntModal_data.obj[sortKname]={};//创建展示变量

                for(var o in app.resdata.sort[k].sort){

                    sortOname=app.resdata.sort[k].sort[o].name;//缓存

                    app.pntModal_data.obj[sortKname][sortOname]=[];//创建数组

                        if(app.resdata.info[sortKname][sortOname]==undefined){
                            continue;
                        }
                        arr=app.resdata.info[sortKname][sortOname].info;
                        for(var j=0;j<arr.length;j++){
                            
                            obj=JSON.parse(JSON.stringify(arr[j]));
                            obj.name=sortOname;
                      
                            app.pntModal_data.obj[sortKname][sortOname].push(
                                [
                                obj.time,
                                0, 
                                JSON.parse(JSON.stringify(obj))
                                ]
                                );

                            if(app.resdata.sort[k].sort[o].chart==='折线图'){
                                //缩放数据在-1到+1之间
                                
                                app.organizeZXData(app.pntModal_data.obj[sortKname][sortOname], 'value')

                            }else if(app.resdata.sort[k].sort[o].chart==='直线图'){
                                //不处理
                            }
                        }

                   
                }


            }


        },

        organizeZXData: function (data,name) {
            // 折线 组织数据，限制数据值域,,所有数据展示范围都为2个坐标高度 ,name 为数值的key
            var d=data;


            var max= '';
            var min= '';
            for(var i=0;i<d.length;i++){

                if(d[i][2][name]!=''&&d[i][2][name]!='NA'&&d[i][2][name]!='null'){
                    if(max===''){
                        min = max = parseFloat(d[i][2][name]);
                    }

                    if(d[i][2][name]>max){
                        max=parseFloat(d[i][2][name]);
                    }
                    if(d[i][2][name]<min){
                        min=parseFloat(d[i][2][name]);
                    }
                }
               
            }
            //若全部数据无value，则初始化为0
            if(max===''){
                min = max = 0;
            }
            var ave=(max+min)/2;//取中值
            for(var i=0;i<d.length;i++){

                if(d[i][2][name]!=''&&d[i][2][name]!='NA'&&d[i][2][name]!='null'){
                    var num=parseFloat(d[i][2][name]);
                    if(max-ave!=0){//0不能做除数
                        d[i][2]['ySite']= (num-ave)*(1/(max-ave));//数值等比缩小，并将0作为中轴线
                    }else{
                        d[i][2]['ySite']=0;
                    }
                    //把折线以0为轴反转180度，对象中的ysite为处理后的值，在-1到1之间
                    d[i][2]['ySite']=0-d[i][2]['ySite'];

                }else{
                    d[i][2]['isnormal']=false;
                    d[i][2]['ySite']=0;
                }
            }
            

        },

   
  
        initshowData: function(){//初始化默认展示特定数量的时间轴
            //'检查'默认展示
            for(var i=0;i<app.resdata['sort'].length;i++){
                if(app.resdata['sort'][i].showNum==undefined || app.resdata['sort'][i].showNum==''){//初始化展示数量
                    app.resdata['sort'][i].showNum=app.itemShowNum;
                }
                app.resdata['sort'][i].showItem=[];
                var num=app.resdata['sort'][i].showNum;
                if(num > app.resdata['sort'][i]['sort'].length){
                    num= app.resdata['sort'][i]['sort'].length;
                }
                for(var j=0;j<num;j++){
                    app.resdata['sort'][i].showItem.push(app.resdata['sort'][i]['sort'][j]);
                }
            }
        },

        formatData: function (data) {
            //组织图表中展示的数据格式
            app.initalldata();
//格式化就诊数据
            if(data.time.length>0){
                app.formatejiuzhendata(data);
            }
//格式化其他数据
           
            app.formateOtherdata(data);






        },
        setFirstTitle: function (location, title){
            //添加父标题，黑体字
            //location是y轴坐标
             app.pntModal_option.title.push({
                    textBaseline: 'middle',
                    top: location + app.paddingtop-5,
                    text: title,
                    textStyle:{
                        fontSize: 14,
                        color:'#151515',
                        fontWeight:'600'
                    }

                });
        },
        handleCommand_ShouShu:function(p){
            //占位function，不可删除
        },
        setMoreButton: function (location, title){
            // console.log(location, title)
            //添加右侧的更多按钮
            //location是y轴坐标
            app.pntModal_option.title.push({
                    textBaseline: 'middle',
                    top: location + app.paddingtop-5,
                    right: 15,
                    text: '···',
                    backgroundColor:'#ffffff',
                    link: 'javascript: app.setdialog("'+title+'")',//通过连接触发事件
                    target: "self",// 保证不会在新的窗口弹出
                    textStyle:{
                        fontSize: 13,
                        color:'#90A1BB',
                        fontWeight:'600'
                    }

                });
        },
        setDashed: function (offset){
            app.pntModal_option.xAxis.push(
                {

                    offset: -offset,
                    nameLocation: 'start',
                    type: 'category',
                    axisLine:{
                        lineStyle:{
                            color:'#E9E9E9',
                            width:1.5,
                            type:'dashed',
                        },
                    },
                    data: []
                }
            );
        },
        setTopDate: function () {//加载顶部高亮数据
                var markPointobj={};
                var markPointlist=[];
                var list=[]
                for(var i=0;i<app.pntModal_data.markPoint.length;i++){
                   
                        markPointobj=JSON.parse(JSON.stringify(app.pntModal_data.markPoint[i]));
                        markPointobj.time=app.pntModal_data.markPoint[i].time;
    
                        val= (app.paddingtop-5) /app.pntModal_baseLength;
                        // markPointlist.push([app.pntModal_data.markPoint[i].time, val, markPointobj]);
                        list.push({
                                name: app.pntModal_data.markPoint[i].name,
                                tip: app.pntModal_data.markPoint[i].name.slice(0,1),
                                coord: [app.pntModal_data.markPoint[i].time, val],
                                itemStyle:{
                                    normal:{
                                        color:'#3B81FD',
                                        shadowBlur: 5,
                                        shadowColor: 'rgba(25, 100, 150, 0.5)',
                                        shadowOffsetY: 3,  
                                    }
                                    
                                },
                                symbolSize: 40,
                             
                            })
                    
                }

             app.pntModal_option.series.push({
                    showAllSymbol: true,
                    connectNulls: true,
                    name:'',
                    type:'line',
                    showSymbol: true,
                    symbol: 'circle',
                    symbolSize: 1,
                    data: [],
                    lineStyle: {
                        normal: {
                            width: 0,
                        }

                    },
                    // itemStyle: {
                    //     normal: {
                    //         borderColor:'white',
                    //         color: function(params) {
                    //             // build a color map as your need.
                    //             var color='';
                                
                    //                 color= '#00BA81';//绿色门诊
                                
                    //             return color;
                    //         }
                    //     }
                    // },
                    markPoint: {
                        label: {
                            normal: {

                                fontSize:14,
                                fontWeight:'normal',
                                formatter: function (param) {
          
                                    return param.data.tip
                                }
                            }
                        },
                        data: list,
                        tooltip: {
                            formatter: function (param) {
                                return param.name + '<br>' + (param.data.coord[0] || '');
                            }
                        }
                    }
                });
                
        },
        setChartData: function () {
            //根据展示开关，有选择性的 将已处理好的数据，添加到表中
            var color='';//单例，很多地方都会用这个变量,主意存取不要相互影响
            //
            app.setTopDate();
            
            //就诊
            //添加就诊轴
            app.pntModal_option.title.push({
                textBaseline: 'middle',
                top: app.firstAxiosSite*app.pntModal_baseLength + app.zeroSite,
                text: app.jiuzhenname,
                textStyle:{
                    fontSize: 13,
                    color:'#151515',
                    fontWeight:'normal'
                }

            });
            app.pntModal_option.xAxis.push(
                {

                    axisLine:{
                        lineStyle:{
                            color:'#D9D9D9',
                        }
                    },
                    offset: -app.firstAxiosSite*app.pntModal_baseLength  - app.zeroSite +15,
                    nameLocation: 'start',
                    type: 'category',
                    data: []
                }
            );
            if(app.pntModal_data.jiuzhen.length>0){
                //添加就诊数据
                var menzhenlist=[];
                for(var i=0;i<app.pntModal_data.jiuzhen.length;i++){
                    if(app.pntModal_data.jiuzhen[i]['flag']==='门诊'){
                        var menzhenobj=JSON.parse(JSON.stringify(app.pntModal_data.jiuzhen[i]));
                        menzhenobj.time=app.pntModal_data.jiuzhen[i].outpatientTime;
                        menzhenlist.push([app.pntModal_data.jiuzhen[i].outpatientTime, (app.zeroSite - 15)/app.pntModal_baseLength +  app.firstAxiosSite-0.2, menzhenobj])
                    }
                }
                //门诊点
                app.pntModal_option.series.push({
                    showAllSymbol: true,
                    connectNulls: true,
                    name:'',
                    type:'line',
                    showSymbol: true,
                    symbol: 'circle',
                    symbolSize: 10,
                    data:menzhenlist,
                    lineStyle: {
                        normal: {
                            width: 0,
                        }

                    },
                    itemStyle: {
                        normal: {
                            borderColor:'white',
                            color: function(params) {
                                // build a color map as your need.
                                var color='';
                                
                                    color= '#00BA81';//绿色门诊
                                
                                return color;
                            }
                        }
                    }
                });
                //住院点
                for(var i=0;i<app.pntModal_data.jiuzhen.length;i++){
                        if(app.pntModal_data.jiuzhen[i]['flag']==='住院'){
                            var order_time=[];
                            var order_obj=JSON.parse(JSON.stringify(app.pntModal_data.jiuzhen[i]));
                            order_obj.time=order_obj.enterTime;
                            order_time.push([order_obj.enterTime, (app.zeroSite - 15)/app.pntModal_baseLength + app.firstAxiosSite+0.2, order_obj]);

                            order_obj=JSON.parse(JSON.stringify(app.pntModal_data.jiuzhen[i]));
                            order_obj.time=order_obj.leaveTime;
                            order_time.push([order_obj.leaveTime,  (app.zeroSite - 15)/app.pntModal_baseLength + app.firstAxiosSite+0.2, order_obj]);

                            app.pntModal_option.series.push({
                                showAllSymbol: true,
                                connectNulls: true,
                                name:'',
                                type:'line',
                                showSymbol: true,
                                symbol: 'circle',
                                symbolSize: 10,
                                data:order_time,
                                lineStyle: {
                                    normal: {
                                        color: '#348EE8',
                                        width: 3
                                    }

                                },
                                itemStyle: {
                                    normal: {
                                        borderColor:'white',
                                        color: function(params) {
                                            // build a color map as your need.
                                            var color='';
                                            
                                                color= '#348EE8';//蓝色住院
                                            
                                            return color;
                                        }
                                    }
                                }
                            });
                        }

                    }


            }



            for(var o in app.resdata.sort){
               
                if(JSON.stringify(app.resdata.info[o]) != "{}"){
                   
                    app.setFirstTitle(app.getAxiosSite(app.resdata.sort[o].name)*app.pntModal_baseLength + app.zeroSite, app.resdata.sort[o].name);
                    app.setMoreButton(app.getAxiosSite(app.resdata.sort[o].name)*app.pntModal_baseLength + app.zeroSite, app.resdata.sort[o].name);
                    app.setDashed(app.getAxiosSite(app.resdata.sort[o].name)*app.pntModal_baseLength + app.zeroSite);
                    
                    //初始化处理标题，  自动换行
                    app.orgnizeTitle(9,app.resdata.sort[o]);
                    //添加子轴线
                    for(var i=0;i<app.resdata.sort[o].chartTitle.length;i++){

                        if(app.resdata.sort[o].showItem[i].chart==="直线图"){
                            //title
                            app.pntModal_option.title.push({
                                textBaseline: 'middle',
                                top: (app.getAxiosSite(app.resdata.sort[o].name)+app.jianju*i+2)*app.pntModal_baseLength + app.zeroSite + 15,
                                text: app.resdata.sort[o].chartTitle[i],
                                textStyle:{
                                    fontSize: app.titleFontSize,
                                    color: app.sonTitleColor,
                                    fontWeight:'normal'
                                }

                            });
                            //删除按钮
                            app.pntModal_option.title.push({
                                textBaseline: 'middle',
                                top: (app.getAxiosSite(app.resdata.sort[o].name)+app.jianju*i+2)*app.pntModal_baseLength + app.zeroSite + 15,
                                right: 10,
                                text: '{a|x}',
                                backgroundColor:'#fff',
                                link: 'javascript: app.offTheLine('+o+','+i+')',//通过连接触发事件
                                target: "self",// 保证不会在新的窗口弹出
                                textStyle:{

                                    rich:{
                                        a:{
                                            fontSize: 13,
                                            color:'#C8C8C8',
                                            fontWeight:'600',
                                            height:13,
                                            width:13,

                                        }
                                    }

                                }

                            });
                            //轴线
                            app.pntModal_option.xAxis.push(
                                {

                                    axisLine:{
                                        lineStyle:{
                                            color:'#D9D9D9',
                                        }
                                    },
                                    offset: -(app.getAxiosSite(app.resdata.sort[o].name)+app.jianju*i+2)*app.pntModal_baseLength - app.zeroSite,

                                    type: 'category',
                                    data: []
                                }
                            );

                        }else if (app.resdata.sort[o].showItem[i].chart==="折线图"){
                            //title
                            app.pntModal_option.title.push({
                                textBaseline: 'middle',
                                top: (app.getAxiosSite(app.resdata.sort[o].name)+app.jianjuZ*i+2)*app.pntModal_baseLength + app.zeroSite + 15,
                                text: app.resdata.sort[o].chartTitle[i],
                                textStyle:{
                                    fontSize: app.titleFontSize,
                                    color: app.sonTitleColor,
                                    fontWeight:'normal'
                                }

                            });
                            //删除按钮
                            app.pntModal_option.title.push({
                                textBaseline: 'middle',
                                top: (app.getAxiosSite(app.resdata.sort[o].name)+app.jianjuZ*i+2)*app.pntModal_baseLength + app.zeroSite + 15,
                                right: 10,
                                text: '{a|x}',
                                backgroundColor:'#fff',
                                link: 'javascript: app.offTheLine('+o+','+i+')',//通过连接触发事件
                                target: "self",// 保证不会在新的窗口弹出
                                textStyle:{

                                    rich:{
                                        a:{
                                            fontSize: 13,
                                            color:'#C8C8C8',
                                            fontWeight:'600',
                                            height:13,
                                            width:13,

                                        }
                                    }

                                }

                            });
                            //轴线
                            app.pntModal_option.xAxis.push(
                                {

                                    axisLine:{
                                        lineStyle:{
                                            color:'#D9D9D9',
                                        }
                                    },
                                    offset: -(app.getAxiosSite(app.resdata.sort[o].name)+app.jianjuZ*i+2)*app.pntModal_baseLength - app.zeroSite,

                                    type: 'category',
                                    data: []
                                }
                            );

                        }

                        
                        //添加检查子轴数据index
                    }
                    //添加子轴

                    for(var i=0;i<app.resdata.sort[o].showItem.length;i++){

                            var x=app.pntModal_data.obj[app.resdata.sort[o].name][app.resdata.sort[o].showItem[i].name];//数据
                       
                            for(var j =0;j<x.length;j++){
                                //设置子时间轴位置
                                x[j].splice(1, 1, app.getAxiosSite(app.resdata.sort[o].name)+2+app.jianju*i + app.zeroSite/app.pntModal_baseLength);
                                x[j].push(j);//添加检查子轴的索引，为数组数据的第四位
                            } 
                        
                            
                           
                           
                          
                        if(app.resdata.sort[o].showItem[i].chart==="直线图"){
                            //直线图
                            app.pntModal_option.series.push({
                                showAllSymbol: true,
                                connectNulls: true,
                                name:'',
                                type:'line',
                                showSymbol: true,
                                symbol: 'circle',
                                symbolSize: 10,
                                data:app.pntModal_data.obj[app.resdata.sort[o].name][app.resdata.sort[o].showItem[i].name],
                                lineStyle: {
                                    normal: {
                                        width: 0,
                                    }

                                },
                                itemStyle: {
                                    normal: {
                                        borderColor:'white',
                                        color: function(params) {
                                            // build a color map as your need.
                                            if(params.data[2].isnormal==false){
                                                return '#FF0C00';
                                            }                                         
                                           
                                            return  app.getcolor(0);
                                        }
                                    }
                                },
                        
                            });
                        }else if(app.resdata.sort[o].showItem[i].chart==="折线图"){
                            //折线图
                            var x=app.pntModal_data.obj[app.resdata.sort[o].name][app.resdata.sort[o].showItem[i].name];//数据
                       
                            for(var j =0;j<x.length;j++){
                                //设置子时间轴位置
                                x[j].splice(1, 1, app.getAxiosSite(app.resdata.sort[o].name)+2+app.jianjuZ*i + x[j][2].ySite + app.zeroSite/app.pntModal_baseLength)  ;
                                x[j].push(j);//添加检查子轴的索引，为数组数据的第四位
                            } 
                            app.pntModal_option.series.push({
                                showAllSymbol: true,
                                connectNulls: true,
                                name:'',
                                type:'line',
                                showSymbol: true,
                                symbol: 'circle',
                                symbolSize: 10,
                                data:app.pntModal_data.obj[app.resdata.sort[o].name][app.resdata.sort[o].showItem[i].name],
                                lineStyle: {
                                    normal: {
                                        color:app.getcolor(0),
                                        width: 1
                                    }

                                },
                                itemStyle: {
                                    normal: {
                                        borderColor:'white',
                                        color: function(params) {
                                            // build a color map as your need.
                                            if(params.data[2].isnormal==false){
                                                return '#FF0C00'
                                            }                                         
                                            else if(params.data[2].type!=undefined){
                                                if(params.data[2].type==='类克'){
                                                    return  app.getcolor(0);
                                                }else if(params.data[2].type==='维多珠单抗'){
                                                    return  app.getcolor(1);
                                                }else if(params.data[2].type==='阿达木'){
                                                    return  app.getcolor(2);
                                                }

                                            }
                                            return  app.getcolor(0);
                                        }
                                    }
                                },
                            });
                        }
                       
                       
                    }


                }else{
                    console.log(o+'数据为空')
                }   
            }









            app.setCenterEventPoint();//添加中心事件点
        },
        orgnizeTitle:function(base,item){

            //base为一行的字数,Item为要处理的节点

            item.chartTitle=[];//清空缓存
            var str='';
            for(var j=0;j<item.showItem.length;j++){
                str='';
                var l=item.showItem[j].name.length;

                if(l>base){//超长的

                    var ci=Math.ceil(l/base);
                    var dian='';
                    if(ci>6){
                        ci=6;//限制7行
                        dian='...'
                    }
                    for(var i=0;i<ci;i++){
                        if(i>0){
                            str+= '\n';
                        }
                        str+= item.showItem[j].name.substring(i*base,(i+1)*base)
                    }
                    str+=dian;
                }else{//长度短的
                    str=item.showItem[j].name;
                }

                item.chartTitle.push(str);
            }




        },
        getcolor:function(i){
            var col=i%3;
            return app.colorlist[col];
        },
        huanhang:function(string1,base){
            var str='';
            var l=string1.length;

            if(l>base){//超长的

                var ci=Math.ceil(l/base);
                for(var i=0;i<ci;i++){
                    if(i>0){
                        str+= '\n';
                    }
                    str+= string1[j].substring(i*base,(i+1)*base)
                }
            }else{//长度短的
                str=string1;
            }
            return str;
        },

        getOption: function(){
            //诊疗时间轴配置
            var option ={

                tooltip: {
                    confine:true,
                    // trigger: 'axis',//轴触发
                    trigger: 'item',//散点触发
                    triggerOn: 'mousemove',
                    enterable:true,
                    formatter: function (params, ticket, callback) {

                        var str='';
                        //顶部markpoint为非数组结构
                        // if(!Array.isArray(params.data)){
                        //     str= '<div class="tooltip">' +
                        //         '  <div class="tooltip_title">' +
                        //         '       <div class="tooltip_title_top word_wrap">' +
                        //                     params.data['name']+
                               
                              
                               
                                      
                        //         '       </div>' +
                        //         '       <div class="tooltip_title_bottom word_wrap">' +
                        //                     params.data['time']+
                        //         '       </div>' +
                        //         '  </div>' +

                        //         '   <div class="tooltip_p">' +
                        //         '<div class="tooltip_medicine_b clear">' +
                        //                         '<span class="tooltip_medicine_left" > </span>' +
                        //                         '<span class="tooltip_medicine_right">' +
                                               
                        //                         '</span>' +
                        //                     '</div>'+
                        //                 '  </div>' +
                        //         '</div>';
                        //     return  str;

                        // }


                        if(params.data[2].father=="诊断"){//检查tooltip
                            
                            if(params.data[2]['flag']==='门诊'){
                                str=
                                '<div class="tooltip">' +
                                '  <div class="tooltip_title">' +
                                '  <div class="tooltip_title_top word_wrap">' +
                                params.data[2]['flag']+
                                '  </div>' +

                                '  </div>' +

                                '   <div class="tooltip_p">' +

                                '<div class="tooltip_medicine_b clear">' +
                                '<span class="tooltip_medicine_left">就诊时间： </span>' +
                                '<span class="tooltip_medicine_right">' +
                                params.data[2]['outpatientTime']+
                                '</span>' +
                                '</div>' +


                                '   </div>' +
                                '</div>'
                            
                            }else if(params.data[2]['flag']==='住院'){
                                
                                   str= '<div class="tooltip">' +
                                    '  <div class="tooltip_title">' +
                                    '  <div class="tooltip_title_top word_wrap">' +
                                    params.data[2]['flag']+
                                    '  </div>' +

                                    '  </div>' +

                                    '   <div class="tooltip_p">' +

                                    '<div class="tooltip_medicine_b clear">' +
                                    '<span class="tooltip_medicine_left">开始时间： </span>' +
                                    '<span class="tooltip_medicine_right">' +
                                    params.data[2]['enterTime']+
                                    '</span>' +
                                    '</div>' +

                                    '<div class="tooltip_medicine_b clear">' +
                                    '<span class="tooltip_medicine_left">结束时间：</span>' +
                                    '<span class="tooltip_medicine_right">' +
                                    params.data[2]['leaveTime']+
                                    '</span>' +
                                    '</div>' +

                                  

                                    '   </div>' +
                                    '</div>'
                                

                            }
                            
                        }
                        else {//公共tooltip
                            
                            str= 
                                '<div class="tooltip">' +
                                '  <div class="tooltip_title">' +
                                '       <div class="tooltip_title_top word_wrap">' +
                                            params.data[2]['name'];
                                if(params.data[2].ACCNO!=undefined){
                                    str+=  '<a target="_blank" href="'+imgUrl+params.data[2].ACCNO+'"><button class="el-button el-button--success is-plain el-button--mini" style="margin-left:5px;">影像</button></a>';
                                }
                                if(params.data[2].isnormal==false){
                                    str+=  '<span class="el-tag el-tag--danger el-tag--dark el-tag--mini" style="margin-left:5px;">值异常</span>';
                                }
                               
                                str+=          
                                '       </div>' +
                                '       <div class="tooltip_title_bottom word_wrap">' +
                                            params.data[2]['time']+
                                '       </div>' +
                                '  </div>' +

                                '   <div class="tooltip_p">' ;
                                for(var o in params.data[2]){
                                    if(o!='value'&&o!='time'&&o!='ySite'&&o!='isnormal'&&o!='name'&&o!='type'){
                                        var title=''
                                        if(o!=undefined && o.length>6){
                                            title=o.substring(0,6)+'...'
                                        }else{
                                            title=o;
                                        }
                                        str+=   
                                           '<div class="tooltip_medicine_b clear">' +
                                                '<span class="tooltip_medicine_left" title="'+o+'">'+title+'： </span>' +
                                                '<span class="tooltip_medicine_right">' +
                                                params.data[2][o]+
                                                '</span>' +
                                            '</div>' ;
                                    }
                                  
                                }

                  
                                str+='   </div>' +
                                '</div>';
                            
                        }
                   
                        return str;


                    }
                },
                title: [],
                xAxis: [
                ],
                yAxis: {
                    show:true,
                    axisLine:{
                        show:false
                    },
                    axisTick:{
                        show:false
                    },
                    axisLabel:{
                        show:false
                    },
                    inverse: true,
                    name: '',
                    splitLine:{
                        show:false
                    },
                    min: 0,//刻度最小值
                    max: 10,//刻度最大值
                    interval: 1,//刻度间隔
                    triggerEvent:true,

                },

                series : [

                ],
                grid:{
                    top:app.paddingtop,
                    left:140,
                    right:40
                },
                dataZoom: [{
                    type: 'inside',
                    zoomOnMouseWheel:true
                }, {
                    backgroundColor:'#EEEFF3',
                    fillerColor:'#D6DFF0',
                    borderColor:'#EEEFF3',
                    dataBackground:{

                        lineStyle:{
                            color:'#EEEFF3'
                        },
                        areaStyle:'#EEEFF3',
                        color:'#EEEFF3',
                    },
                    height:app.zoomHeight,
                    right:43,
                    top: app.paddingtop+app.zoomTopMargin,
                    // start: 0,
                    // end: 50,
                    // handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
                    // handleSize: '100%',
                    // handleStyle: {
                    //     color: '#fff',
                    //     shadowBlur: 3,
                    //     shadowColor: 'rgba(0, 0, 0, 0.6)',
                    //     shadowOffsetX: 2,
                    //     shadowOffsetY: 2
                    // }
                    handleIcon: 'M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7v-1.2h6.6z M13.3,22H6.7v-1.2h6.6z M13.3,19.6H6.7v-1.2h6.6z', // jshint ignore:line
                    handleSize: 18,
                    handleStyle: {
                        shadowBlur: 6,
                        shadowOffsetX: 1,
                        shadowOffsetY: 2,
                        shadowColor: '#aaa'
                    },
                }],
            }

            return option;
        },
        open:function(message,type) {
            this.$message({
                message: message,
                showClose: true,
                type: type,
                duration:1500
            });
        },
        searchData: function(ifinitshowdata){//ifinitshowdata是否初始化默认展示数据
            return app.test()//测试数据
            
          
            app.centralEventsIn='';//查完后重置中心事件参数
            app.detailCenterCache='';//查完后重置中心事件cache
        },
        test: function(){
            $('.loadingQJ').hide();
            app.waiting=false;

            var data = json1;


           
            app.waiting=true;
            var query=[];
        
     
                    
                    app.resdata=data;
                  


                  
                       
                        app.name=data['name'];
                        app.sex=data['sex_name'];
                        app.age=data['age_value'];
                      

    

                    


                    app.creatChart(app.resdata,true);



        },
        getTimeAxisVariableList:function(){//获取中心事件选项
            app.waiting=true;
            $.ajax({
                url: baseURL+"getTimeAxisVariableList",
                contentType:'application/json; charset=utf-8',
                type: "POST",
                headers: {
                    "token":sessionStorage.getItem("token"),
                },
                data:'',
                success: function (data) {

                    if(""==data||'{}'==JSON.stringify(data)){
                        app.waiting=false;
                        app.open("无中心事件可选项",'warning');
                        return;
                    }

                    app.ZXSJpopoverlist=[];
                    for(var o in data){
                        var list=[];
                        for(var p in data[o]){
                            list.push({exp:o+'_'+data[o][p],name:data[o][p]});
                        }
                        app.ZXSJpopoverlist.push({'name':o,'list':list})
                    }

                },
                error: function (e) {
                    app.waiting=false;
                    app.open("无中心事件可选项",'warning');
                    console.log(e)
                }
            })
        },

        initvariable: function(){
            //vue变量初始化，每次重新填充图表数据前执行
            //数据初始化
            // app.pntModal_option.series=[
            //     {
            //         name:'时间轴顶部阴影',
            //         type:'line',
            //         color:['#FAFAFA'],
            //         markArea: {
            //             animation:false,
            //             silent:true,
            //             data: [ [
            //                 {
            //                     yAxis: 0
            //                 },
            //                 {
            //                     yAxis: 4
            //                 }
            //             ]]
            //         }
            //     },];
            //title初始化
            app.pntModal_option.title=[];
            //xaxis初始化
            app.pntModal_option.title.push({
                textBaseline: 'middle',
                top: app.paddingtop+15,
                text: '时间跨度',
                textStyle:{
                    fontSize: 13,
                    color:'#333333',
                    fontWeight:'normal'
                }

            });

            app.pntModal_option.xAxis=[
                {
                    offset:-(app.paddingtop-5),

                    axisLabel:{
                        color:'#B3B3B3',
                        margin:-30,
                    },

                    axisTick:{
                        show:true,
                        inside:true,
                    },
                    splitLine: {
                        show:false,
                    },
                    axisLine : {

                        onZero:false,
                        lineStyle:{
                            color:'#B3B3B3'
                        },
                    },
                    showMaxLabel:true,
                    position: 'top',
                    nameLocation: 'start',
                    type: 'time',
                },
            ];

        },
        initsearch:function () {
            //第一次进入时间轴时执行查询
            app.waiting=true;
            app.searchData(true);
            // app.getTimeAxisVariableList();//查中心事件选项
           

        },
        getvalue:function(v){//获取json副本
            var r=JSON.stringify(v);
            var res=JSON.parse(r);
            return res;
        },
        initDiv: function () {
            //初始化 诊疗时间轴div载体，载体高度和y轴刻度个数成正比
            var length=60+app.pntModal_baseLength//补偿值
                +app.paddingtop
                +app.theLatestAxios()*app.pntModal_baseLength ;//y长度


            var height = length;
            app.pntModal_option.yAxis.max = app.theLatestAxios()+1; //y轴格子展示数量
           
            document.getElementById('pntModal_chart').style.height = height + 'px';
            
            
        },



    }

});



window.onload=function(){

    if(undefined!=sessionStorage.getItem('LoginInfo')){//内部访问权限，外部访问无权限限制
        app.operateJson = JSON.parse(sessionStorage.getItem('LoginInfo')).operateJson;

        if(!app.operateJson[24]){//诊疗时间轴
            app.showZLSJZ=false;
        }
        if(!app.operateJson[26]){//患者画像
            app.showHZHX=false;
        }
        if(!app.operateJson[25]){//患者全景视图
            app.showQJST=false;
        }
    }

        //默认进入全景视图页面
        app.pntModal_activeName="2";
    
    
    
    document.getElementById('pntModal_chart').style.width = document.body.clientWidth-30 + 'px';
    app.hospital=$("#header").attr("data-hospital");







    app.initsearch();
    // var imageURL = addShuiyin();//添加水印
    // $(".el-tabs__content,.caseTable").css("background-image","url("+imageURL+")");
    // $(".relative_left").css("height",document.documentElement.clientHeight);

}
window.onresize = function () {
    if(null!=app.pntModal_Chart&&app.pntModal_activeName=='2'){
        document.getElementById('pntModal_chart').style.width = document.body.clientWidth-30 + 'px';
        app.pntModal_Chart.resize();
    }
}




