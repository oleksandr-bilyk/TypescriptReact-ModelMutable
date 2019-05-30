class BloodGroupRequiredSelectionViewModel{
    readonly items: BloodGroupRequiredViewModel[]
    private readonly itemSelectedChanges: EventArray<BlodGroup> = new EventArray()
    private itemSelected: BloodGroupRequiredViewModel

    constructor(){
        let mostPopularGroupForUserSelection = 2;
        this.items = BloodGroupPresentationLogic.getAllTitles().map(
            ([title, group]) => new BloodGroupRequiredViewModel(title, group)
        )
        this.itemSelected = this.items[this.items.findIndex(i => i.value == mostPopularGroupForUserSelection)]
    }

    getItemSelectedChanges() : Event<BlodGroup> {return this.itemSelectedChanges}

    getItemSelected(){ return this.itemSelected }

    setItemSelected(value: BloodGroupRequiredViewModel){
        if (!this.items.includes(value)) throw Error("Unknown value.")

        this.itemSelected = value

        this.itemSelectedChanges.rise(this.getValue())
    }

    getValue(){ return this.itemSelected.value }
}


class BloodGroupRequiredViewModel{
    constructor(
        readonly title: string, 
        readonly value: BlodGroup
    ){}
}