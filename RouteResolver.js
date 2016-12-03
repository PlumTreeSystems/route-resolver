"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
 Expected Structure of Config
 {
 routes:{
 dash: "/investor/dash"
 }
 }
 */
var RouteResolver = function () {
    function RouteResolver(config) {
        _classCallCheck(this, RouteResolver);

        var configObj = config;
        this.routes = {};
        for (var i in configObj.routes) {
            this.routes[i] = {
                value: configObj.routes[i].value,
                defaultParameters: configObj.routes[i].defaultParameters ? configObj.routes[i].defaultParameters : {}
            };
        }
    }

    _createClass(RouteResolver, [{
        key: "_insertPlaceholderValues",
        value: function _insertPlaceholderValues(path, values) {
            var newPath = path.replace(/{\w+}/g, function (placeholder) {
                placeholder = placeholder.substring(1, placeholder.length - 1);
                return values[placeholder] || "";
            });
            return newPath;
        }
    }, {
        key: "_fetchRoute",
        value: function _fetchRoute(name) {
            return this.routes[name];
        }
    }, {
        key: "_resolvePath",
        value: function _resolvePath(name, params) {
            var route = this._fetchRoute(name);
            var allParams = route.defaultParameters;
            for (var i in params) {
                allParams[i] = params[i];
            }
            return this._insertPlaceholderValues(route.value, allParams);
        }
        //Method that returns route by Name, params is optional

    }, {
        key: "get",
        value: function get(name) {
            var params = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

            return this._resolvePath(name, params);
        }
    }]);

    return RouteResolver;
}();

module.exports = function routeResolverBuilder(config) {
    return new RouteResolver(config);
};