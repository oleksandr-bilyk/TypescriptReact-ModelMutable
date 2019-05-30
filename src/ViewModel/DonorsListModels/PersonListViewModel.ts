class PersonListViewModel{
    readonly bloodGroupFilter: BloodGroupOptionalSelectionViewModel
    private readonly personRepository: PersonRepository
    private readonly donationRepository: DonationRepository
    private readonly itemsChangedEvent: EventArray<void> = new EventArray()
    private nameFilter: string = ""
    private itemsFiltered: PersonViewModel[] = []
    private itemSelected: PersonViewModel | null = null


    constructor (
        
    ){
        this.personRepository = new PersonRepositoryMock()
        this.donationRepository = new DonationRepositoryMock()

        this.bloodGroupFilter = new BloodGroupOptionalSelectionViewModel()
        this.bloodGroupFilter.getItemSelectedChanges().add((_) => this.updateItemsFiltered())

        this.updateItemsFiltered()
    }

    getItemsChangedEvent(): Event<void> {return this.itemsChangedEvent}

    getItems(){ return this.itemsFiltered}

    getItemSelected(): PersonViewModel|null{ return this.itemSelected }

    setItemSelected(value: PersonViewModel|null){
        if (value != null && !this.itemsFiltered.includes(value)) throw Error("Unknown value.")
        
        this.itemSelected = value
    }

    getNameFilter() { return this.nameFilter }

    setNameFilter(value: string){
        if (this.nameFilter != value) return

        this.updateItemsFiltered()
    }

    Add(person: Person) {
        this.personRepository.AddPerson(person)

        this.updateItemsFiltered()
    }

    private newPersonViewModel(person: Person): PersonViewModel{
        var model = new PersonViewModel(person)
        model.getRemovingEvent().add(this.onItemRemoving)
        return model
    }

    private onItemRemoving(item: PersonViewModel){
        this.removePersonTransaction(item)
        this.updateItemsFiltered()
    }

    private removePersonTransaction(person: PersonViewModel){
        this.donationRepository.RemoveByPerson(person.getPersonId())
        this.personRepository.Remove(person.getPersonId())
    }
    
    private updateItemsFiltered(){
        this.setItemSelected(null)
        this.itemsFiltered = this.getFilteredList()
        this.itemsChangedEvent.rise()
    }

    private getFilteredList(): PersonViewModel[] {
        var source = this.personRepository.GetPersonList().map(this.newPersonViewModel);

        let nameFilterTrimmed = this.nameFilter.trim()
        if (nameFilterTrimmed.length > 0)
        {
            source = source.filter(
                i => i.getFirstName().includes(nameFilterTrimmed)
                    ||
                    i.getLastName().includes(nameFilterTrimmed)
            );
        }

        let bloodGroupFilter = this.bloodGroupFilter.getValue();
        if (bloodGroupFilter != null)
        {
            source = source.filter(i => i.getBloodGroup() == bloodGroupFilter);
        }

        return source.sort(PersonNameCompare.compare);
    }
}