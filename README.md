# back-to-top

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
