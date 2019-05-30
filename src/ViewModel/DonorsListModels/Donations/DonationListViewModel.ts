class DonationListViewModel{
    readonly addForm: AddDonationViewModel
    private readonly personId: PersonId
    private items: DonationViewModel[] = []
    private donationRepository: DonationRepository

    constructor(personId: PersonId){
        this.personId = personId
        this.donationRepository = new DonationRepositoryMock()

        this.addForm = new AddDonationViewModel()
        this.addForm.getNewDonationEvent().add(this.onNewDonation)
    }

    private onNewDonation(donation: Donation){
        this.donationRepository.Add(this.personId, donation)
        this.updateItems()
    }

    private updateItems(){
        this.items = this.donationRepository.GetDonorRecords(this.personId)
        .map(i => this.newDonationViewModel(i))
    }

    private newDonationViewModel(donation: Donation){
        let model = new DonationViewModel(donation)
        model.getRemovingEvent().add(this.onItemRemoving)
        return model
    }

    private onItemRemoving(item: DonationViewModel){
        this.donationRepository.RemoveByPersonAt(this.personId, item.data.at)
        this.updateItems()
    }
}