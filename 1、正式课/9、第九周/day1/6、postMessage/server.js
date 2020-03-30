let express = require('express');
let app = express();

app.use(express.static(__dirname)) // 当前文件夹的路径
app.listen(8080,function(){
    console.log('success')
})