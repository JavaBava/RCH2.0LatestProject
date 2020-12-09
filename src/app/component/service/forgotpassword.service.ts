import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ForgotpasswordService {

  constructor() { }
  
   
   public saveValue(val) {
	   
	   const USER_KEY = 'forgot-pass';
	   
    window.localStorage.removeItem(USER_KEY);
    
    window.localStorage.setItem(USER_KEY, JSON.stringify(val));
	
  }
  
   public getValue() {
	    const USER_KEY = 'forgot-pass';
    return JSON.parse(localStorage.getItem(USER_KEY));
  }
  
}
