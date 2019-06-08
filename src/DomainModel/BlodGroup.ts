export type BlodGroup = 1 | 2 | 3 | 4

const items: [string, BlodGroup][] = [
    ["I (First)", 1],
    ["II (Second)", 2],
    ["III (Third)", 3],
    ["IV (Fourth)", 4]
]

export function getAllTitles(): [string, BlodGroup][]{
    return items.slice()
}

export function title(blodGroup: BlodGroup): string{
    for (let i = 0; i < items.length; i++){
        let [title, value] = items[i]
        if (value == blodGroup) return title
    }

    throw Error("Unknown value.")
}