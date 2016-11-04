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
            this.routes[i] = configObj.routes[i];
        }
    }
    //Method that returns route by Name
    get(name){
        return this.routes[name];
    }
}

module.exports = function routeResolverBuilder (config){
    return new RouteResolver(config);
}