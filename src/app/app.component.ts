import { Component, OnInit } from '@angular/core';
import DATA from '../assets/data.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public data: { data: { definitions: string[], done: boolean, mot: string, type: string }[] } = DATA;
  public mot!: { definitions: string[]; done: boolean; mot: string; type: string; };
  public joueurs: { nom: string, score: number, ok: boolean }[] = [];
  public nomJoueurTemp: string = "";

  ngOnInit() {
    let rdm = Math.floor(Math.random() * this.data.data.length);
    this.mot = this.data.data[rdm];
  }

  addPlayer() {
    this.joueurs[this.joueurs.length] = { nom: "", score: 0, ok: false }
  }
}
