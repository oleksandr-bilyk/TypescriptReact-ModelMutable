import {Gender} from './../../DomainModel/Person'

export class GenderSelectionViewModel{
    private _itemSelected: GenderViewModel
    items: GenderViewModel[]
    
    constructor(){
        this.items = [
            new GenderViewModel("Male", "male"),
            new GenderViewModel("Female", "female")
        ]
        this._itemSelected = this.items[0]
    }

    get itemSelected(){ return this._itemSelected }
    
    set itemSelected(value: GenderViewModel){ 
        if (!this.items.includes(value)){
            throw Error("Not known value.")
        }
        
        this._itemSelected = value
    }

    setItemByValue(value: Gender){
        for (var i in this.items){
            let item = this.items[i]
            if (item.gender == value){
                this.itemSelected = item
                return;
            }
        }
        throw Error("Not known value.")
    }

    getValue(){return this._itemSelected.gender}
}

export class GenderViewModel{
    constructor(readonly title: string, readonly gender: Gender){}
}