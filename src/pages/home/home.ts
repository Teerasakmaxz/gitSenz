import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,AlertController,LoadingController} from 'ionic-angular';
// import { UserOnline } from "../../service/UserOnline";
import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


  items:any

  constructor(public navCtrl: NavController,
    // private online:UserOnline,
    private storage:Storage,
   
    public alertCtrl:AlertController) {

      // this.fcm.subscribeToTopic('marketing');

// this.fcm.getToken().then(token => {
//   // backend.registerToken(token);
// });

// this.fcm.onNotification().subscribe(data => {
//   if(data.wasTapped){
//     console.log("Received in background");
//   } else {
//     console.log("Received in foreground");
//   };
// });

// this.fcm.onTokenRefresh().subscribe(token => {
//   // backend.registerToken(token);
// });

// this.fcm.unsubscribeFromTopic('marketing');

  
  }

  // dataForUser(id){
  //   this.online.userOnline(id).subscribe(data =>{
  //     this.items = data
  //   })
  // }
}
