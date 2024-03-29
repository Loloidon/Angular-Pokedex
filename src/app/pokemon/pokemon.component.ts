import { Component } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { PokemonService } from './services/pokemon.service';
import { pokemonsprites } from './models/pokemonSprites';
import { PokemonResult } from './models/pokemonResult';


@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss']
})
export class PokemonComponent {
  pokemonData: any;
  pokemonsprites!: pokemonsprites[];
  error:any;
  pokemonResult!: PokemonResult
  constructor(
    private pokemonService: PokemonService,
    private http: HttpClient) { }

  ngOnInit() {
    this.getMany('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=9}');
}
selectedPokemon: { name: string, sprite: string } | null = null;

showOnePokemonSprite(pokemon: { name: string, sprite: string }): void {
  this.selectedPokemon = pokemon;
}
getMany(url:string){
  this.pokemonService.getData(url).subscribe(
      (data) => {
        console.log(data);
        
        this.pokemonResult=data
        for(let pokemon of this.pokemonResult.results){
          this.http.get<any>(pokemon.url).subscribe({
            next:(p)=>{
              pokemon.sprite = p.sprites.front_default
              pokemon.PV = p.stats[0].base_stat;
              pokemon.ATK = p.stats[1].base_stat;
              pokemon.DEF = p.stats[2].base_stat;
              pokemon.ATKSPE = p.stats[3].base_stat;
              pokemon.DEFSPE = p.stats[4].base_stat;
              pokemon.SPEED = p.stats[5].base_stat;     
            }
          })
        }
      },
      (error) => {
       
        console.error('Erreur lors de la récupération des données :', error);
      }
    );
}

getNext() {
  if(!this.pokemonResult.next){
    return
  }
  this.getMany(this.pokemonResult.next)
    
}
getSprites() {
  this.pokemonService.getSprites().subscribe(
    (data: pokemonsprites[]) => {
      
      this.pokemonsprites = data;
      console.log(this.pokemonsprites)
    },
    (error) => {
      this.error = error;
      console.error('Erreur lors de la récupération des données suivantes :', error);
    }
  );
}
getPrevious() {
    if(!this.pokemonResult.previous){
      return
    }
    this.getMany(this.pokemonResult.previous)
}}