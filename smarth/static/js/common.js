$(function () {

    // 引入头部导航
    // $.ajaxSetup({ cache: false });
    $('header').load("./components/header.html", initHead);
    $('footer').load("./components/footer.html", initFoot);
    // 头部背景显示隐藏
    function initHead() {
        function showHeader() {
            if ($(window).scrollTop() >= 380) {
                $('.header').css('background', 'rgba(255, 255, 255, 0.9)');
                $(".nav_a").css("color", "#333");
                $(".navbar-default").css("borderBottom", "1px solid #edf0f2");
            } else {
                $('.header').css('background', 'none');
                $(".nav_a").css("color", "#fff");
                $(".navbar-default").css("borderBottom", "1px solid rgba(255,255,255,.2)");
            }
        }
        showHeader()
        $(window).scroll(function () {
            showHeader()
        });
    }

    // 快速置顶
    function initFoot() {
        function showBtn() {
            if ($(window).scrollTop() >= 200) {
                // $('#updown').fadeIn(300);
                $('#updown').addClass('updown_show');
            } else {
                // $('#updown').fadeOut(300);
                $('#updown').removeClass('updown_show');
            }
        }
        showBtn()
        $(window).scroll(function () {
            showBtn()
        });
        $('#updown').click(function () {
            $('html,body').animate({ scrollTop: '0px' }, 300);
        });
    }

});