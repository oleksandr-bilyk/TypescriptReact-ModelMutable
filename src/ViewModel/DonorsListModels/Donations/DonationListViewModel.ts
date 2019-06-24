import {Donation} from './../../../DomainModel/Donation'
import {PersonId, Person} from './../../../DomainModel/Person'
import {AddDonationViewModel} from './AddDonationViewModel'
import {DonationRepository} from './../../../DataAccess/DonationRepository'
import {Event, EventArray} from './../../Events/Event'

export interface DenationListPerson{
    id: PersonId,
    nameTitle: string
}

export type DonationListViewModelFactory = (person: DenationListPerson) => DonationListViewModel

export class DonationListViewModel{
    readonly addForm: AddDonationViewModel
    private readonly person: DenationListPerson
    private _items: DonationViewModel[] = []
    private readonly itemsChangedEvent: EventArray<void> = new EventArray()
    private donationRepository: DonationRepository

    get itemsChanged(): Event<void> { return this.itemsChangedEvent } 

    constructor(person: DenationListPerson, donationRepository: DonationRepository){
        this.person = person
        this.donationRepository = donationRepository

        this.addForm = new AddDonationViewModel()
        this.addForm.getNewDonationEvent().add(this.onNewDonation.bind(this))
        this.updateItems()
    }

    get personTitle(): string { return this.person.nameTitle }

    private onNewDonation(donation: Donation){
        this.donationRepository.add(this.person.id, donation)
        this.updateItems()
    }

    get items(){ 
        return this._items 
    }

    private updateItems(){
        this._items = this.donationRepository.getDonorRecords(this.person.id)
        .map(i => this.newDonationViewModel(i))

        this.itemsChangedEvent.rise()
    }

    private newDonationViewModel(donation: Donation){
        let model = new DonationViewModel(donation)
        model.getRemovingEvent().add(this.onItemRemoving.bind(this))
        return model
    }

    private onItemRemoving(item: DonationViewModel){
        this.donationRepository.removeByPersonAt(this.person.id, item.data.at)
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

        var at = donation.at
        this.title = at.getFullYear()+'-'+at.getMonth()+'-'+at.getDate() + ", " + donation.volume + " ml";
    }
}