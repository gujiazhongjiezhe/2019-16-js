let express = require('express');
let app = express();

app.use(express.static(__dirname))
app.listen(8888,function(){
    console.log('8888端口已经启动成功')
})
