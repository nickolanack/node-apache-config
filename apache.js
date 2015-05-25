/**
 * 
 */



function getDocumentRoot(hostName, callback){
	
	
	getHostMeta(hostName, function(vhost){
		
		require('fs').readFile(vhost.conf[0], function (err, data) {
  			if (err) throw err;
  			var config=require('./httpd-conf-parser.js').parse(data.toString(),vhost.conf[1]);
  			
  			//console.log(JSON.stringify(config));
  			callback(config.root);
		});
		
	});

}


function getAccessLog(hostName, callback){
	
	
	getHostMeta(hostName, function(vhost){
		
		require('fs').readFile(vhost.conf[0], function (err, data) {
  			if (err) throw err;
  			var config=require('./httpd-conf-parser.js').parse(data.toString(),vhost.conf[1]);
  			
  			//console.log(JSON.stringify(config));
  			callback(config.log);
		});
		
	});

}

function getErrorLog(hostName, callback){
	
	
	getHostMeta(hostName, function(vhost){
		
		require('fs').readFile(vhost.conf[0], function (err, data) {
  			if (err) throw err;
  			var config=require('./httpd-conf-parser.js').parse(data.toString(),vhost.conf[1]);
  			
  			//console.log(JSON.stringify(config));
  			callback(config.log);
		});
		
	});

}


function getHostMeta(hostName, callback){
	
	
	var name=hostName;
	name=name.split(':');
	name=name[0];
	name=name.split('/'); //strip any url path info
	name=name[0];
	
	getHostsMeta(function(list){
		
		if(list.length===0)throw new Error('no hosts');
		
		var vhost;
		var names;
		var vname;
		for(var v=0;v<list.length;v++){
			vhost=list[v];
			
			
			
			var names=[vhost.name];
			
			if(vhost.aliases){
				names=names.concat(vhost.aliases.map(function(a){return a.name;}));
			}
			
			for(var n=0;n<names.length;n++){
				
				vname=names[n];
				
				if(vname===name){
					//console.log(vname+'='+name+JSON.stringify(vhost));
					callback(vhost);
					return;
				}
					
				if(vname.substring(0,2)==='*.'){
					var p=name.indexOf(vname.substring(2));
					if(p!==-1){
						//console.log(vname+' in '+name+JSON.stringify(vhost));
						callback(vhost);
						return;
					}
				}
			}
			
		}
		
		
	});
	
};

function getHostsMeta(callback){
	
	require('child_process').exec('httpd -t -D DUMP_VHOSTS', function (err, stdout, stderr) {
    	//console.log('stderr: ' + stderr);
    	if (err)throw err;
		var vhosts=require('./httpd-vhost-parser.js').parse(stdout);
		
			callback(vhosts);
		
			/*
			callback(vhosts.map(function(vhost){
				//console.log(JSON.stringify(vhost));
				return vhost; //.name;
			}));
			 */
	
	});
	
}

module.exports={
		
		
		/**
		 * @returns the absolute path to the document root, for a give hostname, or alias
		 */
		getDocumentRoot:getDocumentRoot,
		
		getAccessLog:getAddessLog,
		getErrorLog:getErrorLog,
		
		/**
		 * 
		 * @returns array of strings, matching host names (not aliases)
		 */
		getHostsMeta:getHostsMeta,
		
		
		

};


