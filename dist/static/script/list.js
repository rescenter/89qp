function initTypes(c){var h="";c.forEach(function(c){h+="<div data-id='"+c.id+"' class='f-t-item'>"+c.value+"</div>"}),$(".f-types").html(h)}function initAreas(c){var h="",g="";c.forEach(function(c,$){var C=c.nodes;h+=0==$?"<li class='active' data-id='"+c.id+"'>"+c.name+"</li>":"<li data-id='"+c.id+"'>"+c.name+"</li>",C&&C.length>0&&(g+=0==$?"<ul class='active' id='"+c.id+"'>":"<ul id='"+c.id+"'>",C.forEach(function(c){g+="<li data-id='"+c.id+"'>"+c.value+"</li>"}),g+="</ul>")}),$("#areaFirst").html(h),$("#areaSecond").html(g)}$(function(){function c(c){$("#arrow").html("正在更新..."),setTimeout(function(){for(var i=0,h=10;h>i;i++)$("#list").append("<div class='l-item'>"+i+"</div>");$("#pull_refresh").removeClass("active"),$("#arrow").html("上拉加载数据");var g=c.min-10*$(".l-item").outerHeight();c.to(g),c.min-=10*$(".l-item").outerHeight()-10},500)}var h=getLocalParams("type"),g=$("#titleBar"),C=g.find("h2");switch(h){case"gameGroup":document.title="棋牌群",C.html("棋牌群");break;case"gameAgent":document.title="棋牌代理",C.html("棋牌代理");break;case"gamePush":document.title="棋牌地推",C.html("棋牌地推")}{var w=document.querySelector("#scroller"),k=(document.querySelector("#arrow"),document.querySelector("#pull_refresh"));document.querySelector("#list")}Transform(k,!0),Transform(w,!0);var y=Math.floor(window.innerHeight-10-10*$(".l-item").outerHeight()-$("#wrapper").offset().top);new AlloyTouch({touch:"#wrapper",vertical:!0,target:w,property:"translateY",initialValue:0,min:y,max:0,change:function(){},touchMove:function(c,h){var g=window.innerHeight-10-$(".l-item").outerHeight()*$(".l-item").length-$("#wrapper").offset().top;g-h>70&&($("#pull_refresh").addClass("active"),$("#arrow").html("释放更新"))},touchEnd:function(h,g){var C=window.innerHeight-10-$(".l-item").outerHeight()*$(".l-item").length-$("#wrapper").offset().top;return C-g>70?(this.to(C-$("#pull_refresh").height()),c(this),!1):void 0}});var S=$("#filter");$("#btnFilter").click(function(){S.addClass("active")});var b={},H={},T=[{id:0,value:"斗牛群"},{id:1,value:"斗地主群"},{id:2,value:"跑得快群"},{id:3,value:"德州群"},{id:4,value:"其他群"}],F=[{id:"all",name:"全部"},{id:"b",name:"背景",nodes:[{id:"b1",value:"东城区"},{id:"b2",value:"西城区"}]},{id:"s",name:"上海",nodes:[{id:"s1",value:"闽兴去"},{id:"s2",value:"静安区"}]}];initTypes(T),initAreas(F),$(".f-mask").click(function(){$(".filter").removeClass("active")}),$(".f-h-item").click(function(){$(".f-h-item").removeClass("active"),$(this).addClass("active"),$(".f-content").removeClass("show"),$(".f-content").eq($(this).index()).addClass("show")}),$(".f-t-item").click(function(){var c=$(this),h=c.index();console.log(h),c.hasClass("active")?c.removeClass("active"):c.addClass("active")}),$("#areaFirst").find("li").click(function(){var c=$(this),h=c.data("id");$("#areaFirst").find("li").removeClass("active"),c.addClass("active"),$("#areaSecond ul").removeClass("active"),$("#areaSecond").find("ul[id="+h+"]").addClass("active")}),$("#areaSecond").find("li").click(function(){var c=$(this),h=c.parent("ul"),g=h.attr("id"),C=c.data("id");console.log(g,C),$("#areaSecond").find("li").removeClass("active"),c.addClass("active")}),$(".f-btn-reset").click(function(){$(".f-t-item").removeClass("active"),$("#areaFirst li").removeClass("active"),$("#areaSecond li").removeClass("active"),b=[],H=[]}),$(".f-btn-sure").click(function(){$(".filter").removeClass("active")})});