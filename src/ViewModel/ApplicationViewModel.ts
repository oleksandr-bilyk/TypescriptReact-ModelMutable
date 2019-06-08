import * as addPersonModels from './AddPersonModels'
import * as personListViewModel from './DonorsListModels/PersonListViewModel'
import * as person from './../DomainModel/Person'

export class ApplicationViewModel{
    addPerson: addPersonModels.AddPersonModels
    donorsList: personListViewModel.PersonListViewModel

    constructor(){
        this.addPerson = new addPersonModels.AddPersonModels()
        this.donorsList = new personListViewModel.PersonListViewModel()
        this.addPerson.getNewPersonEvent().add(this.onNewPerson.bind(this))
    }

    private onNewPerson(person: person.Person){
        this.donorsList.Add(person)
    }
}