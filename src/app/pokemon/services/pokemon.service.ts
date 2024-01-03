import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { pokemonsprites } from '../models/pokemonSprites';
import { count, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private offset=0;
  private limit=20;
  private cpt=0;
  constructor(private http: HttpClient) { }

  getData(url:string): Observable<any> {
    return this.http.get(url);
  }

  getNext(): Observable<any> {

    this.offset += this.limit;
    const apiUrl = `https://pokeapi.co/api/v2/pokemon/?offset=${this.offset}&limit=${this.limit}`;
    return this.http.get(apiUrl);
  }

  getPrevious(): Observable<any> {

    this.offset -= this.limit;
    const apiUrl = `https://pokeapi.co/api/v2/pokemon/?offset=${this.offset}&limit=${this.limit}`;
    return this.http.get(apiUrl);
  }
  // `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png`
  getSprites(): Observable<pokemonsprites[]> {
    this.offset += this.limit;
    
    const apiUrl = `https://pokeapi.co/api/v2/pokemon/?offset=${this.offset}&limit=${this.limit}`;
    return this.http.get(apiUrl).pipe(
      map((data: any) => {
        
        return data.results.map((pokemon: any) => ({
          sprites: {
            front_default: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.cpt+=1}.png` 
          }
        }));
      })
    );
  }

}
