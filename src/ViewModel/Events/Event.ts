interface Event<T>{
    add(handler: {(data: T): void}): void
    remove(handler: {(data: T): void}): void
}

class EventArray<T> implements Event<T>{
    add(handler: (data: T) => void): void {
        this.collection.push(handler)
    }
    remove(handler: (data: T) => void): void {
        for (let i = this.collection.length - 1; i >= 0; i--){
            if (this.collection[i] == handler){
                delete this.collection[i]
            }
        }
    }

    rise(data: T){
        this.collection.slice().forEach(i => i(data))
    }

    private readonly collection: {(data: T): void}[] = []


}