import { Injectable } from '@angular/core';
import { Http,HttpOptions } from '@capacitor-community/http';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  

  constructor() { }

  

  getData(url:string){
    const options:HttpOptions = {
     url
    }
    return from(Http.get(options))
  }

}
