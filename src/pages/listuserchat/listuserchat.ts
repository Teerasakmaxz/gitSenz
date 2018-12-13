import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController} from 'ionic-angular';
import { UserOnline } from "../../service/UserOnline";
import { Storage } from "@ionic/storage";
import { ChatPage } from "../chat/chat";

/**
 * Generated class for the ListuserchatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-listuserchat',
  templateUrl: 'listuserchat.html',
})
export class ListuserchatPage {

  itemsUserOnline:any
  constructor(public navCtrl: NavController, public navParams: NavParams,private userOnline: UserOnline,
    private storage:Storage, private loadingCtrl: LoadingController) {
    this.storage.get('user').then((val) => {
      this.dataForListUserOnline(val[0][0].data.id)
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListuserchatPage');
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
    openChat(item){
      let id ={
        id : item.userid,
        name:item.name
      }      
      this.navCtrl.push(ChatPage,id);
      }
}
