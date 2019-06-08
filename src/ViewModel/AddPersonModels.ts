import * as objectEvents from './Events/Event'
import * as birthDateViewModel from './Common/BirthDateViewModel'
import * as genderSelectionViewModel from './Common/GenderSelectionViewModel'
import * as bloodGroupRequiredSelectionViewModel from './Common/BloodGroupModels/BloodGroupRequiredSelectionViewModel'
import * as person from './../DomainModel/Person'

export class AddPersonModels{
    private firstName: string = ''
    private lastName: string = ''
    readonly birthDate: birthDateViewModel.BirthDateViewModel
    readonly gender: genderSelectionViewModel.GenderSelectionViewModel
    readonly blodGroup: bloodGroupRequiredSelectionViewModel.BloodGroupRequiredSelectionViewModel

    constructor(){
        this.birthDate = new birthDateViewModel.BirthDateViewModel()
        this.gender = new genderSelectionViewModel.GenderSelectionViewModel()
        this.blodGroup = new bloodGroupRequiredSelectionViewModel.BloodGroupRequiredSelectionViewModel()
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

    private readonly newPersonEvent: objectEvents.EventArray<person.Person> = new objectEvents.EventArray()

    getNewPersonEvent(): objectEvents.Event<person.Person>{return this.newPersonEvent}

    add(): void{
        let p = new person.Person(
            person.newPersonId(),
            this.firstName,
            this.lastName,
            this.birthDate.getDate(),
            this.gender.getValue(),
            this.blodGroup.getValue()
        )

        this.newPersonEvent.rise(p)

        this.firstName = ''
        this.lastName = ''
    }
}