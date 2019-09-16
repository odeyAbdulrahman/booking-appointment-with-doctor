import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { CommonProvider } from '../../providers/common/common';
/**
 * Generated class for the Page3Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-page3',
  templateUrl: 'page3.html',
})
export class Page3Page {
  item: any;
  resposeData:any;
  Doctor:any;
  REservationUserList:any =[];
  postData  = {
    Patient_FirstName: "",
    Patient_MiddleName: "",
    Patient_FamilyName: "",
    Nationality: "",
    Patient_Phone: "",
    Patient_ID_Number: "",
    Ins_Id: "",
    Ins_CardNumber: "",
    
    doctor_Id: "",
    Res_Date: "",
    Res_Time: "",
    Res_Note: "",
    
  }
  constructor(public navCtrl: NavController, public authService: AuthServiceProvider,public navParams: NavParams, public comm: CommonProvider) {
    this.item = navParams.get('item');
    this.postData.Patient_FirstName = this.item.Patient_FirstName;
    this.postData.Patient_MiddleName = this.item.Patient_MiddleName;
    this.postData.Patient_FamilyName = this.item.Patient_FamilyName;
    this.postData.Nationality = this.item.Nationality;
    this.postData.Patient_Phone = this.item.Patient_Phone;
    this.postData.Patient_ID_Number = this.item.Patient_ID_Number;
    this.postData.Ins_Id = this.item.Ins_Id;
    this.postData.Ins_CardNumber = this.item.Ins_CardNumber;
    this.getDoctor();
    console.log(this.postData);
  }

  ionViewDidLoad() {
  }

  getDoctor() {
    this.comm.presentLoading();
    this.authService.getData(this.authService, "DoctorsData/").then(
      result => {
        this.resposeData = result;
        this.Doctor = this.resposeData;
        console.log(this.resposeData);
        this.comm.closeLoading();
      },
      err => {
        this.comm.closeLoading();
      });
  }

  appoiment()
  {
    if (this.postData.doctor_Id == "") {
      this.comm.presentToast("الرجاء ادخال طبیب");
      return false;
    }
    if (this.postData.Res_Date == "") {
      this.comm.presentToast("الرجاء ادخال التاريخ");
      return false;
    }
    if (this.postData.Res_Time == "") {
      this.comm.presentToast("الرجاء ادخال الزمن");
      return false;
    };
    if (this.postData.Res_Note == "") {
      this.comm.presentToast("الرجاء ادخال ملاحظة");
      return false;
    };

    this.comm.presentLoading();

    let body =  "Ins_CardNumber=" +this.postData.Ins_CardNumber + "&Ins_Id=" + this.postData.Ins_Id + 
                "&Nationality=" + this.postData.Nationality + "&Patient_FamilyName=" + this.postData.Patient_FamilyName +
                "&Patient_FirstName=" + this.postData.Patient_FirstName +"&Patient_ID_Number=" + this.postData.Patient_ID_Number +
                "&Patient_MiddleName=" + this.postData.Patient_MiddleName +"&Patient_Phone=" + this.postData.Patient_Phone +
                "&Res_Date=" + this.postData.Res_Date +"&Res_Note=" + this.postData.Res_Note + "&Res_Time=" + this.postData.Res_Time +
                "&doctor_Id=" + this.postData.doctor_Id;
                console.log(body);

  this.authService.postData(body, "ReservationData").then(
    result => {
     this.comm.presentToast(result);
     this.comm.closeLoading();
     
     this.REservationUserList.push.apply(this.REservationUserList, JSON.parse(localStorage.getItem('REservationUserList')));

     this.REservationUserList.push(this.postData);
    localStorage.setItem('REservationUserList', JSON.stringify(this.REservationUserList));
     this.navCtrl.setRoot(HomePage);
    },
    err => {
      this.comm.closeLoading();
      this.comm.presentToast(err.json().ModelState[0]);
    }
  );
  }
}
