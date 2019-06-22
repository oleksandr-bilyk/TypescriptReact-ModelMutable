import React from 'react';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import { 
    Dropdown,
    IDropdownOption,
} from 'office-ui-fabric-react';
import {
    BloodGroupOptionalSelectionViewModel, 
    BloodGroupOptionalViewModel,
    BloodGroupOptionalViewModelValue
} from "./../../ViewModel/Common/BloodGroupModels/BloodGroupOptionalSelectionViewModel";
import { BlodGroup } from '../../DomainModel/BlodGroup';

type BloodGroupOptionalParam = { model: BloodGroupOptionalSelectionViewModel }

export function BloodGroupOptionalSelection(param: BloodGroupOptionalParam){
    let [state, setState] = React.useState<BloodGroupOptionalParam>(param)

    return <Dropdown 
        label="Blood Group"
        options={
            param.model.items.map<IDropdownOption>(
                i => {
                    return {
                        key: getBloodGroupOptionPresentationModelKey(i.value) as string | number,
                        text: i.title
                    }
                }
            )
        }
        selectedKey = {getBloodGroupOptionPresentationModelKey(param.model.itemSelected.value)}
        onChange = {(event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption, index?: number) => {
            if (option !== undefined)
            {
                let group = getBloodGroupOptionPresentationModelValue(option.key);
                param.model.selectItemByValue(group);
                setState({...param});
            }
        }}
        />
}

const bloodGroupOptionPresentationModelKeyNull = "null"
function getBloodGroupOptionPresentationModelKey(value: BloodGroupOptionalViewModelValue): string | number{
    if (value == null) return bloodGroupOptionPresentationModelKeyNull;
    else return value as number;
}
function getBloodGroupOptionPresentationModelValue(key: string | number): BloodGroupOptionalViewModelValue{
    if (typeof key === 'string')
    {
        if (key === bloodGroupOptionPresentationModelKeyNull) return null;
        else throw Error("Unexpected string")
    }
    else {
        return key as number as BlodGroup
    }
}