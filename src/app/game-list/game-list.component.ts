import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { GameDetailsComponent } from '../game-details/game-details.component';

@Component({
  selector: 'app-game-list',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, GameDetailsComponent],
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent {
  games = [
    { id: 0, title: 'Cosmic Encounter' },
    { id: 1, title: 'For Sale' },
    { id: 2, title: 'Gravwell' },
    { id: 3, title: 'Root' },
    { id: 4, title: 'Inis' },
    { id: 5, title: 'Terraforming Mars' },
  ]
}
