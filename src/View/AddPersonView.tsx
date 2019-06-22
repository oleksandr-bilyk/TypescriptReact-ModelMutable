import React from 'react';
import { AddPersonModels } from '../ViewModel/AddPersonModels';
import { 
    TextField,
    PrimaryButton, 
    Dropdown,
    IDropdownOption
} from 'office-ui-fabric-react';
import { DatePicker, } from 'office-ui-fabric-react/lib/DatePicker';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import { Gender } from '../DomainModel/Person'

type AddUserViewParam = {
    model: AddPersonModels
}

type AddUserViewState = {
    model: AddPersonModels
}

function AddUserView(param: AddUserViewParam) {
    const [state, setState] = React.useState<AddUserViewState>(
        () => {
            return { model: param.model }
        }
    )

    return <Stack styles={{root:{width: 200}}}>
        <h2>Add user</h2>
        <TextField 
            label="First name:"
            errorMessage={param.model.firstNameError}
            value={param.model.firstName}
            onChange={
                (event, newValue)=>{
                    param.model.firstName = newValue || ""
                    setState({ ...state })
                }
            }
            />
        <TextField 
            label="Last name:" 
            value={param.model.lastName} 
            errorMessage={param.model.lastNameError}
            onChange={
                (event, newValue) => {
                    param.model.lastName = newValue || ""
                    setState({ ...state })
                }
            }/>
        <DatePicker
            label="Birth date"
            minDate={param.model.birthDate.minValue}
            maxDate={param.model.birthDate.maxValue}
            value={param.model.birthDate.value} 
            onSelectDate={
                (value) => {
                    param.model.birthDate.value = value as Date;
                    setState({ ...state })
                }
            }
             />
        <Dropdown
            label="Gender"
            options={
                param.model.gender.items.map<IDropdownOption>(
                    i => { return {key: i.gender, text: i.title} }
                )
            }
            selectedKey = { param.model.gender.itemSelected.gender as string }
            onChange = {
                (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption, index?: number) => {
                    if (option !== undefined)
                    {
                        param.model.gender.setItemByValue(option.key as string as Gender);
                        setState({...param});
                    }
                }
            }
        />
        <PrimaryButton 
            disabled={param.model.testError()}
            text="Add" 
            onClick={
                event => {
                    param.model.add()
                    setState({ ...state })
                }
            } 
            styles={{root:{width:"75px", marginLeft:"auto"}}}/>
    </Stack>
}

export default AddUserView
