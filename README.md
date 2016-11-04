## Route-resolver

Small module that creates a Javascript class that parses a config file into an Object with keys as **path names** and values as **paths**

## Installation 
```
npm i js-route-resolver 
```
## Getting started

You will need to import in the file 

``` JS
var routeResolverBuilder = require('js-route-resolver');
```
To create the Route resolver you will need to pass a config JS object
``` JS
var RouteResolver = routeResolverBuilder(config);
```
Example config file
``` JS
module.exports =  {
    routes:{
        pathName: "/path"
    }
}
```
To fetch the path you will need to call the get method
``` JS
routesResolver.get("pathName");
/*
  The result will be
  "/path"
*/
```
