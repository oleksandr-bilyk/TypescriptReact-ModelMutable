interface PersonName{
    getFirstName(): string
    getLastName(): string
}

class PersonNameCompare{
    static compare<T extends PersonName>(a: T, b:T){
        var c = a.getFirstName().localeCompare(b.getFirstName())
        if (c != 0) return c
        else return a.getLastName().localeCompare(b.getLastName())
    }
}