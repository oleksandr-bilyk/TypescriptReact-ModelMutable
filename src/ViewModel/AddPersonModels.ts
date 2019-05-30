class AddPersonModels{
    private firstName: string = ''
    private lastName: string = ''
    readonly birthDate: BirthDateViewModel
    readonly gender: GenderSelectionViewModel
    readonly blodGroup: BloodGroupRequiredSelectionViewModel

    constructor(){
        this.birthDate = new BirthDateViewModel()
        this.gender = new GenderSelectionViewModel()
        this.blodGroup = new BloodGroupRequiredSelectionViewModel()
    }

    getFirstName():string{
        return this.firstName
    }

    setFirstName(value: string){
        this.firstName = value
    }

    getLastName():string{
        return this.lastName
    }

    setLastName(value: string){
        this.lastName = value
    }

    private readonly newPersonEvent: EventArray<Person> = new EventArray()

    getNewPersonEvent(): Event<Person>{return this.newPersonEvent}

    public add(): void{
        let person = new Person(
            Guid.newGuid(),
            this.firstName,
            this.lastName,
            new Date(),
            "male",
            1
        )

        this.newPersonEvent.rise(person)

        this.firstName = ''
        this.lastName = ''
    }
}