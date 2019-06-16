import * as blodGroup from "./../../../DomainModel/BlodGroup";
import * as objectEvents from "./../../Events/Event";

export class BloodGroupOptionalSelectionViewModel{
    public readonly items: BloodGroupOptionalViewModel[];
    private readonly itemSelectedChanges: objectEvents.EventArray<blodGroup.BlodGroup | null> =
        new objectEvents.EventArray();
    private itemSelected: BloodGroupOptionalViewModel;

    constructor(){
        this.items = [];
        const allCases = new BloodGroupOptionalViewModel("-- All --", null);
        this.items.push(allCases);
        this.itemSelected = allCases;
        blodGroup.getAllTitles().forEach(
            ([title, group]) => {
                this.items.push(new BloodGroupOptionalViewModel(title, group))
            }
        )
    }

    getItemSelectedChanges() : objectEvents.Event<blodGroup.BlodGroup | null> {return this.itemSelectedChanges}

    getItemSelected(){ return this.itemSelected }

    setItemSelected(value: BloodGroupOptionalViewModel){
        if (!this.items.includes(value)) throw Error("Unknown value.")

        this.itemSelected = value

        this.itemSelectedChanges.rise(this.getValue())
    }

    getValue(){ return this.itemSelected.value }
}

export class BloodGroupOptionalViewModel{
    constructor(
        readonly title: string, 
        readonly value: blodGroup.BlodGroup | null
    ){}
}