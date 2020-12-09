import { Injectable } from '@angular/core';
import { HierarchyModel } from '../../Model/hierarchyModel';
const H_KEY = '';
@Injectable({
  providedIn: 'root'
})
export class HierarchyService {
 
  private hiararchy:HierarchyModel;
  constructor() { }

  setHierarchy(_hiararchy:HierarchyModel)
  {
    this.hiararchy=_hiararchy;
   window.localStorage.removeItem(H_KEY);
   window.localStorage.setItem(H_KEY, JSON.stringify(this.hiararchy));
    console.log(this.hiararchy)
  }
  getHierarchy()
  {	
  //debugger;
 if(localStorage.getItem(H_KEY) != null)
   {
   this.hiararchy= JSON.parse(localStorage.getItem(H_KEY));
  } 
 else{
  
  this.hiararchy=undefined;
 }
    return this.hiararchy;
    console.log(this.hiararchy) 
  }

  clearHierarchy() {
    //debugger;
    window.localStorage.removeItem(H_KEY);
    window.localStorage.clear();
  }
}
