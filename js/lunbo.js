$(function(){
	
	//获取dom元素
	var box = $('.lunbo');
	var pics = $(".fu");
	var dots = $('.disn');
	var lunbo=$(".lunbo")
	var flag = true;
	var rChange = false;
	var lChange = false;
	//每一个图片li
	var lis = pics.children();
	var dot = dots.children();
//	console.log(lis.width())
    var liWidth=lunbo.width()
	//一张图跳到另一张图的运动方式
	function toPlay(){
		if (toRight[0].flag == true) {
			return;
		}
		toRight[0].flag = true;
		//每次运动之前获取ul的位置
		var curLeft = pics.position().left;
		
		//如果最后一张图片出现在视野中，那么就可以将第一张图片定位到最后一张图片的后面，同时让rChange变量为true
		//第一张图片应该移动的位置：图片宽度 * 图片数量
		if (curLeft <= (1-lis.length) * liWidth) {
			lis.first().css('left',liWidth*lis.length);
			rChange = true;
		}
		
		//获取有checked样式的点
		var checked = $(".checked");
		//移除checked样式
		checked.removeClass('checked');
		//如果该点后面有兄弟节点
		if (checked.next().length != 0) {
			//让下一个兄弟节点加上checked样式
			checked.next().addClass('checked');
		}else{
			//如果该点已经是最后一个点了，就让第一个点加上checked样式
			dot.eq(0).addClass('checked');
		}
		
		console.log(curLeft)
		//给图片切换加上动画效果
		pics.animate({
			left : curLeft -liWidth
		},200,function(){
			toRight[0].flag = false;
			//判断的是如果第一张图片也出现在视野中了，那么就立即还原第一张图片的位置，并且让ul的left值归0
			if (rChange == true) {
				//第一张图片的位置重置为0
				lis.eq(0).css('left',0);
				//ul的位置重置为0
				pics.css('left',0);
				//让rChange变为false
				rChange = false;
			}
		})
	}
	var cbl=$(".cbl")
	//隔多久切换一次图片
	var timer = setInterval(toPlay,4000)

	//box的移入移出事件
	cbl.hover(function(){
		clearInterval(timer)
		toRight.css("display","block")
		toLeft.css("display","block")
	},function(){
		toRight.css("display","none")
		toLeft.css("display","none")
		timer = setInterval(toPlay,3000)
	})
	
	//给点加上点击事件
	dot.click(function(){
		//获取当前点击的点的索引
		var thisIndex = $(this).index();
		if (thisIndex == $('.checked').index()) {
			return;
		}
		
		//清空所有点的样式
		dot.removeClass('checked');
		
		//给自己加上样式
		$(this).addClass('checked');
		
		console.log(thisIndex)
		//ul的left值 = 点的索引值 * 每张图片的宽度
		pics.animate({
			left : -thisIndex * liWidth
		},200)
	})
	
	//获取toLeft按钮
	var toLeft = $('.left');
	//给按钮添加一个私有布尔值变量
	toLeft[0].flag = false;
	toLeft.click(function(){
		//console.log(this.flag)
		//判断flag是否为true，如果为true，就不执行任何操作
		if (this.flag == true) {
			return;
		}
		//如果不为true，就执行图片切换动画，并且设置flag为true
		this.flag = true;
		//获取当前ul的left值
		var curLeft = pics.position().left;
		
		//当第一张图片出现的时候，将最后一张图片定位到第一张的前面
		if (curLeft == 0) {
			lis.last().css('left',liWidth* (-lis.length));
			lChange = true;
		}
		
		var checked = $(".checked");
		checked.removeClass('checked');
		if (checked.prev().length != 0) {
			checked.prev().addClass('checked');
		}else{
			//如果该点已经是最后一个点了，就让第一个点加上checked样式
			dot.last().addClass('checked');
		}
		
		pics.animate({
			left : curLeft + liWidth
		},200,function(){
			//当动画执行完之后，重新设置flag为false
			toLeft[0].flag = false;
			//如果lChange为true，就表示最后一张图片出现在了视野中，把最后一张图片位置还原，并且让ul的位置为最大值
			if (lChange == true) {
				lis.last().css('left',0);
				pics.css('left',(1-lis.length)*liWidth);
				//重置lChange为false
				lChange = false;
			}
		})
	})
	
	//toRight事假，与toLeft相同
	var toRight = $('.right');
	toRight[0].flag = false;
	toRight.click(toPlay);
	

})
