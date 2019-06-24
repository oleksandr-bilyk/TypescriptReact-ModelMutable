import React from 'react';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import {PersonListViewModel, PersonViewModel} from '../ViewModel/DonorsListModels/PersonListViewModel'
import {Event as MyEvent} from "../ViewModel/Events/Event";
import {PersonFilter} from "./PersonFilter"
import { List, } from 'office-ui-fabric-react/lib/List';
import { mergeStyleSets, IRawStyle } from 'office-ui-fabric-react/lib/Styling';
import { DefaultButton } from 'office-ui-fabric-react';
import {PersonDonations} from './PersonDonations'

const commonStyles: IRawStyle = {
    display: 'inline-block',
    cursor: 'default',
    boxSizing: 'border-box',
    verticalAlign: 'top',
    background: 'none',
    backgroundColor: 'transparent',
    border: 'none'
  };
  const classNames = mergeStyleSets({
    item: {
      selectors: {
        '&:hover': { background: '#eee' }
      }
    },
    // Overwrites the default style for Button
    check: [commonStyles, { padding: '11px 8px' }],
    cell: [
      commonStyles,
      {
        overflow: 'hidden',
        height: 36,
        padding: 8
      }
    ]
  });

type MainParam = { model: PersonListViewModel }

export function Main(param: MainParam) {
    return <Stack>
        <PersonFilter model={param.model}/>
        <PersonList model={param.model}/>
    </Stack>
}

interface PersonListModel{
    items: PersonViewModel[]
    itemSelected: PersonViewModel | null
    itemsChanged: MyEvent<void>
}

type PersonListParam = {
    model: PersonListModel
}

class PersonList extends React.Component<PersonListParam, any>
{
    constructor(param: PersonListParam){
        super(param)

        param.model.itemsChanged.add(this.onItemsChanged)
    }
    private onItemsChanged = () => {
        this.forceUpdate()
    }

    public render(){
        return <div>
          <div>
            <div style={{width: 'auto', float:"right"}}>
              {
                this.props.model.itemSelected !== null && 
                <PersonDonations 
                  model={(this.props.model.itemSelected as PersonViewModel).donations}/>
              }
            </div>
            <div style={{width: 'auto', height: '100px'}}>
              <List 
                items={this.props.model.items} 
                onRenderCell={
                    (item, index, isScrolling) => 
                        this._onRenderCell(item as PersonViewModel, index as number)
                }
                getKey={this.getKey}
              />
            </div>
            
          </div>
        </div>
    }

    private getKey = (item: PersonViewModel, index?: number)=> { 
        return item.getPersonId() as string
    }

    private _onRenderCell(item: PersonViewModel, index: number){
        return <Stack horizontal>
            <div style={{minWidth: 200}}>{item.getTitle()}</div>
            <DefaultButton text="Donations" onClick={(_) =>{this.onDonationsOpenButtonClick(item)}}/>
        </Stack>
    }

    private onDonationsOpenButtonClick(item: PersonViewModel)
    {
      this.props.model.itemSelected = item
      this.forceUpdate();
    }
}