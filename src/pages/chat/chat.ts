import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NavParams, Events, Content } from 'ionic-angular';
import { ChatService } from "../../service/chat";
import { Storage } from "@ionic/storage";
import { timestamp } from 'rxjs/operators';


@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {
  @ViewChild(Content) content: Content;
  @ViewChild('chat_input') messageInput: ElementRef;
  msgList:any = []
  user: any;
  toUser: any ={};
  editorMsg = '';
  pageNumber:any = 1
  messages:any
  showEmojiPicker = false;

  constructor(navParams: NavParams,
              private chatService: ChatService,
              private events: Events,private storage :Storage) {
    // Get the navParams toUserId parameter
    this.toUser = {
      id: navParams.get('id'),
      name: navParams.get('name')
    };    
    this.storage.get('user').then((val) => {      
      this.user = val[0][0].data.id      
      this.chatService.getMsgList(this.toUser.id,this.user,1).subscribe(res => {
        this.msgList = res.data        
        this.scrollToBottom();
      });
    })

    // Get mock user information
    // this.chatService.getUserInfo()
    // .then((res) => {
    //   this.user = res
    // });
  }
  // doInfinite(infiniteScroll) {
  //   console.log('Begin async operation');
  //   this.pageNumber++
  //   setTimeout(() => {
  //     this.storage.get('user').then((val) => {
  //       this.chatService.getMsgList(this.toUser.id,val[0][0].data.id,this.pageNumber).subscribe(res => {
  //         this.msgList = this.msgList.concat(res.data)       
  //         // this.scrollToBottom();
  //       });
  //     })
  //     console.log('Async operation has ended');
  //     infiniteScroll.complete();
  //   }, 500);
  // }
  // ionViewWillLeave() {
  //   // unsubscribe
  //   this.events.unsubscribe('chat:received');
  // }

  // ionViewDidEnter() {
  //   //get message list
  //   this.getMsg();

  //   // Subscribe to received  new message events
  //   this.events.subscribe('chat:received', msg => {
  //     this.pushNewMsg(msg);
  //   })
  // }

  onFocus() {
    this.showEmojiPicker = false;
    this.content.resize();
    this.scrollToBottom();
  }

  switchEmojiPicker() {
    this.showEmojiPicker = !this.showEmojiPicker;
    if (!this.showEmojiPicker) {
      this.focus();
    } else {
      this.setTextareaScroll();
    }
    this.content.resize();
    this.scrollToBottom();
  }

  sendMsg() {
    if (!this.editorMsg.trim()) return;
    // Mock message
    let newMsg ={
      "user":this.toUser.id,
      "text":this.editorMsg,
      "page" :1,
      "admin":this.user
    }
    this.chatService.sendMsg(newMsg).subscribe(data =>{
      this.msgList = data.data
      console.log(data);
    })
    this.editorMsg = ''
  }
  getMsgIndexById(id: string) {
    return this.msgList.findIndex(e => e.messageId === id)
  }

  scrollToBottom() {
    setTimeout(() => {
      if (this.content.scrollToBottom) {
        this.content.scrollToBottom();
      }
    }, 400)
  }

 private focus() {
    if (this.messageInput && this.messageInput.nativeElement) {
      this.messageInput.nativeElement.focus();
    }
  }

  private setTextareaScroll() {
    const textarea =this.messageInput.nativeElement;
    textarea.scrollTop = textarea.scrollHeight;
  }
}
