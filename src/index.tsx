import * as model from './ViewModel/ApplicationViewModel'
import Home from './home'
import * as ReactDOM from 'react-dom';
import React from 'react';
//import * as css from './index.css'

let m = new model.ApplicationViewModel()

const domContainer = document.getElementById('applicaitonDomContainer')

let a = <div>
    <div id="addUserPanel" >
        <span>Add user</span>
    </div>
    <div id="mainPanel">

    </div>
</div>

ReactDOM.render(
    <Home/>,
    domContainer);


/* let message : string = "Hello Web";
document.body.innerHTML = message; */
