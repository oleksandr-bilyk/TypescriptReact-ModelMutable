import * as domainDonations from './../../../DomainModel/Donation'
import * as person from './../../../DomainModel/Person'
import * as addDonationViewModel from './AddDonationViewModel'
import * as donationRepositoryInterface from './../../../DataAccess/DonationRepository'
import * as donationRepositoryMock from './../../../DataAccess/DonationRepositoryMock'
import * as objectEvents from './../../Events/Event'
import * as donations from './../../../DomainModel/Donation'

export class DonationListViewModel{
    readonly addForm: addDonationViewModel.AddDonationViewModel
    private readonly personId: person.PersonId
    private items: DonationViewModel[] = []
    private donationRepository: donationRepositoryInterface.DonationRepository

    constructor(personId: person.PersonId){
        this.personId = personId
        this.donationRepository = new donationRepositoryMock.DonationRepositoryMock()

        this.addForm = new addDonationViewModel.AddDonationViewModel()
        this.addForm.getNewDonationEvent().add(this.onNewDonation.bind(this))
    }

    private onNewDonation(donation: domainDonations.Donation){
        this.donationRepository.Add(this.personId, donation)
        this.updateItems()
    }

    private updateItems(){
        this.items = this.donationRepository.GetDonorRecords(this.personId)
        .map(i => this.newDonationViewModel(i))
    }

    private newDonationViewModel(donation: domainDonations.Donation){
        let model = new DonationViewModel(donation)
        model.getRemovingEvent().add(this.onItemRemoving.bind(this))
        return model
    }

    private onItemRemoving(item: DonationViewModel){
        this.donationRepository.RemoveByPersonAt(this.personId, item.data.at)
        this.updateItems()
    }
}

export class DonationViewModel{
    readonly data: donations.Donation

    readonly title: string

    private readonly removing: objectEvents.EventArray<DonationViewModel> = new objectEvents.EventArray()
    getRemovingEvent(): objectEvents.Event<DonationViewModel>{ return this.removing}

    constructor(donation: donations.Donation){
        this.data = donation
        this.title = donation.at.toString() + ", " + donation.volume + " ml";
    }
}