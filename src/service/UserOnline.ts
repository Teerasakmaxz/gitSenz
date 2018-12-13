import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {ConfigService} from "./config";
import 'rxjs/add/operator/map'



@Injectable() 
export class UserOnline {

    public baseURL :any
    constructor(private config:ConfigService,private http : Http){
        this.baseURL= this.config.baseUrl
    }

    userOnline(id:any){
      return this.http.post(`${this.baseURL}AjaxCheckUserOnline`,{
           "uid" : id
        }).map(this.extractResponse)
    }

    private extractResponse(res : Response){
        return res.json();
    }
}
