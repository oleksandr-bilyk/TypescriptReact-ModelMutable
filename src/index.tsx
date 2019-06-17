import * as model from './ViewModel/ApplicationViewModel'
import Home from './home'
import * as ReactDOM from 'react-dom';
import React from 'react';
import AddUserView from "./View/AddPersonView"
import { Stack, IStackProps } from 'office-ui-fabric-react/lib/Stack';

let application = new model.ApplicationViewModel()

const domContainer = document.getElementById('applicaitonDomContainer')

let body = 
<Stack horizontal>
    <div id="addUserPanel">
        <AddUserView model={application.addPerson}/>
        <Home/>
    </div>
    <div id="mainPanel">    
        
    </div>
</Stack>

ReactDOM.render(
    body,
    domContainer);


/* let message : string = "Hello Web";
document.body.innerHTML = message; */
