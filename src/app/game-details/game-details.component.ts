import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

interface Game { id: number; title: string; }

@Component({
  selector: 'app-game-details',
  standalone: true,
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.css']
})
export class GameDetailsComponent implements OnInit {
  public game = games[0]

  constructor(
      private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((data: any) => {
      this.game = games[data.id]
    })
  }
}

const games = [
  { id: 0, title: 'Cosmic Encounter' },
  { id: 1, title: 'For Sale' },
  { id: 2, title: 'Gravwell' },
  { id: 3, title: 'Root' },
  { id: 4, title: 'Inis' },
  { id: 5, title: 'Terraforming Mars' },
]