import React from 'react';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import { 
    TextField,
    IDropdownOption,
    IDropdownStyles,
} from 'office-ui-fabric-react';
import {
    BloodGroupOptionalSelectionViewModel, 
} from "./../ViewModel/Common/BloodGroupModels/BloodGroupOptionalSelectionViewModel";
import {BloodGroupOptionalSelection} from "./Common/BloodGroupOptionalSelection"

interface PersonFilterModel{
    getItemsCount() : number

    nameFilter : string;

    readonly bloodGroupFilter: BloodGroupOptionalSelectionViewModel
}

type PersonFilterParam = { model: PersonFilterModel }

 
export function PersonFilter(param: PersonFilterParam){
    const dropdownStyles: Partial<IDropdownStyles> = {
        dropdown: { width: 200 }
      };

    return <Stack>
        <h3>
            {"Donors Filter (" + param.model.getItemsCount() + " items)"}
        </h3>
        <Stack horizontal>
            <TextField 
                label="Name:"
                defaultValue={param.model.nameFilter} 
                onChange={
                    (event, newValue)=>{
                        param.model.nameFilter = newValue || "" 
                    }
                }
                styles={dropdownStyles}
                />
            <BloodGroupOptionalSelection model={param.model.bloodGroupFilter} />
        </Stack>
    </Stack>
}