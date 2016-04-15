/*
* time:2016/4/13
* author:Liang_QF
* 页面翻页效果
*/
var xmlhttp;
function loadXMLDoc(url,cfunc){
	if (window.XMLHttpRequest){
		xmlhttp=new XMLHttpRequest();
	}else{
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange = cfunc;
	xmlhttp.open("GET",url,true);
	xmlhttp.send();
};
function myFunction(url ,num){
	loadXMLDoc(url,function(){
		if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
			var json = eval("("+ xmlhttp.responseText +")");
			var totalNum = json.data.length;
			var total = 0;
			if((totalNum%num) > 0 && (totalNum%num) <= num ){
				total = parseInt(totalNum/num) + 1;
			}
			console.log(total);
			var defaultOoption = {
				pagerid       :'pagination',
				current       :1,//当前页
				total         :total,//总页数
				totalRecords  :totalNum,//总数居条数
				firstPage	  : true, //是否显示首页按钮
				lastPage	  : true, //是否显示尾页按钮
				prePage	      : true, //是否显示上一页按钮
				nextPage	  : true  //是否显示下一页按钮
			};
			var pageId = document.getElementById(defaultOoption.pagerid);

			QFpage.init(pageId,defaultOoption);
		}
	});
};

var QFpage = {
	init:function(obj,args){
		return (function(){
			QFpage.pagesHtml(obj,args);
			QFpage.clickPages(obj,args);
		})();
	},
	pagesHtml:function(obj,args){
		var str_frist='',str_prev='',str_next='',str_last='',str='';
		var str_points = '<li class="disabled"><span class="fa">...</span></li>';
		//是否显示首页，上一页
		if(args.current == 1){
			str_frist = '<li class="disabled" data-page="1"><span class="fa fa-angle-double-left">《</span></li>';
			str_prev ='<li class="prev disabled" data-page="'+ args.current +'"><span class="fa fa-angle-left">&lt;</span></li>';
		}else{
			str_frist = '<li class="disabled" data-page="1"><a href="javascript:;" class="fa fa-angle-double-left">《</a></li>';
			str_prev ='<li class="prev disabled" data-page="'+ args.current +'"><a href="javascript:;" class="fa fa-angle-left">&lt;</a></li>';
		}
		//是否显示尾页，下一页
		if(args.current == args.total){
			str_last = '<li class="disabled" data-page="'+ args.total +'"><span class="fa fa-angle-double-right">》</span></li>';
			str_next ='<li class="next disabled" data-page="'+ args.current +'"><span class="fa fa-angle-right">&gt;</span></li>';
		}else{
			str_last = '<li class="disabled" data-page="'+ args.total +'"><a href="javascript:;" class="fa fa-angle-double-right">》</a></li>';
			str_next ='<li class="next disabled" data-page="'+ args.current +'"><a href="javascript:;" class="fa fa-angle-right">&gt;</a></li>';
		}
		//中间页面显示
		if(args.total < 10){
			for(var i = 1;i<=args.total;i++){
				if(args.current == i){
					str += '<li class="active" data-page="'+ i +'"><a href="javascript:;">'+ i +'</a></li>';
				}else{
					str += '<li data-page="'+ i +'"><a href="javascript:;">'+ i +'</a></li>';
				}
			}
		}else{
			if(args.current <= 5){
				for(var i=1;i<=7;i++){
					if(args.current == i){
						str += '<li class="active" data-page="'+ i +'"><a href="javascript:;">'+ i +'</a></li>';
					}else{
						str += '<li data-page="'+ i +'"><a href="javascript:;">'+ i +'</a></li>';
					}
				}
				str += str_points + '<li data-page="'+ args.total +'"><a href="javascript:;">'+ args.total +'</a></li>';
			}else{
				str += '<li data-page="1"><a href="javascript:;">1</a></li>';
				str += str_points ;
				var begin = args.current - 2;
				var end = parseInt(args.current) + 2;
				if(end > args.total){
					end = args.total;
					begin = end-4;
				}
				for (var i = begin; i <= end;i++) {
					if(args.current == i){
						str += '<li class="active" data-page="'+ i +'"><a href="javascript:;">'+ i +'</a></li>';
					}else{
						str += '<li data-page="'+ i +'"><a href="javascript:;">'+ i +'</a></li>';
					}
				}
				if(end != args.total){
					str += str_points + '<li data-page="'+ args.total +'"><a href="javascript:;">'+ args.total +'</a></li>';
				}

			}
		}

		obj.innerHTML = str_frist+str_prev+str+str_next+str_last;
	},
	clickPages:function(obj,args){
		var liList = obj.getElementsByTagName('li');
		for(var i = 0;i<liList.length;i++){
			liList[i].index = i;
			liList[i].onclick = function(){
				var current = this.getAttribute('data-page');
				args.current = current;
				if(this.className == 'prev disabled'){
					args.current = current-1;
					console.log(args.current);
				}
				if(this.className == 'next disabled'){
					args.current = parseInt(current)+1;
					console.log(args.current);
				}
				QFpage.init(obj,args);
			}
		}
	}
}
myFunction('ajax/page.json',6);