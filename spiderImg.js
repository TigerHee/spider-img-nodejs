var http = require('http');
var fs = require('fs');
var path = require('path');

http.get('http://jspang.com', function(res){
	var content = '';
	res.on('data', function(txt){
		content += txt;
	});
	if(!fs.existsSync(__dirname+'/tigerImg')){
		fs.mkdir(__dirname+'/tigerImg', function(err){
			if(err){
				console.log('----创建报错----');
				return console.log(err);
			}
			console.log('tigerImg目录创建成功');
		});
	}
	res.on('end', function(){
		var reg = /data-src="(.*?\.jpg)"/img;
		var data = reg.exec(content);
		fs.writeFile('./tiger.txt', data, function(){
			console.log('写入成功')
		});
		var filename=null;
        while(filename=reg.exec(content)){
            downImg(filename[1])
        }
	})
});

function downImg(url){
    var obj=path.parse(url);
    var name=obj.base;
    var filestream=fs.createWriteStream('./tigerImg/'+name);
    http.get(url,function(res){
        res.pipe(filestream)
    })
}