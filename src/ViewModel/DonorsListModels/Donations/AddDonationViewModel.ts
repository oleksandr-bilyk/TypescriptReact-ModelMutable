class AddDonationViewModel{
    at: Date = new Date
    milliliters: number = 100

    constructor(){}

    private readonly newDonation: EventArray<Donation> = new EventArray()
    getNewDonationEvent(): Event<Donation>{return this.newDonation}

    add(){
        if (this.newDonation != null){
            let model = new Donation(this.at, this.milliliters)
            this.newDonation.rise(model)
        }
    }
}