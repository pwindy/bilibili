// banner start
    //left
    ( function() {
        var $banner_left = $('.banner_left');
        var $tabLi = $('.banner_left .tab_ul .tab_li');
        var $imgUl = $('.banner_left .img_ul');
        var $left_more = $('.banner_left .more');
        var index = 0;
        var timer;
        $banner_left.hover( function(){
            clearInterval( timer );
            $left_more.stop().fadeIn();
        },function(){
            auto();
            $left_more.stop().fadeOut();
        } );
        $tabLi.hover( function(){
            $(this).addClass('on');
        },function(){
            $(this).removeClass('on');
        }).click( function(){
            index = $(this).index();
            move();
        } );
        auto();
        function auto() {
            timer = setInterval( function(){
                index++;
                index %= $tabLi.length;
                move();
            },5000);
        }
        function move() {
            $tabLi.eq(index).addClass('on_tab').siblings().removeClass('on_tab');
            $imgUl.stop().animate( {marginLeft:-440*index+'px'},200);
        }
    }) ();

    //right
    ( function() {
        init();
        var $banner_right = $('.banner_right');
        var $r_ul = $('.banner_right .r_ul');
        var $r_li = $('.banner_right .r_ul .r_li');
        var $tab_wrap = $('.banner_right .tab_wrap');
        var $tabA = $('.banner_right .tab_wrap .tab_a');
        var spanArr = ['一周','昨日','三日'];
        var index = 0;
        $r_ul.eq(0).show();
        $banner_right.hover( function(){
            $tabA.show();
        },function(){
            $tabA.hide();
        } );
        $r_li.hover( function(){
            $(this).find('.up').fadeIn(500);
            $(this).find('.plays').fadeIn(500);
        },function(){
            $(this).find('.up').fadeOut();
            $(this).find('.plays').fadeOut();
        } );
        $tabA.click( function(){
            var onoff = $(this).index();
            if(onoff) {
                index++;
                index %= $r_ul.length;
            }else{
                index--;
                if(index<0){index=$r_ul.length-1;}
            }
            $tab_wrap.find('.r_span').text(spanArr[index]);
            var x = index+1;
            x %= $r_ul.length;
            $tab_wrap.find('.l_span').text(spanArr[x]);
            $r_ul.eq(index).show().siblings().hide();
            return false;
        } );
        function init() {
            var $ul_wrap = $('.banner_right .ul_wrap');
            var hideData = data.hide_Data;
            var hideAData = data.hide_A_Data;
            for(var i=0;i<hideData.length;i++) {
                var $ul = $('<ul class="r_ul ul'+(i+1)+'"></ul>');
                for(var j=0;j<hideData[i].length;j++) {
                    var $li = $('<li class="r_li"></li>');
                    var title='',up='',plays='';
                    title = hideData[i][j].title;
                    if(title){
                        title = '【' +title + '】';
                    }
                    title += hideData[i][j].text;
                    up = 'up主：' + hideData[i][j].up;
                    plays = '播放：' + hideData[i][j].plays;
                    $li.html(  '<img src="images/bodyer/banner/right/'+(i+1)+'/'+(j+1)+'.jpg" alt="">'+
                                '<a href="'+hideAData[i][j]+'" class="hide" target="_blank">'+
                                    '<p class="title">' +title+ '</p>'+
                                    '<p class="up">' +up+ '</p>'+
                                    '<p class="plays">' +plays+ '</p>'+
                                '</a>'+
                                '<a href="" class="later" title="稍后再看" target="_blank"><img src="images/bodyer/banner/right/0.png" alt=""></a>'
                    );
                    $ul.append($li);
                }
                $ul_wrap.append($ul);
            }
        }
    } ) ();
// banner end


// 弹幕
    function barrage(obj) {
        var bar = obj.find('.barrage_wrap .barrage');
        model(bar);
    }
    function model(oBar) {
        var timer;
        var index = -1;
        timer = setInterval( function() {
            var ex2 = index-1;
            index++;
            var span_w = oBar.eq(index).width();
            var ex1 = index-1;
            var c2_w = oBar.eq(ex2).width() + oBar.eq(ex2).position().left;
            var c1_w = oBar.eq(ex1).width() + oBar.eq(ex1).position().left;
            if(index==0) {
                oBar.eq(index).css( 'top' , '0' );//规定在第一行
                animate();
            }
            else if(index==1) {
                oBar.eq(index).css( 'top' , '20px' );//规定在第二行
                animate();
            }
            else if(index>1) {

                if(c2_w<160) {//当前弹幕的前面的前面的某条弹幕完全出现的时候
                    oBar.eq(index).css( 'top' , oBar.eq(ex2).css('top') );
                    animate();
                }
                else if(c1_w<160) {//当前弹幕的前面某条弹幕完全出现的时候
                    oBar.eq(index).css( 'top' , oBar.eq(ex2).css('top') );
                    animate();
                }
                else{
                    index--;//下一轮定时器会自动加1，直到c2_w<160或者(c1_w<160成立后才执行上面的条件
                }
            }
            function animate() {
                var time = 8000;
                if(span_w>60&&span_w<=80) {time=7000;}//当某条弹幕的长度大于80，运动速度变快
                else if(span_w>80&&span_w<=100) {time=6000;}
                else if(span_w>100&&span_w<=120) {time=5000;}
                else if(span_w>120) {time=4500;}
                if(index>=oBar.length) {clearInterval(timer);}
                oBar.eq(index).animate( {
                    left:'-300px'
                },time );
            }
        },1000);
    }

// expand start
    // bot
    ( function() {
        var $b_li = $('.expand_bot .b_left .l_ul .l_li');
        var hideData = data.expand_Data;
        var timer;
        $b_li.hover( function(){
            $(this).find('.later').show();
            $(this).find('.time').show();
            $(this).find('.progress_bar').delay(300).fadeIn();
            $(this).find('.text').addClass('color');
            $(this).find('.barrage_wrap').show();
            barrage($(this));
        },function(){
            $(this).find('.later').hide();
            $(this).find('.time').hide();
            $(this).find('.progress_bar').hide();
            $(this).find('.text').removeClass('color');
            $(this).find('.barrage_wrap').hide();
            clearInterval(timer);//正在运动的继续运动直到结束，剩下没有开始运动的停止运动
            $(this).find('.barrage').stop().css( {'left':'165px'} );//所有的弹幕对象都回归初始状态
            //stop()让正在运动的弹幕对象立即停止运动，马上回到left:165px的状态
        } );
    } ) ();
// expand end

// live start
    ( function() {
        // left
        ( function() {
            init();
            var $act = $('.b_live_wrap .l_left .l_top div.t_act>a');
            var $live_li = $('.b_live_wrap .l_left .l_bot .bot_ul .bot_li');
            $act.click( function(){
                $(this).css('display','none');
                return false;
            } );
            $live_li.hover( function(){
                $(this).find('.hover').fadeIn();
                $(this).find('.show').fadeOut();
                $(this).find('.des').hide();
                $(this).find('.title').addClass('color');
                $(this).find('.out').stop().animate( {'bottom':'-25px'},300 );
                $(this).find('.progress_bar').delay(300).fadeIn();
                $(this).find('.barrage_wrap').show();
                barrage($(this));
            },function(){
                $(this).find('.hover').fadeOut();
                $(this).find('.show').fadeIn();
                $(this).find('.des').show();
                $(this).find('.title').removeClass('color');
                $(this).find('.out').stop().animate( {'bottom':'5px'},300 );
                $(this).find('.progress_bar').hide();
                $(this).find('.barrage_wrap').hide();
                clearInterval(timer);//正在运动的继续运动直到结束，剩下没有开始运动的停止运动
                $(this).find('.barrage').stop().css( {'left':'165px'} );//所有的弹幕对象都回归初始状态
                //stop()让正在运动的弹幕对象立即停止运动，马上回到left:165px的状态
            } );
            function init() {
                var $live_ul = $('.b_live_wrap .l_left .l_bot .bot_ul');
                var liveData = data.live_Data;
                for(var i=0;i<liveData.href.length;i++) {
                    var mil = liveData.num[i]/10000;//此处字符串类型转化为数字类型,并同时进行了触除法
                    if(mil>=1) {
                        liveData.num[i] = mil.toFixed(1) + '万';
                    }
                    var $li = $('<li class="bot_li"></li>');
                    $li.append('<a href="' +liveData.href[i]+ '" class="bot_a" target="_blank">'+
                                    '<div class="img_div">'+
                                        '<img class="img hover" src="images/bodyer/live/hover/' +(i+1)+ '.jpg" alt="" width="160" height="100">'+
                                        '<img class="img show" src="images/bodyer/live/show/' +(i+1)+ '.jpg" alt="" width="160" height="100">'+
                                        '<div class="des">'+
                                            '<p class="d_left name">' +liveData.name[i]+ '</p>'+
                                            '<p class="d_right"><i></i><span class="num">' +liveData.num[i]+ '</span></p>'+
                                        '</div>'+
                                        '<div class="progress_bar">'+
                                            '<p><span></span></p>'+
                                        '</div>'+
                                    '</div>'+
                                    '<div class="title">' +liveData.title[i]+ '</div>'+
                                    '<div class="out">' +liveData.out[i]+ '</div>'+
                                    '<div class="barrage_wrap">'+
                                        '<span class="barrage">不错不错~~~思密达</span>'+
                                        '<span class="barrage bar2">经费在燃烧燃烧</span>'+
                                        '<span class="barrage">我要把硬币投</span>'+
                                        '<span class="barrage bar2">233333333</span>'+
                                        '<span class="barrage">陶大宇</span>'+
                                        '<span class="barrage bar2">常山赵子龙长得帅</span>'+
                                        '<span class="barrage">on may way没媳妇儿</span>'+
                                        '<span class="barrage bar2">尼古拉斯没有工</span>'+
                                        '<span class="barrage">‭精彩精彩~~~</span>'+
                                        '<span class="barrage bar2">逗张花那个栏目的ch</span>'+
                                        '<span class="barrage">老实的牛不老实</span>'+
                                        '<span class="barrage bar2">开哥帅过吴彦祖</span>'+
                                        '<span class="barrage">上门开锁老板跑路了</span>'+
                                        '<span class="barrage bar2">老牛这个月没</span>'+
                                        '<span class="barrage">脑残粉没有女朋友</span>'+
                                    '</div>'+
                               '</a>'
                    );
                    $live_ul.append($li);
                }
            }
        } ) ();

        //right
        ( function() {
            var $top_li = $('.b_live_wrap>.l_right>.r_top>.t_ul>.t_li');
            var $bot_wrap = $('.b_live_wrap>.l_right>.r_bot>.bot_wrap');
            var $ul_wrap = $('.b_live_wrap>.l_right>.r_bot>.bot_wrap>.b_ul3>.b_li>.ul_wrap');
            var $tab_li = $('.b_live_wrap>.l_right>.r_bot>.bot_wrap>.b_ul3>.b_li>.tab_wrap>.tab_ul>.tab_li');
            var index = 0;
            var timer;
            $top_li.eq(index).addClass('on').siblings().removeClass('on');
            $top_li.click( function() {
                index = $(this).index();
                $(this).addClass('on').siblings().removeClass('on');
                $bot_wrap.stop().animate( {left:-index*260 + 'px'},500);
                return false;
            } );
            init();
            function init() {
                var lrData = data.live_Ri_Data;
                var $bot_ul = $('.b_live_wrap>.l_right>.r_bot>.bot_wrap>.b_ul1');
                for (var i=0;i<6;i++) {
                    $bot_ul.append('<li class="b_li li' +(i+1)+ '">'+
                                        '<div class="order">' +(i+1)+ '</div>'+
                                        '<a href="' +lrData[i].img_a+ '" class="img" target="_blank"><img src="images/bodyer/live/right/' +(i+1)+ '.jpg" alt="" width="40" height="40"></a>'+
                                        '<a href="' +lrData[i].inf_a+ '" class="inf" target="_blank">'+
                                            '<div class="up">'+
                                                '<div class="title">' +lrData[i].title+ '</div>'+
                                                '<div class="num">' +lrData[i].num+ '</div>'+
                                                '<i></i>'+
                                            '</div>'+
                                            '<p class="det">' +lrData[i].det+ '</p>'+
                                        '</a>'+
                                    '</li>'
                    );
                }
            }

            $tab_li.hover( function(){
                clearInterval(timer);
                index = $(this).index();
                run();
            },function(){
                auto();
            } );
            auto();
            function auto() {
                timer = setInterval( function(){
                    index++;
                    if(index==3){index=0}
                    run();
                },5000);
            }
            function run() {
                $tab_li.eq(index).addClass('on').siblings().removeClass('on');
                $ul_wrap.stop().animate( {left:-index*260 + 'px'},500 );
            }
        } ) ();
    } ) ();
// live end

// animate start
    ( function() {
        // left
        ( function() {
            init();
            var $act = $('.b_animate_wrap .l_left .l_top div.t_act>a');
            var $live_li = $('.b_animate_wrap .l_left .l_bot .bot_ul .bot_li');
            $act.click( function(){
                $(this).css('display','none');
                return false;
            } );
            $live_li.hover( function(){
                $(this).find('.hover').fadeIn();
                $(this).find('.show').fadeOut();
                $(this).find('.des').hide();
                $(this).find('.title').addClass('color');
                $(this).find('.out').stop().animate( {'bottom':'-25px'},300 );
                $(this).find('.barrage_wrap').show();
                barrage($(this));
            },function(){
                $(this).find('.hover').fadeOut();
                $(this).find('.show').fadeIn();
                $(this).find('.des').show();
                $(this).find('.title').removeClass('color');
                $(this).find('.out').stop().animate( {'bottom':'5px'},300 );
                $(this).find('.barrage_wrap').hide();
                clearInterval(timer);//正在运动的继续运动直到结束，剩下没有开始运动的停止运动
                $(this).find('.barrage').stop().css( {'left':'165px'} );//所有的弹幕对象都回归初始状态
                //stop()让正在运动的弹幕对象立即停止运动，马上回到left:165px的状态
            } );
            function init() {
                var $live_ul = $('.b_animate_wrap .l_left .l_bot .bot_ul');
                var liveData = data.live_Data;
                for(var i=0;i<liveData.num.length;i++) {
                    var mil = liveData.num[i]/10000;//此处字符串类型转化为数字类型,并同时进行了触除法
                    if(mil>=1) {
                        liveData.num[i] = mil.toFixed(1) + '万';
                    }
                    var $li = $('<li class="bot_li"></li>');
                    $li.append('<a href="' +liveData.href[i]+ '" class="bot_a" target="_blank">'+
                                    '<div class="img_div">'+
                                        '<img class="img hover" src="images/bodyer/animate/hover/' +(i+1)+ '.jpg" alt="" width="160px" height="100">'+
                                        '<img class="img show" src="images/bodyer/animate/show/' +(i+1)+ '.jpg" alt="" width="160px" height="100">'+
                                        '<div class="des">'+
                                            '<p class="d_left name">' +liveData.name[i]+ '</p>'+
                                            '<p class="d_right"><i></i><span class="num">' +liveData.num[i]+ '</span></p>'+
                                        '</div>'+
                                    '</div>'+
                                    '<div class="title">' +liveData.title[i]+ '</div>'+
                                    '<div class="out">' +liveData.out[i]+ '</div>'+
                                    '<div class="barrage_wrap">'+
                                        '<span class="barrage">不错不错~~~思密达</span>'+
                                        '<span class="barrage bar2">经费在燃烧燃烧</span>'+
                                        '<span class="barrage">我要把硬币投</span>'+
                                        '<span class="barrage bar2">233333333</span>'+
                                        '<span class="barrage">陶大宇</span>'+
                                        '<span class="barrage bar2">常山赵子龙长得帅</span>'+
                                        '<span class="barrage">on may way没媳妇儿</span>'+
                                        '<span class="barrage bar2">尼古拉斯没有工</span>'+
                                        '<span class="barrage">‭精彩精彩~~~</span>'+
                                        '<span class="barrage bar2">逗张花那个栏目的ch</span>'+
                                        '<span class="barrage">老实的牛不老实</span>'+
                                        '<span class="barrage bar2">开哥帅过吴彦祖</span>'+
                                        '<span class="barrage">上门开锁老板跑路了</span>'+
                                        '<span class="barrage bar2">老牛这个月没</span>'+
                                        '<span class="barrage">脑残粉没有女朋友</span>'+
                                    '</div>'+
                               '</a>'
                    );
                    $live_ul.append($li);
                }
            }
        } ) ();

        //right
        ( function() {
            var $top_li = $('.b_animate_wrap>.l_right>.r_top>.t_ul>.t_li');
            var $bot_wrap = $('.b_animate_wrap>.l_right>.r_bot>.bot_wrap');
            var $ul_wrap = $('.b_animate_wrap>.l_right>.r_bot>.bot_wrap>.b_ul3>.b_li>.ul_wrap');
            var $tab_li = $('.b_animate_wrap>.l_right>.r_bot>.bot_wrap>.b_ul3>.b_li>.tab_wrap>.tab_ul>.tab_li');
            var index = 0;
            var timer;
            $top_li.eq(index).addClass('on').siblings().removeClass('on');
            $top_li.click( function() {
                index = $(this).index();
                $(this).addClass('on').siblings().removeClass('on');
                $bot_wrap.stop().animate( {'left':-index*260 + 'px'},500);
                return false;
            } );
            init();
            function init() {
                var lrData = data.live_Ri_Data;
                var $bot_ul = $('.b_animate_wrap>.l_right>.r_bot>.bot_wrap>.b_ul1');
                for (var i=0;i<6;i++) {
                    $bot_ul.append('<li class="b_li li' +(i+1)+ '">'+
                                        '<div class="order">' +(i+1)+ '</div>'+
                                        '<a href="' +lrData[i].img_a+ '" class="img" target="_blank"><img src="images/bodyer/animate/right/' +(i+1)+ '.jpg" alt="" width="40" height="40"></a>'+
                                        '<a href="' +lrData[i].inf_a+ '" class="inf" target="_blank">'+
                                            '<div class="up">'+
                                                '<div class="title">' +lrData[i].title+ '</div>'+
                                                '<div class="num">' +lrData[i].num+ '</div>'+
                                                '<i></i>'+
                                            '</div>'+
                                            '<p class="det">' +lrData[i].det+ '</p>'+
                                        '</a>'+
                                    '</li>'
                    );
                }
            }

            $tab_li.hover( function(){
                clearInterval(timer);
                index = $(this).index();
                run();
            },function(){
                auto();
            } );
            auto();
            function auto() {
                timer = setInterval( function(){
                    index++;
                    if(index==3){index=0}
                    run();
                },5000);
            }
            function run() {
                $tab_li.eq(index).addClass('on').siblings().removeClass('on');
                $ul_wrap.stop().animate( {left:-index*260 + 'px'},500 );
            }
        } ) ();
    } ) ();
// animate end

// bangumi start
    ( function() {
        // left
        ( function() {
            init();
            var $top_li = $('.b_bangumi_wrap>.l_left>.l_top>.week>li');
            var $bot_ul = $('.b_bangumi_wrap>.l_left>.l_bot .ul_wrap .bot_ul');

            var index;
            $top_li.eq(0).find('.show').hide();
            $top_li.eq(0).find('.click').show();
            $bot_ul.eq(0).show();
            $top_li.click( function(){
                index = $(this).index();
                $(this).find('.show').hide().parent().siblings().find('.show').show();
                $(this).find('.click').show().parent().siblings().find('.click').hide();
                $bot_ul.eq(index).show().siblings().hide();
            } );

            function init() {
                var $ul_wrap = $('.b_bangumi_wrap>.l_left>.l_bot .ul_wrap');
                var bangumiLData = data.bangumiL_Data;
                for(var i=0;i<bangumiLData.length;i++) {
                    var $ul = $('<ul class="bot_ul ul'+(i+1)+'"></ul>');
                    for(j=0;j<bangumiLData[i].length;j++) {
                        var $li = $('<li class="bot_li">'+
                                        '<a href="' +bangumiLData[i][j].href1+ '" class="img" target="_blank">'+
                                            '<img src="images/bodyer/bangumi/' +i+ '/'+(j+1)+'.jpg" alt="" width="74px" height="74px">'+
                                        '</a>'+
                                        '<div class="con">'+
                                            '<a href="' +bangumiLData[i][j].href1+ '"  class="name" target="_blank">' +bangumiLData[i][j].name+ '</a>'+
                                            '<div class="tip"><span class="new">更新至</span><a href="' +bangumiLData[i][j].href2+ '" class="num" target="_blank">' +bangumiLData[i][j].num+ '</a></div>'+
                                        '</div>'+
                                    '</li>'
                        );
                        $ul.append($li);
                    }
                    $ul_wrap.append($ul);
                }//for循环结束
            }//init()函数结束
        } ) ();

        //right
        ( function() {
            var $top_li = $('.b_bangumi_wrap>.l_right>.r_top>.t_ul>.t_li');
            var $bot_wrap = $('.b_bangumi_wrap>.l_right>.r_bot>.bot_wrap');
            var $ul_wrap = $('.b_bangumi_wrap>.l_right>.r_bot>.bot_wrap>.b_ul3>.b_li>.ul_wrap');
            var $tab_li = $('.b_bangumi_wrap>.l_right>.r_bot>.bot_wrap>.b_ul3>.b_li>.tab_wrap>.tab_ul>.tab_li');
            var index = 0;
            var timer;
            $top_li.eq(index).addClass('on').siblings().removeClass('on');
            $top_li.click( function() {
                index = $(this).index();
                $(this).addClass('on').siblings().removeClass('on');
                $bot_wrap.stop().animate( {'left':-index*260 + 'px'},500);

                return false;
            } );
            init();
            function init() {
                var lrData = data.live_Ri_Data;
                var $bot_ul = $('.b_bangumi_wrap>.l_right>.r_bot>.bot_wrap>.b_ul1');
                for (var i=0;i<8;i++) {
                    $bot_ul.append('<li class="b_li li' +(i+1)+ '">'+
                                        '<div class="order">' +(i+1)+ '</div>'+
                                        '<a href="' +lrData[i].img_a+ '" class="img" target="_blank"><img src="images/bodyer/bangumi/right/' +(i+1)+ '.jpg" alt="" width="40" height="40"></a>'+
                                        '<a href="' +lrData[i].inf_a+ '" class="inf" target="_blank">'+
                                            '<div class="up">'+
                                                '<div class="title">' +lrData[i].title+ '</div>'+
                                                '<div class="num">' +lrData[i].num+ '</div>'+
                                                '<i></i>'+
                                            '</div>'+
                                            '<p class="det">' +lrData[i].det+ '</p>'+
                                        '</a>'+
                                    '</li>'
                    );
                }
            }

            $tab_li.hover( function(){
                clearInterval(timer);
                index = $(this).index();
                run();
            },function(){
                auto();
            } );
            auto();
            function auto() {
                timer = setInterval( function(){
                    index++;
                    if(index==3){index=0}
                    run();
                },5000);
            }
            function run() {
                $tab_li.eq(index).addClass('on').siblings().removeClass('on');
                $ul_wrap.stop().animate( {left:-index*260 + 'px'},500 );
            }
        } ) ();
    } ) ();
// bangumi end

// china start
    ( function() {
        // left
        ( function() {
            init();
            var $act = $('.b_china_wrap .l_left .l_top div.t_act>a');
            var $live_li = $('.b_china_wrap .l_left .l_bot .bot_ul .bot_li');
            $act.click( function(){
                $(this).css('display','none');
                return false;
            } );
            $live_li.hover( function(){
                $(this).find('.hover').fadeIn();
                $(this).find('.show').fadeOut();
                $(this).find('.des').hide();
                $(this).find('.title').addClass('color');
                $(this).find('.out').stop().animate( {'bottom':'-25px'},300 );
                $(this).find('.progress_bar').delay(300).fadeIn();
            },function(){
                $(this).find('.hover').fadeOut();
                $(this).find('.show').fadeIn();
                $(this).find('.des').show();
                $(this).find('.title').removeClass('color');
                $(this).find('.out').stop().animate( {'bottom':'5px'},300 );
                $(this).find('.progress_bar').delay(300).hide();
            } );
            function init() {
                var $live_ul = $('.b_china_wrap .l_left .l_bot .bot_ul');
                var liveData = data.live_Data;
                for(var i=0;i<liveData.href.length;i++) {
                    var mil = liveData.num[i]/10000;//此处字符串类型转化为数字类型,并同时进行了触除法
                    if(mil>=1) {
                        liveData.num[i] = mil.toFixed(1) + '万';
                    }
                    var $li = $('<li class="bot_li"></li>');
                    $li.append('<a href="' +liveData.href[i]+ '" class="bot_a" target="_blank">'+
                                    '<div class="img_div">'+
                                        '<img class="img hover" src="images/bodyer/china/hover/' +(i+1)+ '.jpg" alt="" width="160px" height="100">'+
                                        '<img class="img show" src="images/bodyer/china/show/' +(i+1)+ '.jpg" alt="" width="160px" height="100">'+
                                        '<div class="des">'+
                                            '<p class="d_left name">' +liveData.name[i]+ '</p>'+
                                            '<p class="d_right"><i></i><span class="num">' +liveData.num[i]+ '</span></p>'+
                                        '</div>'+
                                        '<div class="progress_bar">'+
                                            '<p><span></span></p>'+
                                        '</div>'+
                                    '</div>'+
                                    '<div class="title">' +liveData.title[i]+ '</div>'+
                                    '<div class="out">' +liveData.out[i]+ '</div>'+

                               '</a>'
                    );
                    $live_ul.append($li);
                }
            }
        } ) ();

        //right
        ( function() {
            var $top_li = $('.b_china_wrap>.l_right>.r_top>.t_ul>.t_li');
            var $bot_wrap = $('.b_china_wrap>.l_right>.r_bot>.bot_wrap');
            var $ul_wrap = $('.b_china_wrap>.l_right>.r_bot>.bot_wrap>.b_ul3>.b_li>.ul_wrap');
            var $tab_li = $('.b_china_wrap>.l_right>.r_bot>.bot_wrap>.b_ul3>.b_li>.tab_wrap>.tab_ul>.tab_li');
            var index = 0;
            var timer;
            $top_li.eq(index).addClass('on').siblings().removeClass('on');
            $top_li.click( function() {
                index = $(this).index();
                $(this).addClass('on').siblings().removeClass('on');
                $bot_wrap.stop().animate( {'left':-index*260 + 'px'},500);
                return false;
            } );
            init();
            function init() {
                var lrData = data.live_Ri_Data;
                var $bot_ul = $('.b_china_wrap>.l_right>.r_bot>.bot_wrap>.b_ul1');
                for (var i=0;i<6;i++) {
                    $bot_ul.append('<li class="b_li li' +(i+1)+ '">'+
                                        '<div class="order">' +(i+1)+ '</div>'+
                                        '<a href="' +lrData[i].img_a+ '" class="img" target="_blank"><img src="images/bodyer/china/right/' +(i+1)+ '.jpg" alt="" width="40" height="40"></a>'+
                                        '<a href="' +lrData[i].inf_a+ '" class="inf" target="_blank">'+
                                            '<div class="up">'+
                                                '<div class="title">' +lrData[i].title+ '</div>'+
                                                '<div class="num">' +lrData[i].num+ '</div>'+
                                                '<i></i>'+
                                            '</div>'+
                                            '<p class="det">' +lrData[i].det+ '</p>'+
                                        '</a>'+
                                    '</li>'
                    );
                }
            }

            $tab_li.hover( function(){
                clearInterval(timer);
                index = $(this).index();
                run();
            },function(){
                auto();
            } );
            auto();
            function auto() {
                timer = setInterval( function(){
                    index++;
                    if(index==3){index=0}
                    run();
                },5000);
            }
            function run() {
                $tab_li.eq(index).addClass('on').siblings().removeClass('on');
                $ul_wrap.stop().animate( {left:-index*260 + 'px'},500 );
            }
        } ) ();
    } ) ();
// china end

// music start
    ( function() {
        // left
        ( function() {
            init();
            var $act = $('.b_music_wrap .l_left .l_top div.t_act>a');
            var $live_li = $('.b_music_wrap .l_left .l_bot .bot_ul .bot_li');
            $act.click( function(){
                $(this).css('display','none');
                return false;
            } );
            $live_li.hover( function(){
                $(this).find('.hover').fadeIn();
                $(this).find('.show').fadeOut();
                $(this).find('.des').hide();
                $(this).find('.title').addClass('color');
                $(this).find('.out').stop().animate( {'bottom':'-25px'},300 );
                $(this).find('.barrage_wrap').show();
                barrage($(this));
            },function(){
                $(this).find('.hover').fadeOut();
                $(this).find('.show').fadeIn();
                $(this).find('.des').show();
                $(this).find('.title').removeClass('color');
                $(this).find('.out').stop().animate( {'bottom':'5px'},300 );
                $(this).find('.barrage_wrap').hide();
                clearInterval(timer);//正在运动的继续运动直到结束，剩下没有开始运动的停止运动
                $(this).find('.barrage').stop().css( {'left':'165px'} );//所有的弹幕对象都回归初始状态
                //stop()让正在运动的弹幕对象立即停止运动，马上回到left:165px的状态
            } );
            function init() {
                var $live_ul = $('.b_music_wrap .l_left .l_bot .bot_ul');
                var liveData = data.live_Data;
                for(var i=0;i<liveData.href.length;i++) {
                    var mil = liveData.num[i]/10000;//此处字符串类型转化为数字类型,并同时进行了触除法
                    if(mil>=1) {
                        liveData.num[i] = mil.toFixed(1) + '万';
                    }
                    var $li = $('<li class="bot_li"></li>');
                    $li.append('<a href="' +liveData.href[i]+ '" class="bot_a" target="_blank">'+
                                    '<div class="img_div">'+
                                        '<img class="img hover" src="images/bodyer/music/hover/' +(i+1)+ '.jpg" alt="" width="160px" height="100">'+
                                        '<img class="img show" src="images/bodyer/music/show/' +(i+1)+ '.jpg" alt="" width="160px" height="100">'+
                                        '<div class="des">'+
                                            '<p class="d_left name">' +liveData.name[i]+ '</p>'+
                                            '<p class="d_right"><i></i><span class="num">' +liveData.num[i]+ '</span></p>'+
                                        '</div>'+
                                    '</div>'+
                                    '<div class="title">' +liveData.title[i]+ '</div>'+
                                    '<div class="out">' +liveData.out[i]+ '</div>'+
                                    '<div class="barrage_wrap">'+
                                        '<span class="barrage">不错不错~~~思密达</span>'+
                                        '<span class="barrage bar2">经费在燃烧燃烧</span>'+
                                        '<span class="barrage">我要把硬币投</span>'+
                                        '<span class="barrage bar2">233333333</span>'+
                                        '<span class="barrage">陶大宇</span>'+
                                        '<span class="barrage bar2">常山赵子龙长得帅</span>'+
                                        '<span class="barrage">on may way没媳妇儿</span>'+
                                        '<span class="barrage bar2">尼古拉斯没有工</span>'+
                                        '<span class="barrage">‭精彩精彩~~~</span>'+
                                        '<span class="barrage bar2">逗张花那个栏目的ch</span>'+
                                        '<span class="barrage">老实的牛不老实</span>'+
                                        '<span class="barrage bar2">开哥帅过吴彦祖</span>'+
                                        '<span class="barrage">上门开锁老板跑路了</span>'+
                                        '<span class="barrage bar2">老牛这个月没</span>'+
                                        '<span class="barrage">脑残粉没有女朋友</span>'+
                                    '</div>'+
                               '</a>'
                    );
                    $live_ul.append($li);
                }
            }
        } ) ();

        //right
        ( function() {
            var $top_li = $('.b_music_wrap>.l_right>.r_top>.t_ul>.t_li');
            var $bot_wrap = $('.b_music_wrap>.l_right>.r_bot>.bot_wrap');
            var $ul_wrap = $('.b_music_wrap>.l_right>.r_bot>.bot_wrap>.b_ul3>.b_li>.ul_wrap');
            var $tab_li = $('.b_music_wrap>.l_right>.r_bot>.bot_wrap>.b_ul3>.b_li>.tab_wrap>.tab_ul>.tab_li');
            var index = 0;
            var timer;
            $top_li.eq(index).addClass('on').siblings().removeClass('on');
            $top_li.click( function() {
                index = $(this).index();
                $(this).addClass('on').siblings().removeClass('on');
                $bot_wrap.stop().animate( {'left':-index*260 + 'px'},500);

                return false;
            } );
            init();
            function init() {
                var lrData = data.live_Ri_Data;
                var $bot_ul = $('.b_music_wrap>.l_right>.r_bot>.bot_wrap>.b_ul1');
                for (var i=0;i<6;i++) {
                    if(i>=3) {}
                    $bot_ul.append('<li class="b_li li' +(i+1)+ '">'+
                                        '<div class="order">' +(i+1)+ '</div>'+
                                        '<a href="' +lrData[i].img_a+ '" class="img" target="_blank"><img src="images/bodyer/music/right/' +(i+1)+ '.jpg" alt="" width="40" height="40"></a>'+
                                        '<a href="' +lrData[i].inf_a+ '" class="inf" target="_blank">'+
                                            '<div class="up">'+
                                                '<div class="title">' +lrData[i].title+ '</div>'+
                                                '<div class="num">' +lrData[i].num+ '</div>'+
                                                '<i></i>'+
                                            '</div>'+
                                            '<p class="det">' +lrData[i].det+ '</p>'+
                                        '</a>'+
                                    '</li>'
                    );
                }
            }

            $tab_li.hover( function(){
                clearInterval(timer);
                index = $(this).index();
                run();
            },function(){
                auto();
            } );
            auto();
            function auto() {
                timer = setInterval( function(){
                    index++;
                    if(index==3){index=0}
                    run();
                },5000);
            }
            function run() {
                $tab_li.eq(index).addClass('on').siblings().removeClass('on');
                $ul_wrap.stop().animate( {left:-index*260 + 'px'},500 );
            }
        } ) ();
    } ) ();
// music end

// dance start
    ( function() {
        // left
        ( function() {
            init();
            var $act = $('.b_dance_wrap .l_left .l_top div.t_act>a');
            var $live_li = $('.b_dance_wrap .l_left .l_bot .bot_ul .bot_li');
            $act.click( function(){
                $(this).css('display','none');
                return false;
            } );
            $live_li.hover( function(){
                $(this).find('.hover').fadeIn();
                $(this).find('.show').fadeOut();
                $(this).find('.des').hide();
                $(this).find('.title').addClass('color');
                $(this).find('.out').stop().animate( {'bottom':'-25px'},300 );
                $(this).find('.progress_bar').delay(300).fadeIn();
            },function(){
                $(this).find('.hover').fadeOut();
                $(this).find('.show').fadeIn();
                $(this).find('.des').show();
                $(this).find('.title').removeClass('color');
                $(this).find('.out').stop().animate( {'bottom':'5px'},300 );
                $(this).find('.progress_bar').delay(300).hide();
            } );
            function init() {
                var $live_ul = $('.b_dance_wrap .l_left .l_bot .bot_ul');
                var liveData = data.live_Data;
                for(var i=0;i<liveData.href.length;i++) {
                    var mil = liveData.num[i]/10000;//此处字符串类型转化为数字类型,并同时进行了触除法
                    if(mil>=1) {
                        liveData.num[i] = mil.toFixed(1) + '万';
                    }
                    var $li = $('<li class="bot_li"></li>');
                    $li.append('<a href="' +liveData.href[i]+ '" class="bot_a" target="_blank">'+
                                    '<div class="img_div">'+
                                        '<img class="img hover" src="images/bodyer/dance/hover/' +(i+1)+ '.jpg" alt="" width="160px" height="100">'+
                                        '<img class="img show" src="images/bodyer/dance/show/' +(i+1)+ '.jpg" alt="" width="160px" height="100">'+
                                        '<div class="des">'+
                                            '<p class="d_left name">' +liveData.name[i]+ '</p>'+
                                            '<p class="d_right"><i></i><span class="num">' +liveData.num[i]+ '</span></p>'+
                                        '</div>'+
                                        '<div class="progress_bar">'+
                                            '<p><span></span></p>'+
                                        '</div>'+
                                    '</div>'+
                                    '<div class="title">' +liveData.title[i]+ '</div>'+
                                    '<div class="out">' +liveData.out[i]+ '</div>'+
                               '</a>'
                    );
                    $live_ul.append($li);
                }
            }
        } ) ();

        //right
        ( function() {
            var $top_li = $('.b_dance_wrap>.l_right>.r_top>.t_ul>.t_li');
            var $bot_wrap = $('.b_dance_wrap>.l_right>.r_bot>.bot_wrap');
            var $ul_wrap = $('.b_dance_wrap>.l_right>.r_bot>.bot_wrap>.b_ul3>.b_li>.ul_wrap');
            var $tab_li = $('.b_dance_wrap>.l_right>.r_bot>.bot_wrap>.b_ul3>.b_li>.tab_wrap>.tab_ul>.tab_li');
            var index = 0;
            var timer;
            $top_li.eq(index).addClass('on').siblings().removeClass('on');
            $top_li.click( function() {
                index = $(this).index();
                $(this).addClass('on').siblings().removeClass('on');
                $bot_wrap.stop().animate( {'left':-index*260 + 'px'},500);

                return false;
            } );
            init();
            function init() {
                var lrData = data.live_Ri_Data;
                var $bot_ul = $('.b_dance_wrap>.l_right>.r_bot>.bot_wrap>.b_ul1');
                for (var i=0;i<6;i++) {
                    $bot_ul.append('<li class="b_li li' +(i+1)+ '">'+
                                        '<div class="order">' +(i+1)+ '</div>'+
                                        '<a href="' +lrData[i].img_a+ '" class="img" target="_blank"><img src="images/bodyer/dance/right/' +(i+1)+ '.jpg" alt="" width="40" height="40"></a>'+
                                        '<a href="' +lrData[i].inf_a+ '" class="inf" target="_blank">'+
                                            '<div class="up">'+
                                                '<div class="title">' +lrData[i].title+ '</div>'+
                                                '<div class="num">' +lrData[i].num+ '</div>'+
                                                '<i></i>'+
                                            '</div>'+
                                            '<p class="det">' +lrData[i].det+ '</p>'+
                                        '</a>'+
                                    '</li>'
                    );
                }
            }

            $tab_li.hover( function(){
                clearInterval(timer);
                index = $(this).index();
                run();
            },function(){
                auto();
            } );
            auto();
            function auto() {
                timer = setInterval( function(){
                    index++;
                    if(index==3){index=0}
                    run();
                },5000);
            }
            function run() {
                $tab_li.eq(index).addClass('on').siblings().removeClass('on');
                $ul_wrap.stop().animate( {left:-index*260 + 'px'},500 );
            }
        } ) ();
    } ) ();
// dance end

// game start
    ( function() {
        // left
        ( function() {
            init();
            var $act = $('.b_game_wrap .l_left .l_top div.t_act>a');
            var $live_li = $('.b_game_wrap .l_left .l_bot .bot_ul .bot_li');
            $act.click( function(){
                $(this).css('display','none');
                return false;
            } );
            $live_li.hover( function(){
                $(this).find('.hover').fadeIn();
                $(this).find('.show').fadeOut();
                $(this).find('.des').hide();
                $(this).find('.title').addClass('color');
                $(this).find('.out').stop().animate( {'bottom':'-25px'},300 );
                $(this).find('.barrage_wrap').show();
                barrage($(this));
            },function(){
                $(this).find('.hover').fadeOut();
                $(this).find('.show').fadeIn();
                $(this).find('.des').show();
                $(this).find('.title').removeClass('color');
                $(this).find('.out').stop().animate( {'bottom':'5px'},300 );
                $(this).find('.barrage_wrap').hide();
                clearInterval(timer);//正在运动的继续运动直到结束，剩下没有开始运动的停止运动
                $(this).find('.barrage').stop().css( {'left':'165px'} );//所有的弹幕对象都回归初始状态
                //stop()让正在运动的弹幕对象立即停止运动，马上回到left:165px的状态
            } );
            function init() {
                var $live_ul = $('.b_game_wrap .l_left .l_bot .bot_ul');
                var liveData = data.live_Data;
                for(var i=0;i<liveData.href.length;i++) {
                    var mil = liveData.num[i]/10000;//此处字符串类型转化为数字类型,并同时进行了触除法
                    if(mil>=1) {
                        liveData.num[i] = mil.toFixed(1) + '万';
                    }
                    var $li = $('<li class="bot_li"></li>');
                    $li.append('<a href="' +liveData.href[i]+ '" class="bot_a" target="_blank">'+
                                    '<div class="img_div">'+
                                        '<img class="img hover" src="images/bodyer/game/hover/' +(i+1)+ '.jpg" alt="" width="160px" height="100">'+
                                        '<img class="img show" src="images/bodyer/game/show/' +(i+1)+ '.jpg" alt="" width="160px" height="100">'+
                                        '<div class="des">'+
                                            '<p class="d_left name">' +liveData.name[i]+ '</p>'+
                                            '<p class="d_right"><i></i><span class="num">' +liveData.num[i]+ '</span></p>'+
                                        '</div>'+
                                    '</div>'+
                                    '<div class="title">' +liveData.title[i]+ '</div>'+
                                    '<div class="out">' +liveData.out[i]+ '</div>'+
                                    '<div class="barrage_wrap">'+
                                        '<span class="barrage">不错不错~~~思密达</span>'+
                                        '<span class="barrage bar2">经费在燃烧燃烧</span>'+
                                        '<span class="barrage">我要把硬币投</span>'+
                                        '<span class="barrage bar2">233333333</span>'+
                                        '<span class="barrage">陶大宇</span>'+
                                        '<span class="barrage bar2">常山赵子龙长得帅</span>'+
                                        '<span class="barrage">on may way没媳妇儿</span>'+
                                        '<span class="barrage bar2">尼古拉斯没有工</span>'+
                                        '<span class="barrage">‭精彩精彩~~~</span>'+
                                        '<span class="barrage bar2">逗张花那个栏目的ch</span>'+
                                        '<span class="barrage">老实的牛不老实</span>'+
                                        '<span class="barrage bar2">开哥帅过吴彦祖</span>'+
                                        '<span class="barrage">上门开锁老板跑路了</span>'+
                                        '<span class="barrage bar2">老牛这个月没</span>'+
                                        '<span class="barrage">脑残粉没有女朋友</span>'+
                                    '</div>'+
                               '</a>'
                    );
                    $live_ul.append($li);
                }
            }
        } ) ();

        //right
        ( function() {
            var $top_li = $('.b_game_wrap>.l_right>.r_top>.t_ul>.t_li');
            var $bot_wrap = $('.b_game_wrap>.l_right>.r_bot>.bot_wrap');
            var $ul_wrap = $('.b_game_wrap>.l_right>.r_bot>.bot_wrap>.b_ul3>.b_li>.ul_wrap');
            var $tab_li = $('.b_game_wrap>.l_right>.r_bot>.bot_wrap>.b_ul3>.b_li>.tab_wrap>.tab_ul>.tab_li');
            var index = 0;
            var timer;
            $top_li.eq(index).addClass('on').siblings().removeClass('on');
            $top_li.click( function() {
                index = $(this).index();
                $(this).addClass('on').siblings().removeClass('on');
                $bot_wrap.stop().animate( {'left':-index*260 + 'px'},500);

                return false;
            } );
            init();
            function init() {
                var lrData = data.live_Ri_Data;
                var $bot_ul = $('.b_game_wrap>.l_right>.r_bot>.bot_wrap>.b_ul1');
                for (var i=0;i<6;i++) {
                    $bot_ul.append('<li class="b_li li' +(i+1)+ '">'+
                                        '<div class="order">' +(i+1)+ '</div>'+
                                        '<a href="' +lrData[i].img_a+ '" class="img" target="_blank"><img src="images/bodyer/game/right/' +(i+1)+ '.jpg" alt="" width="40" height="40"></a>'+
                                        '<a href="' +lrData[i].inf_a+ '" class="inf" target="_blank">'+
                                            '<div class="up">'+
                                                '<div class="title">' +lrData[i].title+ '</div>'+
                                                '<div class="num">' +lrData[i].num+ '</div>'+
                                                '<i></i>'+
                                            '</div>'+
                                            '<p class="det">' +lrData[i].det+ '</p>'+
                                        '</a>'+
                                    '</li>'
                    );
                }
            }

            $tab_li.hover( function(){
                clearInterval(timer);
                index = $(this).index();
                run();
            },function(){
                auto();
            } );
            auto();
            function auto() {
                timer = setInterval( function(){
                    index++;
                    if(index==3){index=0}
                    run();
                },5000);
            }
            function run() {
                $tab_li.eq(index).addClass('on').siblings().removeClass('on');
                $ul_wrap.stop().animate( {left:-index*260 + 'px'},500 );
            }
        } ) ();
    } ) ();
// game end

// tec start
    ( function() {
        // left
        ( function() {
            init();
            var $act = $('.b_tec_wrap .l_left .l_top div.t_act>a');
            var $live_li = $('.b_tec_wrap .l_left .l_bot .bot_ul .bot_li');
            $act.click( function(){
                $(this).css('display','none');
                return false;
            } );
            $live_li.hover( function(){
                $(this).find('.hover').fadeIn();
                $(this).find('.show').fadeOut();
                $(this).find('.des').hide();
                $(this).find('.title').addClass('color');
                $(this).find('.out').stop().animate( {'bottom':'-25px'},300 );
                $(this).find('.progress_bar').delay(300).fadeIn();
            },function(){
                $(this).find('.hover').fadeOut();
                $(this).find('.show').fadeIn();
                $(this).find('.des').show();
                $(this).find('.title').removeClass('color');
                $(this).find('.out').stop().animate( {'bottom':'5px'},300 );
                $(this).find('.progress_bar').delay(300).hide();
            } );
            function init() {
                var $live_ul = $('.b_tec_wrap .l_left .l_bot .bot_ul');
                var liveData = data.live_Data;
                for(var i=0;i<liveData.href.length;i++) {
                    var mil = liveData.num[i]/10000;//此处字符串类型转化为数字类型,并同时进行了触除法
                    if(mil>=1) {
                        liveData.num[i] = mil.toFixed(1) + '万';
                    }
                    var $li = $('<li class="bot_li"></li>');
                    $li.append('<a href="' +liveData.href[i]+ '" class="bot_a" target="_blank">'+
                                    '<div class="img_div">'+
                                        '<img class="img hover" src="images/bodyer/tec/hover/' +(i+1)+ '.jpg" alt="" width="160px" height="100">'+
                                        '<img class="img show" src="images/bodyer/tec/show/' +(i+1)+ '.jpg" alt="" width="160px" height="100">'+
                                        '<div class="des">'+
                                            '<p class="d_left name">' +liveData.name[i]+ '</p>'+
                                            '<p class="d_right"><i></i><span class="num">' +liveData.num[i]+ '</span></p>'+
                                        '</div>'+
                                        '<div class="progress_bar">'+
                                            '<p><span></span></p>'+
                                        '</div>'+
                                    '</div>'+
                                    '<div class="title">' +liveData.title[i]+ '</div>'+
                                    '<div class="out">' +liveData.out[i]+ '</div>'+
                               '</a>'
                    );
                    $live_ul.append($li);
                }
            }
        } ) ();

        //right
        ( function() {
            var $top_li = $('.b_tec_wrap>.l_right>.r_top>.t_ul>.t_li');
            var $bot_wrap = $('.b_tec_wrap>.l_right>.r_bot>.bot_wrap');
            var $ul_wrap = $('.b_tec_wrap>.l_right>.r_bot>.bot_wrap>.b_ul3>.b_li>.ul_wrap');
            var $tab_li = $('.b_tec_wrap>.l_right>.r_bot>.bot_wrap>.b_ul3>.b_li>.tab_wrap>.tab_ul>.tab_li');
            var index = 0;
            var timer;
            $top_li.eq(index).addClass('on').siblings().removeClass('on');
            $top_li.click( function() {
                index = $(this).index();
                $(this).addClass('on').siblings().removeClass('on');
                $bot_wrap.stop().animate( {'left':-index*260 + 'px'},500);
                return false;
            } );
            init();
            function init() {
                var lrData = data.live_Ri_Data;
                var $bot_ul = $('.b_tec_wrap>.l_right>.r_bot>.bot_wrap>.b_ul1');
                for (var i=0;i<6;i++) {
                    $bot_ul.append('<li class="b_li li' +(i+1)+ '">'+
                                        '<div class="order">' +(i+1)+ '</div>'+
                                        '<a href="' +lrData[i].img_a+ '" class="img" target="_blank"><img src="images/bodyer/tec/right/' +(i+1)+ '.jpg" alt="" width="40" height="40"></a>'+
                                        '<a href="' +lrData[i].inf_a+ '" class="inf" target="_blank">'+
                                            '<div class="up">'+
                                                '<div class="title">' +lrData[i].title+ '</div>'+
                                                '<div class="num">' +lrData[i].num+ '</div>'+
                                                '<i></i>'+
                                            '</div>'+
                                            '<p class="det">' +lrData[i].det+ '</p>'+
                                        '</a>'+
                                    '</li>'
                    );
                }
            }

            $tab_li.hover( function(){
                clearInterval(timer);
                index = $(this).index();
                run();
            },function(){
                auto();
            } );
            auto();
            function auto() {
                timer = setInterval( function(){
                    index++;
                    if(index==3){index=0}
                    run();
                },5000);
            }
            function run() {
                $tab_li.eq(index).addClass('on').siblings().removeClass('on');
                $ul_wrap.stop().animate( {left:-index*260 + 'px'},500 );
            }
        } ) ();
    } ) ();
// tec end

// life start
    ( function() {
        // left
        ( function() {
            init();
            var $act = $('.b_life_wrap .l_left .l_top div.t_act>a');
            var $live_li = $('.b_life_wrap .l_left .l_bot .bot_ul .bot_li');
            $act.click( function(){
                $(this).css('display','none');
                return false;
            } );
            $live_li.hover( function(){
                $(this).find('.hover').fadeIn();
                $(this).find('.show').fadeOut();
                $(this).find('.des').hide();
                $(this).find('.title').addClass('color');
                $(this).find('.out').stop().animate( {'bottom':'-25px'},300 );
                $(this).find('.barrage_wrap').show();
                barrage($(this));
            },function(){
                $(this).find('.hover').fadeOut();
                $(this).find('.show').fadeIn();
                $(this).find('.des').show();
                $(this).find('.title').removeClass('color');
                $(this).find('.out').stop().animate( {'bottom':'5px'},300 );
                $(this).find('.barrage_wrap').hide();
                clearInterval(timer);//正在运动的继续运动直到结束，剩下没有开始运动的停止运动
                $(this).find('.barrage').stop().css( {'left':'165px'} );//所有的弹幕对象都回归初始状态
                //stop()让正在运动的弹幕对象立即停止运动，马上回到left:165px的状态
            } );
            function init() {
                var $live_ul = $('.b_life_wrap .l_left .l_bot .bot_ul');
                var liveData = data.live_Data;
                for(var i=0;i<liveData.href.length;i++) {
                    var mil = liveData.num[i]/10000;//此处字符串类型转化为数字类型,并同时进行了触除法
                    if(mil>=1) {
                        liveData.num[i] = mil.toFixed(1) + '万';
                    }
                    var $li = $('<li class="bot_li"></li>');
                    $li.append('<a href="' +liveData.href[i]+ '" class="bot_a" target="_blank">'+
                                    '<div class="img_div">'+
                                        '<img class="img hover" src="images/bodyer/life/hover/' +(i+1)+ '.jpg" alt="" width="160px" height="100">'+
                                        '<img class="img show" src="images/bodyer/life/show/' +(i+1)+ '.jpg" alt="" width="160px" height="100">'+
                                        '<div class="des">'+
                                            '<p class="d_left name">' +liveData.name[i]+ '</p>'+
                                            '<p class="d_right"><i></i><span class="num">' +liveData.num[i]+ '</span></p>'+
                                        '</div>'+
                                    '</div>'+
                                    '<div class="title">' +liveData.title[i]+ '</div>'+
                                    '<div class="out">' +liveData.out[i]+ '</div>'+
                                    '<div class="barrage_wrap">'+
                                        '<span class="barrage">不错不错~~~思密达</span>'+
                                        '<span class="barrage bar2">经费在燃烧燃烧</span>'+
                                        '<span class="barrage">我要把硬币投</span>'+
                                        '<span class="barrage bar2">233333333</span>'+
                                        '<span class="barrage">陶大宇</span>'+
                                        '<span class="barrage bar2">常山赵子龙长得帅</span>'+
                                        '<span class="barrage">on may way没媳妇儿</span>'+
                                        '<span class="barrage bar2">尼古拉斯没有工</span>'+
                                        '<span class="barrage">‭精彩精彩~~~</span>'+
                                        '<span class="barrage bar2">逗张花那个栏目的ch</span>'+
                                        '<span class="barrage">老实的牛不老实</span>'+
                                        '<span class="barrage bar2">开哥帅过吴彦祖</span>'+
                                        '<span class="barrage">上门开锁老板跑路了</span>'+
                                        '<span class="barrage bar2">老牛这个月没</span>'+
                                        '<span class="barrage">脑残粉没有女朋友</span>'+
                                    '</div>'+
                               '</a>'
                    );
                    $live_ul.append($li);
                }
            }
        } ) ();

        //right
        ( function() {
            var $top_li = $('.b_life_wrap>.l_right>.r_top>.t_ul>.t_li');
            var $bot_wrap = $('.b_life_wrap>.l_right>.r_bot>.bot_wrap');
            var $ul_wrap = $('.b_life_wrap>.l_right>.r_bot>.bot_wrap>.b_ul3>.b_li>.ul_wrap');
            var $tab_li = $('.b_life_wrap>.l_right>.r_bot>.bot_wrap>.b_ul3>.b_li>.tab_wrap>.tab_ul>.tab_li');
            var index = 0;
            var timer;
            $top_li.eq(index).addClass('on').siblings().removeClass('on');
            $top_li.click( function() {
                index = $(this).index();
                $(this).addClass('on').siblings().removeClass('on');
                $bot_wrap.stop().animate( {'left':-index*260 + 'px'},500);
                return false;
            } );
            init();
            function init() {
                var lrData = data.live_Ri_Data;
                var $bot_ul = $('.b_life_wrap>.l_right>.r_bot>.bot_wrap>.b_ul1');
                for (var i=0;i<6;i++) {
                    if(i>=3) {}
                    $bot_ul.append('<li class="b_li li' +(i+1)+ '">'+
                                        '<div class="order">' +(i+1)+ '</div>'+
                                        '<a href="' +lrData[i].img_a+ '" class="img" target="_blank"><img src="images/bodyer/life/right/' +(i+1)+ '.jpg" alt="" width="40" height="40"></a>'+
                                        '<a href="' +lrData[i].inf_a+ '" class="inf" target="_blank">'+
                                            '<div class="up">'+
                                                '<div class="title">' +lrData[i].title+ '</div>'+
                                                '<div class="num">' +lrData[i].num+ '</div>'+
                                                '<i></i>'+
                                            '</div>'+
                                            '<p class="det">' +lrData[i].det+ '</p>'+
                                        '</a>'+
                                    '</li>'
                    );
                }
            }

            $tab_li.hover( function(){
                clearInterval(timer);
                index = $(this).index();
                run();
            },function(){
                auto();
            } );
            auto();
            function auto() {
                timer = setInterval( function(){
                    index++;
                    if(index==3){index=0}
                    run();
                },5000);
            }
            function run() {
                $tab_li.eq(index).addClass('on').siblings().removeClass('on');
                $ul_wrap.stop().animate( {left:-index*260 + 'px'},500 );
            }
        } ) ();
    } ) ();
// life end

// gost start
    ( function() {
        // left
        ( function() {
            init();
            var $act = $('.b_gost_wrap .l_left .l_top div.t_act>a');
            var $live_li = $('.b_gost_wrap .l_left .l_bot .bot_ul .bot_li');
            $act.click( function(){
                $(this).css('display','none');
                return false;
            } );
            $live_li.hover( function(){
                $(this).find('.hover').fadeIn();
                $(this).find('.show').fadeOut();
                $(this).find('.des').hide();
                $(this).find('.title').addClass('color');
                $(this).find('.out').stop().animate( {'bottom':'-25px'},300 );
                $(this).find('.progress_bar').delay(300).fadeIn();
            },function(){
                $(this).find('.hover').fadeOut();
                $(this).find('.show').fadeIn();
                $(this).find('.des').show();
                $(this).find('.title').removeClass('color');
                $(this).find('.out').stop().animate( {'bottom':'5px'},300 );
                $(this).find('.progress_bar').delay(300).hide();
            } );
            function init() {
                var $live_ul = $('.b_gost_wrap .l_left .l_bot .bot_ul');
                var liveData = data.live_Data;
                for(var i=0;i<liveData.href.length;i++) {
                    var mil = liveData.num[i]/10000;//此处字符串类型转化为数字类型,并同时进行了触除法
                    if(mil>=1) {
                        liveData.num[i] = mil.toFixed(1) + '万';
                    }
                    var $li = $('<li class="bot_li"></li>');
                    $li.append('<a href="' +liveData.href[i]+ '" class="bot_a" target="_blank">'+
                                    '<div class="img_div">'+
                                        '<img class="img hover" src="images/bodyer/gost/hover/' +(i+1)+ '.jpg" alt="" width="160px" height="100">'+
                                        '<img class="img show" src="images/bodyer/gost/show/' +(i+1)+ '.jpg" alt="" width="160px" height="100">'+
                                        '<div class="des">'+
                                            '<p class="d_left name">' +liveData.name[i]+ '</p>'+
                                            '<p class="d_right"><i></i><span class="num">' +liveData.num[i]+ '</span></p>'+
                                        '</div>'+
                                        '<div class="progress_bar">'+
                                            '<p><span></span></p>'+
                                        '</div>'+
                                    '</div>'+
                                    '<div class="title">' +liveData.title[i]+ '</div>'+
                                    '<div class="out">' +liveData.out[i]+ '</div>'+
                               '</a>'
                    );
                    $live_ul.append($li);
                }
            }
        } ) ();

        //right
        ( function() {
            var $top_li = $('.b_gost_wrap>.l_right>.r_top>.t_ul>.t_li');
            var $bot_wrap = $('.b_gost_wrap>.l_right>.r_bot>.bot_wrap');
            var $ul_wrap = $('.b_gost_wrap>.l_right>.r_bot>.bot_wrap>.b_ul3>.b_li>.ul_wrap');
            var $tab_li = $('.b_gost_wrap>.l_right>.r_bot>.bot_wrap>.b_ul3>.b_li>.tab_wrap>.tab_ul>.tab_li');
            var index = 0;
            var timer;
            $top_li.eq(index).addClass('on').siblings().removeClass('on');
            $top_li.click( function() {
                index = $(this).index();
                $(this).addClass('on').siblings().removeClass('on');
                $bot_wrap.stop().animate( {'left':-index*260 + 'px'},500);
                return false;
            } );
            init();
            function init() {
                var lrData = data.live_Ri_Data;
                var $bot_ul = $('.b_gost_wrap>.l_right>.r_bot>.bot_wrap>.b_ul1');
                for (var i=0;i<6;i++) {
                    if(i>=3) {}
                    $bot_ul.append('<li class="b_li li' +(i+1)+ '">'+
                                        '<div class="order">' +(i+1)+ '</div>'+
                                        '<a href="' +lrData[i].img_a+ '" class="img" target="_blank"><img src="images/bodyer/gost/right/' +(i+1)+ '.jpg" alt="" width="40" height="40"></a>'+
                                        '<a href="' +lrData[i].inf_a+ '" class="inf" target="_blank">'+
                                            '<div class="up">'+
                                                '<div class="title">' +lrData[i].title+ '</div>'+
                                                '<div class="num">' +lrData[i].num+ '</div>'+
                                                '<i></i>'+
                                            '</div>'+
                                            '<p class="det">' +lrData[i].det+ '</p>'+
                                        '</a>'+
                                    '</li>'
                    );
                }
            }

            $tab_li.hover( function(){
                clearInterval(timer);
                index = $(this).index();
                run();
            },function(){
                auto();
            } );
            auto();
            function auto() {
                timer = setInterval( function(){
                    index++;
                    if(index==3){index=0}
                    run();
                },5000);
            }
            function run() {
                $tab_li.eq(index).addClass('on').siblings().removeClass('on');
                $ul_wrap.stop().animate( {left:-index*260 + 'px'},500 );
            }
        } ) ();
    } ) ();
// gost end

// fashion start
    ( function() {
        // left
        ( function() {
            init();
            var $act = $('.b_fashion_wrap .l_left .l_top div.t_act>a');
            var $live_li = $('.b_fashion_wrap .l_left .l_bot .bot_ul .bot_li');
            $act.click( function(){
                $(this).css('display','none');
                return false;
            } );
            $live_li.hover( function(){
                $(this).find('.hover').fadeIn();
                $(this).find('.show').fadeOut();
                $(this).find('.des').hide();
                $(this).find('.title').addClass('color');
                $(this).find('.out').stop().animate( {'bottom':'-25px'},300 );
                $(this).find('.barrage_wrap').show();
                barrage($(this));
            },function(){
                $(this).find('.hover').fadeOut();
                $(this).find('.show').fadeIn();
                $(this).find('.des').show();
                $(this).find('.title').removeClass('color');
                $(this).find('.out').stop().animate( {'bottom':'5px'},300 );
                $(this).find('.barrage_wrap').hide();
                clearInterval(timer);//正在运动的继续运动直到结束，剩下没有开始运动的停止运动
                $(this).find('.barrage').stop().css( {'left':'165px'} );//所有的弹幕对象都回归初始状态
                //stop()让正在运动的弹幕对象立即停止运动，马上回到left:165px的状态
            } );
            function init() {
                var $live_ul = $('.b_fashion_wrap .l_left .l_bot .bot_ul');
                var liveData = data.live_Data;
                for(var i=0;i<liveData.href.length;i++) {
                    var mil = liveData.num[i]/10000;//此处字符串类型转化为数字类型,并同时进行了触除法
                    if(mil>=1) {
                        liveData.num[i] = mil.toFixed(1) + '万';
                    }
                    var $li = $('<li class="bot_li"></li>');
                    $li.append('<a href="' +liveData.href[i]+ '" class="bot_a" target="_blank">'+
                                    '<div class="img_div">'+
                                        '<img class="img hover" src="images/bodyer/fashion/hover/' +(i+1)+ '.jpg" alt="" width="160px" height="100">'+
                                        '<img class="img show" src="images/bodyer/fashion/show/' +(i+1)+ '.jpg" alt="" width="160px" height="100">'+
                                        '<div class="des">'+
                                            '<p class="d_left name">' +liveData.name[i]+ '</p>'+
                                            '<p class="d_right"><i></i><span class="num">' +liveData.num[i]+ '</span></p>'+
                                        '</div>'+
                                    '</div>'+
                                    '<div class="title">' +liveData.title[i]+ '</div>'+
                                    '<div class="out">' +liveData.out[i]+ '</div>'+
                                    '<div class="barrage_wrap">'+
                                        '<span class="barrage">不错不错~~~思密达</span>'+
                                        '<span class="barrage bar2">经费在燃烧燃烧</span>'+
                                        '<span class="barrage">我要把硬币投</span>'+
                                        '<span class="barrage bar2">233333333</span>'+
                                        '<span class="barrage">陶大宇</span>'+
                                        '<span class="barrage bar2">常山赵子龙长得帅</span>'+
                                        '<span class="barrage">on may way没媳妇儿</span>'+
                                        '<span class="barrage bar2">尼古拉斯没有工</span>'+
                                        '<span class="barrage">‭精彩精彩~~~</span>'+
                                        '<span class="barrage bar2">逗张花那个栏目的ch</span>'+
                                        '<span class="barrage">老实的牛不老实</span>'+
                                        '<span class="barrage bar2">开哥帅过吴彦祖</span>'+
                                        '<span class="barrage">上门开锁老板跑路了</span>'+
                                        '<span class="barrage bar2">老牛这个月没</span>'+
                                        '<span class="barrage">脑残粉没有女朋友</span>'+
                                    '</div>'+
                               '</a>'
                    );
                    $live_ul.append($li);
                }
            }
        } ) ();

        //right
        ( function() {
            var $top_li = $('.b_fashion_wrap>.l_right>.r_top>.t_ul>.t_li');
            var $bot_wrap = $('.b_fashion_wrap>.l_right>.r_bot>.bot_wrap');
            var $ul_wrap = $('.b_fashion_wrap>.l_right>.r_bot>.bot_wrap>.b_ul3>.b_li>.ul_wrap');
            var $tab_li = $('.b_fashion_wrap>.l_right>.r_bot>.bot_wrap>.b_ul3>.b_li>.tab_wrap>.tab_ul>.tab_li');
            var index = 0;
            var timer;
            $top_li.eq(index).addClass('on').siblings().removeClass('on');
            $top_li.click( function() {
                index = $(this).index();
                $(this).addClass('on').siblings().removeClass('on');
                $bot_wrap.stop().animate( {'left':-index*260 + 'px'},500);
                return false;
            } );
            init();
            function init() {
                var lrData = data.live_Ri_Data;
                var $bot_ul = $('.b_fashion_wrap>.l_right>.r_bot>.bot_wrap>.b_ul1');
                for (var i=0;i<6;i++) {
                    $bot_ul.append('<li class="b_li li' +(i+1)+ '">'+
                                        '<div class="order">' +(i+1)+ '</div>'+
                                        '<a href="' +lrData[i].img_a+ '" class="img" target="_blank"><img src="images/bodyer/fashion/right/' +(i+1)+ '.jpg" alt="" width="40" height="40"></a>'+
                                        '<a href="' +lrData[i].inf_a+ '" class="inf" target="_blank">'+
                                            '<div class="up">'+
                                                '<div class="title">' +lrData[i].title+ '</div>'+
                                                '<div class="num">' +lrData[i].num+ '</div>'+
                                                '<i></i>'+
                                            '</div>'+
                                            '<p class="det">' +lrData[i].det+ '</p>'+
                                        '</a>'+
                                    '</li>'
                    );
                }
            }

            $tab_li.hover( function(){
                clearInterval(timer);
                index = $(this).index();
                run();
            },function(){
                auto();
            } );
            auto();
            function auto() {
                timer = setInterval( function(){
                    index++;
                    if(index==3){index=0}
                    run();
                },5000);
            }
            function run() {
                $tab_li.eq(index).addClass('on').siblings().removeClass('on');
                $ul_wrap.stop().animate( {left:-index*260 + 'px'},500 );
            }
        } ) ();
    } ) ();
// fashion end

// ad start
    ( function() {
        // left
        ( function() {
            init();
            var $act = $('.b_ad_wrap .l_left .l_top div.t_act>a');
            var $live_li = $('.b_ad_wrap .l_left .l_bot .bot_ul .bot_li');
            $act.click( function(){
                $(this).css('display','none');
                return false;
            } );
            $live_li.hover( function(){
                $(this).find('.hover').fadeIn();
                $(this).find('.show').fadeOut();
                $(this).find('.des').hide();
                $(this).find('.title').addClass('color');
                $(this).find('.out').stop().animate( {'bottom':'-25px'},300 );
                $(this).find('.progress_bar').delay(300).fadeIn();
            },function(){
                $(this).find('.hover').fadeOut();
                $(this).find('.show').fadeIn();
                $(this).find('.des').show();
                $(this).find('.title').removeClass('color');
                $(this).find('.out').stop().animate( {'bottom':'5px'},300 );
                $(this).find('.progress_bar').delay(300).hide();
            } );
            function init() {
                var $live_ul = $('.b_ad_wrap .l_left .l_bot .bot_ul');
                var liveData = data.live_Data;
                for(var i=0;i<liveData.href.length;i++) {
                    var mil = liveData.num[i]/10000;//此处字符串类型转化为数字类型,并同时进行了触除法
                    if(mil>=1) {
                        liveData.num[i] = mil.toFixed(1) + '万';
                    }
                    var $li = $('<li class="bot_li"></li>');
                    $li.append('<a href="' +liveData.href[i]+ '" class="bot_a" target="_blank">'+
                                    '<div class="img_div">'+
                                        '<img class="img hover" src="images/bodyer/ad/hover/' +(i+1)+ '.jpg" alt="" width="160px" height="100">'+
                                        '<img class="img show" src="images/bodyer/ad/show/' +(i+1)+ '.jpg" alt="" width="160px" height="100">'+
                                        '<div class="des">'+
                                            '<p class="d_left name">' +liveData.name[i]+ '</p>'+
                                            '<p class="d_right"><i></i><span class="num">' +liveData.num[i]+ '</span></p>'+
                                        '</div>'+
                                        '<div class="progress_bar">'+
                                            '<p><span></span></p>'+
                                        '</div>'+
                                    '</div>'+
                                    '<div class="title">' +liveData.title[i]+ '</div>'+
                                    '<div class="out">' +liveData.out[i]+ '</div>'+
                               '</a>'
                    );
                    $live_ul.append($li);
                }
            }
        } ) ();

        //right
        ( function() {
            var $top_li = $('.b_ad_wrap>.l_right>.r_top>.t_ul>.t_li');
            var $bot_wrap = $('.b_ad_wrap>.l_right>.r_bot>.bot_wrap');
            var $ul_wrap = $('.b_ad_wrap>.l_right>.r_bot>.bot_wrap>.b_ul3>.b_li>.ul_wrap');
            var $tab_li = $('.b_ad_wrap>.l_right>.r_bot>.bot_wrap>.b_ul3>.b_li>.tab_wrap>.tab_ul>.tab_li');
            var index = 0;
            var timer;
            $top_li.eq(index).addClass('on').siblings().removeClass('on');
            $top_li.click( function() {
                index = $(this).index();
                $(this).addClass('on').siblings().removeClass('on');
                $bot_wrap.stop().animate( {'left':-index*260 + 'px'},500);
                return false;
            } );
            init();
            function init() {
                var lrData = data.live_Ri_Data;
                var $bot_ul = $('.b_ad_wrap>.l_right>.r_bot>.bot_wrap>.b_ul1');
                for (var i=0;i<6;i++) {
                    $bot_ul.append('<li class="b_li li' +(i+1)+ '">'+
                                        '<div class="order">' +(i+1)+ '</div>'+
                                        '<a href="' +lrData[i].img_a+ '" class="img" target="_blank"><img src="images/bodyer/ad/right/' +(i+1)+ '.jpg" alt="" width="40" height="40"></a>'+
                                        '<a href="' +lrData[i].inf_a+ '" class="inf" target="_blank">'+
                                            '<div class="up">'+
                                                '<div class="title">' +lrData[i].title+ '</div>'+
                                                '<div class="num">' +lrData[i].num+ '</div>'+
                                                '<i></i>'+
                                            '</div>'+
                                            '<p class="det">' +lrData[i].det+ '</p>'+
                                        '</a>'+
                                    '</li>'
                    );
                }
            }

            $tab_li.hover( function(){
                clearInterval(timer);
                index = $(this).index();
                run();
            },function(){
                auto();
            } );
            auto();
            function auto() {
                timer = setInterval( function(){
                    index++;
                    if(index==3){index=0}
                    run();
                },5000);
            }
            function run() {
                $tab_li.eq(index).addClass('on').siblings().removeClass('on');
                $ul_wrap.stop().animate( {left:-index*260 + 'px'},500 );
            }
        } ) ();
    } ) ();
// ad end

// happy start
    ( function() {
        // left
        ( function() {
            init();
            var $act = $('.b_happy_wrap .l_left .l_top div.t_act>a');
            var $live_li = $('.b_happy_wrap .l_left .l_bot .bot_ul .bot_li');
            $act.click( function(){
                $(this).css('display','none');
                return false;
            } );
            $live_li.hover( function(){
                $(this).find('.hover').fadeIn();
                $(this).find('.show').fadeOut();
                $(this).find('.des').hide();
                $(this).find('.title').addClass('color');
                $(this).find('.out').stop().animate( {'bottom':'-25px'},300 );
                $(this).find('.barrage_wrap').show();
                barrage($(this));
            },function(){
                $(this).find('.hover').fadeOut();
                $(this).find('.show').fadeIn();
                $(this).find('.des').show();
                $(this).find('.title').removeClass('color');
                $(this).find('.out').stop().animate( {'bottom':'5px'},300 );
                $(this).find('.barrage_wrap').hide();
                clearInterval(timer);//正在运动的继续运动直到结束，剩下没有开始运动的停止运动
                $(this).find('.barrage').stop().css( {'left':'165px'} );//所有的弹幕对象都回归初始状态
                //stop()让正在运动的弹幕对象立即停止运动，马上回到left:165px的状态
            } );
            function init() {
                var $live_ul = $('.b_happy_wrap .l_left .l_bot .bot_ul');
                var liveData = data.live_Data;
                for(var i=0;i<liveData.href.length;i++) {
                    var mil = liveData.num[i]/10000;//此处字符串类型转化为数字类型,并同时进行了触除法
                    if(mil>=1) {
                        liveData.num[i] = mil.toFixed(1) + '万';
                    }
                    var $li = $('<li class="bot_li"></li>');
                    $li.append('<a href="' +liveData.href[i]+ '" class="bot_a" target="_blank">'+
                                    '<div class="img_div">'+
                                        '<img class="img hover" src="images/bodyer/happy/hover/' +(i+1)+ '.jpg" alt="" width="160px" height="100">'+
                                        '<img class="img show" src="images/bodyer/happy/show/' +(i+1)+ '.jpg" alt="" width="160px" height="100">'+
                                        '<div class="des">'+
                                            '<p class="d_left name">' +liveData.name[i]+ '</p>'+
                                            '<p class="d_right"><i></i><span class="num">' +liveData.num[i]+ '</span></p>'+
                                        '</div>'+
                                    '</div>'+
                                    '<div class="title">' +liveData.title[i]+ '</div>'+
                                    '<div class="out">' +liveData.out[i]+ '</div>'+
                                    '<div class="barrage_wrap">'+
                                        '<span class="barrage">不错不错~~~思密达</span>'+
                                        '<span class="barrage bar2">经费在燃烧燃烧</span>'+
                                        '<span class="barrage">我要把硬币投</span>'+
                                        '<span class="barrage bar2">233333333</span>'+
                                        '<span class="barrage">陶大宇</span>'+
                                        '<span class="barrage bar2">常山赵子龙长得帅</span>'+
                                        '<span class="barrage">on may way没媳妇儿</span>'+
                                        '<span class="barrage bar2">尼古拉斯没有工</span>'+
                                        '<span class="barrage">‭精彩精彩~~~</span>'+
                                        '<span class="barrage bar2">逗张花那个栏目的ch</span>'+
                                        '<span class="barrage">老实的牛不老实</span>'+
                                        '<span class="barrage bar2">开哥帅过吴彦祖</span>'+
                                        '<span class="barrage">上门开锁老板跑路了</span>'+
                                        '<span class="barrage bar2">老牛这个月没</span>'+
                                        '<span class="barrage">脑残粉没有女朋友</span>'+
                                    '</div>'+
                               '</a>'
                    );
                    $live_ul.append($li);
                }
            }
        } ) ();

        //right
        ( function() {
            var $top_li = $('.b_happy_wrap>.l_right>.r_top>.t_ul>.t_li');
            var $bot_wrap = $('.b_happy_wrap>.l_right>.r_bot>.bot_wrap');
            var $ul_wrap = $('.b_happy_wrap>.l_right>.r_bot>.bot_wrap>.b_ul3>.b_li>.ul_wrap');
            var $tab_li = $('.b_happy_wrap>.l_right>.r_bot>.bot_wrap>.b_ul3>.b_li>.tab_wrap>.tab_ul>.tab_li');
            var index = 0;
            var timer;
            $top_li.eq(index).addClass('on').siblings().removeClass('on');
            $top_li.click( function() {
                index = $(this).index();
                $(this).addClass('on').siblings().removeClass('on');
                $bot_wrap.stop().animate( {'left':-index*260 + 'px'},500);
                return false;
            } );
            init();
            function init() {
                var lrData = data.live_Ri_Data;
                var $bot_ul = $('.b_happy_wrap>.l_right>.r_bot>.bot_wrap>.b_ul1');
                for (var i=0;i<6;i++) {
                    $bot_ul.append('<li class="b_li li' +(i+1)+ '">'+
                                        '<div class="order">' +(i+1)+ '</div>'+
                                        '<a href="' +lrData[i].img_a+ '" class="img" target="_blank"><img src="images/bodyer/happy/right/' +(i+1)+ '.jpg" alt="" width="40" height="40"></a>'+
                                        '<a href="' +lrData[i].inf_a+ '" class="inf" target="_blank">'+
                                            '<div class="up">'+
                                                '<div class="title">' +lrData[i].title+ '</div>'+
                                                '<div class="num">' +lrData[i].num+ '</div>'+
                                                '<i></i>'+
                                            '</div>'+
                                            '<p class="det">' +lrData[i].det+ '</p>'+
                                        '</a>'+
                                    '</li>'
                    );
                }
            }

            $tab_li.hover( function(){
                clearInterval(timer);
                index = $(this).index();
                run();
            },function(){
                auto();
            } );
            auto();
            function auto() {
                timer = setInterval( function(){
                    index++;
                    if(index==3){index=0}
                    run();
                },5000);
            }
            function run() {
                $tab_li.eq(index).addClass('on').siblings().removeClass('on');
                $ul_wrap.stop().animate( {left:-index*260 + 'px'},500 );
            }
        } ) ();
    } ) ();
// happy end

// film start
    ( function() {
        // left
        ( function() {
            init();
            var $act = $('.b_film_wrap .l_left .l_top div.t_act>a');
            var $live_li = $('.b_film_wrap .l_left .l_bot .bot_ul .bot_li');
            $act.click( function(){
                $(this).css('display','none');
                return false;
            } );
            $live_li.hover( function(){
                $(this).find('.hover').fadeIn();
                $(this).find('.show').fadeOut();
                $(this).find('.des').hide();
                $(this).find('.title').addClass('color');
                $(this).find('.out').stop().animate( {'bottom':'-25px'},300 );
                $(this).find('.progress_bar').delay(300).fadeIn();
            },function(){
                $(this).find('.hover').fadeOut();
                $(this).find('.show').fadeIn();
                $(this).find('.des').show();
                $(this).find('.title').removeClass('color');
                $(this).find('.out').stop().animate( {'bottom':'5px'},300 );
                $(this).find('.progress_bar').delay(300).hide();
            } );
            function init() {
                var $live_ul = $('.b_film_wrap .l_left .l_bot .bot_ul');
                var liveData = data.live_Data;
                for(var i=0;i<liveData.href.length;i++) {
                    var mil = liveData.num[i]/10000;//此处字符串类型转化为数字类型,并同时进行了触除法
                    if(mil>=1) {
                        liveData.num[i] = mil.toFixed(1) + '万';
                    }
                    var $li = $('<li class="bot_li"></li>');
                    $li.append('<a href="' +liveData.href[i]+ '" class="bot_a" target="_blank">'+
                                    '<div class="img_div">'+
                                        '<img class="img hover" src="images/bodyer/film/hover/' +(i+1)+ '.jpg" alt="" width="160px" height="100">'+
                                        '<img class="img show" src="images/bodyer/film/show/' +(i+1)+ '.jpg" alt="" width="160px" height="100">'+
                                        '<div class="des">'+
                                            '<p class="d_left name">' +liveData.name[i]+ '</p>'+
                                            '<p class="d_right"><i></i><span class="num">' +liveData.num[i]+ '</span></p>'+
                                        '</div>'+
                                        '<div class="progress_bar">'+
                                            '<p><span></span></p>'+
                                        '</div>'+
                                    '</div>'+
                                    '<div class="title">' +liveData.title[i]+ '</div>'+
                                    '<div class="out">' +liveData.out[i]+ '</div>'+
                               '</a>'
                    );
                    $live_ul.append($li);
                }
            }
        } ) ();

        //right
        ( function() {
            var $top_li = $('.b_film_wrap>.l_right>.r_top>.t_ul>.t_li');
            var $bot_wrap = $('.b_film_wrap>.l_right>.r_bot>.bot_wrap');
            var $ul_wrap = $('.b_film_wrap>.l_right>.r_bot>.bot_wrap>.b_ul3>.b_li>.ul_wrap');
            var $tab_li = $('.b_film_wrap>.l_right>.r_bot>.bot_wrap>.b_ul3>.b_li>.tab_wrap>.tab_ul>.tab_li');
            var index = 0;
            var timer;
            $top_li.eq(index).addClass('on').siblings().removeClass('on');
            $top_li.click( function() {
                index = $(this).index();
                $(this).addClass('on').siblings().removeClass('on');
                $bot_wrap.stop().animate( {'left':-index*260 + 'px'},500);
                return false;
            } );
            init();
            function init() {
                var lrData = data.live_Ri_Data;
                var $bot_ul = $('.b_film_wrap>.l_right>.r_bot>.bot_wrap>.b_ul1');
                for (var i=0;i<6;i++) {
                    $bot_ul.append('<li class="b_li li' +(i+1)+ '">'+
                                        '<div class="order">' +(i+1)+ '</div>'+
                                        '<a href="' +lrData[i].img_a+ '" class="img" target="_blank"><img src="images/bodyer/film/right/' +(i+1)+ '.jpg" alt="" width="40" height="40"></a>'+
                                        '<a href="' +lrData[i].inf_a+ '" class="inf" target="_blank">'+
                                            '<div class="up">'+
                                                '<div class="title">' +lrData[i].title+ '</div>'+
                                                '<div class="num">' +lrData[i].num+ '</div>'+
                                                '<i></i>'+
                                            '</div>'+
                                            '<p class="det">' +lrData[i].det+ '</p>'+
                                        '</a>'+
                                    '</li>'
                    );
                }
            }

            $tab_li.hover( function(){
                clearInterval(timer);
                index = $(this).index();
                run();
            },function(){
                auto();
            } );
            auto();
            function auto() {
                timer = setInterval( function(){
                    index++;
                    if(index==3){index=0}
                    run();
                },5000);
            }
            function run() {
                $tab_li.eq(index).addClass('on').siblings().removeClass('on');
                $ul_wrap.stop().animate( {left:-index*260 + 'px'},500 );
            }
        } ) ();
    } ) ();
// film end

// tv start
    ( function() {
        // left
        ( function() {
            init();
            var $act = $('.b_tv_wrap .l_left .l_top div.t_act>a');
            var $live_li = $('.b_tv_wrap .l_left .l_bot .bot_ul .bot_li');
            $act.click( function(){
                $(this).css('display','none');
                return false;
            } );
            $live_li.hover( function(){
                $(this).find('.hover').fadeIn();
                $(this).find('.show').fadeOut();
                $(this).find('.des').hide();
                $(this).find('.title').addClass('color');
                $(this).find('.out').stop().animate( {'bottom':'-25px'},300 );
                $(this).find('.barrage_wrap').show();
                barrage($(this));
            },function(){
                $(this).find('.hover').fadeOut();
                $(this).find('.show').fadeIn();
                $(this).find('.des').show();
                $(this).find('.title').removeClass('color');
                $(this).find('.out').stop().animate( {'bottom':'5px'},300 );
                $(this).find('.barrage_wrap').hide();
                clearInterval(timer);//正在运动的继续运动直到结束，剩下没有开始运动的停止运动
                $(this).find('.barrage').stop().css( {'left':'165px'} );//所有的弹幕对象都回归初始状态
                //stop()让正在运动的弹幕对象立即停止运动，马上回到left:165px的状态
            } );
            function init() {
                var $live_ul = $('.b_tv_wrap .l_left .l_bot .bot_ul');
                var liveData = data.live_Data;
                for(var i=0;i<liveData.href.length;i++) {
                    var mil = liveData.num[i]/10000;//此处字符串类型转化为数字类型,并同时进行了触除法
                    if(mil>=1) {
                        liveData.num[i] = mil.toFixed(1) + '万';
                    }
                    var $li = $('<li class="bot_li"></li>');
                    $li.append('<a href="' +liveData.href[i]+ '" class="bot_a" target="_blank">'+
                                    '<div class="img_div">'+
                                        '<img class="img hover" src="images/bodyer/tv/hover/' +(i+1)+ '.jpg" alt="" width="160px" height="100">'+
                                        '<img class="img show" src="images/bodyer/tv/show/' +(i+1)+ '.jpg" alt="" width="160px" height="100">'+
                                        '<div class="des">'+
                                            '<p class="d_left name">' +liveData.name[i]+ '</p>'+
                                            '<p class="d_right"><i></i><span class="num">' +liveData.num[i]+ '</span></p>'+
                                        '</div>'+
                                    '</div>'+
                                    '<div class="title">' +liveData.title[i]+ '</div>'+
                                    '<div class="out">' +liveData.out[i]+ '</div>'+
                                    '<div class="barrage_wrap">'+
                                        '<span class="barrage">不错不错~~~思密达</span>'+
                                        '<span class="barrage bar2">经费在燃烧燃烧</span>'+
                                        '<span class="barrage">我要把硬币投</span>'+
                                        '<span class="barrage bar2">233333333</span>'+
                                        '<span class="barrage">陶大宇</span>'+
                                        '<span class="barrage bar2">常山赵子龙长得帅</span>'+
                                        '<span class="barrage">on may way没媳妇儿</span>'+
                                        '<span class="barrage bar2">尼古拉斯没有工</span>'+
                                        '<span class="barrage">‭精彩精彩~~~</span>'+
                                        '<span class="barrage bar2">逗张花那个栏目的ch</span>'+
                                        '<span class="barrage">老实的牛不老实</span>'+
                                        '<span class="barrage bar2">开哥帅过吴彦祖</span>'+
                                        '<span class="barrage">上门开锁老板跑路了</span>'+
                                        '<span class="barrage bar2">老牛这个月没</span>'+
                                        '<span class="barrage">脑残粉没有女朋友</span>'+
                                    '</div>'+
                               '</a>'
                    );
                    $live_ul.append($li);
                }
            }
        } ) ();

        //right
        ( function() {
            var $top_li = $('.b_tv_wrap>.l_right>.r_top>.t_ul>.t_li');
            var $bot_wrap = $('.b_tv_wrap>.l_right>.r_bot>.bot_wrap');
            var $ul_wrap = $('.b_tv_wrap>.l_right>.r_bot>.bot_wrap>.b_ul3>.b_li>.ul_wrap');
            var $tab_li = $('.b_tv_wrap>.l_right>.r_bot>.bot_wrap>.b_ul3>.b_li>.tab_wrap>.tab_ul>.tab_li');
            var index = 0;
            var timer;
            $top_li.eq(index).addClass('on').siblings().removeClass('on');
            $top_li.click( function() {
                index = $(this).index();
                $(this).addClass('on').siblings().removeClass('on');
                $bot_wrap.stop().animate( {'left':-index*260 + 'px'},500);
                return false;
            } );
            init();
            function init() {
                var lrData = data.live_Ri_Data;
                var $bot_ul = $('.b_tv_wrap>.l_right>.r_bot>.bot_wrap>.b_ul1');
                for (var i=0;i<6;i++) {
                    $bot_ul.append('<li class="b_li li' +(i+1)+ '">'+
                                        '<div class="order">' +(i+1)+ '</div>'+
                                        '<a href="' +lrData[i].img_a+ '" class="img" target="_blank"><img src="images/bodyer/tv/right/' +(i+1)+ '.jpg" alt="" width="40" height="40"></a>'+
                                        '<a href="' +lrData[i].inf_a+ '" class="inf" target="_blank">'+
                                            '<div class="up">'+
                                                '<div class="title">' +lrData[i].title+ '</div>'+
                                                '<div class="num">' +lrData[i].num+ '</div>'+
                                                '<i></i>'+
                                            '</div>'+
                                            '<p class="det">' +lrData[i].det+ '</p>'+
                                        '</a>'+
                                    '</li>'
                    );
                }
            }

            $tab_li.hover( function(){
                clearInterval(timer);
                index = $(this).index();
                run();
            },function(){
                auto();
            } );
            auto();
            function auto() {
                timer = setInterval( function(){
                    index++;
                    if(index==3){index=0}
                    run();
                },5000);
            }
            function run() {
                $tab_li.eq(index).addClass('on').siblings().removeClass('on');
                $ul_wrap.stop().animate( {left:-index*260 + 'px'},500 );
            }
        } ) ();
    } ) ();
// tv end

// video start
    ( function() {
        // left
        ( function() {
            init();
            var $act = $('.b_video_wrap .l_left .l_top div.t_act>a');
            var $live_li = $('.b_video_wrap .l_left .l_bot .bot_ul .bot_li');
            $act.click( function(){
                $(this).css('display','none');
                return false;
            } );
            $live_li.hover( function(){
                $(this).find('.hover').fadeIn();
                $(this).find('.show').fadeOut();
                $(this).find('.des').hide();
                $(this).find('.title').addClass('color');
                $(this).find('.out').stop().animate( {'bottom':'-25px'},300 );
                $(this).find('.progress_bar').delay(300).fadeIn();
            },function(){
                $(this).find('.hover').fadeOut();
                $(this).find('.show').fadeIn();
                $(this).find('.des').show();
                $(this).find('.title').removeClass('color');
                $(this).find('.out').stop().animate( {'bottom':'5px'},300 );
                $(this).find('.progress_bar').delay(300).hide();
            } );
            function init() {
                var $live_ul = $('.b_video_wrap .l_left .l_bot .bot_ul');
                var liveData = data.live_Data;
                for(var i=0;i<liveData.href.length;i++) {
                    var mil = liveData.num[i]/10000;//此处字符串类型转化为数字类型,并同时进行了触除法
                    if(mil>=1) {
                        liveData.num[i] = mil.toFixed(1) + '万';
                    }
                    var $li = $('<li class="bot_li"></li>');
                    $li.append('<a href="' +liveData.href[i]+ '" class="bot_a" target="_blank">'+
                                    '<div class="img_div">'+
                                        '<img class="img hover" src="images/bodyer/video/hover/' +(i+1)+ '.jpg" alt="" width="160px" height="100">'+
                                        '<img class="img show" src="images/bodyer/video/show/' +(i+1)+ '.jpg" alt="" width="160px" height="100">'+
                                        '<div class="des">'+
                                            '<p class="d_left name">' +liveData.name[i]+ '</p>'+
                                            '<p class="d_right"><i></i><span class="num">' +liveData.num[i]+ '</span></p>'+
                                        '</div>'+
                                        '<div class="progress_bar">'+
                                            '<p><span></span></p>'+
                                        '</div>'+
                                    '</div>'+
                                    '<div class="title">' +liveData.title[i]+ '</div>'+
                                    '<div class="out">' +liveData.out[i]+ '</div>'+
                               '</a>'
                    );
                    $live_ul.append($li);
                }
            }
        } ) ();

        //right
        ( function() {
            var $top_li = $('.b_video_wrap>.l_right>.r_top>.t_ul>.t_li');
            var $bot_wrap = $('.b_video_wrap>.l_right>.r_bot>.bot_wrap');
            var $ul_wrap = $('.b_video_wrap>.l_right>.r_bot>.bot_wrap>.b_ul3>.b_li>.ul_wrap');
            var $tab_li = $('.b_video_wrap>.l_right>.r_bot>.bot_wrap>.b_ul3>.b_li>.tab_wrap>.tab_ul>.tab_li');
            var index = 0;
            var timer;
            $top_li.eq(index).addClass('on').siblings().removeClass('on');
            $top_li.click( function() {
                index = $(this).index();
                $(this).addClass('on').siblings().removeClass('on');
                $bot_wrap.stop().animate( {'left':-index*260 + 'px'},500);
                return false;
            } );
            init();
            function init() {
                var lrData = data.live_Ri_Data;
                var $bot_ul = $('.b_video_wrap>.l_right>.r_bot>.bot_wrap>.b_ul1');
                for (var i=0;i<6;i++) {
                    $bot_ul.append('<li class="b_li li' +(i+1)+ '">'+
                                        '<div class="order">' +(i+1)+ '</div>'+
                                        '<a href="' +lrData[i].img_a+ '" class="img" target="_blank"><img src="images/bodyer/video/right/' +(i+1)+ '.jpg" alt="" width="40" height="40"></a>'+
                                        '<a href="' +lrData[i].inf_a+ '" class="inf" target="_blank">'+
                                            '<div class="up">'+
                                                '<div class="title">' +lrData[i].title+ '</div>'+
                                                '<div class="num">' +lrData[i].num+ '</div>'+
                                                '<i></i>'+
                                            '</div>'+
                                            '<p class="det">' +lrData[i].det+ '</p>'+
                                        '</a>'+
                                    '</li>'
                    );
                }
            }
            $tab_li.hover( function(){
                clearInterval(timer);
                index = $(this).index();
                run();
            },function(){
                auto();
            } );
            auto();
            function auto() {
                timer = setInterval( function(){
                    index++;
                    if(index==3){index=0}
                    run();
                },5000);
            }
            function run() {
                $tab_li.eq(index).addClass('on').siblings().removeClass('on');
                $ul_wrap.stop().animate( {left:-index*260 + 'px'},500 );
            }
        } ) ();
    } ) ();
// video end

// record start
    ( function() {
        // left
        ( function() {
            init();
            var $act = $('.b_record_wrap .l_left .l_top div.t_act>a');
            var $live_li = $('.b_record_wrap .l_left .l_bot .bot_ul .bot_li');
            $act.click( function(){
                $(this).css('display','none');
                return false;
            } );
            $live_li.hover( function(){
                $(this).find('.hover').fadeIn();
                $(this).find('.show').fadeOut();
                $(this).find('.des').hide();
                $(this).find('.title').addClass('color');
                $(this).find('.out').stop().animate( {'bottom':'-25px'},300 );
                $(this).find('.barrage_wrap').show();
                barrage($(this));
            },function(){
                $(this).find('.hover').fadeOut();
                $(this).find('.show').fadeIn();
                $(this).find('.des').show();
                $(this).find('.title').removeClass('color');
                $(this).find('.out').stop().animate( {'bottom':'5px'},300 );
                $(this).find('.barrage_wrap').hide();
                clearInterval(timer);//正在运动的继续运动直到结束，剩下没有开始运动的停止运动
                $(this).find('.barrage').stop().css( {'left':'165px'} );//所有的弹幕对象都回归初始状态
                //stop()让正在运动的弹幕对象立即停止运动，马上回到left:165px的状态
            } );
            function init() {
                var $live_ul = $('.b_record_wrap .l_left .l_bot .bot_ul');
                var liveData = data.live_Data;
                for(var i=0;i<liveData.href.length;i++) {
                    var mil = liveData.num[i]/10000;//此处字符串类型转化为数字类型,并同时进行了触除法
                    if(mil>=1) {
                        liveData.num[i] = mil.toFixed(1) + '万';
                    }
                    var $li = $('<li class="bot_li"></li>');
                    $li.append('<a href="' +liveData.href[i]+ '" class="bot_a" target="_blank">'+
                                    '<div class="img_div">'+
                                        '<img class="img hover" src="images/bodyer/record/hover/' +(i+1)+ '.jpg" alt="" width="160px" height="100">'+
                                        '<img class="img show" src="images/bodyer/record/show/' +(i+1)+ '.jpg" alt="" width="160px" height="100">'+
                                        '<div class="des">'+
                                            '<p class="d_left name">' +liveData.name[i]+ '</p>'+
                                            '<p class="d_right"><i></i><span class="num">' +liveData.num[i]+ '</span></p>'+
                                        '</div>'+
                                    '</div>'+
                                    '<div class="title">' +liveData.title[i]+ '</div>'+
                                    '<div class="out">' +liveData.out[i]+ '</div>'+
                                    '<div class="barrage_wrap">'+
                                        '<span class="barrage">不错不错~~~思密达</span>'+
                                        '<span class="barrage bar2">经费在燃烧燃烧</span>'+
                                        '<span class="barrage">我要把硬币投</span>'+
                                        '<span class="barrage bar2">233333333</span>'+
                                        '<span class="barrage">陶大宇</span>'+
                                        '<span class="barrage bar2">常山赵子龙长得帅</span>'+
                                        '<span class="barrage">on may way没媳妇儿</span>'+
                                        '<span class="barrage bar2">尼古拉斯没有工</span>'+
                                        '<span class="barrage">‭精彩精彩~~~</span>'+
                                        '<span class="barrage bar2">逗张花那个栏目的ch</span>'+
                                        '<span class="barrage">老实的牛不老实</span>'+
                                        '<span class="barrage bar2">开哥帅过吴彦祖</span>'+
                                        '<span class="barrage">上门开锁老板跑路了</span>'+
                                        '<span class="barrage bar2">老牛这个月没</span>'+
                                        '<span class="barrage">脑残粉没有女朋友</span>'+
                                    '</div>'+
                               '</a>'
                    );
                    $live_ul.append($li);
                }
            }
        } ) ();

        //right
        ( function() {
            var $top_li = $('.b_record_wrap>.l_right>.r_top>.t_ul>.t_li');
            var $bot_wrap = $('.b_record_wrap>.l_right>.r_bot>.bot_wrap');
            var $ul_wrap = $('.b_record_wrap>.l_right>.r_bot>.bot_wrap>.b_ul3>.b_li>.ul_wrap');
            var $tab_li = $('.b_record_wrap>.l_right>.r_bot>.bot_wrap>.b_ul3>.b_li>.tab_wrap>.tab_ul>.tab_li');
            var index = 0;
            var timer;
            $top_li.eq(index).addClass('on').siblings().removeClass('on');
            $top_li.click( function() {
                index = $(this).index();
                $(this).addClass('on').siblings().removeClass('on');
                $bot_wrap.stop().animate( {'left':-index*260 + 'px'},500);
                return false;
            } );
            init();
            function init() {
                var lrData = data.live_Ri_Data;
                var $bot_ul = $('.b_record_wrap>.l_right>.r_bot>.bot_wrap>.b_ul1');
                for (var i=0;i<6;i++) {
                    $bot_ul.append('<li class="b_li li' +(i+1)+ '">'+
                                        '<div class="order">' +(i+1)+ '</div>'+
                                        '<a href="' +lrData[i].img_a+ '" class="img" target="_blank"><img src="images/bodyer/record/right/' +(i+1)+ '.jpg" alt="" width="40" height="40"></a>'+
                                        '<a href="' +lrData[i].inf_a+ '" class="inf" target="_blank">'+
                                            '<div class="up">'+
                                                '<div class="title">' +lrData[i].title+ '</div>'+
                                                '<div class="num">' +lrData[i].num+ '</div>'+
                                                '<i></i>'+
                                            '</div>'+
                                            '<p class="det">' +lrData[i].det+ '</p>'+
                                        '</a>'+
                                    '</li>'
                    );
                }
            }

            $tab_li.hover( function(){
                clearInterval(timer);
                index = $(this).index();
                run();
            },function(){
                auto();
            } );
            auto();
            function auto() {
                timer = setInterval( function(){
                    index++;
                    if(index==3){index=0}
                    run();
                },5000);
            }
            function run() {
                $tab_li.eq(index).addClass('on').siblings().removeClass('on');
                $ul_wrap.stop().animate( {left:-index*260 + 'px'},500 );
            }
        } ) ();
    } ) ();
// record end

// special start
    // bot
    ( function() {
        var $b_img = $('.special_bot .b_left .l_ul .l_li .a_div');

        $b_img.hover( function(){
            $(this).find('.later').show();
            $(this).parent().find('.text').addClass('color');
        },function(){
            $(this).find('.later').hide();
            $(this).parent().find('.text').removeClass('color');
        } );
    } ) ();
// expand end

// slide start
    ( function() {
        var $slide_box = $('.slide_wrap .slide_box');
        var $body_nav = $('#bodyer_wrap .b_nav');//17个
        var $slide_span = $('.slide_wrap .slide_box .slide_ul .slide_li span');//17个
        var $slide_run = $('.slide_wrap .slide_box .slide_ul .slide_run');
        var onoff = true;
        var index;
        slide_scroll();//没有触发滚动事件时，slide框有两个状态：置顶或距离顶部230px
        $(window).scroll( function() {//触发滚动事件
             slide_scroll();
        } );

        //点击事件
        $slide_span.click( function() {
            var num = $(this).parent().index();
            onoff = false;//避免两次触发滚动事件
            $('body,html').stop().animate( {scrollTop:$body_nav.eq(num).offset().top + 'px'},500 );
            $(this).addClass('c_b').parent().siblings().find('span').removeClass('c_b');
            $slide_run.show().stop().animate( {top:$(this).parent().position().top + 'px'},500,function() {onoff = true;} );
            //运动标签，从滑动的位置运动到鼠标点击的位置
            //$(this).parent().position().top可以换成num*30
        } );

        //滚动事件函数
        function slide_scroll() {
            if(onoff) {//避免两次触发滚动事件
                $(document).scrollTop()>300?$slide_box.removeClass('top230'):$slide_box.addClass('top230');//当页面滚动300px后，silde框top:0;
                var x = index;
                for(var i=0;i<$body_nav.length;i++) {
                    var limit = $body_nav.eq(i).offset().top - $(document).scrollTop()
                    if( limit > $(window).height()/3) {//>$(window).height()为可视区域的高度，可变化
                        index = i-1;
                        break;
                    }else if(i == $body_nav.length-1) {
                        index = i;
                    }
                };

                if(index == -1) {
                    $slide_run.hide();
                    $slide_span.removeClass('c_b');
                }else{
                    if(x != index) {
                        $slide_span.eq(index).addClass('c_b').parent().siblings().find('span').removeClass('c_b');//改变字体颜色和背景颜色
                        $slide_run.show().stop().animate( {top:$slide_span.eq(index).parent().position().top + 'px'},100);
                        //运动标签，运动到滑动的位置
                        //$slide_span.eq(index).parent().position().top可以换成index*30
                    }
                }
            }
        }

    } ) ();
// slide end

