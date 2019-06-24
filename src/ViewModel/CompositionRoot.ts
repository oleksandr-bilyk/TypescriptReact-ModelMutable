import {ApplicationViewModel} from "./ApplicationViewModel"
import {PersonRepositoryMock} from "./../DataAccess/PersonRepositoryMock"
import {DonationRepositoryMock} from "./../DataAccess/DonationRepositoryMock"
import {PersonRepository} from "./../DataAccess/PersonRepository"
import {DonationRepository} from "./../DataAccess/DonationRepository"
import {
    PersonListViewModel,
    PersonViewModelFactory,
    PersonViewModel
} from "./DonorsListModels/PersonListViewModel"
import {
    DonationListViewModel,
    DonationListViewModelFactory
} from "./DonorsListModels/Donations/DonationListViewModel"

export function newApplicationViewModel(){
    let personRepository: PersonRepository = new PersonRepositoryMock();
    let donationRepository: DonationRepository = new DonationRepositoryMock();
    let donationListViewModelFactory: DonationListViewModelFactory = 
        personId => new DonationListViewModel(personId, donationRepository)
    let personViewModelFactory: PersonViewModelFactory = person => new PersonViewModel(
        person,
        donationListViewModelFactory
    )
    let personListViewModel = new PersonListViewModel(
        {
            personRepository: personRepository,
            donationRepository: donationRepository
        },
        personViewModelFactory
    )
    return new ApplicationViewModel(personListViewModel);
}