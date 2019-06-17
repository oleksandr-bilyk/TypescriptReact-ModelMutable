import {newApplicationViewModel} from './ViewModel/CompositionRoot'
import Home from './home'
import * as ReactDOM from 'react-dom';
import React from 'react';
import AddUserView from "./View/AddPersonView"
import { Stack } from 'office-ui-fabric-react/lib/Stack';

let application = newApplicationViewModel()

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
