
$(function(){
//	console.log(obj.province,obj.city)
	var cshi=$(".cshi")
	var pro=$(".pro"),cit=$(".cit"),add=$(".add")//配送地区下面一行地址
    var province=$("#province"),city=$("#city"),address=$("#address")//获取不同层次地址的三个ul
    var tab=$(".tabs a")//上面三个节点的边框色
    //获取每个点击事件的id，为了下面做判断   
    var id=null
    var ida=null
    var idb=null
   //点击province里面的li时
    province.on("click","li",function(){
         province.css("display","none")//province隐藏
         city.css("display","block")//city显示
         address.css("display","none")//address隐藏
         tab.eq(1).css({               //边框色的变化
         	"borderColor":"red",
		    "border-bottom":"solid #ffffff 1px"
         }).siblings("a").css({"borderColor":"#dbdbdb","borderBottom":"solid red 1px"})
         city.children().remove() //把city里面的子集清空
         var provInce=obj.province //获取数据里面每个省里每个城市
         id=$(this).attr("id")//获取点击节点的id
//       循环每个省的每个城市
         $.each( provInce,function(i,v){
         	var lis=$("<li></li>") //创建一个空的li
         	if(v[0]==id){          //如果点击的节点的id和循环里数组的第一项相同时
         		lis.html(v[1])     //把数组第二项的文本添加到li里面
         		lis.attr("value",v[2]) //li添加属性名为value，属性值为本身数组的第三项。
         		lis.attr("title",v[1])
         		lis.attr("id",id)
         		city.append(lis)        //把li添加到ul里
         	}
         })
         var html=$(this).html()//获取点击节点的文本
         pro.html(html)         //把点击的文本添加给上面
         console.log(id)
    })
    
       	//点击city里面的li时
	city.on("click","li",function(){
          province.css("display","none") 
		  city.css("display","none")
		  address.css("display","block")
		  tab.eq(2).css({               //边框色的变化
         	"borderColor":"red",
		    "border-bottom":"solid #ffffff 1px"
         }).siblings("a").css({"borderColor":"#dbdbdb","borderBottom":"solid red 1px"})
		  address.children().remove() //删除address里面的所有子元素
		  var cIty=obj.city  //获取数据里面的所有城市的所有地区
		  var value=$(this).attr("value") //获取点击元素属性名为value的属性值
//       循环city数组里面的每个数组
         $.each(cIty,function(i,v){
          	  var lis=$("<li></li>")
          	  if(v[0]==value){
          	  	lis.html(v[1]) 
         		lis.attr("title",v[1])
         		lis.attr("id",id)
          	  	address.append(lis)
          	  }
          })
		 var html=$(this).html()
		 cit.html(html)
		  ida=$(this).attr("id")
	        console.log(ida)
        })
	
	    	//点击address里面的li时
	address.on("click","li",function(){
		idb=$(this).attr("id")
		console.log(idb)
		var html=$(this).html()
		add.html(html)
		cshi.css("display","none")
		//点击结束后，才改变的配送地区那一行地址，防止有人乱点，乱点时添加不进去。
	        if(id==ida&&id==idb){
	        	$(".proa").html(pro.html())
	        	$(".cita").html(cit.html())
	        	$(".adda").html(add.html())
	        }else{
	        	$(".adda").html(add.html())
	        }
	})
//	鼠标进过province里面li时,提示文字，city和address里面的提示文字，在循环时已经添加
    var lisa=$("#province li")
	lisa.mouseover(function(){
		var html=$(this).html()
		$(this).attr("title",html)
	})
	
	//下面是记录输入过的地址功能，9.20换皮肤那里有。同一个点击事件可以写多次，方便观看。
	var ax=""
	var bx=""
	var cx=""
	address.on("click","li",function(){
//		window.localStorage.clear()  
		   var a=$(".proa").html()
		   var b=$(".cita").html()
		   var c=$(".adda").html()
		   window.localStorage.setItem("as",a)
		   window.localStorage.setItem("bs",b)
		   window.localStorage.setItem("cs",c)
		   
	})
	
	if(localStorage.hasOwnProperty("as")){
		ax=localStorage.getItem("as")
		bx=localStorage.getItem("bs")
		cx=localStorage.getItem("cs")
		$(".proa").html(ax)
		$(".cita").html(bx)
		$(".adda").html(cx)
		
		
	}
	
	
	
	
	
	
	
	
	
	
	
	
})