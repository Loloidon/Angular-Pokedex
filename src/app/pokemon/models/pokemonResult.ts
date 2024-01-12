export interface PokemonResult{
    count:number
    next?:string
    previous?:string
    results:PokemonSimple[]
}
export interface PokemonSimple{
    name:string
    url:string
    sprite:string
    PV:number
    ATK:number
    DEF:number
    ATKSPE:number
    DEFSPE:number
    SPEED:number
}