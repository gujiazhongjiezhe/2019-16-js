(function () {
    let music = $('#music')[0];
    let timer = null;
    // 1、计算出中间区域的高度
    function computedMain() {
        // main的高度 === 屏幕的高度 - 头部的高度 - 底部的高度
        let winH = document.documentElement.clientHeight; // 获取屏幕的高度
        let headerH = $('.header')[0].offsetHeight; // 获取头部的高度
        let footerH = $('.footer')[0].offsetHeight; // 获取底部的高度

        // px rem
        // 获取最新的html的fontsize值
        let fontSize = parseFloat(document.documentElement.style.fontSize);
        let mainH = (winH - headerH - footerH) / fontSize + 'rem';
        $('.main').css('height', mainH)
    }
    computedMain();

    // 当屏幕的尺寸发生变化，resize事件就会触发
    window.addEventListener('resize', computedMain);

    // 2、数据请求
    $.ajax({
        url: 'json/lyric.json',
        type: 'get',
        async: false,
        success: function (data) {
            bindHtml(data.lyric)
        }
    })

    ///3、数据渲染
    function bindHtml(data) {

        // 1、根据文档规定，把内容中的特定字符替换为指定字符
        // &#32; ->空格
        // &#40; ->(
        // &#41; ->)
        // &#45; ->-
        data = data.replace(/&#(\d+);/g, function (res, a) {
            // console.log(res,a)
            switch (parseFloat(a)) {
                case 32:
                    return ' ';
                case 40:
                    return '(';
                case 41:
                    return ')'
                case 45:
                    return '-'
            }
            return res;
        });

        // 2、拿到内容中我们想要的信息(歌词和每一句歌词的分钟、秒数)
        let arr = []; // 创建数组准备接收各自信息

        // [00&#58;08&#46;73]一直地一直地往前走&#10;
        // &#10; ->换行符
        // &#58; ->前面的数字是分钟
        // &#46; ->前面的数字是秒
        // /\[(\d+)&#58;(\d+)&#46;\d+\]([^&#]+)(?:(&#\d+))/g
        //     分钟       秒             歌词     只匹配不捕获

        data.replace(/\[(\d+)&#58;(\d+)&#46;\d+\]([^&#]+)(?:(&#\d+))/g, function (res, min, sec, val) {
            // console.log(min,sec,val)
            arr.push({
                min,
                sec,
                val
            });
        })
        // console.log(arr)

        //3、把处理好的数据渲染到页面
        let str = ``;
        for (var i = 0; i < arr.length; i++) {
            let item = arr[i];
            str += `<p data-min = "${item.min}" data-sec="${item.sec}">${item.val}</p>`;
        }
        $('.wrap').html(str);

        // 当音频加载完成之后(此函数会执行)
        music.addEventListener('canplay', function () {
            // 获取当前音乐的总时间
            // console.log('加载完成', music.duration)
            $('#right').html(formate(music.duration)); // 把音乐的总时间渲染到页面
        })
        // canplay
    }

    // 处理时间格式
    function formate(time) { // time的单位是秒，最后返回 (分钟:秒)
        // 90 ==> '01:30'
        let min = Math.floor(time / 60); // 获取分钟
        let sec = Math.floor(time % 60); // 获取秒
        min = min < 10 ? '0' + min : min; // 补零
        sec = sec < 10 ? '0' + sec : sec; // 补零
        return min + ':' + sec;


        // function format(time) {
        //     var minu = parseInt(time / 60);
        //     var seco = parseInt(time - minu * 60);
        //     return minu + ':' + seco;
        // }

    };

    // 4、给音符绑定点击事件，如果当前是暂停状态，那就让其播放，如果是播放状态，那就让其暂停
    $('#musicBtn').tap(function () {
        // 如果当前是暂停状态，那paused的值是true，如果是播放状态，那paused的值就是false
        if (music.paused) {
            music.play();
            $(this).addClass('select');
            timer = setInterval(computedTime, 1000)
        } else {
            music.pause()
            $(this).removeClass('select');
            clearInterval(timer)
        }
    });

    function computedTime() {
        let curTime = music.currentTime; // 获取的是当前已经经过的时间
        let duration = music.duration; // 获取总时间
        if (curTime >= duration) {
            clearInterval(timer);
            $('#musicBtn').removeClass('select');
            return;
        }
        $('#left').html(formate(curTime)); // 把当前的时间渲染早页面
        $('.lineBg').css('width', curTime / duration * 100 + '%'); // 设置进度条
    }
})()