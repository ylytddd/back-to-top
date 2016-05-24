# back-to-top

返回到顶部的小插件，其实做返回到顶部不需要这么麻烦....只是用来练习写插件

最基本的用法

```Javascript
	var back = new Top('.btn', 'scrollbody', {speed:50});        // 实例化一个回到头部类 ,参数1：返回头部按钮   参数2：滚动体 参数3：配置项
	
	back.on(top, function () {
		console.log("top");
	}
	
	back.on(scroll, function () {
		console.log("scrolling");
	}
```
