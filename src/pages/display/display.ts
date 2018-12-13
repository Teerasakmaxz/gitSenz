import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import { MonitorService } from "../../service/MonitorService";
import { Storage } from "@ionic/storage";



@Component({
  selector: 'page-display',
  templateUrl: 'display.html',
})
export class DisplayPage {
  date:any
  data:any
  name:any
  
  //TODO : group of date 
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private userByID:MonitorService,private loadingCtrl: LoadingController,
    private storage :Storage
  ) {
   this.dataByIdUser(this.navParams.get('id'))
   this.name = this.navParams.get('name')
  }

  dataByIdUser(id:any){
    let loading = this.loadingCtrl.create({
      content: `
      <div class="loading-ios-padding-start">
        <div class="custom-spinner-box"></div>
      </div>`
      });
      loading.present();
    this.userByID.userByIdMonitor(id).subscribe(data =>{
      this.date = Object.keys(data)
      this.data = data
      loading.dismiss();
    })
  }

  doRefresh(refresher) {
      this.userByID.userByIdMonitor(this.navParams.get('id')).subscribe(data =>{
        this.date = Object.keys(data)
        this.data = data
      })
    setTimeout(() => {
     console.log('Async operation has ended');
     refresher.complete();
   }, 2000);
  }
}
