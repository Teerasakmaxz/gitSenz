import { Component,ViewChild } from '@angular/core';
import { Platform,NavController,App,MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MonitorPage } from "../pages/monitor/monitor";
import { LoginpagePage } from "../pages/loginpage/loginpage";
import { Storage } from "@ionic/storage";
import { UserlistPage } from "../pages/userlist/userlist";
import { ListuserchatPage } from "../pages/listuserchat/listuserchat";
import { ChatPage } from "../pages/chat/chat";
import { SaveToken } from "../service/Token";
import { Firebase } from '@ionic-native/firebase';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;  
  pages: any[] = [];
  @ViewChild('content') nav: NavController;


  constructor(platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen,
    private storage:Storage,
    private saveToken:SaveToken,
    private firebase : Firebase,
    public menuCtrl : MenuController,
    public app :App
    ) {
    platform.ready().then(() => {
      
      statusBar.styleDefault();
      splashScreen.hide();

      this.storage.get('user').then((val) =>{
        console.log(val);
        
        if (val==null || val == undefined || val == "" ) {
          this.rootPage = LoginpagePage
        } else {
          this.rootPage = MonitorPage
        
        }
      })
    });
    this.pages = [
      { title: "Monitor", component: MonitorPage, index: 0, hide: false, icon:"assets/icon/monitor.svg" },
      { title: "User Online", component: UserlistPage, index: 1, hide: false, icon:"assets/icon/user.svg" },
      { title:"Chat" , component: ListuserchatPage , index:2, hide:false, icon:"assets/icon/chat.svg" } 
    ];
  }
  onLoad(page: any) {
    let nav = this.app.getRootNav();
    nav.setRoot(page.component, { index: page.index });
    this.menuCtrl.close();
  }
  
  logOut(){
  
    this.storage.get('user').then((val) =>{
       this.firebase.getToken().then(token => {
  this.saveToken.deleteToken(val[0][0].data.id,token).subscribe(data=>{
    console.log(data)
    if (data[0].status) {
      this.storage.clear()
    this.nav.setRoot(LoginpagePage)
    this.menuCtrl.close();
    } else {
      
    }
  })
    }) // save the token server-side and use it to push notifications to this device
    .catch(error => console.error('Error getting token', error)); 
      })
    }
    listenToNotifications() {
      return this.firebase.onNotificationOpen()
    }
}
