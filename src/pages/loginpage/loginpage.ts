import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,AlertController,LoadingController} from 'ionic-angular';
import { ConfigService } from "../../service/config";
import { HomePage } from "../home/home";
import { Storage } from '@ionic/storage';
import { Login } from "../../service/login";
import { MonitorPage } from "../monitor/monitor";
import { Firebase } from '@ionic-native/firebase';
import { SaveToken } from "../../service/Token";

/**
 * Generated class for the LoginpagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-loginpage',
  templateUrl: 'loginpage.html',
})
export class LoginpagePage {

  public username:any
  public password:any
  public user:any

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public config : ConfigService, 
     private alertCtrl: AlertController,
     private loadingCtrl: LoadingController,
    private storage:Storage,
  private login:Login,
  private firebase: Firebase,
  private saveToken:SaveToken,


) {
  
  }
  ngOnInit() {

    this.storage.get('user').then((val) => {
      let loading = this.loadingCtrl.create({
        content: `
        <div class="loading-ios-padding-start">
          <div class="custom-spinner-box"></div>
        </div>`
        });
        loading.present();
      if (val == null) {
        loading.dismiss()
      } else {
        this.login.loginService(val[1].email,val[1].password).subscribe(data =>{
          if (val[0][0].data.id == data[0].data.id) {
            this.navCtrl.setRoot(MonitorPage)
            loading.dismiss()
          }else{
            loading.dismiss()
          }
        })
      }
    });
  }
  
  clickLogin(){
    let loading = this.loadingCtrl.create({
      content: `
      <div class="loading-ios-padding-start">
        <div class="custom-spinner-box"></div>
      </div>`
      });
      loading.present();
      console.log(this.username + " "+ this.password)
    if (this.username == "" || this.password == "" || this.username == undefined || this.password == undefined ||this.username == null || this.password == null) {
      let alert = this
      .alertCtrl
      .create({
        title: 'แจ้งเตือน', 
        subTitle: 'กรุณากรอกให้ครบ',
         buttons: ['ตกลง'],
      });
      loading.dismiss()
    alert.present();
    } else {
      this.login.loginService(this.username,this.password).subscribe(data =>{
        if (data[0].status) {
          this.user ={
            email:this.username,
            password:this.password
          }
        this.storage.set('user',[data,this.user]);
        this.navCtrl.setRoot(MonitorPage)
        loading.dismiss()
        } else {
          let alert = this
          .alertCtrl
          .create({
            title: 'แจ้งเตือน', subTitle: 'Login False', buttons: ['OK'],
            cssClass: 'profalert'
          });
          loading.dismiss()

        alert.present();
        } 
    })
  }
     
  }
}
