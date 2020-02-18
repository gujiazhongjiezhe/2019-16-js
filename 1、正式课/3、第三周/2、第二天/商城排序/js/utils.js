let utils = (function () {
    function toArray(likeAry) {
        let ary = [];
        // 类数组转数组
        try {
            ary = Array.prototype.slice.call(likeAry);
        } catch (e) {
            for (var i = 0; i < likeAry.length; i++) {
                var cur = likeAry[i] // 代表类数组的每一项
                ary.push(cur);
            }
        }
        return ary
    }

    return {
        toArray
    }
})()