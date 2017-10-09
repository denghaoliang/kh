		$(function(){
				var inp=$("#inp")
//				var but=$("#anniu")
			    var uls=$("#data")
			    var anniu=$("#anniu")
			   
			    inp.keyup(function(e){
			    	if(e.keyCode==38 || e.keyCode==40 ||e.keyCode==13){return}	
			    	//键盘弹起时获取输入框的文本，把文本作为关键字，到时候控制出现下拉列表
			    	var txt=inp.val()
			    	//用ajka的办法来获取淘宝的数据，输入文本时，打开控制台Network，点击下面一行的All，找到sug?......
//			    	找url地址的时候,记住,先看看地址到哪里开始要获取的数据不会变不会变
			    	$.ajax({
			    		type:"get",
                        url:"https://supmall-go.lemall.com/common/prouduct/getSuggest.jsonp?text="+txt+"&size=10&",
			    		dataType:"jsonp",
//			    		jsonp:"jqjsp",
			    		success:function(data){
			    			console.log(data)
			    			//成功返回一次data就清除一次ul里面的所有子元素
			    			uls.empty()
			    			
			    			var shuj=data.result.suggests
//			    			var shuj=deng
			    			console.log(shuj)
			    			//遍历数组shuj                                   
			    			$.each(shuj,function(i,v){
//			    				console.log(v["text"])
			    				//每遍历一次创建一个li标签
			    				var lis=$("<li></li>")
			    				//每遍历一次创建一个a标签和啊herf里面的属性
			    				var ass=$('<a href="https://www.lemall.com/product/search.html?level=1&keyword='+v["text"]+'" ></a>')
			    				//a标签的文本为元素v里面的索引值为0的元素
			    				ass.html(v["text"])
			    				//把li标签添加到ul里面，作为子集
			    				uls.append(lis)
			    				//把a标签添加到里里面，作为子集
			    				lis.append(ass)
			    				
			    			})	
			    		}
			    	})
			    })
		       				//点击按钮时
				anniu.click(function(){
				//获取输入框的文本
					var txt=inp.val()
					//以输入框的文本为关键字，整个页面跳转到那里
					window.location.href="https://www.lemall.com/product/search.html?level=1&keyword="+txt
					
					
				})
				
				$(document).click(function(){
					//点击整个页面时，去电ul下拉列表
					uls.empty()
				})
				
				
				inp.click(function(e){
					//点击输入框时，如果不阻止点击页面时的事件冒泡，点击输入框也会把下拉列表去掉
					//因为点击输入框，会冒泡到点击整个页面
					e.stopPropagation();
					//点击一次就执行一次输入框的弹起事件，要不点击输入框外面后，再点击输入框时，下来列表不会再次出现
					inp.keyup()
				})
				
				//按下键盘事件
//				$(document).keydown(function(ev){
//					//当按下回车键时，就执行一次点击按钮事件
//					var dj=ev.keyCode
//					
//					if(dj=="13"){
//						anniu.click()
//					}
//				})
				
				//在页面的弹起事件
				$(document).keyup(function(e){
					//获取键盘所对应的编码，为了判断用
					var dj=e.keyCode
					//申明一个变量==类选择器
					var con=$(".color")
					//如果弹起向上键
					if(dj==40){
						//因为一开始没有给谁加color样式，所以con的长度为0，不为0时，
						if(con.length!=0){
							//清除自己的样式color，给下一个兄弟添加样式color
							con.removeClass("color").next().addClass("color")
						}else{
							//否则给第一个li添加color的样式
							uls.children().first().addClass("color")
						}
					}
					//如果弹起向下键
					if(dj==38){
						//因为一开始没有给谁加color样式，所以con的长度为0，不为0时，
						
						if(con.length!=0){
							//清除自己的样式color，给上一个兄弟添加样式color
							con.removeClass("color").prev().addClass("color")
						}else{
							//否则给最后一个li添加color样式
							uls.children().last().addClass("color")
						}
					}
					
				
				
				//如果弹起回车键
				if(dj==13){
					//声明一个变量con==color的样式
					var con=$(".color")
					//因为一开始没有给谁加color样式，所以con的长度为0，不为0时，
					if(con.length!=0){
						//获取li里面的a里的文本
						var txt=con.children().html();
						//页面跳转到以a标签为关键字的页面
					window.location.href="https://www.lemall.com/product/search.html?level=1&keyword="+txt
						
					}else{
						//获取输入框的文本
						var txt=inp.val()
						//页面跳转到以a标签的文本为关键字的网页
						window.location.href="https://www.lemall.com/product/search.html?level=1&keyword="+txt
					}
					
				}
				
				})
				
				
				
				
				
			})