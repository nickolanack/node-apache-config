var assert = require("assert");

var vhostdump='VirtualHost configuration:'+"\n"+
'wildcard NameVirtualHosts and _default_ servers:'+"\n"+
'*:80                   is a NameVirtualHost'+"\n"+
'         default server one.ca (/confpath/a.conf:1005)'+"\n"+
'         port 80 namevhost one.ca (/confpath/a.conf:1005)'+"\n"+
'                 alias www.one.ca'+"\n"+
'         port 80 namevhost two.ca (/confpath/b.conf:1)'+"\n"+
'                 wild alias *.two.ca'+"\n"+
'         port 80 namevhost three.ca (/confpath/b.conf:1)'+"\n"+
'                 alias three.ca'+"\n"+
'                 wild alias *.three.ca'+"\n"+
'         port 80 namevhost jenkins.ca (/confpath/c.conf:1)'+"\n"+
'                 wild alias *.jenkins.ca'+"\n"+
'*:443                  is a NameVirtualHost'+"\n"+
'         default server one.ca (/confpath/d.conf:63)'+"\n"+
'         port 443 namevhost one.ca (/confpath/d.conf:63)'+"\n"+
'                 alias two.ca'+"\n"+
'Syntax OK';

var conf=require('../httpd-conf-parser.js');

var vhost=require('../httpd-vhost-parser.js');

var vhosts=vhost.parse(vhostdump);

var ports=[80, 443];
var types=['namevhost'];

vhosts.forEach(function(v){
	//, 'aliases'
	
	
	
	assert.deepEqual(['port', 'type', 'name', 'conf', 'aliases'], Object.keys(v));
	assert((ports).indexOf(v.port)>=0, 'Failed asserting that port is in '+JSON.stringify(ports)+': '+v.port);
	assert((types).indexOf(v.type)>=0, 'Failed asserting that type is in '+JSON.stringify(types)+': '+v.type);
	
});


var confdump='<VirtualHost *:80>'+"\n"+
"\n"+
'    ServerAdmin nickblackwell82@gmail.com'+"\n"+
'    ServerName media.ca'+"\n"+
'    ServerAlias *.media.ca'+"\n"+
"\n"+
'    DocumentRoot /docpath/http/ '+"\n"+   
'    ErrorLog /logpath/media-error_log'+"\n"+
'    CustomLog /logpath/media-access_log common'+"\n"+
"\n"+
'       <Directory "/srv/www/vhosts/production/media.s54.ok.ubc.ca/http">'+"\n"+
'             AllowOverride All'+"\n"+
'             Allow from all'+"\n"+
'        </Directory>'+"\n"+
'</VirtualHost>';

var c=conf.parse(confdump);

assert.deepEqual(['root', 'log', 'error'], Object.keys(c));


console.log('success!');