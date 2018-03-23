// header start
    // header-top
        ( function() {
            var $top_l_li = $('#h_top_wrap .con_wrap .con_left>li');
            var $liveLi = $('#h_top_wrap .con_wrap .con_left>li.live .hide .h_left li');
            var $live_r_li = $('#h_top_wrap .con_wrap .con_left>li.game .hide .h_right>ul>li');
            var $live_r_divImg = $('#h_top_wrap .con_wrap .con_left>li.game .hide .h_right .img');
            var $live_r_Img = $('#h_top_wrap .con_wrap .con_left>li.game .hide .h_right .img img');
            //top_left
            $top_l_li.hover( function(){
                $(this).find('.hide').fadeIn();
            },function(){
                $(this).find('.hide').fadeOut();
            } );

            $liveLi.hover( function(){
                $(this).find('.cover').addClass('hover');
            },function(){
                $(this).find('.cover').removeClass('hover');
            } );

            $live_r_li.hover( function(){
                $live_r_divImg.show();
                var src = $(this).attr('imgdata');
                $live_r_Img.prop('src',src);
            },function(){
                $live_r_divImg.hide();
            } );

            //top_right
            var $top_r_li = $('#h_top_wrap .con_wrap .con_right>li');
            $top_r_li.hover( function(){
                $(this).find('.hide').fadeIn();
            },function(){
                $(this).find('.hide').fadeOut();
            } );
        } ) ();

    // header-bot
        ( function() {
            var $navLi = $('#h_bot_wrap .navLi');
            batch();
            one();

            function batch() {
                var navData = data.navData;
                var nav_A_Data = data.nav_A_Data;
                for(var i=0;i<navData.length;i++) {
                    if(navData[i].length) {
                        var $hideDiv = $('<div class="hideDiv"></div');
                        var $hideUl = $('<ul class="hideUl"></ul>');
                        for(var j=0;j<navData[i].length;j++) {
                            var $hideLi = $('<li class="hideLi">'+
                                                '<a href="'+nav_A_Data[i][j]+'" class="hideA">'+
                                                    '<span class="icon leftIcon"></span>'+'&nbsp;'+
                                                    '<span class="text">'+navData[i][j]+'</span>'+'&nbsp;'+
                                                    '<span class="iconWrap"><span class="icon rightIcon"></span></span>'+
                                                '</a>'+
                                            '</li>');
                            $hideUl.append($hideLi);
                        }
                        $hideDiv.append($hideUl);
                        $navLi.eq(i).append($hideDiv);
                    }
                }
            }

            function one() {
                var $hideLi = $('#h_bot_wrap .navLi .hideUl .hideLi');
                $navLi.hover( function(){
                    $(this).find('.hideDiv').stop().show();
                },function(){
                    $(this).find('.hideDiv').stop().hide();
                } );
                $hideLi.hover( function(){
                    $(this).find('.hideA').stop().animate( {'paddingLeft':'8px','paddingRight':'11px'},300 );
                    $(this).find('.rightIcon').stop().animate( {'left':0,'opacity':1},300 );
                },function(){
                    $(this).find('.hideA').stop().animate( {'paddingLeft':'5px','paddingRight':'14px'},300 );
                    $(this).find('.rightIcon').stop().animate( {'left':'50px','opacity':0},100 );
                } );
            }

        } ) ();


// header end
