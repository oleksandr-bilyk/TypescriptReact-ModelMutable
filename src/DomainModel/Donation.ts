// Volume in milliliters.
type Volume = number

class Donation{
    constructor(
        readonly at:Date,
        readonly volume: Volume
    ){}
}