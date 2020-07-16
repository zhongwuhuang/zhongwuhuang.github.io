$(function () {

    // 引入头部导航
    $.ajaxSetup({ cache: false });
    $('header').load("./components/header.html", initHead);
    $('footer').load("./components/footer.html", initFoot);
    function initHead() {
        // 头部背景显示隐藏
        function showHeader() {
            if ($(window).scrollTop() >= 380) {
                $('.header').css('background', 'rgba(255, 255, 255, 0.9)');
                $(".nav_a").css("color", "#333");
            } else {
                $('.header').css('background', 'none');
                $(".nav_a").css("color", "#fff");
            }
        }
        showHeader()

        $(window).scroll(function () {
            showHeader()
        });
    }
    function initFoot() {
        // 快速置顶
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
            console.log(2343);
            $('html,body').animate({ scrollTop: '0px' }, 300);
        });
    }



});