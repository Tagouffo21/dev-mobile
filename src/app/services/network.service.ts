import { Injectable } from '@angular/core';
import {Network}  from '@capacitor/network';
import { Toast } from '@capacitor/toast';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {
  state:any;

  constructor() { }

  async getChange(){
    return await Network.getStatus()
  }

}
