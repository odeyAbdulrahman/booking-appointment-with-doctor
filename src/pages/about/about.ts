import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
ListData:any;
  constructor(public navCtrl: NavController) {
    this.ListData =JSON.parse(localStorage.getItem('REservationUserList'));
    }
    Refresh(){
    this.ListData =JSON.parse(localStorage.getItem('REservationUserList'));
    }
}
