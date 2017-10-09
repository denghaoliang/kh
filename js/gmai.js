$(function(){
	            //这是后来添加的控制放大镜是否应用的功能  
				var fangdajing=$("#fangdajing")
				var fimg=$("#fangdajing>img")
			    fimg.click(function(){
			    	fangdajing.css("display","none")
			    })
				
				//获取元素
				var box = $('#box')
				var mask = $('#mask')
				var big = $("#big") 
				var bp = $("#bigPic");
				var a=0
				//计算鼠标向下滑动的距离，防止鼠标向下滑动时，放大镜会出错。
				$(window).scroll(function(){
					a=$(this).scrollTop()
					console.log(a)
				})
				
				//给box添加mousemove事件
				box.mousemove(function(event){
					//第一步：计算红块的位置
					mask.offset({
						left : event.clientX - mask.width()/2,
						top : event.clientY - mask.height()/2+a
					})
					
					//第二步：限制红块的活动范围
					if (mask.position().left <= 0) {
						mask.css('left',0)
					}
					if (mask.position().left >= (box.width()-mask.width())) {
						mask.css('left',box.width()-mask.width())
					}
					if (mask.position().top <= 0) {
						mask.css('top',0)
					}
					if (mask.position().top >= (box.height()-mask.height())) {
						mask.css('top',box.height()-mask.height())
					}
					
					//第三步，计算大图的运动方式
					var rate = -(bp.width() - big.width()) / (box.width() - mask.width())
//					console.log(rate)
					bp.css({
						left : mask.position().left * rate,
						top : mask.position().top * rate
					})
					
				})
//				鼠标移入出现
				box.mouseover(function(){
					big.css("display","block")
					mask.css("display","block")
				})
//				鼠标移出隐藏
				box.mouseout(function(){
					big.css("display","none")
					mask.css("display","none")		
				})
//				鼠标经过换图事件
				var uls=$(".x-lun")
				var boxI=$("#box img")
				var bigI=$("#big img")
				uls.on("mouseover","li",function(){
					var index=$(this).index()+1
					$(this).addClass("on").siblings().removeClass("on")
					boxI.attr('src',"img/超M4-"+index+".jpg")
					bigI.attr('src',"img/超大M4-"+index+".jpg")
					
				})
				
				var prev=$(".s-prev")
				var next=$(".x-next")
				var uls=$(".x-lun")
//				var on=$(".on").eq() on每次点击都只有一个哪里来的eq
//				console.log(on)
//				var n=0
//              左按钮
				prev.click(function(){
                   uls.animate({marginLeft:"-300px"},1000)
				})
//				右按钮
				next.click(function(){
					uls.animate({marginLeft:"0px"},1000)
				})
//			点击出现或者隐藏配送地区	
		  	var didian=$(".didian span")
		  	var cshi=$(".cshi")
		  	var v=0
			didian.click(function(){
				v++
				if(v%2==0){
					cshi.css("display","none")
				}else{
					cshi.css("display","block")
					
				}
			})
//			点击切换不同城市
			var ass=$(".tabs a")
			var ulss=$(".c-content ul")
			ass.click(function(){
				var index=$(this).index()
				$(this).css({
					"borderColor":"red",
					"border-bottom":"solid #ffffff 1px"
				}).siblings("a").css({"borderColor":"#dbdbdb","borderBottom":"solid red 1px"})
//				sibligs()里面可以输入参数,指定兄弟类型
			  ulss.eq(index).css("display","block").siblings().css("display","none")
				
			})
//			点击×隐藏
			var tabs=$(".tabs span")
			tabs.click(function(){
				cshi.css("display","none")
			})
			
			var spjs=$(".spjs li")
			spjs.click(function(){
				$(this).addClass("lisy").siblings().removeClass("lisy")
			})
			
			
			
			
			
			
			
			
			
			
			
			})