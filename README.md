[![Build Status](https://travis-ci.org/nickolanack/node-apache-config.svg?branch=master)](https://travis-ci.org/nickolanack/node-apache-config)
# node-apache-config
A node js library to expose apache configuration details by parsing apache config. 

```javascript
// get the document root for an apache named vhost.
require('./apache.js').getDocumentRoot('domain.name', function(path){



});
```

```javascript
// get vhosts metadata: 
// {port:int, type:string, name:string, conf:[path:string, line:int], aliases:
//   [
//     {name:string, type:string('alias'), wildcard:bool},...
//   ]
// };
// returns [{
//  port:80, 
//  name:'domain.name', 
//  type:'namedvhost', 
//  conf:['path/to/config.conf', 1 /*line number in conf*/, 
//  aliases:[
//  {},...
//  ]/*if no aliases, then there is no aliases key*/]},...]
require('./apache.js').getHostsMeta('domain.name', function(meta){



});
```
