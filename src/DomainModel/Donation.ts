// Volume in milliliters.
export type Volume = number

export class Donation{
    constructor(
        readonly at:Date,
        readonly volume: Volume
    ){}
}