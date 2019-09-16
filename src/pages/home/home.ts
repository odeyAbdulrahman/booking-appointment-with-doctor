import { Page2Page } from './../page2/page2';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CommonProvider } from '../../providers/common/common';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
public phone:any;
public n_number:any;
item  = {
  phone: "",
  n_number: ""
}
  constructor(public navCtrl: NavController,public comm: CommonProvider) {
    console.log(JSON.parse(localStorage.getItem('REservationUserList')));
  }
  Page2(){
    if (this.n_number == undefined) {
      this.comm.presentToast("الرجاء ادخال رقم الهوية | الإقامة");
      return false;
    }
    if (this.phone == undefined) {
      this.comm.presentToast("الرجاء ادخال رقم الهاتف");
      return false;
    }
    this.item.phone = this.phone;
    this.item.n_number = this.n_number;
    console.log(this.item);
    this.navCtrl.push(Page2Page, {
      item: this.item
    });
  }
}
