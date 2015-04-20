/**
 * 
 */

module.exports={
		
		
		/**
		 * @returns the absolute path to the document root, for a give hostname, or alias
		 */
		getDocumentRoot:function(hostName, callback){
			callback('/var/www/');
		},
		
		/**
		 * 
		 * @returns array of strings, matching host names (not aliases)
		 */
		getHosts:function(callback){
			
			require('child_process').exec('httpd -t -D DUMP_VHOSTS', function (err, stdout, stderr) {
		    	//console.log('stderr: ' + stderr);
		    	if (err)throw err;
				var vhosts=require('./httpd-vhost-parser.js').parse(stdout);
				
					callback(vhosts.map(function(){
					
				}));
			
			
			});
			
		},
		
		
		
}


