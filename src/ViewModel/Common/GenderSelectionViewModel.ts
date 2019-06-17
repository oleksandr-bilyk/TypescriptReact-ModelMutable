import {Gender} from './../../DomainModel/Person'

export class GenderSelectionViewModel{
    private itemSelected: GenderViewModel
    items: GenderViewModel[]
    
    constructor(){
        this.items = [
            new GenderViewModel("Male", "male"),
            new GenderViewModel("Female", "female")
        ]
        this.itemSelected = this.items[0]
    }

    getItemSelected(){ return this.itemSelected }
    
    setItemSelected(value: GenderViewModel){ 
        if (this.items.includes(value)){
            throw Error("Not known value.")
        }
        this.itemSelected = value
    }

    getValue(){return this.itemSelected.gender}
}

export class GenderViewModel{
    constructor(readonly title: string, readonly gender: Gender){}
}