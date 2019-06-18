import {newApplicationViewModel} from './ViewModel/CompositionRoot'
import Main from './View/Main'
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
    </div>
    <div id="mainPanel" style={{width:"100%", float: "left", border:"1px solid red"}}>    
        <Main model={application.donorsList}/>
    </div>
</Stack>

ReactDOM.render(
    body,
    domContainer);

/* let message : string = "Hello Web";
document.body.innerHTML = message; */
