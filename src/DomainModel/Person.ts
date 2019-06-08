import * as blodGroup from './BlodGroup';
import * as guid from './../DomainModel/Guid'

export type PersonId = string & { readonly brand: unique symbol}

export function newPersonId(){ return <PersonId>guid.newGuid()}

export type Gender = 'male' | 'female'

export interface PersonName{
    getFirstName(): string
    getLastName(): string
}

export class PersonNameCompare{
    static compare<T extends PersonName>(a: T, b:T){
        var c = a.getFirstName().localeCompare(b.getFirstName())
        if (c != 0) return c
        else return a.getLastName().localeCompare(b.getLastName())
    }
}

export class Person implements PersonName{
    
    constructor(
        readonly id: PersonId,
        readonly firstName: string,
        readonly lastName: string,
        readonly birthDate: Date,
        readonly gender: Gender,
        readonly blodGroup: blodGroup.BlodGroup
    ){
    }

    getAge(): number{
        return new Date().getFullYear() - this.birthDate.getFullYear()
    }

    getFirstName(): string { return this.firstName }
    getLastName(): string { return this.lastName }
}