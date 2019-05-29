interface DonationRepository
{
    GetDonorRecords(personId: PersonId): Donation[]
    Add(personId: PersonId, record: Donation): void
    RemoveByPersonAt(personId: PersonId, at: Date): void
    RemoveByPerson(personId: PersonId): void
}