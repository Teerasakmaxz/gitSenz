import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { map } from 'rxjs/operators/map';
import {Http, Response} from '@angular/http';
import { Observable } from "rxjs/Observable";
import { ConfigService } from "./config";


@Injectable()
export class ChatService {

   userAvatar :any ="http://27.254.63.96"
   baseURL :any


  constructor(private http: Http,private events: Events,private config : ConfigService) {
    this.baseURL = this.config.baseUrl
  }

  // mockNewMsg(msg) {
  //   const mockMsg = {
  //     messageId: Date.now().toString(),
  //     userId: '210000198410281948',
  //     userName: 'Hancock',
  //     userAvatar: './assets/to-user.jpg',
  //     toUserId: '140000198202211138',
  //     time: Date.now(),
  //     message: msg.message,
  //     status: 'success'
  //   };

  //   setTimeout(() => {
  //     this.events.publish('chat:received', mockMsg, Date.now())
  //   }, Math.random() * 1800)
  // }

  getMsgList(id,adminid,pageNumber){
    return this.http.post(`${this.baseURL}AjaxChatMonitor`,{
      "setid":id,
      "admin":adminid,
      "page":pageNumber
    }).map(this.extractResponse)
  }
  sendMsg(msg){
    console.log(msg);
    return this.http.post(`${this.baseURL}AjaxChatMonitor`,msg).map(this.extractResponse)
  }

  private extractResponse(res : Response){
    return res.json();
}


}