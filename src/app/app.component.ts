import { Component, OnInit } from '@angular/core';
import DATA from '../assets/data.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public start: boolean = false;
  public joueurSelected!: { nom: string, score: number, ok: boolean, try: number };
  public data: { data: { definitions: string[], done: boolean, mot: string, type: string }[] } = DATA;
  public mot!: { definitions: string[]; done: boolean; mot: string; type: string; };
  public joueurs: { nom: string, score: number, ok: boolean, try: number }[] = [
    { nom: "Dad", score: 0, ok: true, try: 2 },
    { nom: "Mum", score: 0, ok: true, try: 2 },
    { nom: "Alexandre", score: 0, ok: true, try: 2 },
    { nom: "Antoine", score: 0, ok: true, try: 2 },
    { nom: "Arthur", score: 0, ok: true, try: 2 },
    { nom: "Cesar", score: 0, ok: true, try: 2 }
  ];
  public nomJoueurTemp: string = "";
  public guessing: string = "";
  public idx!: number;
  public indice!: number;
  public ind!: string[];
  public found: boolean = false;

  ngOnInit() {
    this.newWord();
  }

  newWord() {
    this.found = false;
    let rdm = Math.floor(Math.random() * this.data.data.length);
    this.mot = this.data.data[rdm];
    this.idx = this.mot.definitions.length - 1;
    this.ind = new Array(this.mot.mot.length).fill("_");
    this.indice = 0;
    for (let p of this.joueurs) {
      p.try = 2;
    }
    this.guessing = "";
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

  check() {
    if (this.mot.mot == this.guessing.toLowerCase()) {
      if (this.indice > 2) this.joueurSelected.score += 1;
      else
        this.joueurSelected.score += this.joueurSelected.try;
      this.found = true;
    }
    else {
      this.joueurSelected.try--;
      this.guessing = "";
    }
  }

  addPlayer() {
    this.joueurs[this.joueurs.length] = { nom: "", score: 0, ok: false, try: 2 }
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
