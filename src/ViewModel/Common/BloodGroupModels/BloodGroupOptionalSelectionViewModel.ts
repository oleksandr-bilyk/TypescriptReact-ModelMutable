import {BlodGroup, getAllTitles} from "./../../../DomainModel/BlodGroup";
import {Event, EventArray} from "./../../Events/Event";

export class BloodGroupOptionalSelectionViewModel{
    public readonly items: BloodGroupOptionalViewModel[];
    private readonly itemSelectedChanges: EventArray<BlodGroup | null> =
        new EventArray();  
    private _itemSelected: BloodGroupOptionalViewModel;

    constructor(){
        this.items = [];
        const allCases = new BloodGroupOptionalViewModel("-- All --", null);
        this.items.push(allCases);
        this._itemSelected = allCases;
        getAllTitles().forEach(
            ([title, group]) => {
                this.items.push(new BloodGroupOptionalViewModel(title, group))
            }
        )
    }

    get itemSelectedChanged(): Event<BlodGroup | null> {return this.itemSelectedChanges}

    get itemSelected(): BloodGroupOptionalViewModel  { 
        return this._itemSelected 
    }

    set itemSelected(value: BloodGroupOptionalViewModel){
        if (!this.items.includes(value)) throw Error("Unknown value.")

        this._itemSelected = value

        this.itemSelectedChanges.rise(this.getValue())
    }

    selectItemByValue(value: BloodGroupOptionalViewModelValue) {
        for (var i in this.items){
            if (this.items[i].value == value){
                this.itemSelected = this.items[i]
                return;
            }
        }
        throw Error("Unknown value.")
    }

    getValue(){ return this._itemSelected.value }
}

export type BloodGroupOptionalViewModelValue = BlodGroup | null

export class BloodGroupOptionalViewModel{
    constructor(
        readonly title: string, 
        readonly value: BloodGroupOptionalViewModelValue
    ){}
}