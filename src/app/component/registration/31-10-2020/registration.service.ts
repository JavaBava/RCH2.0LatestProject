import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor() { }
  
  
  
  
   public saveUser(user) {
	   
	   const USER_KEY = 'temp-user';
	   
    window.localStorage.removeItem(USER_KEY);
    
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));
	
  }
  
   public getUser() {
	    const USER_KEY = 'temp-user';
    return JSON.parse(localStorage.getItem(USER_KEY));
  }
}
