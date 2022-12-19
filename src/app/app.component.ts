import { Component, OnInit } from '@angular/core';
import DATA from '../assets/data.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public start: boolean = true;
  public joueurSelected!: { nom: string, score: number, ok: boolean };
  public data: { data: { definitions: string[], done: boolean, mot: string, type: string }[] } = DATA;
  public mot!: { definitions: string[]; done: boolean; mot: string; type: string; };
  public joueurs: { nom: string, score: number, ok: boolean }[] = [
    { nom: "Dad", score: 0, ok: true },
    { nom: "Mum", score: 0, ok: true },
    { nom: "Alexandre", score: 0, ok: true },
    { nom: "Antoine", score: 0, ok: true },
    { nom: "Arthur", score: 0, ok: true },
    { nom: "Cesar", score: 0, ok: true }
  ];
  public nomJoueurTemp: string = "";
  public guessing: string = "";
  public idx!: number;
  public indice!: number;
  public ind!: string[];

  ngOnInit() {
    this.newWord();
  }

  newWord() {
    let rdm = Math.floor(Math.random() * this.data.data.length);
    this.mot = this.data.data[rdm];
    this.idx = this.mot.definitions.length - 1;
    this.ind = new Array(this.mot.mot.length).fill("_");
    this.indice = 0;
    console.log(this.idx);
  }

  clickIndice() {
    this.indice = this.indice + 1
    if (this.indice > 1) {
      let tmp = this.ind.filter((c: string) => c == "_").length;
      let rdm = Math.floor(Math.random() * tmp);
      let i = 0;
      for (let x = 0; x < this.ind.length; x++) {
        let l = this.ind[x];
        if (i == rdm) this.ind[x] = this.mot.mot.charAt(x);
        if (l == "_") i++;
      }
    }
  }

  addPlayer() {
    this.joueurs[this.joueurs.length] = { nom: "", score: 0, ok: false }
  }

  clickJoueur(i: number) {
    let joueur = this.joueurs[i];
    if (!joueur.ok) return;
    if (this.joueurSelected == joueur) {
      this.joueurs.splice(i, 1);
    }
    this.joueurSelected = joueur;

  }

  addNewPlayer(i: number) {
    let j = this.joueurs[i];
    if (this.nomJoueurTemp == "") {
      this.joueurs.splice(i, 1);
    }
    else {
      j.nom = this.nomJoueurTemp;
      j.ok = true;
      this.nomJoueurTemp = '';
    }
  }
}
