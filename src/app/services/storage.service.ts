import { Injectable } from '@angular/core';
import { Toast } from '@capacitor/toast';
import { Storage } from '@ionic/storage';
import * as cordovaSQLiteDriver from 'localforage-cordovasqlitedriver';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  first: boolean = true;
  score = 0;
  constructor(private _storage: Storage) {
    this.init();
  }

  async init() {
    await this._storage.create();
    await this._storage.defineDriver(cordovaSQLiteDriver);
    this._storage.get('first').then((res) => {
      if (res == null) {
        this._storage.set('first', true);
      }
    });
  }
  async setData(key: string, value: any) {
    await this._storage.set(key, value);
  }

  async getData(key: string) {
    return await this._storage.get(key);
  }

  ShowToast(n: string) {
    Toast.show({
      text: n,
      position: 'center',
      duration: 'short',
    });
  }
}
