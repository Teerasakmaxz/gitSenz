import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController,LoadingController } from 'ionic-angular';
import { DisplayPage } from '../display/display';
import { Storage } from "@ionic/storage";
import { MonitorService } from "../../service/MonitorService";
import { Firebase } from '@ionic-native/firebase';
import { SaveToken } from "../../service/Token";
// import { DisplayPage } from "../display/display";

import { Subject } from 'rxjs/Subject';
import { tap } from 'rxjs/operators';


/**
 * Generated class for the MoniterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-monitor',
  templateUrl: 'monitor.html',
})
export class MonitorPage {

  items:any
  
   constructor(public navCtrl: NavController, public navParams: NavParams,
    public monitor:MonitorService,
      public storage:Storage,
      private firebase: Firebase,
    private saveToken:SaveToken,
    toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
  ) {
      this.storage.get('user').then((val) => {
        console.log(val);
        this.dataForMonitor(val[0][0].data.id)

      this.firebase.getToken()
  .then(token => {
this.saveToken.getToken(val[0][0].data.id,token).subscribe(data=>{
  console.log(data)
})
  }) // save the token server-side and use it to push notifications to this device
  .catch(error => console.error('Error getting token', error));
      })
    }
  ionViewDidLoad() {
    console.log('ionViewDidLoad MoniterPage');
  }
  nav(item){
    let id ={
      id : item.id,
      name : item.name
    }
    this.navCtrl.push(DisplayPage,id)
  }
  dataForMonitor(id:any){
    let loading = this.loadingCtrl.create({
      content: `
      <div class="loading-ios-padding-start">
        <div class="custom-spinner-box"></div>
      </div>`
      });
      loading.present();
       this.monitor.userMonitor(id).subscribe(data=>{
         this.items = data.data
         loading.dismiss()

        })
      }

      doRefresh(refresher) {

       this.storage.get('user').then((val) => {
        this.monitor.userMonitor(val[0][0].data.id).subscribe(data=>{
          console.log(data)
          this.items = data.data
       });
       setTimeout(() => {
        console.log('Async operation has ended');
        refresher.complete();
      }, 2000);
      
      });
  }

  listenToNotifications() {
    // return this.firebase.onNotificationOpen()
  }
}

