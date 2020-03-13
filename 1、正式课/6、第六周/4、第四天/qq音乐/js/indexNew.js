let music = $('#music')[0];
let timer = null;
// 1、计算出内容区的高度
function computedMain(){
    // 用屏幕的高度 - header的高度 - footer的高度 === main的高度
    let winH = document.documentElement.clientHeight;
    let headerH = $('.header')[0].offsetHeight;
    let footerH = $('.footer')[0].offsetHeight;
    // zepto中没有outerHeight方法

    // 获取最新的fontSize的值
    let fontSize = parseFloat(document.documentElement.style.fontSize);

    let mainH = (winH-headerH-footerH)/fontSize - 0.5+ 'rem';
    $('.main').css('height',mainH)
}
computedMain();
window.onresize = computedMain;

// 2、请求数据
$.ajax({
    url:'json/lyric.json',
    type:'get',
    async:false,
    success:function(data){
        bindHtml(data.lyric);
    }
})

// 3、数据绑定
function bindHtml(data){
    data = data.replace(/&#(\d+);/g,function(res,a){
        switch(parseFloat(a)) {
            case 32:
                return ' ';
            case 40:
                return '(';
            case 41:
                return ')';
            case 45:
                return '-'
        }
        return res
    });
    let arr = [];
    data.replace(/\[(\d+)&#58;(\d+)&#46;\d+\]([^&#]+)(?:(&#\d+))/g,function(res,min,sec,val){
        console.log(min,sec,val)
        arr.push({
            min,
            sec,
            val
        });
       
    })
    
    // 循环数组准备好的数组，拼接字符串，并放入wrap中
    let str = ``;
    for (var i = 0; i < arr.length; i++) {
       let cur = arr[i];
       str+=`<p data-min = "${cur.min}" data-sec="${cur.sec}">${cur.val}</p>`;
    };
    $('.wrap').html(str);
    music.addEventListener('canplay',function(){
        // 当音频加载完毕，会执行这个元素的canplay事件
        $('#right').html(formate(music.duration));
        // music.play();
    }) 
     
}

// 处理时间格式
function formate(time){ // time的单位是秒;返回(分钟:秒)   90秒 ==>1分30秒
    let min = Math.floor(time/60); // 获取分钟
    let sec = Math.floor(time%60); // 获取秒
    min = min<10? '0'+ min : min; // 补零
    sec = sec<10? '0'+ sec : sec; // 补零
    return min + ':' + sec;
}

// 4、给按钮绑定点击事件，如果当前是暂停状态，就让其播放，如果是播放状态，就让其暂停

// tap：没有延迟
$('#musicBtn').tap(function(){
    console.log(this)
    if(music.paused){
        // 如果是true，那就是暂停状态
        music.play();
        $(this).addClass("select");
       
        timer = setInterval(computedTime,1000)
    }
    else {
        music.pause();
        $(this).removeClass("select");
        clearInterval(timer);
    }
});

let curT = 0;
let flag = 0;

// 计算当前的时间以及进度条
function computedTime(){
    let curTime = music.currentTime; // 当前时间
    let duration = music.duration; // 总时间
    let cur = formate(curTime); // 转换时间格式
    console.log(cur)
    if(curTime>=duration){
        clearInterval(timer);
        $('#musicBtn').removeClass('select');
        return;
    }
    $('#left').html(cur);
    $(".lineBg").css("width",curTime/duration*100+"%");

    let min = cur.split(':')[0];
    let sec = cur.split(':')[1];
    
    // 获取所有的p标签
    let allP = document.getElementsByTagName('p');
    for (var i = 0; i < allP.length; i++) {
        let curP = allP[i];
        let pMin = curP.getAttribute('data-min');
        let pSec = curP.getAttribute('data-sec');
        if(min === pMin && sec === pSec){
            flag++;
            $(curP).addClass('select').siblings().removeClass('select');
            if(flag>5){
                curT-=0.84;
                $('.wrap').css('top',curT+'rem')
            }

        }
    }

}
