"use strict";
class DonationRepositoryMock {
    constructor() {
        this.items = [];
    }
    GetDonorRecords(personId) {
        throw new Error("Method not implemented.");
    }
    Add(personId, record) {
        this.items.push(new DbRecord(personId, record.at, record.volume));
    }
    RemoveByPersonAt(personId, at) {
        this.removeByPredicate(item => item.personId === personId && item.at === at);
    }
    RemoveByPerson(personId) {
        this.removeByPredicate(item => item.personId === personId);
    }
    removeByPredicate(predicate) {
        for (let i = this.items.length - 1; i >= 0; i--) {
            let item = this.items[i];
            if (predicate(item)) {
                delete this.items[i];
            }
        }
    }
}
class DbRecord {
    constructor(personId, at, volume) {
        this.personId = personId;
        this.at = at;
        this.volume = volume;
    }
}
//# sourceMappingURL=DonationRepositoryMock.js.map