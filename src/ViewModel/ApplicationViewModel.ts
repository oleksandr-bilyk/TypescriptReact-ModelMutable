import {AddPersonModels} from './AddPersonModels'
import {PersonListViewModel} from './DonorsListModels/PersonListViewModel'
import {Person} from './../DomainModel/Person'

export class ApplicationViewModel{
    addPerson: AddPersonModels
    donorsList: PersonListViewModel

    constructor(
        donorsList: PersonListViewModel
    ){
        this.addPerson = new AddPersonModels()
        this.donorsList = donorsList
        this.addPerson.getNewPersonEvent().add(this.onNewPerson.bind(this))
    }

    private onNewPerson(person: Person){
        this.donorsList.Add(person)
    }
}