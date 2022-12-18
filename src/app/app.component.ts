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
  public joueurs: { nom: string, score: number, ok: boolean }[] = [
    { nom: "Dad", score: 0, ok: true },
    { nom: "Mum", score: 0, ok: true },
    { nom: "Alexandre", score: 0, ok: true },
    { nom: "Antoine", score: 0, ok: true },
    { nom: "Arthur", score: 0, ok: true },
    { nom: "César", score: 0, ok: true }
  ];
  public nomJoueurTemp: string = "";

  ngOnInit() {
    let rdm = Math.floor(Math.random() * this.data.data.length);
    this.mot = this.data.data[rdm];
  }

  addPlayer() {
    this.joueurs[this.joueurs.length] = { nom: "", score: 0, ok: false }
  }
}
