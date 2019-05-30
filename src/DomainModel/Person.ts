type PersonId = string

type Gender = 'male' | 'female'

type BlodGroup = 1 | 2 | 3 | 4

class Person implements PersonName{
    
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

    getFirstName(): string { return this.firstName }
    getLastName(): string { return this.lastName }
}