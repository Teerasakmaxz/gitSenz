import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {ConfigService} from "./config";
import 'rxjs/add/operator/map'



@Injectable() 
export class Login {
    private baseUrl:any;

    constructor(private config : ConfigService,private http : Http)
    {
        this.baseUrl = this.config.baseUrl; 
    }

    loginService(username,password){
        // console.log(username+" "+password)
  return this.http.post(`${this.baseUrl}AjaxCheckLogin`,{
    'u':username,
    'p':password
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
