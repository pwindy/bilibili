// footer start
    ( function() {

        var $r_li = $('#footer_wrap .footer_box .f_top>ul .box3 .ul3 li');
        $r_li.hover( function(){
            $(this).find('i').addClass('hover');
            $(this).find('span').addClass('color');
            $(this).find('.hide').show();
        },function(){
            $(this).find('i').removeClass('hover');
            $(this).find('span').removeClass('color');
            $(this).find('.hide').hide();
        } );
    } ) ();
// footer end
