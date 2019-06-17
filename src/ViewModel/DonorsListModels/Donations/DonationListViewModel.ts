import {Donation} from './../../../DomainModel/Donation'
import {PersonId} from './../../../DomainModel/Person'
import {AddDonationViewModel} from './AddDonationViewModel'
import {DonationRepository} from './../../../DataAccess/DonationRepository'
import {DonationRepositoryMock} from './../../../DataAccess/DonationRepositoryMock'
import {Event, EventArray} from './../../Events/Event'

export class DonationListViewModel{
    readonly addForm: AddDonationViewModel
    private readonly personId: PersonId
    private items: DonationViewModel[] = []
    private donationRepository: DonationRepository

    constructor(personId: PersonId, donationRepository: DonationRepository){
        this.personId = personId
        this.donationRepository = donationRepository

        this.addForm = new AddDonationViewModel()
        this.addForm.getNewDonationEvent().add(this.onNewDonation.bind(this))
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
        model.getRemovingEvent().add(this.onItemRemoving.bind(this))
        return model
    }

    private onItemRemoving(item: DonationViewModel){
        this.donationRepository.RemoveByPersonAt(this.personId, item.data.at)
        this.updateItems()
    }
}

export class DonationViewModel{
    readonly data: Donation

    readonly title: string

    private readonly removing: EventArray<DonationViewModel> = new EventArray()
    getRemovingEvent(): Event<DonationViewModel>{ return this.removing}

    constructor(donation: Donation){
        this.data = donation
        this.title = donation.at.toString() + ", " + donation.volume + " ml";
    }
}