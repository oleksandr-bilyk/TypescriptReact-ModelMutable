import {DonationRepository} from "./../../DataAccess/DonationRepository";
import {PersonRepository} from "./../../DataAccess/PersonRepository";
import {getBloodGroupTitle} from "./../../DomainModel/BlodGroup";
import {Person, PersonId, PersonNameCompare} from "./../../DomainModel/Person";
import {BloodGroupOptionalSelectionViewModel} from "./../../ViewModel/Common/BloodGroupModels/BloodGroupOptionalSelectionViewModel";
import {Event, EventArray} from "./../../ViewModel/Events/Event";
import {DonationListViewModel} from "./Donations/DonationListViewModel";

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
    private nameFilter: string = ""
    private itemsFiltered: PersonViewModel[] = []
    private itemSelected: PersonViewModel | null = null

    constructor(
        dataAccess: DataAccessProvider,
        personViewModelFactory: PersonViewModelFactory
    ) {
        this.personViewModelFactory = personViewModelFactory
        this.personRepository = dataAccess.personRepository
        this.donationRepository = dataAccess.donationRepository

        this.bloodGroupFilter = new BloodGroupOptionalSelectionViewModel()
        this.bloodGroupFilter.getItemSelectedChanges().add((_) => this.updateItemsFiltered())

        this.updateItemsFiltered()
    }

    getItemsChangedEvent(): Event<void> { return this.itemsChangedEvent }

    getItems() { return this.itemsFiltered }

    getItemSelected(): PersonViewModel | null { return this.itemSelected }

    setItemSelected(value: PersonViewModel | null) {
        if (value != null && !this.itemsFiltered.includes(value)) throw Error("Unknown value.")

        this.itemSelected = value
    }

    getNameFilter() { return this.nameFilter }

    setNameFilter(value: string) {
        if (this.nameFilter != value) return

        this.updateItemsFiltered()
    }

    Add(person: Person) {
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
        this.donationRepository.RemoveByPerson(person.getPersonId())
        this.personRepository.Remove(person.getPersonId())
    }

    private updateItemsFiltered() {
        this.setItemSelected(null)
        this.itemsFiltered = this.getFilteredList()
        this.itemsChangedEvent.rise()
    }

    private getFilteredList(): PersonViewModel[] {
        var source = this.personRepository.GetPersonList().map(this.newPersonViewModel.bind(this));

        let nameFilterTrimmed = this.nameFilter.trim()
        if (nameFilterTrimmed.length > 0) {
            source = source.filter(
                i => i.getFirstName().includes(nameFilterTrimmed)
                    ||
                    i.getLastName().includes(nameFilterTrimmed)
            );
        }

        let bloodGroupFilter = this.bloodGroupFilter.getValue();
        if (bloodGroupFilter != null) {
            source = source.filter(i => i.getBloodGroup() == bloodGroupFilter);
        }

        return source.sort(PersonNameCompare.compare);
    }
}

export type PersonViewModelFactory = (person: Person) => PersonViewModel

export type DonationListViewModelFactory = (personId: PersonId) => DonationListViewModel

export class PersonViewModel {
    private data: Person
    donations: DonationListViewModel
    private readonly removingEvent: EventArray<PersonViewModel> = new EventArray()

    constructor(
        person: Person,
        donationListViewModelFactory: DonationListViewModelFactory) {
        this.data = person

        this.donations = donationListViewModelFactory(person.id)
    }

    getRemovingEvent(): EventArray<PersonViewModel> { return this.removingEvent }

    getPersonId() { return this.data.id }

    getFirstName() { return this.data.firstName }

    getLastName() { return this.data.lastName }

    getBloodGroup() { return this.data.blodGroup }

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