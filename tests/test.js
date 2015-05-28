var assert = require("assert");

var vhostdump='VirtualHost configuration:'+"\n"+
'wildcard NameVirtualHosts and _default_ servers:'+"\n"+
'*:80                   is a NameVirtualHost'+"\n"+
'         default server one.ca (/etc/httpd/conf/httpd.conf:1005)'+"\n"+
'         port 80 namevhost one.ca (/etc/httpd/conf/httpd.conf:1005)'+"\n"+
'                 alias www.one.ca'+"\n"+
'         port 80 namevhost two.ca (/etc/httpd/vhost.d/access.s54.ok.ubc.ca.conf:1)'+"\n"+
'                 wild alias *.two.ca'+"\n"+
'         port 80 namevhost three.ca (/etc/httpd/vhost.d/avisure.s54.ok.ubc.ca.conf:1)'+"\n"+
'                 alias three.ca'+"\n"+
'                 wild alias *.three.ca'+"\n"+
'         port 80 namevhost jenkins.ca (/etc/httpd/vhost.d/jenkins.geolive.ca.conf:1)'+"\n"+
'                 wild alias *.jenkins.ca'+"\n"+
'*:443                  is a NameVirtualHost'+"\n"+
'         default server one.ca (/etc/httpd/vhost.d/bcmarinetrails.s54.ok.ubc.ca.conf:63)'+"\n"+
'         port 443 namevhost one.ca (/etc/httpd/vhost.d/bcmarinetrails.s54.ok.ubc.ca.conf:63)'+"\n"+
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

console.log('success!');