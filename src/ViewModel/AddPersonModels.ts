import {Event, EventArray} from './Events/Event'
import {BirthDateViewModel} from './Common/BirthDateViewModel'
import {GenderSelectionViewModel} from './Common/GenderSelectionViewModel'
import {BloodGroupRequiredSelectionViewModel} from './Common/BloodGroupModels/BloodGroupRequiredSelectionViewModel'
import {Person, newPersonId} from './../DomainModel/Person'

export class AddPersonModels{
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
    getFirstNameError(): string | undefined {
        if (this.firstName.length > 0) return undefined;
        else return "First Name is required.";
    }

    getLastName():string{
        return this.lastName
    }

    setLastName(value: string){
        this.lastName = value
    }

    getLastNameError(): string | undefined {
        if (this.lastName.length > 0) return undefined;
        else return "Last Name is required.";
    }

    testError(){
        return this.getFirstNameError() !== undefined || this.getLastNameError() !== undefined;
    }

    private readonly newPersonEvent: EventArray<Person> = new EventArray()

    getNewPersonEvent(): Event<Person>{return this.newPersonEvent}

    add(): void{
        let p = new Person(
            newPersonId(),
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