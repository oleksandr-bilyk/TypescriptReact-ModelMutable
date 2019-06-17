import React from 'react';
import { AddPersonModels } from '../ViewModel/AddPersonModels';
import { stat } from 'fs';
import { 
    TextField,
    PrimaryButton 
} from 'office-ui-fabric-react';
import { Stack, IStackProps } from 'office-ui-fabric-react/lib/Stack';

type AddUserViewParam = {
    model: AddPersonModels
}

type State = {
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

    return <Stack styles={{root:{width: 200}}}>
        <h2>Add user</h2>
        <TextField 
            label="First name:"
            errorMessage={param.model.getFirstNameError()}
            defaultValue={state.firstName} 
            onChange={
                (event, newValue)=>{
                    let newState = { ...state, firstName: newValue || "" }
                    setState(newState)
                    param.model.setFirstName(newState.firstName)
                }
            }
            />
        <TextField 
            label="Last name:" 
            defaultValue={state.lastName} 
            errorMessage={param.model.getLastNameError()}
            onChange={
                (event, newValue) => {
                    let newState = { ...state, lastName: newValue || "" }
                    setState(newState)
                    param.model.setLastName(newState.lastName)
                }
            }/>
        <br/>
        <PrimaryButton 
            disabled={param.model.testError()}
            text="Add" 
            onClick={event => param.model.add()} 
            styles={{root:{width:"75px", marginLeft:"auto"}}}/>
    </Stack>
}

export default AddUserView
