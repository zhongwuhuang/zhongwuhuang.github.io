// https://blog.csdn.net/TCF_JingFeng/article/details/80814015
/*
设计稿的宽度：designWidth
允许自适应的最大宽度（超过这个值屏幕元素不在自适应增大）:maxWidth
页面顶部加上：<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no" >
这段js的传入两个参数:一个为设计稿实际宽度，一个为显示的最大宽度（允许的屏幕最大宽度，用来限制屏幕过大之后元素还会自适应增大的）
例如设计稿为750，最大宽度为600，则为(750,600)，屏幕大于600之后就不会自适应变大了，也相当于在用@media属性时min-width只设置到了600，没有后面的屏幕尺寸，就不会再变化了
公式：1rem = 浏览器屏幕宽（width） * 100 / 设计稿宽(designWidth)
(750,750)含义1rem = clientWidth * 100 / 750
(750,2160)含义1rem = clientWidth * 100 / 750
clientWidth是动态获取的
后面的750和2160表示maxWidth，如果浏览器窗口（clientWidth）大于这个数值就将clientWidth设置成这个数值(maxWidth)。而width是根据屏幕变化动态获取的
*/
; (function (designWidth, maxWidth) {
    var doc = document,
        win = window,
        docEl = doc.documentElement,
        remStyle = document.createElement("style"),
        tid;

    function refreshRem() {
        var clientWidth = docEl.getBoundingClientRect().width;//获取document的宽度,浏览器屏幕宽度
        // alert(clientWidth)
        maxWidth = maxWidth || 540;//短路运算符，如果前面式子为false再执行后面，如果赋值了maxWidth那么maxWidth=maxWidth,否则没有赋值那么maxWidth为false,就会执行maxWidth=540
        clientWidth > maxWidth && (clientWidth = maxWidth);//短路运算符，如果前面式子true再执行后面
        var rem = clientWidth * 100 / designWidth;
        remStyle.innerHTML = 'html{font-size:' + rem + 'px;}';
    }

    if (docEl.firstElementChild) {
        docEl.firstElementChild.appendChild(remStyle);
    } else {
        var wrap = doc.createElement("div");
        wrap.appendChild(remStyle);
        doc.write(wrap.innerHTML);
        wrap = null;
    }
    refreshRem();
    //要等 wiewport 设置好后才能执行 refreshRem，不然 refreshRem 会执行2次；


    win.addEventListener("resize", function () {
        clearTimeout(tid); //防止执行两次
        tid = setTimeout(refreshRem, 300);
    }, false);

    /*
    浏览器后退的时候重新计算,为了查看页面是直接从服务器上载入还是从缓存中读取，你可以使用 PageTransitionEvent 对象的 persisted 属性来判断。
    如果页面从浏览器的缓存中读取该属性返回 ture，否则返回 false
    */
    win.addEventListener("pageshow", function (e) {
        if (e.persisted) {
            clearTimeout(tid);
            tid = setTimeout(refreshRem, 30);
        }
    }, false);

    /*
    为什么一般多是 html{font-size:62.5%;} 而不是 html{font-size:10px;}呢？
    因为有些浏览器默认的不是16px，或者用户修改了浏览器默认的字体大小（因浏览器分辨率大小，视力，习惯等因素）。
    如果我们将其设置为10px，一定会影响在这些浏览器上的效果，所以最好用绝大多数用户默认的16作为基数 * 62.5% 得到我们需要的10px。
    实际项目设置成 font-size: 62.5%可能会出现问题，因为chrome不支持小于12px的字体，计算小于12px的时候，会默认取12px去计算，导致chrome的em/rem计算不准确。
    针对这个现象，可以尝试设置html字体为100px，body 修正为16px，这样 0.1rem 就是 10px，而body的字体仍然是默认大小，不影响未设置大小的元素的默认字体的大小。
    */
    if (doc.readyState === "complete") {
        doc.body.style.fontSize = "16px";//页面元素默认16px，如果不设置将是自动为16px显示
    } else {
        doc.addEventListener("DOMContentLoaded", function (e) {
            doc.body.style.fontSize = "16px";
        }, false);
    }
})(750, 750);