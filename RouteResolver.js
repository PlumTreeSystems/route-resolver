/*
Expected Structure of Config
    {
        routes:{
            dash: "/investor/dash"
        }
    }
*/
class RouteResolver {
    constructor(config){
        var configObj = config;
        this.routes = {};
        for(var i in configObj.routes){
            this.routes[i] = {
                value : configObj.routes[i].value,
                defaultParameters : configObj.routes[i].defaultParameters ? configObj.routes[i].defaultParameters : {},
            };
        }
    }
    _insertPlaceholderValues(path,values){
         var newPath = path.replace(/{\w+}/g,function(placeholder){
             placeholder = placeholder.substring(1, placeholder.length-1);
             return values[placeholder] || "";
         });
        return newPath;
    }
    _fetchRoute(name){
        return this.routes[name];
    }
    _resolvePath(name,params){
        var route = this._fetchRoute(name);
        var allParams = route.defaultParameters;
        for(var i in params){
            allParams[i] = params[i];
        }
        return this._insertPlaceholderValues(route.value, allParams);
    }
    //Method that returns route by Name, params is optional
    get(name,params = {}){
        return this._resolvePath(name, params);
    }
}

module.exports = function routeResolverBuilder (config){
    return new RouteResolver(config);
}