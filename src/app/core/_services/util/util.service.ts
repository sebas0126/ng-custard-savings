import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }

  converObjectToArray(object: any){
    for(let prop of object){
      if(object.hasOwnProperty(prop)){
        console.log(prop);
      }
    }
  }
}
