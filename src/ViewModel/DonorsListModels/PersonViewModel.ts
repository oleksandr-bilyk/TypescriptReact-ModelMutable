class PersonViewModel{
    private data: Person
    donations: DonationListViewModel
    private readonly removingEvent: EventArray<PersonViewModel> = new EventArray()

    constructor(person: Person){
        this.data = person

        this.donations = new DonationListViewModel(person.id)
    }

    getRemovingEvent(): Event<PersonViewModel>{return this.removingEvent}

    getPersonId(){return this.data.id}

    getFirstName() { return this.data.firstName }

    getLastName() { return this.data.lastName }

    getBloodGroup() { return this.data.blodGroup }

    getTitle(): string{
        return this.data.firstName + 
            " " + 
            this.data.lastName + 
            " | Group: " + 
            BloodGroupPresentationLogic.title(this.data.blodGroup);
    }

    remove(){
        this.removingEvent.rise(this)
    }
}