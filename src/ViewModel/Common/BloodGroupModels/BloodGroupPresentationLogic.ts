class BloodGroupPresentationLogic{
    static items: [string, BlodGroup][] = [
        ["I (First)", 1],
        ["II (Second)", 2],
        ["III (Third)", 3],
        ["IV (Fourth)", 4]
    ]
    static getAllTitles(): [string, BlodGroup][]{
        return this.items.slice()
    }

    static title(blodGroup: BlodGroup): string{
        for (let i = 0; i< this.items.length; i++){
            let [title, value] = this.items[i]
            if (value == blodGroup) return title
        }

        throw Error("Unknown value.")
    }
}