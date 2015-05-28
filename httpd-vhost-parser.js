
module.exports = {
                parse: parse
}

//return an object vhost data
function parse(stdout){

var vhostStrArr=stdout.split(" port ");

var dfltHost=vhostStrArr.shift(); //just skip this one for now.

var vhosts=[];
vhostStrArr.forEach(function(hstr){

	var lines=hstr.split("\n");	
	//each line should represent and alias of the vhost
	//the first line is the actual name, port and conf file.
	
	var first=lines.shift();

	var parts=first.split(' ');
	var port=parseInt(parts[0]);
	var type=parts[1];
	var name=parts[2];
        var conf=first.split('(')[1].split(')')[0].split(':');	
	conf[1]=parseInt(conf[1]);
	var data={port:port, type:type, name:name, conf:conf};

	lines.forEach(function(alias){

		var parts=alias.split(' ').reverse();
		var name=parts[0];
		if(name==='')return;		
		var type=parts[1];
		var wild=parts[2]==='wild'?true:false;
		
		if(data['aliases']===undefined)data.aliases=[];
		data.aliases.push({name:name, type:type, wildcard:wild});
		
	});	

	vhosts.push(data);
});

return vhosts;
}

