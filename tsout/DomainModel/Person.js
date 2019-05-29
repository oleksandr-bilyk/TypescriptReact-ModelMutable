"use strict";
class Person {
    constructor(id, firstName, lastName, birthDate, gender, blodGroup) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthDate = birthDate;
        this.gender = gender;
        this.blodGroup = blodGroup;
    }
    getAge() {
        return new Date().getFullYear() - this.birthDate.getFullYear();
    }
}
function PersonNameCompare(a, b) {
    if (a.firstName > b.firstName)
        return true;
    else if (a.firstName === b.firstName)
        return a.lastName > b.lastName;
    else
        return false;
}
//# sourceMappingURL=Person.js.map