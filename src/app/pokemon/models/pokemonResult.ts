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
}