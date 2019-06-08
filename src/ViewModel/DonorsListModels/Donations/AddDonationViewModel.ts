import * as objectEvents from './../../Events/Event'
import * as domainDonations from './../../../DomainModel/Donation'

export class AddDonationViewModel{
    at: Date = new Date
    milliliters: number = 100

    constructor(){}

    private readonly newDonation: objectEvents.EventArray<domainDonations.Donation> = new objectEvents.EventArray()
    getNewDonationEvent(): objectEvents.Event<domainDonations.Donation>{return this.newDonation}

    add(){
        if (this.newDonation != null){
            let model = new domainDonations.Donation(this.at, this.milliliters)
            this.newDonation.rise(model)
        }
    }
}