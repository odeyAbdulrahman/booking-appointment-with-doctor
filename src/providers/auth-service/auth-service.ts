import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
//let apiUrl = "http://localhost:2100/";

@Injectable()
export class AuthServiceProvider {

  constructor(public http: Http) {
    console.log('Hello AuthServiceProvider Provider');
  }

  getData(credentials, type){
    
    return new Promise((resolve, reject) =>{
      let headers = new Headers();
      this.http.get(apiUrl+type, JSON.stringify(credentials)).
      subscribe(res =>{
        resolve(res.json());
      }, (err) =>{
        reject(err);
      });

    });
  }
  postData(credentials, type){

    return new Promise((resolve, reject) =>{
      let headers = new Headers();

  headers.append('Content-Type', 'application/x-www-form-urlencoded');
      this.http.post(apiUrl+type, credentials, {headers: headers}).
      subscribe(res =>{
        resolve(res.json().MsgText);
      }, (err) =>{
        reject(err);
      });

    });

  }
}
