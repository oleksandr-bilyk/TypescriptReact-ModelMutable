import {DonationRepository} from "./../../DataAccess/DonationRepository";
import {PersonRepository} from "./../../DataAccess/PersonRepository";
import {getBloodGroupTitle} from "./../../DomainModel/BlodGroup";
import {Person, PersonId, PersonNameCompare} from "./../../DomainModel/Person";
import {BloodGroupOptionalSelectionViewModel} from "./../../ViewModel/Common/BloodGroupModels/BloodGroupOptionalSelectionViewModel";
import {Event, EventArray} from "./../../ViewModel/Events/Event";
import {DonationListViewModel, DonationListViewModelFactory} from "./Donations/DonationListViewModel";

export interface DataAccessProvider{
    personRepository: PersonRepository
        
    donationRepository: DonationRepository
}

export class PersonListViewModel {
    private readonly personViewModelFactory: PersonViewModelFactory
    readonly bloodGroupFilter: BloodGroupOptionalSelectionViewModel
    private readonly personRepository: PersonRepository
    private readonly donationRepository: DonationRepository
    private readonly itemsChangedEvent: EventArray<void> = new EventArray()
    private _nameFilter: string = ""
    private itemsFiltered: PersonViewModel[] = []
    private _itemSelected: PersonViewModel | null = null

    constructor(
        dataAccess: DataAccessProvider,
        personViewModelFactory: PersonViewModelFactory
    ) {
        this.personViewModelFactory = personViewModelFactory
        this.personRepository = dataAccess.personRepository
        this.donationRepository = dataAccess.donationRepository

        this.bloodGroupFilter = new BloodGroupOptionalSelectionViewModel()
        this.bloodGroupFilter.itemSelectedChanged.add((_) => this.updateItemsFiltered())

        this.updateItemsFiltered()
    }

    get itemsChanged(): Event<void> { return this.itemsChangedEvent }

    getItemsCount() {return this.itemsFiltered.length }

    get items() { return this.itemsFiltered }

    public get itemSelected(): PersonViewModel | null { return this._itemSelected }

    public set itemSelected(value: PersonViewModel | null) {
        if (value != null && !this.itemsFiltered.includes(value)) throw Error("Unknown value.")

        this._itemSelected = value
    }

    get nameFilter() : string { return this._nameFilter }

    set nameFilter(value: string) {
        if (this._nameFilter != value) return

        this.updateItemsFiltered()
    }

    add(person: Person) {
        this.personRepository.AddPerson(person)

        this.updateItemsFiltered()
    }

    private onItemRemoving(item: PersonViewModel) {
        this.removePersonTransaction(item)
        this.updateItemsFiltered()
    }

    private newPersonViewModel(person: Person): PersonViewModel {
        var model = this.personViewModelFactory(person)
        model.getRemovingEvent().add(this.onItemRemoving.bind(this))
        return model
    }

    private removePersonTransaction(person: PersonViewModel) {
        this.donationRepository.removeByPerson(person.getPersonId())
        this.personRepository.Remove(person.getPersonId())
    }

    private updateItemsFiltered() {
        this.itemSelected = null
        this.itemsFiltered = this.getFilteredList()
        this.itemsChangedEvent.rise()
    }

    private getFilteredList(): PersonViewModel[] {
        var source = this.personRepository.GetPersonList().map(this.newPersonViewModel.bind(this));

        let nameFilterTrimmed = this._nameFilter.trim()
        if (nameFilterTrimmed.length > 0) {
            source = source.filter(
                i => i.firstName.includes(nameFilterTrimmed)
                    ||
                    i.lastName.includes(nameFilterTrimmed)
            );
        }

        let bloodGroupFilter = this.bloodGroupFilter.getValue();
        if (bloodGroupFilter != null) {
            source = source.filter(i => i.bloodGroup == bloodGroupFilter);
        }

        var s = source[0].firstName
        return source.sort(PersonNameCompare.compare);
    }
}

export type PersonViewModelFactory = (person: Person) => PersonViewModel

export class PersonViewModel {
    private data: Person
    public donations: DonationListViewModel
    private readonly removingEvent: EventArray<PersonViewModel> = new EventArray()

    constructor(
        person: Person,
        donationListViewModelFactory: DonationListViewModelFactory) {
        this.data = person

        this.donations = donationListViewModelFactory(person)
        this.key = person.id as string
    }

    key?: string | number

    getRemovingEvent(): EventArray<PersonViewModel> { return this.removingEvent }

    getPersonId() { return this.data.id }

    get firstName(): string { return this.data.firstName }

    get lastName() { return this.data.lastName }

    get bloodGroup() { return this.data.blodGroup }

    getTitle(): string {
        return this.data.firstName +
            " " +
            this.data.lastName +
            " | Group: " +
            getBloodGroupTitle(this.data.blodGroup);
    }

    remove() {
        this.removingEvent.rise(this)
    }
}