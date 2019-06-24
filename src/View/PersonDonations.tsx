import React from 'react';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import { TextField, DefaultButton, DatePicker } from 'office-ui-fabric-react';
import {DonationListViewModel, DonationViewModel} from "./../ViewModel/DonorsListModels/Donations/DonationListViewModel"

type PersonDonationsParam = {
    model: DonationListViewModel
}

export class PersonDonations extends React.Component<PersonDonationsParam, any>
{
    constructor(param: PersonDonationsParam){
        super(param)

        param.model.itemsChanged.add(() => { this.onItemsChanged() })
    }

    public render(){
        return <Stack>
            <span>Donations of {this.props.model.personTitle}</span>
            <div>
                <h3>New Donation</h3>
                <DatePicker 
                    title="At" 
                    value={this.props.model.addForm.at}
                    onSelectDate={
                        (value) => {
                            this.props.model.addForm.at = value as Date
                            this.forceUpdate()
                        }
                    }
                    />
                <TextField 
                    label="Milliliters" 
                    value={this.props.model.addForm.milliliters.toString()} 
                    onChange={
                        (event, newValue) => {
                            this.props.model.addForm.milliliters = parseInt(newValue as string)
                            this.forceUpdate()
                        }
                    }/>
                <DefaultButton 
                    text="Add" 
                    style={{float: 'right'}} 
                    onClick={
                        (_)=>{
                            this.props.model.addForm.add()
                            this.forceUpdate()
                        }
                    }
                    />
            </div>
            <ul>
                {this.props.model.items.map(this.itemElement)}
            </ul>
        </Stack>
    }

    private itemElement = (item: DonationViewModel) =>{
        return <li key={item.data.at.toString()}>
            <span>{item.title}</span>
        </li>
    }

    private onItemsChanged = () => {
        this.forceUpdate()
    }
}