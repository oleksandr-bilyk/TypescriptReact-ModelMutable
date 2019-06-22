import {Event, EventArray} from './Events/Event'
import {BirthDateViewModel} from './Common/BirthDateViewModel'
import {GenderSelectionViewModel} from './Common/GenderSelectionViewModel'
import {BloodGroupRequiredSelectionViewModel} from './Common/BloodGroupModels/BloodGroupRequiredSelectionViewModel'
import {Person, newPersonId} from './../DomainModel/Person'

export class AddPersonModels{
    private _firstName: string = ''
    private _lastName: string = ''
    readonly birthDate: BirthDateViewModel
    readonly gender: GenderSelectionViewModel
    readonly blodGroup: BloodGroupRequiredSelectionViewModel

    constructor(){
        this.birthDate = new BirthDateViewModel()
        this.gender = new GenderSelectionViewModel()
        this.blodGroup = new BloodGroupRequiredSelectionViewModel()
    }

    get firstName():string{
        return this._firstName
    }

    set firstName(value: string){
        this._firstName = value
    }

    get firstNameError(): string | undefined {
        if (this._firstName.length > 0) return undefined;
        else return "First Name is required.";
    }

    get lastName():string{
        return this._lastName
    }

    set lastName(value: string){
        this._lastName = value
    }

    get lastNameError(): string | undefined {
        if (this._lastName.length > 0) return undefined;
        else return "Last Name is required.";
    }

    testError(){
        return this.firstNameError !== undefined || this.lastNameError !== undefined;
    }

    private readonly newPersonEvent: EventArray<Person> = new EventArray()

    getNewPersonEvent(): Event<Person>{return this.newPersonEvent}

    add(): void {
        let p = new Person(
            newPersonId(),
            this._firstName,
            this._lastName,
            this.birthDate.value,
            this.gender.getValue(),
            this.blodGroup.getValue()
        )

        this.newPersonEvent.rise(p)

        this._firstName = ''
        this._lastName = ''
    }
}