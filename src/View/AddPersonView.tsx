import React from 'react';
import * as AddPersonModels from '../ViewModel/AddPersonModels';
import { stat } from 'fs';

type AddUserViewParam = {
    model: AddPersonModels.AddPersonModels
}

function AddUserView(param: AddUserViewParam) {
    const [firstName, firstNameSetState] = React.useState<string>(() => param.model.getFirstName())
    const [lastName, lastNameSetState] = React.useState<string>(() => param.model.getLastName())

    return <div>
        <h2>Add user</h2>
        <span>First name:</span><br/>
        <input type="text" id="firstNameInput" 
            value={firstName}
            onChange={
                event => {
                    firstNameSetState(event.currentTarget.value)
                    param.model.setFirstName(event.currentTarget.value)
                }
            }/>
        <br/>
        <span>Last name:</span><br/>
        <input type="text" id="lastNameInput" 
            value={lastName} 
            onChange={
                event => {
                    lastNameSetState(event.currentTarget.value)
                    param.model.setLastName(event.currentTarget.value)
                }
            }/>
        <br/>
        <input type="submit" id="create" value="Add" onClick={event => param.model.add()}/>
    </div>
}

export default AddUserView
