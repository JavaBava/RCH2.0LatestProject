import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class SharedserviceService {

  constructor() { }
  
  public blue = new BehaviorSubject<boolean>(false);

  setBlue(changeToggle: boolean) {
    this.blue.next(changeToggle);
  }

  getBlue() {
    return this.blue.asObservable();
  }
  
}
