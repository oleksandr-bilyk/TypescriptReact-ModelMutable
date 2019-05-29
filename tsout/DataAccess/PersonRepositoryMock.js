"use strict";
class PersonRepositoryMock {
    constructor() {
        this.items = [
            new Person('{CF9D1B11-89DA-4685-83A6-EBC817BF3ACE}', "Anna", "Bilyk", new Date(2009, 2, 25), "female", 1),
            new Person('{223CA3FC-20BE-47C9-BDEF-0048CFDD422C}', "Irina", "Bilyk", new Date(2015, 6, 24), "female", 2),
            new Person('{08E52D8A-72B0-48AB-B5FE-D55FD695DB2A}', "Nick", "Jakson", new Date(1999, 7, 25), "male", 4)
        ];
    }
    GetPersonList() {
        return this.items;
    }
    AddPerson(person) {
        this.items.push(person);
    }
    Remove(personId) {
        this.removeByPredicate(item => item.id === personId);
    }
    Rename(personId, fistName, lastName) {
        throw new Error("Method not implemented.");
    }
    removeByPredicate(predicate) {
        for (let i = this.items.length - 1; i >= 0; i--) {
            let item = this.items[i];
            if (predicate(item)) {
                delete this.items[i];
            }
        }
    }
}
//# sourceMappingURL=PersonRepositoryMock.js.map