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
        pathName: {
             value:   "/path/{optionalParameters}",
             defaultParameters:{
                optionalParameters: ":Optional"
             }
        }
    }
}
```
To fetch the path you will need to call the get method
``` JS
// Without parameters
routesResolver.get("pathName");
/*
  The result will be
  "/path"
*/
//With parameters
routesResolver.get('pathName2', {parameter: paramaterValue})
/*
  The result will be
  "/path/paramaterValue"
*/

```
Example of how to use this in a single page React/Redux application

**reducer.jsx**
```JS
import routeResolverBuilder from 'js-route-resolver'
import config from '../configs/routeResolver.config.js'

export const initialState =  routeResolverBuilder(config);

export default function routesReducer(state = initialState, action) {
    switch (action.type) {

        default:
            return state;
    }
}

```
**container.jsx**
```JS
import React from 'react';
import { connect } from 'react-redux';
import Actions from '../actions/actions';
import Widget from '../components/Widget';

const mapStateToProps = (state) => {

    return {
        path_pathName: state.routes.get('pathName'),
        path_pathName2: (id) => state.routes.get('pathName2', {parameter: parameter}),
    };
};

export default connect(mapStateToProps)(Widget);

```
**component.jsx**
```JS
import React, { PropTypes } from 'react';
import { Link } from 'react-router';

export default class Widget extends React.Component {
    render(){
            return (
                <div>
                    <Link to={this.props.path_pathName}>Example Link !</Link> 
                    <Link to={this.props.path_pathName2("Parameter goes here")}>Example Link !</Link> 
                </div>
            );
        }
}
```
