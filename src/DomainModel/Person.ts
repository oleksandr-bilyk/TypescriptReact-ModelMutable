import {BlodGroup} from './BlodGroup';
import {newGuid} from './../DomainModel/Guid'

export type PersonId = string & { readonly brand: unique symbol}

export function newPersonId(){ return <PersonId>newGuid()}

export type Gender = 'male' | 'female'

export interface PersonName{
    firstName: string
    lastName: string
}

export class PersonNameCompare{
    static compare<T extends PersonName>(a: T, b:T){
        var c = a.firstName.localeCompare(b.firstName)
        if (c != 0) return c
        else return a.lastName.localeCompare(b.lastName)
    }
}

export class Person implements PersonName{
    
    constructor(
        readonly id: PersonId,
        readonly firstName: string,
        readonly lastName: string,
        readonly birthDate: Date,
        readonly gender: Gender,
        readonly blodGroup: BlodGroup
    ){
    }

    get nameTitle(): string  {return this.firstName + " " + this.lastName}

    getAge(): number{
        return new Date().getFullYear() - this.birthDate.getFullYear()
    }
}