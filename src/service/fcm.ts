import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {ConfigService} from "./config";
import 'rxjs/add/operator/map'

export class FCM {

    public baseURL:any

    constructor(private config : ConfigService,private http : Http){

        this.baseURL= this.config.baseUrl        
    }

}