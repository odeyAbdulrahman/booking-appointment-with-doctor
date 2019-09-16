import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { CommonProvider } from '../../providers/common/common';
import { Page3Page } from './../page3/page3';

/**
 * Generated class for the Page2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-page2',
  templateUrl: 'page2.html',
})
export class Page2Page {
  item: any;
  resposeData:any;
  Company:any;
  postData  = {
    Patient_FirstName: "",
    Patient_MiddleName: "",
    Patient_FamilyName: "",
    Nationality: "",
    Patient_Phone: "",
    Patient_ID_Number: "",
    Ins_Id: "",
    Ins_CardNumber: "",
    
  }
  constructor(public navCtrl: NavController, public authService: AuthServiceProvider,public navParams: NavParams, public comm: CommonProvider) {
    this.item = navParams.get('item');
    this.postData.Patient_Phone = this.item.phone;
    this.postData.Patient_ID_Number = this.item.n_number;
    this.getCompany();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Page2Page');
  }
  //get all cites data 
  getCompany() {
    this.comm.presentLoading();
    this.authService.getData(this.authService, "InsuranceCompany/").then(
      result => {
        this.resposeData = result;
        this.Company = this.resposeData;
        console.log(this.resposeData);
        this.comm.closeLoading();
      },
      err => {
        this.comm.closeLoading();
      });
  }
  Page3(){
    if (this.postData.Patient_FirstName == "") {
      this.comm.presentToast("الرجاء ادخال الاسم الاول");
      return false;
    }
    if (this.postData.Patient_MiddleName == "") {
      this.comm.presentToast("الرجاء ادخال الاسم الثاني");
      return false;
    }
    if (this.postData.Patient_FamilyName == "") {
      this.comm.presentToast("الرجاء ادخال الاسم العائلة");
      return false;
    }
    if (this.postData.Nationality == "") {
      this.comm.presentToast("الرجاء ادخال الجنسية");
      return false;
    }
    if (this.postData.Ins_Id == "") {
      this.comm.presentToast("الرجاء ادخال شركة التأمين");
      return false;
    };
    if (this.postData.Ins_CardNumber == "") {
      this.comm.presentToast("الرجاء ادخال رقم كرت التأمین");
      return false;
    };

    this.navCtrl.push(Page3Page, {
      item: this.postData
    });
  }
  isReadonly() {
    return this.isReadonly;   //return true/false 
  }
}
