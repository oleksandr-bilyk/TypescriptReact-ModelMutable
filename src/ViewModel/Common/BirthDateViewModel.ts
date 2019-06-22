export class BirthDateViewModel{
    constructor(){
        let now = new Date();
        let millisecPerDay = 1000 * 60 * 24
        this.minValue = new Date(now)
        this.minValue.setFullYear(this.minValue.getFullYear() - 150)
        this.maxValue = now;
        this._value = this.maxValue;
    }

    readonly minValue: Date

    readonly maxValue: Date

    private _value: Date

    get value() : Date{
        return this._value
    }

    set value(value: Date)
    {
        if (value < this.minValue || value > this.maxValue)
        {
            return;
        }

        this._value = value;
    }
}