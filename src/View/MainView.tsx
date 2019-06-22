import React from 'react';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import {PersonListViewModel, PersonViewModel} from '../ViewModel/DonorsListModels/PersonListViewModel'
import {Event} from "../ViewModel/Events/Event";
import {PersonFilter} from "./PersonFilter"

type MainParam = { model: PersonListViewModel }

export function Main(param: MainParam) {
    return <Stack>
        <PersonFilter model={param.model}/>
        <PersonList model={param.model}/>
    </Stack>
}

interface ItemsModel{
    getItems(): PersonViewModel[]
    itemsChanged: Event<void>
}

type ItemsParam = {
    model: ItemsModel
}

function PersonList(param: ItemsParam)
{
    let [state, setState] = React.useState(
        {
            model: param.model
        }
    )

    state.model.itemsChanged.add(
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