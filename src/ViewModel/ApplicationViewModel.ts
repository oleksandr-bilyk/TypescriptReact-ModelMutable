class ApplicationViewModel{
    constructor(
        readonly addPerson: AddPersonModels,
        readonly donorsList: PersonListViewModel
    ){
        this.addPerson.getNewPersonEvent().add(this.onNewPerson)
    }

    private onNewPerson(person: Person){
        this.donorsList.Add(person)
    }
}