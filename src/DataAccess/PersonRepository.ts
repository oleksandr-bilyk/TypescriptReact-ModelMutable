import * as domainPerson from './../DomainModel/Person'

export interface PersonRepository {
    GetPersonList(): domainPerson.Person[]
    AddPerson(person: domainPerson.Person): void
    Remove(personId: domainPerson.PersonId): void
    Rename(personId: domainPerson.PersonId, fistName: string, lastName: string): void
}