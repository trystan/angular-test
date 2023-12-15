import { Component } from '@angular/core';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent {
  games = [
    { title: 'Cosmic Encounter' },
    { title: 'For Sale' },
    { title: 'Gravwell' },
    { title: 'Root' },
    { title: 'Inis' },
    { title: 'Terraforming Mars' },
  ]
}
