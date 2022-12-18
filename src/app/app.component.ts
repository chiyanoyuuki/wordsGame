import { Component, OnInit } from '@angular/core';
import DATA from '../assets/data.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public data: any = DATA;
  title = 'words';

  ngOnInit() {
    console.log(this.data);
  }
}
