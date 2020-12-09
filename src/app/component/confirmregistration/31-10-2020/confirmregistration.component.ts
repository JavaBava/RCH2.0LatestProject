import { Component, OnInit } from '@angular/core';
import {BackendAPIService} from '../service/backend-api.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import * as CryptoJS from 'crypto-js';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { RegistrationService } from 'src/app/component/registration/registration.service';
import { IpServiceService } from '../service/ip-service.service';



@Component({
  selector: 'app-confirmregistration',
  templateUrl: './confirmregistration.component.html',
  styleUrls: ['./confirmregistration.component.css']
})
export class ConfirmregistrationComponent implements OnInit {

  constructor(private backendApiService: BackendAPIService,private fb: FormBuilder,public router: Router, private route: ActivatedRoute,private registrationservice:RegistrationService,private ip:IpServiceService) { }
  
  showOtpsendMsg: boolean = true;
  
  showOtpMobresendMsg: boolean = false;
  
  showOtpEmailresendMsg: boolean = false;
  
   showOtpMobVerifiedMsg: boolean = false;
   
   showOtpEmailVerifiedMsg: boolean = false;
  
  
	
  showrequestsendMsg: boolean = false;
  
   showServerresponseMsg: boolean = false;
  
  
	
	 ipAddress:string;
	confirmForm: FormGroup;
  submitted = false;
  confirmArray:Array<any>;
  tempuserArray:Array<any>;
  registraionArray:Array<any>;
  
  
  errorresponse;
  buttonEvent;
  mobotpverifiedEvent;
  emailotpverifiedEvent;
   tempuserString;
  
  namebuttonEvent;
  

    ngOnInit(): void {
		
	 this.getIP();
	 
	
		
		  this.tempuserArray = this.registrationservice.getUser();
		
	const mobno : string = this.tempuserArray['mobno'];
   const emailid : string = this.tempuserArray['emailid'];

  
   this.confirmForm = this.fb.group({
	   mobno: [mobno, [Validators.required]],
	  emailid: [emailid, [Validators.required]],
	  mobotpverified: [null],
	  emailotpverified: [null],
	  otp: [null],
      emailotp:[null],
	  capctha: [null],
	  namebuttonEvent: ['', [Validators.required]]
		
    }, { 
      validator: this.OTPConfirmedValidator('otp', 'emailotp')
    });
	
	this.handleFormChanges();

  }
  
  
  
  handleFormChanges() {
	  
	 this.confirmForm.get('namebuttonEvent').valueChanges
  .subscribe(value => {
    if(value) { console.log(value);
	
	    if(value=='clickVerifyMobotp')
		{                              
        this.confirmForm.get('otp').setValidators(Validators.required);
		 this.confirmForm.get('otp').updateValueAndValidity();
		 
		 this.confirmForm.get('emailotp').setValidators([]); // or clearValidators()
         this.confirmForm.get('emailotp').updateValueAndValidity();

         this.confirmForm.get('capctha').setValidators([]); // or clearValidators()
         this.confirmForm.get('capctha').updateValueAndValidity();
		 
		 this.confirmForm.get('mobotpverified').setValidators([]); // or clearValidators()
         this.confirmForm.get('mobotpverified').updateValueAndValidity();
		 
		 this.confirmForm.get('emailotpverified').setValidators([]); // or clearValidators()
         this.confirmForm.get('emailotpverified').updateValueAndValidity();
		

		}
		else if(value=='clickResendMobOtp')
		{
						
			this.confirmForm.get('otp').setValidators([]); // or clearValidators()
         this.confirmForm.get('otp').updateValueAndValidity();
			
			  this.confirmForm.get('emailotp').setValidators([]); // or clearValidators()
         this.confirmForm.get('emailotp').updateValueAndValidity();

         this.confirmForm.get('capctha').setValidators([]); // or clearValidators()
         this.confirmForm.get('capctha').updateValueAndValidity();
		 
		 this.confirmForm.get('mobotpverified').setValidators([]); // or clearValidators()
         this.confirmForm.get('mobotpverified').updateValueAndValidity();
		 
		 this.confirmForm.get('emailotpverified').setValidators([]); // or clearValidators()
         this.confirmForm.get('emailotpverified').updateValueAndValidity();
		 
		}
		if(value=='clickVerifyEmailotp')
		{                              
        this.confirmForm.get('otp').setValidators([]);
		 this.confirmForm.get('otp').updateValueAndValidity();
		 
		 this.confirmForm.get('emailotp').setValidators(Validators.required); // or clearValidators()
         this.confirmForm.get('emailotp').updateValueAndValidity();

         this.confirmForm.get('capctha').setValidators([]); // or clearValidators()
         this.confirmForm.get('capctha').updateValueAndValidity();
		 
		 this.confirmForm.get('mobotpverified').setValidators([]); // or clearValidators()
         this.confirmForm.get('mobotpverified').updateValueAndValidity();
		 
		 this.confirmForm.get('emailotpverified').setValidators([]); // or clearValidators()
         this.confirmForm.get('emailotpverified').updateValueAndValidity();

		}
		else if(value=='clickResendEmailOtp')
		{
						
			this.confirmForm.get('otp').setValidators([]); // or clearValidators()
         this.confirmForm.get('otp').updateValueAndValidity();
			
			  this.confirmForm.get('emailotp').setValidators([]); // or clearValidators()
         this.confirmForm.get('emailotp').updateValueAndValidity();

         this.confirmForm.get('capctha').setValidators([]); // or clearValidators()
         this.confirmForm.get('capctha').updateValueAndValidity();
		 
		 this.confirmForm.get('mobotpverified').setValidators([]); // or clearValidators()
         this.confirmForm.get('mobotpverified').updateValueAndValidity();
		 
		 this.confirmForm.get('emailotpverified').setValidators([]); // or clearValidators()
         this.confirmForm.get('emailotpverified').updateValueAndValidity();
		 
		}
		else if(value=='clickconfirm')
		{
			this.confirmForm.get('otp').setValidators([]);
		 this.confirmForm.get('otp').updateValueAndValidity();
		 
		 this.confirmForm.get('emailotp').setValidators([]);
		 this.confirmForm.get('emailotp').updateValueAndValidity();
		 
		 this.confirmForm.get('capctha').setValidators(Validators.required);// or clearValidators()
         this.confirmForm.get('capctha').updateValueAndValidity();
		 
		 this.confirmForm.get('mobotpverified').setValidators(Validators.required); // or clearValidators()
         this.confirmForm.get('mobotpverified').updateValueAndValidity();
		 
		 this.confirmForm.get('emailotpverified').setValidators(Validators.required); // or clearValidators()
         this.confirmForm.get('emailotpverified').updateValueAndValidity();
			
		 
		 
		}
    } else {
     // alert('Opps... Something wend wrong. Please try later');
    }
  });
	  
  }
  
   get f() { return this.confirmForm.controls; }
   
   onSubmit(confirmForm) {
	  
	  
	  this.submitted = true;
	  
	   if (this.confirmForm.invalid) {
            return;
        }
	  
	 
	     if(confirmForm.value.namebuttonEvent=='clickVerifyMobotp')
	  {
		 this.funVerifyMobotp(confirmForm.value.otp,confirmForm.value.mobno);  
	  }
	  else if(confirmForm.value.namebuttonEvent=='clickResendMobOtp')
	  {
		  
		   this.funResendMobotp(confirmForm.value.mobno);
		  
	
 
	  }
	  if(confirmForm.value.namebuttonEvent=='clickVerifyEmailotp')
	  {
		 this.funVerifyEmailotp(confirmForm.value.otp,confirmForm.value.emailid);  
	  }
	  else if(confirmForm.value.namebuttonEvent=='clickResendEmailOtp')
	  {
		  
		   this.funResendEmailotp(confirmForm.value.emailid);
		  
	
 
	  }
	  else if(confirmForm.value.namebuttonEvent=='clickconfirm')
	  {
	   
	   console.log(this.tempuserArray['user_state']);
	   
	   //let tempuserArray = JSON.parse(tempuserString);
	   
	   /////////// bs split some value adjustment  ////
	   
	    console.log('tempuserArray==user_state=');
	    console.log(this.tempuserArray['user_state']);
	    if(this.tempuserArray['user_state'])
	   {
	    var str = this.tempuserArray['user_state'];
		var splitted_state = str.split("-", 2);
	   
	   var stateId=splitted_state[0];
	   var stateName=splitted_state[1];
	   }
	   else{
		   var stateId=0;
		  
	   var stateName="";
	   }
	   
	    if(this.tempuserArray['user_district'])
	   {	
	   var str = this.tempuserArray['user_district'];
	   var splitted_district = str.split("-", 3);
	   
	   var districtId=splitted_district[0];
	   var districtLgdId=splitted_district[1];
	   var districtName=splitted_district[2];
	   }
	   else{
		   var districtId=0;
		   var districtLgdId=0;
	   var districtName="";
	   }
	   
	  	 if(this.tempuserArray['health_block'])
	   {	
	   var str = this.tempuserArray['health_block'];
	   var splitted_healthBlockCode = str.split("-", 4);
	   
	   var healthblockId=splitted_healthBlockCode[0];
	   var healthBlockLgdId=splitted_healthBlockCode[1];
	    var talukaID=splitted_healthBlockCode[2];
	   var healthBlockName=splitted_healthBlockCode[3];
	   }
	   else{
		   var healthblockId=0;
		   var healthBlockLgdId=0;
		     var talukaID=0
	   var healthBlockName="";
	   }
	   
	   if(this.tempuserArray['facility'])
	   {
		   
	   var str = this.tempuserArray['facility'];
	   var splitted_healthFacilityCode = str.split("-", 2);
	 
	   var phcId=splitted_healthFacilityCode[0];
	   var facilityName=splitted_healthFacilityCode[1];
	   }
	   else{
		   var phcId=0;
	   var facilityName="";
	   }
	   
	    if(this.tempuserArray['subfacility'])
	   {
	   var str = this.tempuserArray['subfacility'];
	   var splitted_healthSubCentreCode = str.split("-", 2);
	   
	   var subCentreId=splitted_healthSubCentreCode[0];
	   var subFacilityName=splitted_healthSubCentreCode[1];
	   }
	   else{
		   var subCentreId=0;
	   var subFacilityName="";
	   }
	   
	   /////////  end bs split some value adjusment //////
	   
	    
	   
	   this.userCreateRequest(this.tempuserArray['firstname'],this.tempuserArray['secondname'],this.tempuserArray['lastname'],this.tempuserArray['username'],this.tempuserArray['emailid'],this.tempuserArray['mobno'],this.tempuserArray['address'],this.tempuserArray['dob'],this.tempuserArray['gender'],this.tempuserArray['designation'],this.tempuserArray['user_type'],stateId,stateName,districtId,districtLgdId,districtName,this.tempuserArray['rural_urban'],healthblockId,healthBlockLgdId,healthBlockName,talukaID,this.tempuserArray['facility_type'],phcId,facilityName,subCentreId,subFacilityName,this.ipAddress);
	   
	  }  
	  
	  
   }
   
   funVerifyMobotp(otp:string,mobno:string)
   {
	 console.log('funVerifyMobotp');
	  this.mobotpverifiedEvent='mobile verified';
     this.showOtpMobVerifiedMsg= true;
	 
   }
   
   funResendMobotp(mobno:string)
   {
	console.log('funResendMobotp');
	
     this.showOtpMobresendMsg= true;
   }
   
   
   funVerifyEmailotp(otp:string,emailid:string)
   {
	 console.log('funVerifyEmailotp');
	 
	  this.emailotpverifiedEvent='email verified';
	  
     this.showOtpEmailVerifiedMsg= true;
   }
   
   funResendEmailotp(emailid:string)
   {
	console.log('funResendEmailotp');
     this.showOtpEmailresendMsg= true;
   }

   
   
   userCreateRequest(firstname:string, secondname:string, lastname:string, username:string, emailid:string, mobno:string, address:string, dob:string, gender:string, designation:string, user_type:string, stateId:string,stateName:string,districtId:string,districtLgdId:string,districtName:string, rural_urban:string,healthblockId:string,healthBlockLgdId:string,healthBlockName:string,talukaID:string,facility_type:string, phcId:string,facilityName:string,subCentreId:string,subFacilityName:string,ipAddress:string){
	   
	  

  this.backendApiService.userCreateRequest(firstname,secondname,lastname,username,emailid,mobno,address,dob,gender,designation,user_type,stateId,stateName,districtId,districtLgdId,districtName,rural_urban,healthblockId,healthBlockLgdId,healthBlockName,talukaID,facility_type,phcId,facilityName,subCentreId,subFacilityName,ipAddress).subscribe((res:Response)=> {
	  
	  console.log('this is coming');
	  
   // let response=JSON.parse(JSON.stringify(res));
   
     console.log(res);
	
	//let response=JSON.parse((res));
	
    //console.log(response);
	
//this.registraionArray = response;

console.log('user created successfully');

if(Object.keys(res).length>0){
	
  alert('Registration successfully saved and will be verified by admin. After verification password will be sent to your email or mobile');
this.router.navigate(['/login']);
	
  

}else{
	
// bs please not need to check below code according to return	
 
 this.errorresponse="Something went wrong. Please try again later"; 
	 this.showServerresponseMsg= true;

}

     },(error) => { 
	 
	 if(error=='Error:409-Conflict')
	 {
	 this.errorresponse="Conflict: User already exist"; 
	 }
	 else
	 {
		 this.errorresponse="Something went wrong. Please try again later"; 
	 }
	 console.log(error);
	 
	 this.showServerresponseMsg= true;
	 }
	 )

}



OTPConfirmedValidator(controlName: string, matchingControlName: string){ console.log('yes this is validator');
         
		   
    return (confirmForm: FormGroup) => {
        const control = confirmForm.controls[controlName];
        const matchingControl = confirmForm.controls[matchingControlName];
		
		console.log( control.value );
	
		  if( (control.value!='' && control.value != null) && (matchingControl.value!='' && matchingControl.value != null) ){ 
		  
		  console.log('yes this is validator123');
		  
      /*  if (matchingControl.errors && matchingControl.errors.emailotpconfirmedValidator) {
            return;
        }
		*/
		
        if (control.value == matchingControl.value) {  // check if equal 
            matchingControl.setErrors({ emailotpconfirmedValidator: true });
			 control.setErrors({ mobileotpconfirmedValidator: true });
			
        } else {
            matchingControl.setErrors(null);
			 control.setErrors(null);
			
        }
		
		  }
    
	
		   }
	
}
   
   clickButton(val)
  {
	  console.log('button clicked');
	 
	  this.buttonEvent=val;
	 
	  
  }
  
 getIP()
  {
    this.ip.getIPAddress().subscribe((res:any)=>{
	 this.ipAddress=res.ip;
	
    });
  }
}
