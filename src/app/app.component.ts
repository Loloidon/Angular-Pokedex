import { Component } from '@angular/core';
import { PokemonComponent } from './pokemon/pokemon.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-Pokemon';
}
