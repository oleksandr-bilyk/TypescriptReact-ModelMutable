export class BirthDateViewModel{
    constructor(){
        let now = new Date();
        let millisecPerDay = 1000 * 60 * 24
        this.minValue = new Date(now.getTime() - 365 * 150 * millisecPerDay);
        this.maxValue = now;
        this.date = this.maxValue;
    }

    readonly minValue: Date

    readonly maxValue: Date

    private date: Date

    getDate() {
        return this.date
    }

    setDate(value: Date)
    {
        if (value < this.minValue || value > this.maxValue)
        {
            return;
        }

        this.date = value;
    }
}