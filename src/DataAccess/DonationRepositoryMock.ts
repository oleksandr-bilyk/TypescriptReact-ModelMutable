import {DonationRepository} from './DonationRepository'
import {PersonId} from './../DomainModel/Person'
import {Donation, Volume} from './../DomainModel/Donation'

export class DonationRepositoryMock implements DonationRepository{
    private items: DbRecord[]

    constructor(){
        this.items = []
    }

    GetDonorRecords(personId: PersonId): Donation[] {
        throw new Error("Method not implemented.");
    }    
    
    Add(personId: PersonId, record: Donation): void {
        this.items.push(
            new DbRecord(
                personId,
                record.at,
                record.volume
            )
        )
    }

    RemoveByPersonAt(personId: PersonId, at: Date): void {
        this.removeByPredicate(item => item.personId === personId && item.at === at)
    }

    RemoveByPerson(personId: PersonId): void {
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
        readonly personId: PersonId, 
        readonly at: Date, 
        readonly volume: Volume) {
    }
}