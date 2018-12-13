import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {ConfigService} from "./config";
import 'rxjs/add/operator/map'



@Injectable() 
export class SaveToken {
    private baseUrl:any;

    constructor(private http : Http,private config:ConfigService)
    {
        this.baseUrl = this.config.baseUrl; 
    }

    getToken(uid,token){
        // console.log(username+" "+password)
  return this.http.post(`${this.baseUrl}AjaxSaveToken`,{
    "uid":uid,
    "utoken":token
  }).map(this.extractResponse)
}

deleteToken(uid,token){
    return this.http.post(`${this.baseUrl}AjaxDeleteToken`,{
        "uid":uid,
        "utoken":token
      }).map(this.extractResponse)
}


    // private catchError(error : Response){
    //     return Observable.throw(error.json().error || "Server 500")
    // }

    // private logResponse(res : Response){
    //     console.log(res);
    // }

    private extractResponse(res : Response){
        return res.json();
    }

}
