import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import {IonicStorageModule } from '@ionic/storage';
import {HttpModule} from '@angular/http'

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginpagePage } from "../pages/loginpage/loginpage";
import { MonitorPage } from "../pages/monitor/monitor";
import { UserlistPage } from "../pages/userlist/userlist";
import { DisplayPage } from "../pages/display/display";
import { ListuserchatPage } from "../pages/listuserchat/listuserchat";
import { ChatPage } from "../pages/chat/chat";

import { ConfigService } from "../service/config";
import { Login } from "../service/login";
import { UserOnline } from "../service/UserOnline";
import { MonitorService } from "../service/MonitorService";
import { SaveToken } from "../service/Token";
import { ChatService} from "../service/chat";
import { Firebase } from '@ionic-native/firebase';
// import { Media } from '@ionic-native/media';

const firebase = {
  apiKey: "AIzaSyAOLe1W0X3YTuq-ABRuKYpI2-SqpukchB4",
  authDomain: "senm-d2a26.firebaseapp.com",
  databaseURL: "https://senm-d2a26.firebaseio.com",
  projectId: "senm-d2a26",
  storageBucket: "senm-d2a26.appspot.com",
  messagingSenderId: "1001730563716"
 // your firebase web config
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginpagePage,
    MonitorPage,
    UserlistPage,
    DisplayPage,
    ChatPage,
    ListuserchatPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpModule,
    IonicStorageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginpagePage,
    MonitorPage,
    UserlistPage,
    DisplayPage,
    ChatPage,
    ListuserchatPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},    
    ConfigService,
    Login,
    UserOnline,
    MonitorService,
    Firebase,
    SaveToken
    // ,Media
    ,ChatService,
    
    
  ]
})
export class AppModule {}
