import React from 'react';
import * as AddPersonModels from '../ViewModel/AddPersonModels';
import { stat } from 'fs';

type AddUserViewParam = {
    model: AddPersonModels.AddPersonModels
}

type State  = {
    firstName: string,
    lastName: string
}

function AddUserView(param: AddUserViewParam) {
    const [state, setState] = React.useState<State>(
        () => {
            return {
                firstName: param.model.getFirstName(),
                lastName: param.model.getLastName() 
            }
        }
    )

    return <div>
        <h2>Add user</h2>
        <span>First name:</span><br/>
        <input type="text" id="firstNameInput" 
            value={state.firstName}
            onChange={
                event => {
                    let newState = { ...state, firstName: event.currentTarget.value }
                    setState(newState)
                    param.model.setFirstName(newState.firstName)
                }
            }/>
        <br/>
        <span>Last name:</span><br/>
        <input type="text" id="lastNameInput" 
            value={state.lastName} 
            onChange={
                event => {
                    let newState = { ...state, lastName: event.currentTarget.value }
                    setState(newState)
                    param.model.setLastName(newState.lastName)
                }
            }/>
        <br/>
        <input type="submit" id="create" value="Add" onClick={event => param.model.add()}/>
    </div>
}

export default AddUserView
