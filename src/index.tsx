import * as model from './ViewModel/ApplicationViewModel'
import Home from './home'
import * as ReactDOM from 'react-dom';
import React from 'react';

let m = new model.ApplicationViewModel()

const domContainer = document.getElementById('applicaitonDomContainer')

var rootReactElement = 

ReactDOM.render(
    <Home/>,
    domContainer);

