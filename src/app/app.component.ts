import { Component, OnInit } from '@angular/core';
import DATA from '../assets/data.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public start: boolean = false;
  public joueurSelected!: { nom: string, score: number, ok: boolean, try: string[], place: number };
  public data: { data: { definitions: string[], done: boolean, mot: string, type: string, idx?: number }[] } = DATA;
  public mot!: { definitions: string[], done: boolean, mot: string, type: string, idx?: number };
  public joueurs: { nom: string, score: number, ok: boolean, try: string[], place: number }[] = [
    { nom: "Dad", score: 0, ok: true, try: [], place: 1 },
    { nom: "Mum", score: 0, ok: true, try: [], place: 1 },
    { nom: "Alexandre", score: 0, ok: true, try: [], place: 1 },
    { nom: "Antoine", score: 0, ok: true, try: [], place: 1 },
    { nom: "Arthur", score: 0, ok: true, try: [], place: 1 },
    { nom: "Cesar", score: 0, ok: true, try: [], place: 1 }
  ];
  public taille!: number;
  public nomJoueurTemp: string = "";
  public guessing: string = "";
  public idx!: number;
  public indice!: number;
  public ind!: string[];
  public found: boolean = false;
  public buzz: any;
  public timer: any;
  public valid: any;
  public max!: number;
  public setmax!: boolean;
  public width!: number;
  public points!: number;
  public startidx!: number;
  public playerWhoFound: any;

  ngOnInit() {
    this.buzz = new Audio();
    this.buzz.src = "./assets/audio/buzz.wav";
    this.timer = new Audio();
    this.timer.src = "./assets/audio/timer.wav";
    this.timer.loop = true;
    this.valid = new Audio();
    this.valid.src = "./assets/audio/valid.wav";
    this.newWord();
  }

  newWord() {
    this.setmax = false;
    this.found = false;
    let rdm = Math.floor(Math.random() * this.data.data.length);
    this.mot = this.data.data[rdm];
    this.taille = this.mot.mot.length;
    this.idx = this.mot.definitions.length - 1;
    if (this.mot.idx) {
      this.idx = this.mot.idx;
      this.max = this.idx;
      this.setmax = true;
    }
    this.startidx = this.idx;
    this.ind = new Array(this.mot.mot.length).fill("_");
    this.indice = 0;
    for (let p of this.joueurs) {
      p.try = [];
    }
    this.guessing = "";
    console.log(this.idx);
    this.timer.play();
  }

  clickBegin() {
    this.start = true;
    this.timer.play();
    this.width = this.joueurs.length * 103 + 50;
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
      this.valid.play();
      this.timer.pause();
      this.points = 0;
      if (this.indice == 0 && this.startidx == this.idx) { this.points = 4; }
      else if (this.indice > 2) { this.points = 1; }
      else { this.points = 2 - this.joueurSelected.try.length; }

      this.joueurSelected.score += this.points;
      this.found = true;
      this.joueurs.sort(function (a, b) {
        return b.score - a.score;
      });
      this.playerWhoFound = this.joueurSelected;


      let pos = 0;
      let max = 200000;
      for (let i = 0; i < this.joueurs.length; i++) {
        let score = this.joueurs[i].score;
        if (score < max) {
          max = score;
          pos++;
        }
        this.joueurs[i].place = pos;
      }
      this.mot.idx = this.idx - 1;
    }
    else {
      this.buzz.play();
      this.joueurSelected.try[this.joueurSelected.try.length] = this.guessing.toUpperCase();
      this.guessing = "";
    }
  }

  addPlayer() {
    this.joueurs[this.joueurs.length] = { nom: "", score: 0, ok: false, try: [], place: 1 }
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
