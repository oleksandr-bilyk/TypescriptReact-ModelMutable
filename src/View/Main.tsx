import React from 'react';
import {PersonListViewModel, PersonViewModel} from './../ViewModel/DonorsListModels/PersonListViewModel'
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import {Event} from "./../ViewModel/Events/Event";
import {PersonFilter} from "./PersonFilter"

type MainParam = { model: PersonListViewModel }

function Main(param: MainParam) {
    return <Stack>
        <PersonFilter model={param.model}/>
        <Items model={param.model}/>
    </Stack>
}

interface ItemsModel{
    getItems(): PersonViewModel[]
    getItemsChangedEvent(): Event<void>
}

type ItemsParam = {
    model: ItemsModel
}

function Items(param: ItemsParam)
{
    let [state, setState] = React.useState(
        {
            model: param.model
        }
    )

    state.model.getItemsChangedEvent().add(
        () => {
            setState(
                (prevState: {model: ItemsModel}) =>{
                    return {...prevState}
                }
            )
        }
    )

    let items = state.model.getItems().map(
        i => <li key={i.getPersonId().toString()}>{i.getTitle()}</li>
    );

    return <ul>{items}</ul>
}

export default Main
