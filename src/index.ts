
let a = 1024
let d = [true, true, false]
let f = [1, false]
const g = [3]
let h = null

type Predicate<T> = (item : T) => boolean

function Filter<T>(collection: T[], predicate: Predicate<T>) : T[]{
    let result : T[] = []
    for (let i = 0; i < collection.length;i++){
        let item = collection[i]
        if (predicate(item))
        {
            result.push(item)
        }
    }
    return result
}

function MyMap<TSourece, TDestination>(
    collection: TSourece[], 
    map: (item : TSourece) => TDestination)
    : TDestination[]
{
    let result : TDestination[] = []
    for (let i = 0; i < collection.length; i++){
        let itemSource = collection[i]
        let itemDest = map(itemSource)
        result.push(itemDest)
    }
    return result
}




console.log("Hello World!!!")