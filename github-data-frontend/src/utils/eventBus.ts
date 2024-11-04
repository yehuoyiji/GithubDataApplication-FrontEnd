type BusEvent = {
    emit: (name: any) => void
    on: (name: any, callback: any) => void
}
type PramsType = string | number | symbol
type List = {
    [key:PramsType ]: Array<Function>
}
class Bus implements BusEvent {
    list: List
    constructor (){
        this.list = {}
    }
    emit (name:string,...args:Array<any>){
        let busName:Array<Function> = this.list[name]
        busName.forEach(fn =>{
            fn.apply(this, args)
        })
    }
    on (name:string, callback:Function){
        let fn:Array<Function> = this.list[name] || []
        fn.push(callback)
        this.list[name] = fn
    }
    off (name: string) {
        if (this.list[name]) {
            delete this.list[name];
        }
    }
}
export default new Bus()