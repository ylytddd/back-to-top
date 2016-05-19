/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-05-19 10:34:25
 * @version 0.0.1
 */

 	
;(function (window) {

    // 
    var rAF = window.requestAnimationFrame        ||
              window.webkitRequestAnimationFrame  ||
              window.mozRequestAnimationFrame     ||
              window.oRequestAnimationFrame       ||
              window.msRequestAnimationFrame       ;

    // 通用工具类
    var Utils = (function () {

        var me = {};    

        me.getFinalStyle = function (dom, style) {
        	return window.getComputedStyle(dom)[style];
        }

        /**********
        *
		*	findScrollContainer：寻找滚动体的容器，按钮点击后执行
        *	
        *	@parma scrollBodyArg {Element} :滚动体元素
        *	@tempScrollContainer {Element} ： 临时变量
        *
        **********/
        me.findScrollContainer = function (scrollBodyArg) {
        	var self = this;
        	var scrollContainer;

        	// 遍历滚动体元素的外层元素，直到找到真正拥有滚动条的外层元素
        	;(function findContainer(scrollBody) {

        		var tempScrollContainer = scrollBody.parentNode;

        		// 第一个带有overflow为scroll的外层元素，就是真正拥有滚动条的外层元素，否则一直找到body
        		if( self.getFinalStyle(tempScrollContainer, 'overflow') != 'scroll' ) {

        			if(tempScrollContainer.tagName == 'BODY'){
        				scrollContainer = tempScrollContainer;
        				return;
        			}

        			findContainer(tempScrollContainer);

        		}else if(self.getFinalStyle(tempScrollContainer, 'overflow') == 'scroll'){

        			scrollContainer = tempScrollContainer;
        			return;
        		}

        	})(scrollBodyArg)


        	return scrollContainer;
        }

        return me;

    })();


    // main class
    var ToTop = function (options,callback) {

        for(var i = arguments.length - 1; i >= 0; i--) {

            if(typeof arguments[i] == 'function') {

                this.callback = arguments[i];
            }else if(typeof arguments[i] == 'object') {

                this.options = arguments[i];
            }else {
                throw '参数类型不对'
            }
        }

        for(var item in this.options) {
            this[item] = options[item]
        }
    };



    ToTop.prototype = {

    	/*
			绑定函数
			@parame backBtnEle {String || Element} :  返回顶部按钮元素
			@parame scrollBody {String || Element} :  滚动体
            @parame callback {Function} :  到达顶部后执行
    	*/
        // bind function start
        bind: function (backBtnEle, scrollBody) {

            var self = this;

            var backBtnEle = typeof backBtnEle === 'string' ? document.querySelector(backBtnEle) : backBtnEle;
            var scrollBody = typeof scrollBody === 'string' ? document.querySelector(scrollBody) : scrollBody;

            var scrollContainer = Utils.findScrollContainer(scrollBody);
            /**************
			*
			*	配置项
			*	@speed: {Number} 滚动速度
			*	@speedRatio: {Number} 滚动速度倍率，调节滚动到顶部的时间，不同距离有不同速度
			*
            **************/
    	    var speed = this.speed || 100;        // 默认速度，滚动距离在1500以下，均为100    

			var speedRatio = 1;     // 速度倍数



			// 绑定点击事件，开始执行返回顶部动作
            backBtnEle.addEventListener('click', function () {

            	var scrollDis = scrollContainer.scrollTop;


            	// 默认在滚动距离超过1500时，开始调节speedRatio，进而调节滚动速度
			    if(scrollDis > 1500) {
			        speedRatio = scrollDis / 1500;
			        speed *= speedRatio;
			    }

                // 降级处理，对于不支持 requestAnimationFrame 的浏览器，不做缓动
                if(!rAF) {
                    eleP.scrollTop = 0;
                    return;
                }

			    // 滚动函数
			    (function toTop() {

			        scrollDis -= speed;
			        scrollContainer.scrollTop = scrollDis;

                    if(self.onscroll) self.onscroll();
                    
			        // 递归调用requestAnimationFrame，产生缓动效果
			        if(scrollDis > 0) {

			            rAF(toTop);
			        }else{

			        	if(self.callback) {
			        		self.callback()
			        	}
                        return;
                    }
			    }()) 

            }, false);
        },
        onscroll: null
    }

    window.Top = ToTop;

})(window)



