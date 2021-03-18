$(function () {
    // 初始化fullpage组件
    // 1.设置每一个屏幕的背景颜色
    // 2.设置屏幕内容的对其方式，默认为垂直居中，改为顶部对齐
    // 监听进入某一屏的时候
    $('.container').fullpage({
        // 配置参数
        sectionsColor: ["#fadd67", "#84a2d4", "#ef674d", "#ffeedd", "#d04759", "#84d9ed", "#8ac060"],
        verticalCentered: false,  //每一页的内容是否处置居中
        // 指示器
        navigation: true,
        navigationPosition: 'right',//导航小圆点的位置
        afterLoad: function (link, index) {
			//eq() 方法返回带有备选元素的指定索引号的元素
            $('.section').eq(index - 1).addClass('now');  //afterLoad 滚动到某一屏后的回调函数 index 从1 开始
        },
        // 点击更多切换下一页
        // 最好在组件初始化完毕或插件内容渲染完毕


        // jquery插件初始封装这个方法
        // 1.回想jquery插件的封装 $.fn.fullpage = function(){}

        afterRender: function () {
            $('.more').on('click', function () {
                // 2.jquery本身没有的方法通过$.fn的方式追加方法，认为是插件方法
                $.fn.fullpage.moveSectionDown();
            });
            // 当第四屏的购物车动画结束后，执行收货地址的动画  第四屏过渡动画完成后触发
            $('.screen04 .cart').on('transitionend', function () {
                $('.screen04 .address').show().find('img:last').fadeIn(1000);
                $('.screen04 .text').addClass('show');
            });
            // 第八屏功能
            // 1.手要跟着鼠标移动
            $('.screen08').on('mousemove',function(e){
                $(this).find('.hand').css({
                    left: e.clientX-300,
                    top: e.clientY-110,
                });
            }).find('.again').on('click',function(){
            // 2.点击再来一次重置动画调回第一页
                $('.now,.leaved,.show').removeClass('now').removeClass('leaved').removeClass('show');
                $('.content [style]').removeAttr('style');
                // 跳转第一页
                $.fn.fullpage.moveTo(1);
            });
            

        },
        // 离开某一页面的时候触发
        onLeave: function (index, nextIndex, direction) {
            let currentSection = $('.section').eq(index - 1);
            if (index == 2 && nextIndex == 3) {
                //从第二页到第三页
                currentSection.addClass('leaved');
            } else if (index == 3 && nextIndex == 4) {
                currentSection.addClass('leaved');
            } else if (index == 5 && nextIndex == 6) {
                currentSection.addClass('leaved');
                $('.screen06 .box').addClass('show');
            } else if (index == 6 && nextIndex == 7) {
                $('.screen07 .star').addClass('show');
                $('.screen07 .text').addClass('show');
                $('.screen07 .star img').each(function(i){
                    // $(this).delay(i*0.6*1000).fadeIn();
                    $(this).css('transition-delay',i*0.5+'s');
                });
            }
        },
        // 页面切换时间
        scrollingSpeed: 1000,
    });
});