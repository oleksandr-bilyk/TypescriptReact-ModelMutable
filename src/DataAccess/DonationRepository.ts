import {PersonId} from './../DomainModel/Person'
import {Donation} from './../DomainModel/Donation'

export interface DonationRepository
{
    getDonorRecords(personId:  PersonId): Donation[]
    add(personId: PersonId, record: Donation): void
    removeByPersonAt(personId: PersonId, at: Date): void
    removeByPerson(personId: PersonId): void
}