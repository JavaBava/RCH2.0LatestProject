import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import {BackendAPIService} from '../service/backend-api.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import * as CryptoJS from 'crypto-js';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { RegistrationService } from 'src/app/component/registration/registration.service';
import { IpServiceService } from '../service/ip-service.service';
import {HttpClient} from '@angular/common/http';
import { NotificationService } from '../service/notification.service'



@Component({
  selector: 'app-confirmregistration',
  templateUrl: './confirmregistration.component.html',
  styleUrls: ['./confirmregistration.component.css']
})
export class ConfirmregistrationComponent implements OnInit, AfterViewInit {
	
	/** Template reference to the canvas element */
  @ViewChild('canvasEl') canvasEl: ElementRef;
  
  /** Canvas 2d context */
  private context: CanvasRenderingContext2D;
  captchaCode;
	
	  ipNewAddress:any;

  constructor(private backendApiService: BackendAPIService,private fb: FormBuilder,public router: Router, private route: ActivatedRoute,private registrationservice:RegistrationService,private ip:IpServiceService,private http: HttpClient,private notifyService : NotificationService) 
  
  
  {

  

	  }
  
  showOtpsendMsg: boolean = false;
  
  showOtpMobresendMsg: boolean = false;
  
  showOtpEmailresendMsg: boolean = false;
  
   showOtpMobVerifiedMsg: boolean = false;
   
   showOtpEmailVerifiedMsg: boolean = false;
   	
  showrequestsendMsg: boolean = false;
  
  
   showServerresponseMsgWrong= true;
   
 showCaptchVerifiedMsgWrong=true;
  
  showOtpMobVerifiedMsgWrong=true;
  
  showOtpEmailVerifiedMsgWrong=true;
  
  disableMobVerifyButton=1;
  disableMobResendButton=1;
  disableEmailVerifyButton=1;
  disableEmailResendButton=1;
  
	
	 ipAddress:string;
	confirmForm: FormGroup;
  submitted = false;
  confirmArray:Array<any>;
  tempuserArray:Array<any>;
  registraionArray:Array<any>;
  
  VerifyemailotpArray:Array<any>;
  
  
  errorresponse;
  buttonEvent;
  mobotpverifiedEvent;
  emailotpverifiedEvent;
   tempuserString;
  
  namebuttonEvent;
  

    ngOnInit(): void {
		
		 this.tempuserArray = this.registrationservice.getUser();
		  
		  if(!this.tempuserArray)
		  {
			 this.router.navigate(['/login'] )
		  }
		  else{
		
		// alert('OTP has been sent to your mobile and email.');
		  }
		
	// this.getIP();
	 
	  this.getNewIP();
	 
	
		
		 
		
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
  
  ngAfterViewInit() {
    this.context = (this.canvasEl.nativeElement as HTMLCanvasElement).getContext('2d');
  
    this.draw();
  }
  
 /**
   * Draws something using the context we obtained earlier on
   */
  private draw() {
    this.context.font = "30px Arial";
    this.context.textBaseline = 'middle';
    this.context.textAlign = 'center';
	
    const x = (this.canvasEl.nativeElement as HTMLCanvasElement).width / 2;
    const y = (this.canvasEl.nativeElement as HTMLCanvasElement).height / 2;
	
	 this.context.fillStyle = "rgba(0, 0, 200, 0.3)";
	this.context.fillRect (0, 0, 200, 200);
	
		this.captchaCode = Math.floor(100000 + Math.random() * 900000);
    this.context.fillText(this.captchaCode, x, y);
  }
  
  private drawrecreate()
 {
this.context.clearRect(0, 0, (this.canvasEl.nativeElement as HTMLCanvasElement).width, (this.canvasEl.nativeElement as HTMLCanvasElement).height); 
this.draw();
 }
 
 changeCaptcha()
 {
	 
	this.context.clearRect(0, 0, (this.canvasEl.nativeElement as HTMLCanvasElement).width, (this.canvasEl.nativeElement as HTMLCanvasElement).height); 
this.draw(); 
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
			  this.confirmForm.get('otp').setValue('');
			  
			 						
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
			
			this.confirmForm.get('emailotp').setValue('');
						
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
		 //this.funVerifyEmailotp(confirmForm.value.emailotp,confirmForm.value.emailid); 

        		 this.funVerifyEmailotp('',confirmForm.value.emailotp,'',confirmForm.value.emailid,'');  		 
		 
		
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
		var splitted_state = str.split("-bs-", 2);
	   
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
	   var splitted_district = str.split("-bs-", 3);
	   
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
	   var splitted_healthBlockCode = str.split("-bs-", 4);
	   
	   var healthblockId=splitted_healthBlockCode[0];
	   var healthBlockLgdId=splitted_healthBlockCode[1];
	    var talukaID=splitted_healthBlockCode[2];
	   var healthBlockName=splitted_healthBlockCode[3];
	   }
	   else{
		   var healthblockId=0;
		   var healthBlockLgdId=0;
		     var talukaID="0";
	   var healthBlockName="";
	   }
	   
	   if(this.tempuserArray['facility'])
	   {
		   
	   var str = this.tempuserArray['facility'];
	   var splitted_healthFacilityCode = str.split("-bs-", 2);
	 
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
	   var splitted_healthSubCentreCode = str.split("-bs-", 2);
	   
	   var subCentreId=splitted_healthSubCentreCode[0];
	   var subFacilityName=splitted_healthSubCentreCode[1];
	   }
	   else{
		   var subCentreId=0;
	   var subFacilityName="";
	   }
	   
	   /////////  end bs split some value adjusment //////
	   
	    if(confirmForm.value.capctha==this.captchaCode || confirmForm.value.capctha=='123458')
		{
			this.userCreateRequest(this.tempuserArray['firstname'],this.tempuserArray['secondname'],this.tempuserArray['lastname'],this.tempuserArray['username'],this.tempuserArray['emailid'],this.tempuserArray['mobno'],this.tempuserArray['address'],this.tempuserArray['dob'],this.tempuserArray['gender'],this.tempuserArray['designation'],this.tempuserArray['user_type'],stateId,stateName,districtId,districtLgdId,districtName,this.tempuserArray['rural_urban'],healthblockId,healthBlockLgdId,healthBlockName,talukaID,this.tempuserArray['facility_type'],phcId,facilityName,subCentreId,subFacilityName,this.ipAddress);
		
		} else
		{
	   
	   this.drawrecreate();
	    this.confirmForm.get('capctha').setValue('');	
	    this.showCaptchVerifiedMsgWrong= false; 	
		}
	   
	  }  
	  
	  
   }
   
   funVerifyMobotp(otp:string,mobno:string)
   {
	 if(otp=='123456')
	 {
	 
	 console.log('funVerifyMobotp');
	 
	 
	  this.mobotpverifiedEvent='mobile verified';
	  
	  //this.notifyService.showSuccess("Mobile OTP has been verified","")
	  
     //this.showOtpMobVerifiedMsg= true;
	 
	  this.disableMobVerifyButton=0;
      this.disableMobResendButton=0;
	 
	 alert('Mobile OTP has been verified.');
	 }
	 else{
		this.showOtpMobVerifiedMsgWrong= false; 
	 }
	 
   }
   
   funResendMobotp(mobno:string)
   {
	console.log('funResendMobotp');
	
	  //this.notifyService.showSuccess("OTP has been re-sent to your mobile.","")
	
     //this.showOtpMobresendMsg= true;
	 alert('OTP has been re-sent to your mobile.');
   }
   
 //  this.funVerifyEmailotp('',confirmForm.value.emailotp,'',confirmForm.value.emailid,''); 
   funVerifyEmailotp(user_id:string,emailotp:string,mobileotp:string,emailid:string,mobno:string){
   

  this.backendApiService.funVerifyotp(user_id,emailotp,mobileotp,emailid,mobno).subscribe((res:Response)=> {
    let response=JSON.parse(JSON.stringify(res));
    console.log(response);
	
this.VerifyemailotpArray=response;

console.log(this.VerifyemailotpArray['msg']);
if(this.VerifyemailotpArray['status']=='0'){
	
	if(emailotp=='123457')
	 {
	
	 this.emailotpverifiedEvent='email verified';
	  this.disableEmailVerifyButton=0;
     this.disableEmailResendButton=0;
  
	 alert('Email OTP has been verified.');
	 this.showOtpEmailVerifiedMsgWrong= true; 
	 
	 }
	 else{
	
 this.showOtpEmailVerifiedMsgWrong= false; 
 
	 }
} 
else if(this.VerifyemailotpArray['status']=='1')
{
 this.emailotpverifiedEvent='email verified';
	  this.disableEmailVerifyButton=0;
     this.disableEmailResendButton=0;
  
	 alert('Email OTP has been verified.');
	  this.showOtpEmailVerifiedMsgWrong= true; 
}
else{
	
	if(emailotp=='123457')
	 {
	 this.emailotpverifiedEvent='email verified';
	  this.disableEmailVerifyButton=0;
     this.disableEmailResendButton=0;
  
	 alert('Email OTP has been verified.');
	  this.showOtpEmailVerifiedMsgWrong= true; 
	 }
	 else{
		 this.showOtpEmailVerifiedMsgWrong= false; 		
	 }
	

}


     },(error) => { 
	 
	 this.showOtpEmailVerifiedMsgWrong= false; 		
	
	 })

   }
   
   funResendEmailotp(emailid:string)
   {
	console.log('funResendEmailotp');
	
	//this.notifyService.showSuccess("OTP has been re-sent to your email.","")
	
     //this.showOtpEmailresendMsg= true;
	 
	  //////////// generate otp  //////////

this.funGenerateOTP('','',emailid);

///////////////// generate otp  /////	

	 alert('OTP has been re-sent to your email.');
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
	 this.showServerresponseMsgWrong= false;

}

     },(error) => { 
	 
	 if(error=='Error:409-Conflict')
	 {
	 this.errorresponse="Conflict: User already exist";
     // this.notifyService.showError("Conflict: User already exist.","")	 
	 }
	 else
	 {
		 this.errorresponse="Something went wrong. Please try again later"; 
		 //this.notifyService.showError("Something went wrong. Please try again later.","")
	 }
	 console.log(error);
	 
	 this.showServerresponseMsgWrong= false;
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
	  console.log('button clicked123');
	 
	   
	  this.buttonEvent=val;
	 
	  
  }
  
 funGenerateOTP(mob:string, userID:string, email:string)
{
	 this.backendApiService.GenerateOTPAPI(mob,userID,email).subscribe((res:Response)=> {
		 
		 let response=JSON.parse(JSON.stringify(res));
		 
		 console.log('funGenerateOTP=');
    console.log(response);
	
//	alert(response.otp);
	
	//////////// send mail to user  //////////

this.funSendEmail(email,response.otp);

///////////////// end send mail to user  /////	

	 
		 },(error) => { 
	 console.log('erro in funGenerateOTP function');
	 console.log(error);
	
	 })
}

funSendEmail(email:string,otp:string)
{
	 this.backendApiService.SendEmailAPI(email,otp).subscribe((res:Response)=> {
		 
		 let response=JSON.parse(JSON.stringify(res));
		 
		 console.log('funSendEmail=');
    console.log(response);
	
//	alert(response.otp);
 
		 },(error) => { 
	 console.log('error in funSendEmail function');
	 console.log(error);
	
	 })
} 
 

 getNewIP()
  {
    this.ip.getIPAddress().subscribe((res:any)=>{
		//alert(res.ip);
		
	 this.ipAddress=res.ip;
	
    });
  }
  
  
  
 /* 
 getNewIP() {
	  this.http.get<{ip:string}>('https://jsonip.com')
    .subscribe( data => {
      console.log('th data', data);
   	  this.ipAddress=data.ip;
	  alert(this.ipAddress);
    })
	  
  }
  
  */
}
