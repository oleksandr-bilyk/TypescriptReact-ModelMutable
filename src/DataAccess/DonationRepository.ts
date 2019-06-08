import * as domainPerson from './../DomainModel/Person'
import * as domainDonation from './../DomainModel/Donation'

export interface DonationRepository
{
    GetDonorRecords(personId:  domainPerson.PersonId): domainDonation.Donation[]
    Add(personId: domainPerson.PersonId, record: domainDonation.Donation): void
    RemoveByPersonAt(personId: domainPerson.PersonId, at: Date): void
    RemoveByPerson(personId: domainPerson.PersonId): void
}