import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import { UserOnline } from "../../service/UserOnline";
import { Storage } from "@ionic/storage";
import { DisplayPage } from "../display/display";



@Component({
  selector: 'page-userlist',
  templateUrl: 'userlist.html',
})
export class UserlistPage {
  itemsUserOnline:any
  statusOnline:any
  statusOffline:any
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private userOnline: UserOnline,
    private storage:Storage,
    private loadingCtrl: LoadingController,
  ) {

      this.storage.get('user').then((val) => {
        this.dataForListUserOnline(val[0][0].data.id)
      })
    }
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserlistPage');
  }

  dataForListUserOnline(id:any){
    let loading = this.loadingCtrl.create({
      content: `
      <div class="loading-ios-padding-start">
        <div class="custom-spinner-box"></div>
      </div>`
      });
      loading.present();
      this.userOnline.userOnline(id).subscribe(data=>{
         this.itemsUserOnline = data    
         loading.dismiss()
    
        })
      }

      nav(item){
        let id ={
          id : item.userid,
          name:item.name
        }
        this.navCtrl.push(DisplayPage,id)
      }


      doRefresh(refresher) {

        this.storage.get('user').then((val) => {
          this.userOnline.userOnline(val[0][0].data.id).subscribe(data=>{
            this.itemsUserOnline = data        
           })
           setTimeout(() => {
            console.log('Async operation has ended');
            refresher.complete();
          }, 2000);
       });
   }

}
