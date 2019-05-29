type PersonId = string

type Gender = 'male' | 'female'

type BlodGroup = 1 | 2 | 3 | 4

class Person{
    constructor(
        readonly id: PersonId,
        readonly firstName: string,
        readonly lastName: string,
        readonly birthDate: Date,
        readonly gender: Gender,
        readonly blodGroup: BlodGroup
    ){

    }

    getAge(): number{
        return new Date().getFullYear() - this.birthDate.getFullYear()
    }
}

function PersonNameCompare(a: Person, b: Person) : boolean{
    if (a.firstName > b.firstName) return true
    else if (a.firstName === b.firstName) return a.lastName > b.lastName
    else return false
}