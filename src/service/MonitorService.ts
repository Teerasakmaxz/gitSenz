import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {ConfigService} from "./config";
import 'rxjs/add/operator/map'
@Injectable() 
export class MonitorService {

    public baseURL :any
    constructor(private config:ConfigService,private http : Http){
        this.baseURL= this.config.baseUrl
    }

    userMonitor(id:any){
      return this.http.post(`${this.baseURL}AjaxLogMonitor`,{
           "uid" : id
        }).map(this.extractResponse)
    }

    userByIdMonitor(idUser:any){
        return this.http.post(`${this.baseURL}AjaxHistoryUser`,{
            "setid" : idUser
         }).map(this.extractResponse)
    }

    private extractResponse(res : Response){
        return res.json();
    }
}