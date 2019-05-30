class DonationViewModel{
    readonly data: Donation

    readonly title: string

    private readonly removing: EventArray<DonationViewModel> = new EventArray()
    getRemovingEvent(): Event<DonationViewModel>{ return this.removing}

    constructor(donation: Donation){
        this.data = donation
        this.title = donation.at.toString() + ", " + donation.volume + " ml";
    }
}