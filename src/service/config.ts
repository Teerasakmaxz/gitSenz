import { Injectable } from '@angular/core';
// import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';

@Injectable()

export class ConfigService {

    public settings : any
    public baseUrl:string

    constructor(){

        this.settings={
            'url':'http://27.254.63.96/senzeapp/service/index.php?r=AjaxConsole/'
        }

        this.baseUrl = this.settings.url
        
    }

}