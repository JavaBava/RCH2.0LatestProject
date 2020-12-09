import {Injectable} from '@angular/core';
import {HierarchyService} from 'src/app/Core/service/hierarchy/hierarchy.service'
@Injectable({
  providedIn: 'root'
})
export class TokenstoreageService {

  constructor() { }
}

const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor(private h : HierarchyService) { }

  signOut() {

    window.localStorage.removeItem(USER_KEY);
this.h.clearHierarchy();
  window.localStorage.clear();
  }

  

 

  public saveUser(user) {
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  
  

  public getUser() {
    console.log('check user===');
	 let bs_u = JSON.parse(localStorage.getItem(USER_KEY));
	 
	 // console.log(bs_u.u);
	   return bs_u.u;
	  //console.log('ned check user===');
  }


  getlastPwdChangeDt():string{
    return this.getUser().lastPwdChangeDt;
   }
  getUserId() :number{
    return this.getUser().userId;
}

  get getUserName() :string{
        return this.getUser().firstName;
  }

   get userDesignation():string{
    return this.getUser().userDesignation;
  }
 
 get stateid():number{
return this.getUser().stateId;
 }
 get Username() :string{
  return this.getUser().userName;
}
 
 get statename():string{
return this.getUser().stateName;
 }
  
 
  
   get districtname():string{
    return this.getUser().districtName;
     }
     get healthblockname():string{
      return this.getUser().healthBlockName;
       }
   get facilityname():string{
    return this.getUser().facilityName;
   }
   
   get utypeId():number{
  return this.getUser().typeId;
   }
  
   get districtid():number{
    return this.getUser().districtId;
     }
   
     get healthblockid():number{
      return this.getUser().healthblockId;
       }

       get facilityType():string{
        return this.getUser().facilityType;
       }

       get phcId():number{
        return this.getUser().phcId;
       }
 
}
