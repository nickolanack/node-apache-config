module.exports = {
                parse: parse
}

function parse(conf, line){
	
	conf=conf.split("\n").slice(line).join("\n");
	
	var root=null;
	var log=null;
	var error=null;
	
	try{
		//it is posible for a host config to have no document ie: proxy-pass vhost
		root=conf.split('DocumentRoot')[1].split("\n")[0].replace(/^\s+/g, '').split(' ')[0].replace("\r","");
	}catch(e){
		
	}
	
	try{
		log=conf.split('CustomLog')[1].split("\n")[0].replace(/^\s+/g, '').split(' ')[0].replace("\r","");
	}catch(e){
		
	}
	
	try{
		error=conf.split('ErrorLog')[1].split("\n")[0].replace(/^\s+/g, '').split(' ')[0].replace("\r","");
	}catch(e){
		
	}
	return {root:root, log:log, error:error};


}
