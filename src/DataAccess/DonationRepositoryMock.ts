import * as donationRepository from './DonationRepository'
import * as person from './../DomainModel/Person'
import * as donation from './../DomainModel/Donation'

export class DonationRepositoryMock implements donationRepository.DonationRepository{
    private items: DbRecord[]

    constructor(){
        this.items = []
    }

    GetDonorRecords(personId: person.PersonId): donation.Donation[] {
        throw new Error("Method not implemented.");
    }    
    
    Add(personId: person.PersonId, record: donation.Donation): void {
        this.items.push(
            new DbRecord(
                personId,
                record.at,
                record.volume
            )
        )
    }

    RemoveByPersonAt(personId: person.PersonId, at: Date): void {
        this.removeByPredicate(item => item.personId === personId && item.at === at)
    }

    RemoveByPerson(personId: person.PersonId): void {
        this.removeByPredicate(item => item.personId === personId)
    }

    private removeByPredicate(predicate: (item: DbRecord) => boolean): void{
        for (let i = this.items.length - 1; i >=0; i--){
            let item = this.items[i]
            if (predicate(item)){
                delete this.items[i]
            }
        }
    }
}

class DbRecord {
    constructor(
        readonly personId: person.PersonId, 
        readonly at: Date, 
        readonly volume: donation.Volume) {
        
    }
}