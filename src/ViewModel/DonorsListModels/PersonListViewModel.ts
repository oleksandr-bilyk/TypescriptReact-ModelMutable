import * as donationRepositoryInterface from "./../../DataAccess/DonationRepository";
import * as donationRepositoryMock from "./../../DataAccess/DonationRepositoryMock";
import * as personRepositoryInterface from "./../../DataAccess/PersonRepository";
import * as personRepositoryMock from "./../../DataAccess/PersonRepositoryMock";
import * as blodGroup from "./../../DomainModel/BlodGroup";
import * as person from "./../../DomainModel/Person";
import * as bloodGroupSelection from "./../../ViewModel/Common/BloodGroupModels/BloodGroupOptionalSelectionViewModel";
import * as objectEvents from "./../../ViewModel/Events/Event";
import * as donationListViewModel from "./Donations/DonationListViewModel";


export class PersonListViewModel {
    readonly bloodGroupFilter: bloodGroupSelection.BloodGroupOptionalSelectionViewModel
    private readonly personRepository: personRepositoryInterface.PersonRepository
    private readonly donationRepository: donationRepositoryInterface.DonationRepository
    private readonly itemsChangedEvent: objectEvents.EventArray<void> = new objectEvents.EventArray()
    private nameFilter: string = ""
    private itemsFiltered: PersonViewModel[] = []
    private itemSelected: PersonViewModel | null = null


    constructor() {
        this.personRepository = new personRepositoryMock.PersonRepositoryMock()
        this.donationRepository = new donationRepositoryMock.DonationRepositoryMock()

        this.bloodGroupFilter = new bloodGroupSelection.BloodGroupOptionalSelectionViewModel()
        this.bloodGroupFilter.getItemSelectedChanges().add((_) => this.updateItemsFiltered())

        this.updateItemsFiltered()
    }

    getItemsChangedEvent(): objectEvents.Event<void> { return this.itemsChangedEvent }

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

    Add(person: person.Person) {
        this.personRepository.AddPerson(person)

        this.updateItemsFiltered()
    }

    private onItemRemoving(item: PersonViewModel) {
        this.removePersonTransaction(item)
        this.updateItemsFiltered()
    }

    private newPersonViewModel(person: person.Person): PersonViewModel {
        var model = new PersonViewModel(person)
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

        return source.sort(person.PersonNameCompare.compare);
    }
}

export class PersonViewModel {
    private data: person.Person
    donations: donationListViewModel.DonationListViewModel
    private readonly removingEvent: objectEvents.EventArray<PersonViewModel> = new objectEvents.EventArray()

    constructor(person: person.Person) {
        this.data = person

        this.donations = new donationListViewModel.DonationListViewModel(person.id)
    }

    getRemovingEvent(): objectEvents.EventArray<PersonViewModel> { return this.removingEvent }

    getPersonId() { return this.data.id }

    getFirstName() { return this.data.firstName }

    getLastName() { return this.data.lastName }

    getBloodGroup() { return this.data.blodGroup }

    getTitle(): string {
        return this.data.firstName +
            " " +
            this.data.lastName +
            " | Group: " +
            blodGroup.title(this.data.blodGroup);
    }

    remove() {
        this.removingEvent.rise(this)
    }
}