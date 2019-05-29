interface PersonRepository {
    GetPersonList(): Person[]
    AddPerson(person: Person): void
    Remove(personId: PersonId): void
    Rename(personId: PersonId, fistName: string, lastName: string): void
}