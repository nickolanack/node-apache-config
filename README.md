# node-apache-config
A node js library to expose apache configuration details by parsing apache config. 

```
// get the document root for an apache named vhost.
require('./apache.js').getDocumentRoot('domain.name', function(path){



});


// get vhosts metadata:
// returns [{name:'domain.name', },...]
require('./apache.js').getHostsMeta('domain.name', function(path){



});
```
