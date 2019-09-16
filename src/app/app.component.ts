import { HomePage } from './../pages/home/home';
import { SliderPage } from './../pages/slider/slider';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, NavController, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  //rootPage:any = TabsPage;

  constructor(public statusBar: StatusBar,public splashScreen: SplashScreen ,public platform: Platform,) {
    this.platform.ready().then(() =>{
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      if(localStorage.getItem('introShown'))
        {
          this.nav.setRoot(TabsPage);
        }
        else 
        {
          this.nav.setRoot(SliderPage);
        }

    });
  }
}
