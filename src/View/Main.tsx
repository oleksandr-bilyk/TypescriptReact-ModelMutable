import React from 'react';
import * as ApplicationViewModel from './../ViewModel/ApplicationViewModel';
import {PersonListViewModel} from './../ViewModel/DonorsListModels/PersonListViewModel'
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import { filter } from 'minimatch';

type MainParam = {
    model: PersonListViewModel
}

function Main(param: MainParam) {
    return <Stack>
        <Filter model={param.model}/>
        <Items model={param.model}/>
    </Stack>
}

function Filter(param: MainParam){
    return <Stack>
        <h3>
            {"Donors Filter (" + param.model.getItems().length + " items)"}
        </h3>
        <Stack horizontal>
            <span>Name Fileter</span>
            <span>Blood Group Filter</span>
        </Stack>
    </Stack>
}

function Items(param: MainParam)
{
    let [state, setState] = React.useState(
        {
            model: param.model
        }
    )

    state.model.getItemsChangedEvent().add(
        () => {
            setState(
                (prevState: {model: PersonListViewModel}) =>{
                    return {...prevState}
                }
            )
        }
    )

    let items = state.model.getItems().map(
        i => <li key={i.getPersonId()}>{i.getTitle()}</li>
    );

    return <ul>{items}</ul>
}

export default Main
