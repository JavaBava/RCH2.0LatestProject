import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse,HttpHeaders } from "@angular/common/http";
import { catchError } from 'rxjs/operators';
import {  throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BackendAPIService {

  constructor(private httpClient: HttpClient) { }

  
  

  
  getStateAPI(): Observable<any> {
    return this.httpClient.get(environment.stateUrl ).pipe(catchError(this.errorHandler));
}

getDistrictAPI(id:string): Observable<any> {
  return this.httpClient.get(environment.districtUrl+id).pipe(catchError(this.errorHandler));
}

searchEC(data:any): Observable<any> {
  console.log("inside service search ec data")
  console.log(data)
  let headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'accept': '*/*' });
let options = { headers: headers };

  console.log(environment.getSearch ,data)
  return this.httpClient.post(environment.getSearch ,data,options);
}

getHealthBlocksAPI(id:string): Observable<any> {
  return this.httpClient.get(environment.healthBlockUrl+id).pipe(catchError(this.errorHandler));
}

getHealthPHCAPI(id:string): Observable<any> {
  return this.httpClient.get(environment.healthPHCUrl+id).pipe(catchError(this.errorHandler));
}

getHealthSubcentersAPI(id:string): Observable<any> {
  return this.httpClient.get(environment.healthSubCentreUrl+id).pipe(catchError(this.errorHandler));
}

getTalukasAPI(id:string): Observable<any> {
  return this.httpClient.get(environment.talukaUrl+id).pipe(catchError(this.errorHandler));
}

getVillageAPI(subcentreCode:number): Observable<any> {
  return this.httpClient.get(environment.getVillageAtSubCentre+subcentreCode).pipe(catchError(this.errorHandler));
}

post(data:any): Observable<any> {
  console.log("inside service")
  console.log(data)
  return this.httpClient.post(environment.postVillageWiseeProfile,data );
}

postECData(data:any): Observable<any> {
  console.log("inside service post ec data")
  console.log(data)
  return this.httpClient.post(environment.postECData,data );
}

getVillageWiseProfileAPI(healthFacility:number,subcentre:number,village:number): Observable<any> {
  return this.httpClient.get(environment.VillageWiseProfile+healthFacility+"&HealthSubCentre_code="+subcentre+"&Village_code="+village).pipe(catchError(this.errorHandler));
}

getHealthFacilityType(): Observable<any> {
return this.httpClient.get(environment.healthFacilityType).pipe(catchError(this.errorHandler));
}

getLogin(username:string, password:string): Observable<any> {
  console.log("http://164.100.61.93/login?Username="+username+"&"+"password="+password)
  return this.httpClient.get(environment.loginUrl+username+"&"+"password="+password).pipe(catchError(this.errorHandler)); 
}

getHealthProvideratSubcentre(subcentrecode:number,typeid:number): Observable<any> {
  return this.httpClient.get(environment.HealthProvideratSubcentre+"subcentrecode="+subcentrecode+"&typeid="+typeid).pipe(catchError(this.errorHandler));
}

getHealthProviderById(id:number): Observable<any> {
  return this.httpClient.get(environment.searchHealthProviderById+id).pipe(catchError(this.errorHandler));
}

getUser(id:number): Observable<any> {
  return this.httpClient.get(environment.getUser+ "UserId="+id).pipe(catchError(this.errorHandler));
}

getVillageDetailsYearWise(year:number, healthfacility_code:number,subfacility_code:number,villagecode: number){
  return this.httpClient.get(environment.getYearWiseVillageDetails+year+"&HealthFacility_code="+healthfacility_code+"&HealthSubCentre_code="+subfacility_code+"&Village_code="+villagecode).pipe(catchError(this.errorHandler));
}

updateVillageWiseDetails(sno:number ,data:any){
  console.log("inside service update village")
  console.log(data)
  console.log(sno)
  console.log(environment.updateVillageWiseDetails+sno)
return this.httpClient.post(environment.updateVillageWiseDetails+sno,data).pipe(catchError(this.errorHandler));

}


//nisha

getBankAPI(): Observable<any>{
  return this.httpClient.get(environment.BankDetails).pipe(catchError(this.errorHandler));
  }

getReligionsAPI():Observable<any>{
    return this.httpClient.get(environment.Religions).pipe(catchError(this.errorHandler));
    }

getEducationsAPI():Observable<any>{
      return this.httpClient.get(environment.Educations).pipe(catchError(this.errorHandler));
      }

getOccupationsAPI():Observable<any>{
   return this.httpClient.get(environment.Occupations).pipe(catchError(this.errorHandler));
  }

  getHealthPHCAPIByBlockAndType(blockCode:number, facilityType:number): Observable<any> {
    return this.httpClient.get(environment.healthPHCByBlockAndType+blockCode+"&type="+facilityType).pipe(catchError(this.errorHandler));
  }

  getFacilityType(): Observable<any> {
    return this.httpClient.get(environment.FacilityType).pipe(catchError(this.errorHandler));
}
getVillage(subfacility_code:number){
  return this.httpClient.get(environment.village+subfacility_code).pipe(catchError(this.errorHandler));
}

getHealthPhcbyTypeBlock(block:number, ftype:number){
  return this.httpClient.get(environment.HealthPhcbyTypeBlock+block+"&type="+ftype).pipe(catchError(this.errorHandler));
}


editECData(regID:number, caseno:number, data :any) { 
  console.log("inside service edit ec data")
 console.log(environment.editECData+regID+"&caseNo="+caseno,data)
  //return this.httpClient.post(environment.postECData );
  return this.httpClient.put(environment.editECData+regID+"&caseNo="+caseno,data).pipe(catchError(this.errorHandler));
}
  /* Bunty ji */


  VerifyUserInfo(username, gender, dob, mobno, emailid ): Observable<any> {
	 
    return this.httpClient.get(environment.VerifyUserInfoUrl+"?username="+username+"&gender="+gender+"&dob="+dob+"&mobileno="+mobno+"&email="+emailid ).pipe(catchError(this.errorHandler));
		
}

funVerifyotp(user_id,emailotp,mobileotp,emailid,mobno): Observable<any> {
	
  return this.httpClient.get(environment.VerifyotpUrl+"?userId="+user_id+"&eotp="+Number(emailotp)+"&motp="+Number(mobileotp)+"&email="+emailid+"&mobileno="+mobno ).pipe(catchError(this.errorHandler));

}

forgotPass(newpassword, repassword, userid, currentDate): Observable<any> {
	
	 
	   	//console.log(currentDate);console.log('userid=');console.log(userid);
		
		  var x = userid;
           var y: number = +x;
		   
		   console.log(y);
				
		return this.httpClient.put(environment.forgotpassotpUrl,{"userID" : y, "password" : newpassword, "updatedBy" : y},{responseType: 'text'});
		
		
		
}

changePass(oldpassword, newpassword, repassword, userid, updatedBy): Observable<any> {
	
	
	 
  //console.log(currentDate);console.log('userid=');console.log(userid);

  var x = userid;
  var y: number = +x;

console.log(y);

return this.httpClient.put(environment.changepassotpUrl,{"oldPassword" : oldpassword, "newPassword" : newpassword, "userId" : y, "updatedBy" : y},{responseType: 'text'}).pipe(catchError(this.errorHandler));

}

getUserTypeAPI(): Observable<any> {
    return this.httpClient.get(environment.UserTypeUrl ).pipe(catchError(this.errorHandler));
}

getFacilityTypeAPI(): Observable<any> {
    return this.httpClient.get(environment.FacilityTypeUrl ).pipe(catchError(this.errorHandler));
}



userCreateRequest(firstname,secondname,lastname,username,emailid,mobno,address,dob,gender,designation,user_type,stateId,stateName,districtId,districtLgdId,districtName,rural_urban,healthblockId,healthBlockLgdId,healthBlockName,talukaID,facility_type,phcId,facilityName,subCentreId,subFacilityName,ipAddress): Observable<any> {
  //console.log("inside service");
  //console.log(data)
  if(dob.month<10)
  {
	  var month_val:string ="0" + dob.month;
	  
  }
  else{
	 var month_val:string =dob.month; 
  }
  if(dob.day<10)
  {
	  var day_val:string="0" + dob.day; 
	  
  }
  else{
	var day_val:string=dob.day;
  }
 
  let dob_modified_date=dob.year+'-'+month_val+'-'+day_val;
  
  console.log(dob_modified_date);
  
   console.log('ipAddress==');
   console.log(ipAddress);

   return this.httpClient.post(environment.userCreateFirstStepUrl,{
  "stateId": Number(stateId),
  "stateName": stateName,
  "districtId": Number(districtId),
  "districtLgdId": Number(districtLgdId),
  "districtName": districtName,
  "talukaId": talukaID,
  "talukaLgdId": 0,
  "talukaName": "",
  "healthblockId": Number(healthblockId),
  "healthBlockLgdId": Number(healthBlockLgdId),
  "healthBlockName": healthBlockName,
  "phcId": Number(phcId),
  "facilityType": Number(facility_type),
  "facilityName": facilityName,
  "subCentreId": Number(subCentreId),
  "subFacilityName": subFacilityName,
  "villageId": 0,
  "villageLgdId": 0,
  "villageName": "",
  "ashaCatchmentId": 0,
  "ashaCatchmentName": "string",
  "wardNo": 0,
  "rurUrbHierarchy": rural_urban,
  "id": 0,
  "userName": username,
  "firstName": firstname,
  "middleName": secondname,
  "lastName": lastname,
  "birthDate": dob_modified_date,
  "gender": gender,
  "userDesignation": designation,
  "email": emailid,
  "mob": mobno,
  "currentAddress": address,
  "typeId": user_type,
 // "createDt": "2020-10-17T08:18:20.092Z",
  "updatedBy": 0,
 // "updatedDt": "2020-10-17T08:18:20.092Z",
  "status": 0,
  "ipAddress": ipAddress,
  "approvedBy": 0,
 // "approvedOn": "2020-10-17T08:18:20.092Z",
  "approvedIpAdd": "string"
}).pipe(catchError(this.errorHandler));
}


 getRegistrationRequestAPI(usertype,username): Observable<any> {
    return this.httpClient.get(environment.registrationrequestUrl+"?usertype="+usertype+"&username="+username ).pipe(catchError(this.errorHandler));
}

userApprovedAPI(userId,statusid,approvedBy,ipAddress,username,reason): Observable<any> {
	
	console.log('userId==');
	console.log(userId);
	console.log('statusid==');
	console.log(statusid);
	console.log('approvedBy==');
	console.log(approvedBy);
	console.log('ipAddress==');
	console.log(ipAddress);
	console.log('username==');
	console.log(username);
	console.log('reason==');
	console.log(reason);
	
	return this.httpClient.put(environment.userapprovedUrl,{"userId" : userId, "status" : statusid, "approvedBy" : approvedBy, "ipAddress" : "", "rejection_reason" : reason}).pipe(catchError(this.errorHandler));
	
    
}

getSingleStateDataAPI(id:string): Observable<any> {
  return this.httpClient.get(environment.stateUrl+"/"+id ).pipe(catchError(this.errorHandler));
}

getHealthPHCByTypeBlockAPI(id:string,blockid:string): Observable<any> {

return this.httpClient.get(environment.healthPHCUrl+"GetHealthPhcbyTypeBlock/?blockcode="+blockid+"&type="+id).pipe(catchError(this.errorHandler));
}

getAssigneRoleAPI(usertype): Observable<any> {
  return this.httpClient.get(environment.assingroleUrl+"?usertype="+usertype).pipe(catchError(this.errorHandler));
}

getApplicationAPI(usertype): Observable<any> {
  return this.httpClient.get(environment.applicationUrl+"?usertype="+usertype).pipe(catchError(this.errorHandler));
}

userRoleAppicationAssignedAPI(val_userId,roleIds,appIds,assignDt,val_assignBy,inActiveDt,val_stateId): Observable<any> {
	
	
	
	let roleIds_val = roleIds.map(i=>Number(i));
	let appIds_val = appIds.map(i=>Number(i));

	return this.httpClient.post(environment.userRoleAppicationAssignedUrl,{"userId" : val_userId, "roleId" : roleIds_val, "appId" : appIds_val, "assignBy" : val_assignBy, "inActiveDt" : inActiveDt, "stateId" : val_stateId}).pipe(catchError(this.errorHandler));
	 
    
}

chkUserNotExistAPI(username:string,emailid:string,mobno:string,dob:string,gender:string): Observable<any> {

  return this.httpClient.get(environment.IsUserAvailableUrl+"?username="+username+"&email="+emailid+"&mobileno="+mobno+"&dob="+dob+"&gender="+gender).pipe(catchError(this.errorHandler));
  }

  GenerateOTPAPI(mob:string,userID:string,email:string){
 
    let BSuserID=(userID).toString();
    
    return this.httpClient.post(environment.GenerateOTPUrl,{"mobileNo" : mob, "userId" : BSuserID, "emailID" : email}).pipe(catchError(this.errorHandler));
    
    }
    
    SendEmailAPI(email:string,otp:string): Observable<any> {
    
    return this.httpClient.get(environment.SendEmailUrl+"?emailid="+email+"&otp="+otp).pipe(catchError(this.errorHandler));
    }
    
    GetSearchUsersAPI(item){
	
	
	
      //console.log({"state_code" : "4", "district_code" : "1", "block_code" : "1","facility_code" : "2","subfacility_code" : "11","village_code" : "0","name_wife" : "LAXMI","name_husband" : "RAJWANT","mobile_no" : "9780485474"});
      
      //const headers = new HttpHeaders().set("content-type", "application/json;");
         
      /* 
       let headers = new HttpHeaders({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    headers.append('Accept', 'application/json');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT');
    headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');
    headers.append('Access-Control-Allow-Headers', "X-Requested-With, Content-Type, Origin, Authorization, Accept, Client-Security-Token, Accept-Encoding");
    
    */
    
     let headers = new HttpHeaders().set("Accept", "application/json")
    .set('Content-Type', 'application/json')
    //.set('Content-Length', '<calculated when request is sent>')
    //.set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT')
    //.set('Access-Control-Allow-Origin', 'http://localhost:4200')
    //.set('Access-Control-Allow-Headers', "X-Requested-With, Content-Type, Origin, Authorization, Accept, Client-Security-Token, Accept-Encoding");
    
    
       
        return this.httpClient.post(environment.SearchUsersUrl,JSON.stringify(item),{headers:headers});
      
      //return this.httpClient.post(environment.SearchUsersUrl,{"state_code" : "4", "district_code" : "1", "block_code" : "1","facility_code" : "2","subfacility_code" : "11","village_code" : "0","name_wife" : "LAXMI","name_husband" : "RAJWANT","mobile_no" : "9780485474"},{headers:headers}).pipe(catchError(this.errorHandler));
      
       //return this.httpClient.post(environment.SearchUsersUrl,{"state_code" : "4", "district_code" : "1", "block_code" : "1","facility_code" : "2","subfacility_code" : "11","village_code" : "0","name_wife" : "LAXMI","name_husband" : "RAJWANT","mobile_no" : "9780485474"}).pipe(catchError(this.errorHandler));
      
       
       
       //return this.httpClient.post(environment.GenerateOTPUrl,{"mobileNo" : "", "userId" : "0", "emailID" : "bunty84singh@gmail.com"}).pipe(catchError(this.errorHandler));
      
      
        
        }
// brijesh sir

getECDataAPi(dcode:number,bid:number,phc:number,subphc:number,Vcode:number,fin_year:number){
     
       
  return this.httpClient.get(environment.ecreportdata+phc+"&subphc="+subphc+"&vcode="+Vcode+"&fin_year="+fin_year);
  
  }
  getBulkprofileDataAPi(dcode:number,bid:number,phc:number,subphc:number,Vcode:number,fin_year:number){
     
       
    return this.httpClient.get(environment.bulkprofilereportdata+dcode+"&bid="+bid+"&phcid="+phc+"&subphcid="+subphc+"&vcode="+Vcode+"&fin_year="+fin_year);
    
    }


  //-------------Ashutosh -------------//

  getECbyRegNo(registrationNo : number):Observable<any>{
    return this.httpClient.get(environment.getECbyRegNo+registrationNo).pipe(catchError(this.errorHandler));
  }

  getECTbyRegNo(registrationNo : number) :Observable<any> {
    return this.httpClient.get(environment.getECTbyRegNo+registrationNo).pipe(catchError(this.errorHandler));
  }

  getHealthFacility(): Observable<any>{
    return this.httpClient.get(environment.getHealthFacility).pipe(catchError(this.errorHandler));
  }
  
   getHealthFacilityTypeByAshutosh(blockcode:number,type:number):Observable<any>
  {
    return this.httpClient.get(environment.getHealthFacilityType+"blockcode="+blockcode+"&type="+type).pipe(catchError(this.errorHandler));
  } 


  getMethods() : Observable<any>
  {
    return this.httpClient.get(environment.getMethods).pipe(catchError(this.errorHandler));
  }


postEctdetails(ectdata : any) : Observable<any>
{
  return this.httpClient.post(environment.saveEctdetails,ectdata )//.pipe(catchError(this.errorHandler));
}


getEctVisitdetails(rchId : any,caseNo: any,visitDate : any) : Observable<any>
{
  return this.httpClient.get(environment.getEctVisit+"id="+rchId+"&caseno="+caseNo+"&visitdate="+visitDate).pipe(catchError(this.errorHandler));
}



editEctVisitDetails(rchId : any,caseNo: any,visitDate : any , ectdata : any) : Observable<any>
{
  return this.httpClient.put(environment.editEct+"registrationNo="+rchId+"&caseNo="+caseNo+"&VisitDate="+visitDate,ectdata).pipe(catchError(this.errorHandler));

}




  //-----------------------------------------//
  errorHandler(error) {

    let errorMessage = '';
    let errorCustomMessage = '';
    let errorCustomReturnMessage = '';
 
    if (error.error instanceof ErrorEvent) {
 
      // client-side error
 
      errorMessage = `Error: ${error.error.message}`;
 
    } else {
 
      // server-side error
 
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
 
    }
 
     
    ///window.alert(errorMessage);
 
    //return throwError(errorMessage || 'Server Error');
    
    if(error.status==401)
    {
      errorCustomMessage='Unauthorized';
    }
    else if(error.status==403)
    {
      errorCustomMessage='Forbidden';
    }
    else if(error.status==404)
    {
      errorCustomMessage='Not_Found';
    }
    else if(error.status==500)
    {
      errorCustomMessage='Internal_Server_Error';
    }
    else if(error.status==409)
    {
      errorCustomMessage='Conflict';
    }
    else
    {
      errorCustomMessage='Server_Error';
    }
    errorCustomReturnMessage ='Error:'+error.status+'-'+errorCustomMessage;
    return throwError(errorCustomReturnMessage);
 
  }

/* 
errorHandler(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error.message}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }
 */
}
