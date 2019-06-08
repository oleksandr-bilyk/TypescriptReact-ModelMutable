import * as repositoryInterface from './PersonRepository'
import * as person from './../DomainModel/Person'
import * as donation from './../DomainModel/Donation'

export class PersonRepositoryMock implements repositoryInterface.PersonRepository {
    private items: person.Person[]

    constructor() {
        this.items = [
            new person.Person(
                <person.PersonId>'{CF9D1B11-89DA-4685-83A6-EBC817BF3ACE}', "Anna", "Bilyk",
                new Date(2009, 2, 25),
                "female", 1
            ),
            new person.Person(
                <person.PersonId>'{223CA3FC-20BE-47C9-BDEF-0048CFDD422C}', "Irina", "Bilyk",
                new Date(2015, 6, 24),
                "female", 2
            ),
            new person.Person(
                <person.PersonId>'{08E52D8A-72B0-48AB-B5FE-D55FD695DB2A}', "Nick", "Jakson",
                new Date(1999, 7, 25),
                "male", 4
            )
        ]
    }

    GetPersonList(): person.Person[] {
        return this.items
    }

    AddPerson(person: person.Person): void {
        this.items.push(person)
    }
    Remove(personId: string): void {
        this.removeByPredicate(item => item.id === personId)
    }
    Rename(personId: string, fistName: string, lastName: string): void {
        throw new Error("Method not implemented.");
    }

    private removeByPredicate(predicate: (item: person.Person) => boolean): void{
        for (let i = this.items.length - 1; i >=0; i--){
            let item = this.items[i]
            if (predicate(item)){
                delete this.items[i]
            }
        }
    }
}