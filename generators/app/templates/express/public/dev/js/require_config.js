(function () {
    require.config({
        paths: {
            zepto: 'libs/zepto.min',
            deferred : 'libs/deferred.min',
            ZeptoExtend: 'app/Zepto.extend.min', //zepto扩展
            Init : 'app/Init',  //初始化
            Swipe : 'app/Swipe',  //1.焦点图滚动
            ReadMore : 'app/ReadMore', //2.阅读更多
            Pop : 'app/Pop', //3.弹框方法
            scrollLoading : 'app/scrollLoading', //4.滚屏加载图片
            scrollTo : 'app/scrollTo', //5.为scrollTo方法添加动画效果
            highlight : 'app/highlight',  //6.点击高亮，滑动不高亮
            DelayProgress : 'app/DelayProgress', //7.动态滚动条加载
            Dialog : 'app/Dialog',  //8.弹框美化
           // tplPc : '../../../../www/store/dev/js/tpl',
            //pcStatic : '../../../../www/store/dev/js',
            format: 'app/format',
            validForm: 'app/validform'
        },
        shim : {
            zepto:{
                deps: ['deferred'],
                exports: '$'
            },
            Swipe : {
                deps: ['zepto']
            },
            ZeptoExtend : {
                deps: ['zepto']
            },
            highlight : {
                deps: ['zepto']
            },
            Init : {
                deps: ['zepto','ZeptoExtend','highlight','scrollLoading']
            },
            Swipe : {
                deps: ['zepto']
            },
            ReadMore : {
                deps: ['zepto']
            },
            Pop : {
                deps: ['zepto']
            },
            scrollLoading : {
                deps: ['zepto']
            },
            scrollTo : {
                deps: ['zepto']
            },
            DelayProgress : {
                deps: ['zepto']
            },
            Dialog : {
                deps: ['zepto']
            },
            format : {
                deps: ['zepto']
            },
            validForm: {
                deps: ['zepto']
            }
        }
    });
})();



